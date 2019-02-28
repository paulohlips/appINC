import React, { Component } from 'react';
import {
  View,
  Text,
  Picker,
  PickerIOS,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  TextInput,
  Animated,
  BackHandler,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import ModalSelector from 'react-native-modal-selector';
import SafeAreaView from 'react-native-safe-area-view';
import { Header, ModalCheck } from '../../globalComponents';
import styles from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as NewActions } from '../../store/ducks/new';
import { Creators as FormActios } from '../../store/ducks/form';
import Alert from '../../globalComponents/alert';

const imageCheck = require('../../assents/lottie/warning.json');

class New extends Component {
  static navigationOptions = {
    title: 'Nova Pericia',
  }

  state = {
    tipo: null,
    subtipo: null,
    ssubtipo: null,
    form: null,
    formQuerry: null,
    classe: null,
    incrementar: 2,
    contador: [1],
    showRef: false,
    fadeAnim: new Animated.Value(0),
    fadeAnim_l: new Animated.Value(0),
    fadeAnim_s: new Animated.Value(0),
    fadeAnim_ref: new Animated.Value(0),
    showButton: null,
    baseUrl: '',
    resposta: null,
    escolha: null,
    showAlert: false,
    viewModal: false,
    messageRequest: 'Sem conexão',
    viewError: false,
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  async componentWillMount() {
    const valueForm = await AsyncStorage.getItem('@Form');
    const formLocal = JSON.parse(valueForm);
    this.setState({ form: formLocal });
    const valueQuerry = await AsyncStorage.getItem('@Querry');
    const formQuerryLocal = JSON.parse(valueQuerry);
    this.setState({ formQuerry: formQuerryLocal });
    this.incrementarFuncao();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  onPressButton = () => {
    const { navigation, getReference, resetEditForm } = this.props;
    const { inputSave } = this.state;
    if (inputSave) {
      getReference(this.state.inputSave);
      resetEditForm();
      navigation.navigate('StepList', { inputSave: this.state.inputSave });
    } else {
      getReference('Laudo sem Nome');
      resetEditForm();
      navigation.navigate('StepList');
    }
  }

  reqUrl = (key) => {
    alert(key)
    const { getNewRequest } = this.props;
    getNewRequest(key);
    this.setState({ showRef: true });
    Animated.timing(                  // Animate over time
      this.state.fadeAnim_ref,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 2000,              // Make it take a while
      }
    ).start();
  }

  closeModal = () => {
    this.setState({ showRef: false });
    this.props.closeModalError();
  };

  render() {
    const {
      showRef,
      fadeAnim_ref,
      viewError,
      messageRequest,
    } = this.state;

    const data = [
      { key: 30, label: 'Veiculo', value: 30 },
      { key: 32, label: 'Incendio' },
      { key: 33, label: 'Genetica Forense' },
      { key: 6, label: 'Patrimonio' },
      { key: 1, label: 'Catalogo de componentes' }
  ];

    const { navigation, newState } = this.props;
    

    return (
      <View style={styles.container}>
        <Header
          title='Nova Pericia'
          showMenu
          openMenu={navigation.toggleDrawer}
        />
        <ScrollView>
          {
            viewError && (
              <View style={styles.message}>
                <Text style={styles.messageError}>Sem conexão</Text>
              </View>
            )
          }
          <View style={styles.forms1}>
            <View style={styles.title}>
              <View style={styles.ball}>
                <Text style={styles.numberType}>1</Text>
              </View>
              <Text style={styles.textType}> Perícia: </Text>
            </View>
            <ModalSelector
                    data={data}
                    initValue="Selecione a perícia"
                    onChange={(option)=>{ this.setState({baseUrl:option.key}); this.reqUrl(option.key)}} />
          </View>

          {
            showRef && (
              <Animated.View
                style={{ ...this.props.style, opacity: fadeAnim_ref }}>
                {this.props.children}
                <View style={styles.forms}>
                  <View style={styles.title}>
                    <View style={styles.ball}><Text style={styles.numberType}> 2 </Text></View>
                    <Text style={styles.textType}> Referência: </Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={72}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    onChangeText={inputSave => this.setState({ inputSave })}
                  />
                </View>
              </Animated.View>
            )
          }
          {
            newState.showButton && (
              <TouchableOpacity style={styles.button} onPress={() => this.onPressButton()}>
                <Text style={styles.buttonText}>
                  Continuar
              </Text>
              </TouchableOpacity>
            )
          }
          {
            newState.erro && (
              <ModalCheck
                message={messageRequest}
                viewModal
                failure
                sourceImage={imageCheck}
                onClose={this.closeModal}
              />
            )
          }
        </ScrollView>
      </View>

    );
  }
}

const mapStateToProps = state => ({
  newState: state.newState
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...NewActions,
  ...FormActios
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(New);
