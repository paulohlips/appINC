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

import styles from './styles';


class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    progress: new Animated.Value(0),
    bttEntrar: false,
    bttCadastrar: true,
    btt: null,
  }

  async componentWillMount() {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.getItem('@Id')
      .then( resp => {console.tron.log(['Teste', resp]); if(resp === null) {this.setState({ bttCadastrar: true, bttEntrar: false})}
    else { this.setState({ bttCadastrar: false, bttEntrar: true}) }}
      ).catch( erro => {console.tron.log('Erro');});
    } catch(err) {
      console.tron.log('nao funcionou');
    }
    
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

  onPressAnimated = async () => {
    this.animation.play(30, 1000);
  }

  render() {
    const { bttEntrar, bttCadastrar, btt } = this.state;
    return (
      <ImageBackground source={require('../../assents/imgs/local_crime.jpg')} style={styles.backgroundImage} >
        <View style={styles.container}>
          <StatusBar backgroundColor="rgba(34, 34, 34, 0.75)" />
          <Text style={styles.title}>Bem-Vindo</Text>
          <Text style={styles.descript}>Por favor digite seu ID</Text>
          <View style={styles.forms}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Digite seu ID"
              underlineColorAndroid="rgba(0,0,0,0)"
            />
            {
              bttEntrar && (
                <TouchableOpacity style={styles.testebutton} onPress={this.navigateToLogged}>
                  <Text style={styles.buttonText}>
                    Entrar
                  </Text>
                </TouchableOpacity>
              )
            }
            {
              bttCadastrar && (
                <TouchableOpacity style={styles.testebutton} onPress={this.navigateToSignUp}>
                  <Text style={styles.buttonText}>
                    Cadastrar
                  </Text>
                </TouchableOpacity>
              )
            }
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