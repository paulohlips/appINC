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

   salvarId = async() => {
    const IdUser = await AsyncStorage.getItem('@IdProv');
    AsyncStorage.setItem('@Id',IdUser);
    console.tron.log('Vem chacualhando');
  }

  onPressAnimated = async () => {
    this.animation.play(30, 1000);
  }

  render() {
    return (
      <ImageBackground source={require('../../assents/imgs/local_crime.jpg')} style={styles.backgroundImage} >
        <View style={styles.container}>
        <Text style={styles.descript}>Por favor digite uma senha</Text>
          <StatusBar backgroundColor="rgba(34, 34, 34, 0.75)" />

          <View style={styles.forms}>
          <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Definir senha "
                underlineColorAndroid="rgba(0,0,0,0)"
            />
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Repetir senha "
                underlineColorAndroid="rgba(0,0,0,0)"
            />

            <TouchableOpacity style={styles.testebutton} onPress={ () => {this.navigateToLogin(); this.salvarId();}}>
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