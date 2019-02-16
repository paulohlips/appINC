import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { withNavigation } from 'react-navigation';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  Animated,
  Easing,
} from 'react-native';

import styles from './styles';

class ModalCheck extends Component {
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

  componentWillMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    }).start();
  }

  async componentWillReceiveProps() {
    if (this.state.progress > 0.99) {
      this.props.navigation.navigate('Login');
      //console.tron.log(['bar', this.state.progress]);
    }
  }


  render() {
    const { viewModal, onClose, sourceImage, success, failure, message } = this.props;
    //console.tron.log(this.state.progress);
    return (
      <Modal
        animationType="slide"
        transparent
        visible={viewModal}
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          {
            success && (
              <View style={styles.box}>
                <View style={styles.lottie}>
                  <LottieView source={sourceImage} progress={this.state.progress}/>
                </View>
                <Text style={styles.text}>Cadastro realizado com sucesso!</Text>
                <TouchableOpacity style={styles.ok} onPress={() => this.navigateToLogin()}>
                  <Text style={styles.okt}>
                    Ok!
                   </Text>
                 </TouchableOpacity>
              </View>
            )
          }
          {
            failure && (
              <View style={styles.box}>
                <View style={styles.lottie}>
                  <LottieView source={sourceImage} progress={this.state.progress}/>
                </View>
                <Text style={styles.texterro}>Algo deu errado!</Text>
                <Text style={styles.erro}>{message}</Text>
                <TouchableOpacity style={styles.oke} onPress={() => (onClose ? onClose() : this.navigateToLogin())}>
                  <Text style={styles.okterro}>
                    Ok!
                   </Text>
                 </TouchableOpacity>
              </View>
            )
          }
        </View>
      </Modal>
    );
  }
}

export default withNavigation(ModalCheck);
