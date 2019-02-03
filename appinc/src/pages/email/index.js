import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Animated,
  Easing,
  AsyncStorage
} from 'react-native';
import LottieView from 'lottie-react-native';
import StepIndicator from 'react-native-step-indicator';

import styles from './styles';
import { red } from 'ansi-colors';
import Axios from 'axios';

const labels = ["ID","PIN","Senha"];
const customStyles = {
  stepIndicatorSize: 45,
  currentStepIndicatorSize:45,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: 'rgb(225, 200, 133)',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: 'rgb(225, 200, 133)',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: 'rgb(225, 200, 133)',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: 'rgb(225, 200, 133)',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: 'rgb(225, 200, 133)',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: 'rgb(225, 200, 133)',
}


class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    progress: new Animated.Value(0),
    inputSave: null
  }

  navigateToHash = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        // Logged
        NavigationActions.navigate({ routeName: 'Hash' }),
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  confereID = () => {
    const { inputSave } = this.state;
    //console.tron.log('Teste ID', inputSave);
    Axios({
      method: 'post',
      url: 'http://35.231.239.168/api/pericia/usuario/cadastro',
      data: { matricula: inputSave },
    });
    AsyncStorage.setItem('@IdRegistro', inputSave);
  }

  onPressAnimated = async () => {
    this.animation.play(30, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="rgba(45, 45, 45, 0.8)" />
        <View style={styles.mainContainer}>
          <Text style={styles.descript}>Por favor digite seu ID</Text>
            <View style={styles.forms}>
              <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Digite seu ID "
                  underlineColorAndroid="rgba(0,0,0,0)"
                  onChangeText={inputSave => this.setState({ inputSave })}
                  value={this.state.inputSave}
              />

              <TouchableOpacity style={styles.testebutton} onPress={() => { this.confereID(); this.navigateToHash(); }}>
                <Text style={styles.buttonText}>
                  Continuar
                </Text>
              </TouchableOpacity>
           </View>
        </View>
        <View style={styles.indicadorContainer}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={this.state.currentPosition}
            labels={labels}
            stepCount={3}
          />
        </View>
      </View>
    );
  }
  onPageChange(position){
    this.setState({currentPosition: position});
  }
}


export default Login;

/*
 <Image style={styles.image} source={require('../../assents/imgs/policia-federal-logo.png')} />
*/
