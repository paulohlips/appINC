
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
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
    load: null,
  }

  componentDidMount() {
    const { form, data } = this.props;

    for (var key in form.step) {
      if (key === data.data_name) {
        if (form.step[key].filled === true) {
          if (form.step[key].position !== null) {
            const value = JSON.stringify(form.step[key].value)
            this.setState({
              position: form.step[key].position,
              latitude: form.step[key].position.coords.latitude,
              longitude: form.step[key].position.coords.longitude,
              acuracia: form.step[key].position.coords.accuracy,
              altitude: form.step[key].position.coords.altitude,
              error: null,
              view: true,
            });
          } else {
            this.setState({ error: form.step[key].value });
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
      view: null,
      load: true,
    });
    navigator.geolocation.getCurrentPosition(
      // acessando os campos retornados na mensagem JSON e atribuindo a variavel de estado correspondente
      (position) => {

        AsyncStorage.setItem('@Geolocalizacao', (JSON.stringify(position)));

        this.setState({
          dataGeo: position,
          position: position,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          acuracia: position.coords.accuracy,
          altitude: position.coords.altitude,
          error: null,
          view: true,
          load: false,
        });
      },
      (error) => this.setState({
        error: error.message,
        dataGeo: 'GPS indísponivel',
        view: null,
        load: false,
      }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  saveFormGeoloc = data => {
    const { position, dataGeo, error } = this.state;
    const { form, getSaveStateForm, startControlArray } = this.props;
    let dg;
    if (error) {
      dg = dataGeo;
    } else {
      dg = JSON.stringify(dataGeo.coords);
    }


    if (position || dataGeo) {
      for (var key in form.step) {
        if (key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: dg, filled: true, position };

          getSaveStateForm(form);
        }
      }
    } else {
      for (var key in form.step) {
        if (key === data.data_name && data.data_name === false) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: '', filled: false, position: null };
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
  }

  render() {
    const {
      data_name,
      label,
      hint,
      default_value,
      newState
    } = this.props.data;
    const {
      saveStep,
      step } = this.props.form;
    const {
      load,
      error,
      view,
    } = this.state;

    if (saveStep) {
      this.saveFormGeoloc({ data_name, default_value });
    }
    return (
      <View style={styles.container}>
      <View>
      {
          error && (
            <View style={styles.errov}>
                <Text style={styles.erro}>Local não encontrado. Tente ir para um ambiente mais aberto</Text>
              </View>
          )
        }

          <View style={styles.cabecalho}>
            <Image source={require('../../assents/imgs/point.png')} style={styles.image} />
            <View style={styles.texto_geo}>
              <Text style={styles.label}>{label}</Text>
            </View>
          </View>
        <View styles={styles.main}>
          <TouchableOpacity onPress={this.refresh} style={styles.button}>
            {
              load 
                ? <ActivityIndicator size="small" color="#FFF" />
                : <Text style={styles.button_text}>Verificar localização</Text>
            }            
          </TouchableOpacity>
        </View>

        {
          view && (
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
