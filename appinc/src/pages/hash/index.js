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
  Easing
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

  navigateToPassword = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        // Logged
        NavigationActions.navigate({ routeName: 'Password' }),
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  onPressAnimated = async () => {
    this.animation.play(30, 1000);
  }

  render() {
    return (
      <ImageBackground source={require('../../assents/imgs/local_crime.jpg')} style={styles.backgroundImage} >
        <View style={styles.container}>
        <Text style={styles.descript}>Por favor digite o código enviado pelo email</Text>
          <StatusBar backgroundColor="rgba(34, 34, 34, 0.75)" />

          <View style={styles.forms}>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite o código "
                underlineColorAndroid="rgba(0,0,0,0)"
            />

            <TouchableOpacity style={styles.testebutton} onPress={this.navigateToPassword}>
              <Text style={styles.buttonText}>
                Confirmar código
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