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
import axios from 'axios';

import styles from './styles';

class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    progress: new Animated.Value(0),
    btt: null,
    inputSave: null,
    password: null,
    idUser: null,
    currentPosition: 0
  }

  async componentWillMount() {
    try {
      //await AsyncStorage.clear();
      const id = await AsyncStorage.getItem('@Id');
      console.tron.log(['Teste', id]);
    } catch (err) {
      console.tron.log('nao funcionou');
    }
    this.setState({ btt: id });
    console.tron.log(['Teste btt', this.state.btt]);
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
    console.tron.log(this.state.inputSave);
    AsyncStorage.setItem('@IdProv',this.state.inputSave);
  }

  confereCadastro = () => {
    const { password, inputSave } = this.state;
    axios({
      method: 'post',
      url: 'http://35.231.239.168/api/pericia/usuario/login',
      data: { matricula: inputSave, pass: password },
      //if(response.status == 'false'){
      //  alert('Deu erro');
      //}
    });
  }

  onPressAnimated = async () => {
    this.animation.play(30, 1000);
  }

  render() {
    const { btt } = this.state;
    return (
      <ImageBackground source={require('../../assents/imgs/local_crime.jpg')} style={styles.backgroundImage} >

        <View style={styles.container}>

          <StatusBar backgroundColor="rgba(45, 45, 45, 0.8)" />

          <Text style={styles.title}>Bem-Vindo</Text>
          <Text style={styles.descript}>Por favor digite suas credenciais</Text>
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
                <TouchableOpacity style={styles.testebutton} onPress={() => { this.confereCadastro(); this.navigateToLogged(); }}>
                  <Text style={styles.buttonText}>
                    Entrar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.testebutton} onPress={() => { this.navigateToSignUp(); this.salvarIdProv(); }}>
                  <Text style={styles.buttonText}>
                    Cadastrar
                  </Text>
                </TouchableOpacity>
           </View>
        </View>
       </ImageBackground>
    );
  }
}



export default Login;

/*
 <Image style={styles.image} source={require('../../assents/imgs/policia-federal-logo.png')} />
*/
