import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { ModalCheck } from '../../globalComponents';
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
import axios from 'axios';
import { responsividade } from '../../styles';

import styles from './styles';

const imageCheck = require('../../assents/lottie/warning.json');

class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    progress: new Animated.Value(0),
    btt: null,
    inputSave: null,
    password: null,
    nome: null,
    name: null,
    idUser: null,
    currentPosition: 0,
    viewModal: false,
    messageRequest: '',
  }

  async componentWillMount() {
    const id = await AsyncStorage.getItem('@Id');
    this.setState({ btt: id });
  }

  navigateToLogged = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        // Logged
        NavigationActions.navigate({ routeName: 'Logged' }),
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  navigateToSignUp = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        // Logged
        NavigationActions.navigate({ routeName: 'SignUp' }),
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  salvarIdProv = () => {
    AsyncStorage.setItem('@IdProv', this.state.inputSave);
  }

  confereCadastro = () => {
    const { password, inputSave, nome } = this.state;
    axios({
      method: 'post',
      url: 'http://35.198.17.69/api/pericia/usuario/login',
      data: { matricula: inputSave, pass: password },
    })
      .then((resp) => {
        if (resp.status === 200) {
          this.setState({ nome: resp.data.nome });
          AsyncStorage.setItem('@AppInc:nome', this.state.nome);
          this.navigateToLogged();
          AsyncStorage.setItem('@AppInc:matricula', inputSave);
        } else {
          this.setState({ viewModal: true, messageRequest: resp.data.mensagem });
        }
      }).catch(err => {
        this.setState({ viewModal: true });
      });
  }

  onPressAnimated = async () => {
    this.animation.play(30, 1000);
  }

  render() {
    const { btt, viewModal, messageRequest } = this.state;
    return (
      <ImageBackground source={require('../../assents/imgs/local_crime.jpg')} style={styles.backgroundImage} >

        <View style={styles.container}>

          <StatusBar backgroundColor="rgba(45, 45, 45, 0.8)" />

          <Text style={styles.title}>Bem-Vindo</Text>
          <Text style={styles.descript}>Por favor, digite suas credenciais</Text>
          <View style={styles.forms}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="ID"
              underlineColorAndroid="rgba(0,0,0,0)"
              onChangeText={inputSave => this.setState({ inputSave })}
              value={this.state.inputSave}
              defaultValue={btt}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Senha"
              underlineColorAndroid="rgba(0,0,0,0)"
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <TouchableOpacity style={styles.testebutton} onPress={() => { this.confereCadastro(); }}>
              <Text style={styles.buttonText}>
                Entrar
                  </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cadastrobutton} onPress={() => { this.navigateToSignUp(); this.salvarIdProv(); }}>
              <Text style={styles.buttonText}>
                Cadastrar
                  </Text>
            </TouchableOpacity>
          </View>
        </View>
        {
          viewModal && (
            <ModalCheck
              message={messageRequest}
              viewModal
              failure
              sourceImage={imageCheck}
            />
          )
        }
      </ImageBackground>
    );
  }
}



export default Login;

/*
 <Image style={styles.image} source={require('../../assents/imgs/policia-federal-logo.png')} />
*/
