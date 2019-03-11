import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import axios from 'axios';
import { Header } from '../../globalComponents';
import { Sketch } from '../../components';
import { responsividade } from '../../styles';

import { NavigationActions, withNavigation } from 'react-navigation';

const dias = 23;
class Main extends Component {

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }


  static navigationOptions = {
    header: null,
  }

  state = {
    nome: '',
  }


  openDrawer = () => {
    const { drawerStatus } = this.state;

    if (drawerStatus === true) {
    }
  }

  requestFroms = () => {
    axios.get('http://35.198.17.69/api/pericia/formularios/4')
      .then((resp) => {
        AsyncStorage.setItem('@Form', JSON.stringify(resp.data));
      }).catch(err => {
      });
  }

  requestQuerry = () => {
    axios.get('http://35.243.140.44/api/query')
      .then((resp) => {
        AsyncStorage.setItem('@Querry', JSON.stringify(resp.data));
      }).catch(err => {
      });
  }

  state = {
    drawerStatus: null,
  }

  async componentWillMount() {
    this.requestFroms();
    this.requestQuerry();
    const arrayRef = await AsyncStorage.getItem('teste2');
    const name = await AsyncStorage.getItem('@AppInc:nome');
    this.setState({
      nome: name
    });
  }

  componentDidMount() {

  }

  renderSketch = () => { };


  render() {
    const { navigation } = this.props;
    const { nome } = this.state
    const name = navigation.getParam('nome', 'Nome não cadastrado');
    const  { largura_tela } = responsividade;

    return (
      <View style={styles.container}>
        <Header
          showMenu
          showExit
          openMenu={navigation.toggleDrawer}
          title='Inicial'
        />

        <View style={styles.bodyS}>
          <View style={styles.tokenView}>
            <Text style={styles.token}>Token válido por </Text>
            <Text style={styles.tokenD}>{dias}</Text>
            <Text style={styles.token}> dias</Text>
          </View>

          <View style={styles.info}>
            <View style={styles.profile}>
              <Image source={require('../../assents/imgs/avatar.png')} style={styles.ImageStyle} />
            </View>
            <View style={styles.name_view}>
              <Text style={styles.name}>{nome}</Text>
            </View>
          </View>
            <View style={styles.buttons_view}>
              <TouchableOpacity onPress={this.navigateToScreen('NewMenu')}>
                <View style={styles.button}>
                  <Text style={styles.button_text}> NOVA PERÍCIA</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.navigateToScreen('Hist')}>
                <View style={styles.button}>
                  <Text style={styles.button_text}>MINHAS PERÍCIAS</Text>
                </View>
              </TouchableOpacity>
            </View>          
        </View>
      </View>
    );
  }
}

export default Main;