import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
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
  AsyncStorage,
  Alert
} from 'react-native';
import LottieView from 'lottie-react-native';
import StepIndicator from 'react-native-step-indicator';
import Axios from 'axios';

import styles from './styles';

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
    currentPosition: 2,
    idRegistro: null,
    pinRegistro: null,
    inputSave1: null,
    inputSave2: null,
    id: null
  }

  async componentWillMount() {
    const idRegistro = await AsyncStorage.getItem('@IdRegistro');
    this.setState({ idRegistro: idRegistro });
    const pinRegistro = await AsyncStorage.getItem('@PinRegistro');
    this.setState({ pinRegistro: pinRegistro });
    const id = await AsyncStorage.getItem('@IdProv');
    this.setState({ id: id });
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

   salvarId = () => {
    const { id, idRegistro, pinRegistro, inputSave1, inputSave2 } = this.state;
    if (inputSave1 == inputSave2){
      Axios({
        method: 'post',
        url: 'http://35.231.239.168/api/pericia/usuario/geraSenha',
        data: { matricula: idRegistro, pin: pinRegistro, pass: inputSave2 },
      })
      .then((resp) => {
        if (resp.status === 200) {
          this.navigateToLogged();
        } else {
          Alert.alert(resp.data.mensagem);
        }
      }).catch(err => {
        Alert.alert('Erro de conexão');
      });
    } else {
      Alert.alert('Senhas diferentes');
    }
    AsyncStorage.setItem('@Id', id);
  }

  onPressAnimated = async () => {
    this.animation.play(30, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="rgba(45, 45, 45, 0.8)" />
        <View style={styles.mainContainer}>
        <Text style={styles.step}>03</Text>
          <Text style={styles.descript}>Escolha uma senha</Text>
            <View style={styles.forms}>
              <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Senha"
                  secureTextEntry={true}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  onChangeText={inputSave1 => this.setState({ inputSave1 })}
                  value={this.state.inputSave1}
            />
            <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Senha"
                  secureTextEntry={true}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  onChangeText={inputSave2 => this.setState({ inputSave2 })}
                  value={this.state.inputSave2}
            />

            <TouchableOpacity style={styles.testebutton} onPress={() => { this.salvarId(); }}>
              <Text style={styles.buttonText}>
                Cadastrar
               </Text>
             </TouchableOpacity>
           </View>
        </View>
        <HideWithKeyboard>
        <View style={styles.indicadorContainer}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={this.state.currentPosition}
            labels={labels}
            stepCount={3}
          />
        </View>
        </HideWithKeyboard>
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
