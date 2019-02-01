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

const labels = ["ID","Captcha","Senha"];
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
    currentPosition: 2,
    id: null,
  }

  navigateToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        // Logged
        NavigationActions.navigate({ routeName: 'Login' }),
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

   salvarId = async () => {
     try{
      const idProv = await AsyncStorage.getItem('@IdProv');
      console.tron.log(['Teste',idProv]);
     }
     catch(err){{console.tron.log('Erro 2');}}
 
    AsyncStorage.setItem('@Id','Paolo');
    console.tron.log('Vem chacoalhando');
  }

  onPressAnimated = async () => {
    this.animation.play(30, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="rgba(45, 45, 45, 0.8)" />
        <View style={styles.mainContainer}>
          <Text style={styles.descript}>Por favor digite o código de verificação</Text>
            <View style={styles.forms}>
              <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Defina senha "
                  underlineColorAndroid="rgba(0,0,0,0)"
            />
            <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Confirmar senha"
                  underlineColorAndroid="rgba(0,0,0,0)"
            />

            <TouchableOpacity style={styles.testebutton} onPress={() => {this.navigateToLogin(); this.salvarId();}}>
              <Text style={styles.buttonText}>
                Cadastrar
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