import React, { Component } from 'react';
import {View, Alert, Text } from 'react-native';
import BarcodeScanner from 'react-native-barcode-scanner-google';
import styles from './styles';
 
 
class Scanner extends Component {

  state = {
    vetor: [], 
    data: '',
  }

  onPress = () => {
    const { vetor } = this.state;
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItem: 'center'}}>
          <BarcodeScanner
              style={{width:330, height: 250, rigth:50}}
              onBarcodeRead={({data}) => {
                const { vetor } = this.state;
                Alert.alert(`Código'${data}' lido com sucesso.`);
                this.setState({ data }); //Guarda o valor de todos os códigos lidos.
                console.log(vetor);
              }}
          />
            <Text style={styles.input}> Código:{this.state.data} </Text>
      </View>  
   
    );
  }
}

export default Scanner  ;



