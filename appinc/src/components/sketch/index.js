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
import Icon from 'react-native-vector-icons/MaterialIcons';
import { responsividade } from '../../styles';

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
      fundo: '',
    };
  }


  render() {
    const { showScanner, showButton } = this.state;
    const  { largura_tela } = responsividade;
    return (
      <View style={{justifyContent: 'center', alignItem: 'center'}}>
      {
          <TouchableOpacity onPress={() => this.setState({ showScanner: true, showButton: false })} style={styles.button}>
        showButton && (
          <View style={styles.square}><Icon name="create" size={largura_tela< 430 ? 28 : 40} color="black" style={styles.icon} /></View>
          <View style={styles.parale}><Text style={styles.button_text}>FAZER CROQUI</Text></View>    
          </TouchableOpacity>
        )}

              <Modal
                animationType="slide"
                transparent={false}
                visible={showScanner}
                onRequestClose={() => { }}
              >
                <View style={styles.container}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <RNSketchCanvas
                      containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                      canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
                      defaultStrokeIndex={0}
                      defaultStrokeWidth={5}
                      changeImg={<View style={styles.functionButton}>
                        <Picker
                          selectedValue={this.state.fundo}
                          style={{ height: 50, width: 50 }}
                          onValueChange={(value => this.setState({ fundo: value }))}>

                          <Picker.Item label="Croqui Livre" value='croqui.png' />
                          <Picker.Item label="Vítima Frente" value='img.jpg' />
                          <Picker.Item label="Vítima Costas" value='corpocostas.png' />
                          <Picker.Item label="Corpo Lateral" value='lateralesquerda.PNG' />
                          <Picker.Item label="Rosto Lateral E" value='rostodireito.PNG' />
                          <Picker.Item label="Rosto Lateral D" value='rostoesquerdo.png' />
                          <Picker.Item label="Nuca" value='nuca.png' />
                          <Picker.Item label="Mão Interna" value='maointerna.PNG' />
                          <Picker.Item label="Mão Externa" value='mao.PNG' />

                        </Picker>
                      </View>}
                      closeComponent={<View style={styles.functionButton}><Text onPress={() => this.setState({ showScanner: false, showButton: true })} style={{ color: 'red', fontWeight: 'bold' }}>Fechar</Text></View>}
                      saveComponent={<View style={styles.functionButton}><Text style={{ color: 'green', fontWeight: 'bold' }}>Salvar</Text></View>}
                      undoComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Desfazer</Text></View>}
                      clearComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Limpar</Text></View>}
                      eraseComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Apagar</Text></View>}
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
                          <View style={{
                            backgroundColor: 'white', marginHorizontal: 2.5,
                            width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                          }} />
                        </View>
                        )
                      }}
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
                </View>

              </Modal>

            </View>

          )}
      </View>
    );
  }
}
