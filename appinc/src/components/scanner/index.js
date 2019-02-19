import React, { Component } from 'react';
import {View, Alert, Text, TouchableOpacity } from 'react-native';
import BarcodeScanner from 'react-native-barcode-scanner-google';
import styles from './styles';
 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';

class Scanner extends Component {

  state = {
    vetor: [], 
    data: '',
    showScanner: false,
    showButton: true,
    showButton2: false,
    showCode: false,
  }

  componentDidMount() {
    const { form, data } = this.props;

    for (var key in form.step) {
      if ( key === data.data_name) {        
        if(form.step[key].filled === true) {
          this.setState({ data: form.step[key].value });
        }
      }
    }
  }


  onPress = () => {
    const { vetor } = this.state;
  }
  
  saveFormScanner = dataScanner => {
    const { data } = this.state;
    const { form, getSaveStateForm, startControlArray } = this.props;

   // console.tron.log(form.step);
    if ( data ) {
      for (var key in form.step) {
        if ( key === dataScanner.data_name) {
          const form = {};
          form[dataScanner.data_name] = { key: dataScanner.data_name, value: data, filled: true };
         // console.tron.log(['formsavecampo', form])
          getSaveStateForm(form);
        }
      }
    } else {
      for (var key in form.step) {
        if ( key === dataScanner.data_name) {
          const form = {};
          form[dataScanner.data_name] = { key: dataScanner.data_name, value: '', filled: false };
         // console.tron.log(['formsavecampo', form])
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
  }

  render() {
    const { data_name, label, hint, default_value, newState} = this.props.data;
    const { showScanner, showButton, showButton2 } = this.state;
    const { saveStep, step } = this.props.form;
    //console.tron.log(['props', this.props]);
    // this.props.startControlArray();

    if (saveStep) {
      this.saveFormScanner({data_name, default_value});
    }
    
    return (
      <View style={{justifyContent: 'center', alignItem: 'center'}}>
      {
        showButton && (
          <TouchableOpacity onPress={() => this.setState({ showScanner: true, showButton: false})} style={styles.button}>
            <Text style={styles.button_text}>Escanear código</Text>
          </TouchableOpacity>
        )}

      {
          showScanner && (
            <View style={{alignItems: 'center', height: 250 }}>
              <BarcodeScanner
                  style={{ width: 330, height: 250, rigth: 50 }}
                  onBarcodeRead={({ data }) => {
                    this.setState({ data }); //Guarda o valor de todos os códigos lidos.
                    this.setState({ showScanner: false, showButton2: true, showCode: true });
                    
      }}
              />
           </View>
           
          )}
          {
            this.state.showCode && (
            <View style={styles.codecontainer}>
              <Text style={styles.code}> Código: {this.state.data} </Text>
            </View>
            )
          }

        {
        showButton2 && (
          <TouchableOpacity onPress={() => this.setState({ showScanner: true, showCode: false })} style={styles.button}>
            <Text style={styles.button_text}>Escanear código</Text>
          </TouchableOpacity>
        )}

      </View>  
    );
  }
}

const mapStateToProps = state => ({
  form: state.formState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FormActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);
