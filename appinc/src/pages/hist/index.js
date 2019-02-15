import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, Modal, ScrollView, BackHandler } from 'react-native';
import { Header } from '../../globalComponents';
import { NavigationActions, withNavigation, StackActions } from 'react-navigation';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import { Creators as NewActions } from '../../store/ducks/new';

class Historico extends Component {

    state = {
        arrayEnviados: null,
        arrayRef: null,
        modalVisible: false,
        form: null,
        idUser: null,
    }
    async componentWillMount() {
        const arrayRef = await AsyncStorage.getItem('arrayRef');
        const id = await AsyncStorage.getItem('@AppInc:matricula');
        const array = JSON.parse(arrayRef);

        BackHandler.removeEventListener('hardwareBackPress', this.navigateToScreen);
       
        this.setState({ arrayRef: array, idUser: id });
        
        this.requestFroms();
        // console.tron.log(['arrayRef', JSON.parse(arrayRef)]);
        //console.tron.log(this.props);
    }

    requestFroms = () => {
        const idMatricula = this.state.idUser;
        
        axios({
          method: 'post',
          url: 'http://35.231.239.168/api/pericia/formulario/recebidos',
          data: {
            matricula: idMatricula,
          } 
        })
          .then((resp) => {
              const data = JSON.stringify(resp.data);
              console.tron.log('OOOI', data);
              this.setState({ arrayEnviados: resp.data });
              console.tron.log('OOOI', this.state.arrayEnviados);
            
          }).catch(err => {

          });
      }

    restoreForm = async name => {
        //console.tron.log(['props1', this.props]);
        const { navigation, restoreFormState, setForm } = this.props;
        const formAsync = await AsyncStorage.getItem(name);
        const form = JSON.parse(formAsync);
        //console.tron.log(['fomr', form]);
        await setForm(form.form);
        await restoreFormState(form);
        navigation.navigate('StepList');
        //console.tron.log(['props', this.props]);
        //this.setState({ modalVisible: true, form: formAsync });
    }

  renderOffline = item => {
    return (
        <TouchableOpacity style ={styles.box} onPress={() => this.restoreForm(item)}>
            <Text style={styles.status1}>{" Minha Perícia" + " - " + item }</Text>
                <View style = {styles.row}>
                    <Text style={styles.status1} > Status :</Text>
                    <Text style={styles.status}> Em andamento</Text>
                </View>
        </TouchableOpacity>
    );
  }

  renderEnviados = item => {
    return (
        <TouchableOpacity style ={styles.box} onPress={() => {}}>
            <Text style={styles.status1}>{" Minha Perícia" + " - " + item.matricula }</Text>
                <View style = {styles.row}>
                    <Text style={styles.status1}> Status :</Text>
                    <Text style={styles.statusEnviado}> Enviado  </Text>
                </View>
        </TouchableOpacity>
    );
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.navigateToScreen);
  }

  navigateToScreen = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        // Logged
        NavigationActions.navigate({ routeName: 'Logged' }),
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }


  render() {
    const { arrayRef, modalVisible, form, arrayEnviados } = this.state;
    const { navigation } = this.props;
    //console.tron.log(['arrayRefrender',arrayRef]);
    return (
      <View style={styles.container}>
        <Header
          showMenu
          showClear
          openMenu={navigation.toggleDrawer}
          title='Minhas Perícias'
        />
        <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {}}
            >
                <View style={styles.containerModal}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.setState({ modalVisible: false})}>
                            <Icon name="md-close" size={28} style={styles.iconClose} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View style={styles.box}>
                        {
                            form && (
                                <Text style={styles.text}>{form}</Text>
                            )
                        }

                        </View>
                    </ScrollView>
                </View>
            </Modal>
        <View style={styles.main}>
          <ScrollView>
            {
              arrayRef && (
                  arrayRef.map(item => this.renderOffline(item))
              )
            }
            {
                arrayEnviados && (
                    arrayEnviados.map(item => this.renderEnviados(item))
                ) 
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => ({
    form: state.formState,
});

const mapDispatchToProps = dispatch =>
bindActionCreators({ ...FormActions, ...NewActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Historico);
