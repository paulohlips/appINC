import React, { Component } from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
//import BarcodeScanner from 'react-native-barcode-scanner-google';
import styles from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';

import QRCodeScanner from 'react-native-qrcode-scanner';

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
      if (key === data.data_name) {
        if (form.step[key].filled === true) {
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

    if (data) {
      for (var key in form.step) {
        if (key === dataScanner.data_name) {
          const form = {};
          form[dataScanner.data_name] = { key: dataScanner.data_name, value: data, filled: true };
          getSaveStateForm(form);
        }
      }
    } else {
      for (var key in form.step) {
        if (key === dataScanner.data_name) {
          const form = {};
          form[dataScanner.data_name] = { key: dataScanner.data_name, value: '', filled: false };
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
  }

  onSuccess(e) {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  }

  render() {
    const { data_name, label, hint, default_value, newState } = this.props.data;
    const { showScanner, showButton, showButton2 } = this.state;
    const { saveStep, step } = this.props.form;

    if (saveStep) {
      this.saveFormScanner({ data_name, default_value });
    }

    return (
      <View style={{ justifyContent: 'center', alignItem: 'center' }}>
        {
          showButton && (
            <TouchableOpacity onPress={() => this.setState({ showScanner: true, showButton: false })} style={styles.button}>
              <Text style={styles.button_text}>Escanear código</Text>
            </TouchableOpacity>
          )}

        {
          showScanner && (
            <View style={{ alignItems: 'center', height: 250 }}>
              <QRCodeScanner
                onRead={this.onSuccess.bind(this)}
                topContent={
                  <Text style={styles.centerText}>
                    Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
                  </Text>
                }
                bottomContent={
                <TouchableOpacity style={styles.buttonTouchable}>
                   <Text style={styles.buttonText}>OK. Got it!</Text>
                </TouchableOpacity>
                }
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
