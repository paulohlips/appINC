
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, AsyncStorage } from 'react-native';
import styles from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';


class GeoLocation extends Component {

   state = {
     dataGeo: '',
     position: null,
     latitude: null,
     longitude: null,
     acuracia: null,
     error: null,
     view: null,
   }

   componentDidMount() {
    const { form, data } = this.props;

    for (var key in form.step) {
      if ( key === data.data_name) {        
        if(form.step[key].filled === true) {          
          if(form.step[key].position !== null) {
            this.setState({
              position: form.step[key].position,
              latitude: form.step[key].position.coords.latitude,
              longitude: form.step[key].position.coords.longitude,
              acuracia: form.step[key].position.coords.accuracy,
              altitude: form.step[key].position.coords.altitude,
              error: null,
            });
          } else {
            this.setState({ error: true });
          }        
        }
      }
    }
  }

   refresh = () => {
     this.setState({
       latitude: null,
       longitude: null,
       acuracia: null,
       error: null,
       view: true,
     });
  // método navigator.geolocation ( nativo do react native)
  // usando função getCurrentLocation, que retorna uma mensagem JSON com campos :
  /** {
     "timestamp": 1484669056399.49,
     "coords": {
       "accuracy": 5,
       "altitude": 0,
       "altitudeAccuracy": -1,
       "heading": -1,
       "latitude": 37.785834,
       "longitude": -122.406417,
       "speed": -1
    } **/
     navigator.geolocation.getCurrentPosition(
       // acessando os campos retornados na mensagem JSON e atribuindo a variavel de estado correspondente
      (position) => {

        AsyncStorage.setItem('@Geolocalizacao', (JSON.stringify( position)));

        this.setState({
          dataGeo: position,
          position: position,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          acuracia: position.coords.accuracy,
          altitude: position.coords.altitude,
          error: null,
        });
      },
      (error) => this.setState({ 
        error: error.message, 
        dataGeo: 'GPS indísponivel',
        view: null,           
      }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );    
   };

   saveFormGeoloc = data => {
    const { position, dataGeo } = this.state;
    const { form, getSaveStateForm, startControlArray } = this.props;
    const dg = JSON.stringify(dataGeo.coords);

    // console.tron.log(['geoloc', dataGeo, dg]);
    if ( position || dataGeo ) {
      for (var key in form.step) {
        if ( key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: dg, filled: true, position };
          //console.tron.log(['formsavecampo', form])
          getSaveStateForm(form);
        }
      }
    } else {
      for (var key in form.step) {
        if ( key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: '', filled: false, position: null };
          //console.tron.log(['formsavecampo', form])
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
  }
 
  render() {
    const { data_name, label, hint, default_value, newState} = this.props.data;
    const { saveStep, step } = this.props.form;
    //console.tron.log(['props', this.props]);
    // this.props.startControlArray();

    if (saveStep) {
      this.saveFormGeoloc({data_name, default_value});
    }
    return (
      <View style={styles.container}>
      <View>
          <View style={styles.cabecalho}>
            <Image source={require('../../assents/imgs/point.png')} style={styles.image} />
              <View style ={styles.texto_geo}>
                <Text style={styles.label}>{label}</Text>
              </View>
          </View>
        <View styles={styles.main}>
          <TouchableOpacity onPress={this.refresh} style={styles.button}>
            <Text style={styles.button_text}>Verificar localização</Text>
          </TouchableOpacity>
        </View>
        {
          this.state.error && (
            <View style={styles.input}>
                <Text style={styles.info_text}>Error: {this.state.error}</Text>
              </View>
          )
        }
        {
          this.state.view && (
            <View style={styles.info}>
                <View style={styles.input}>
                  <Text style={styles.info_text}>Latitude: {this.state.latitude}</Text>
                </View>
                <View style={styles.input}>
                  <Text style={styles.info_text}>Longitude: {this.state.longitude}</Text>
                </View>
                <View style={styles.input}>
                  <Text style={styles.info_text}>Altitute: {this.state.altitude} </Text>
                </View>
                <View style={styles.input}>
                  <Text style={styles.info_text}>Acurácia: {this.state.acuracia} </Text>
                </View>
              </View>
          )
        }
      </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  form: state.formState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FormActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GeoLocation);
