import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal
} from 'react-native';

import styles from './styles';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';

onPress = () => {
  const { vetor } = this.state;
}
 
export default class Sketch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      showButton: true,
      showButton2: false
    };
  }


  render() {
    const { showScanner, showButton, showButton2 } = this.state;
    const { closeModalInfo, modalVisible, textInfo } = this.props;
  
    return (
      <View style={{justifyContent: 'center', alignItem: 'center'}}>
      {
        showButton && (
          <TouchableOpacity onPress={() => this.setState({ showScanner: true, showButton: false})} style={styles.button}>
            <Text style={styles.button_text}>Fazer Croqui</Text>
          </TouchableOpacity>
        )}
{
          showScanner && (     
      <View style={{width:330, height: 250, rigth:50}}>
               
             <Modal
              animationType="slide"
              transparent={false}
              visible={showScanner}
              onRequestClose={() => {}}
            >
              <View style={styles.container}>
              <RNSketchCanvas
            containerStyle={{ backgroundColor: 'transparent', height: 50 ,flex: 1 }}
            canvasStyle={{ backgroundColor: 'transparent',  flex: 1 }}
            defaultStrokeIndex={0}
            defaultStrokeWidth={5}
            closeComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Fechar</Text></View>}
            undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Desfazer</Text></View>}
            clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Limpar</Text></View>}
            eraseComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Apagar</Text></View>}
            strokeComponent={color => (
              <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
            )}
            strokeSelectedComponent={(color, index, changed) => {
              return (
                <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
              )
            }}
            strokeWidthComponent={(w) => {
              return (<View style={styles.strokeWidthButton}>
                <View  style={{
                  backgroundColor: 'white', marginHorizontal: 2.5,
                  width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                }} />
              </View>
            )}}
            saveComponent={<View style={styles.functionButton}><Text onPress={() => this.setState({ showScanner: false, showButton: true }) } style={{color: 'white'}}>Salvar</Text></View>}
            
            savePreference={() => {
              return {
                folder: 'Croqui',
                filename: String(Math.ceil(Math.random() * 100000000)),
                transparent: false,
                imageType: 'png'
              }

            }}
          />
              </View>
           </Modal>
        
       </View>
       
      )}
         </View>  
    );
  }
}
 







