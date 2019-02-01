import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  Picker
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
      showButton2: false,
      fundo: '',
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
            changeImg={<View style={styles.functionButton}>
            <Picker
              selectedValue={this.state.fundo}
              style={{height: 50, width: 100}}
              onValueChange={(value => this.setState({ fundo: value }) )}>

              <Picker.Item label="Croqui" value= 'croqui.png' />                
              <Picker.Item label="Vítima" value='img.jpg' />
              <Picker.Item label="Bodybuilder" value='img2.png' />

            </Picker>
            </View>}
            closeComponent={<View style={styles.functionButton}><Text onPress={() => this.setState({ showScanner: false, showButton: true }) } style={{color: 'red', fontWeight: 'bold'}}>Fechar</Text></View>}
            saveComponent={<View style={styles.functionButton}><Text  style={{color: 'green', fontWeight: 'bold'}}>Salvar</Text></View>}

            undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Desfazer</Text></View>}
            clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Limpar</Text></View>}
            eraseComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Apagar</Text></View>}
           
            strokeWidthComponent={(w) => {
              return (<View style={styles.strokeWidthButton}>
                <View  style={{
                  backgroundColor: 'white', marginHorizontal: 2.5,
                  width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                }} />
              </View>
            )}}

            localSourceImage={
              {
                filename: this.state.fundo,  
                directory: 'android/app/src/main/res/drawable',
                mode: 'AspectFill'
              }
            }
            
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
 







