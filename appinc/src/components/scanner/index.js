import React, { Component } from 'react';
import {View, Alert, Text, TouchableOpacity } from 'react-native';
import BarcodeScanner from 'react-native-barcode-scanner-google';
import styles from './styles';
 
 
class Scanner extends Component {

  state = {
    vetor: [], 
    data: '',
    showScanner: false,
    showButton: true,
    showButton2: false
  }

  onPress = () => {
    const { vetor } = this.state;
  }

  render() {
    const { showScanner, showButton, showButton2 } = this.state;
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
            <View style={{width:330, height: 250, rigth:50}}>
              <BarcodeScanner
                  style={{width:330, height: 250, rigth:50}}
                  onBarcodeRead={({data}) => {
                    const { vetor } = this.state;
                    this.setState({ data }); //Guarda o valor de todos os códigos lidos.
                    this.setState({ showScanner: false, showButton2: true});
                    console.log(vetor);
      }}
              />
           </View>
           
          )}

            <Text style={styles.input}> Código:{this.state.data} </Text>
        {
        showButton2 && (
          <TouchableOpacity onPress={() => this.setState({ showScanner: true})} style={styles.button}>
            <Text style={styles.button_text}>Escanear código</Text>
          </TouchableOpacity>
        )}

      </View>  
    );
  }
}

export default Scanner  ;



