import React, {Component} from 'react';
import {
  View,
  FlatList,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Animated,
  BackHandler
} from 'react-native';
import styles from './styles';
import StepBox from './components/StepBox';
import { Load } from '../../components';
import { Header } from '../../globalComponents';
import { connect } from 'react-redux';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { Creators as FormAction } from '../../store/ducks/form';

class StepList extends Component {
  state ={
    modalVisible: false,
    load: false,
    form: '',
    teste: 10,
    showAlert: false,
    formRedux: true,
    viewError: false,
    matriculaAsync: '',
    saved: false,
    error: false,
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.saveForm);
  }

  cancel() {
    this.props.navigation.goBack();
  }

  saved() {
    this.setState({ saved: true })
    let that = this;
    setTimeout(function(){that.setState( { saved: false }); }, 4000);

  }

  saveForm = () => {
    const { reference, saveForm, setSaveContentForm, form } = this.props;
    //console.tron.log(['saveformstep', reference]);
    saveForm(reference);
    this.saved(); 
  }

  resetAsync = () => {
    AsyncStorage.clear();
  }

  errorMessage = () => {
    this.setState({ viewError: true });
    let that = this;
    setTimeout(function(){that.setState({viewError: false})}, 4000);
  }

  error = () => {
    this.setState({ error: true });
    let that = this;
    setTimeout(function(){that.setState({error: false})}, 4000);
  }


  enviaForm = async () => {
    const { matriculaAsync } = this.state;

    const matriculaProv = await AsyncStorage.getItem('@AppInc:matricula');
    const matricula = JSON.stringify(matriculaProv);


    //console.tron.log(["MATRICULAASYNC", matricula]);

    //this.setState({ load: true });
    //console.tron.log('entrei')
    const { formulario, sendForm } = this.props;
    const data = new FormData();
    data.append('form_name', formulario.form.form_name);

    for (var key in formulario.step) {
      data.append(formulario.step[key].key, formulario.step[key].value)
      //console.tron.log(['elemente forech', formulario.step[key]])
    }

    this.setState({ matriculaAsync: matricula });

    //console.tron.log(["MATRICULA", matriculaAsync]);

    axios({
      method: 'post',
      url: 'http://35.231.239.168/api/pericia/formulario/envio',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'matricula' : matricula,
        
      }})
      .then(function (response) {
          AsyncStorage.setItem('@IDlaudo', response.data.number);
          Alert.alert('ID do laudo','O número do seu laudo é '+ response.data.number);
         // sendForm();
          //console.tron.log(['elemente forech', response]);
      })
      .catch(error => { 
       this.errorMessage();
      });
  }

  render() {
    //console.tron.log(this.props);
    const { formRedux } = this.state;
    const form = this.props.form;
    if (formRedux) {
      this.props.setSaveContentForm(form);
      this.setState({ formRedux: false });
    }

    //console.tron.log(['form', form]);
    const { navigation } = this.props;
    //const { steps } = this.props;
    const { viewError, load , saved } = this.state;
    //console.tron.log('FORMEEE',form);
    //const { steps, form_name } = form;

    return (
      <View style={styles.container}>
        <Header
          title={form.area}
          showArrow
          showInfo
          info={form.info_form}
          goBack={this.props.navigation.goBack}
        />
        {
          viewError && (
            <View style={styles.message}>
              <Text style={styles.messageError}>Sem conexão!</Text>
            </View>
          )
        }

{
          saved && (
            <View style={styles.saved }>
              <Text style={styles.messagesaved}>Salvo!</Text>
            </View>
          )
        }
        <ScrollView>
          <FlatList
            data={form.steps}
            renderItem={item => <StepBox steps={item} form={form} />}
          />
          <View style={styles.container}>
        
            <TouchableOpacity style={styles.enviarbutton} onPress={() => this.enviaForm()}>

              <Text style={styles.buttonText}>
                  Enviar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.salvarbutton} onPress={() => this.saveForm() /*this.saved();*/ }>
              <Text style={styles.buttonTextsalvar}>
                Salvar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  form: state.newState.data,
  reference: state.newState.reference,
  formulario: state.formState,
});

const mapDispatchToProps = dispatch => bindActionCreators(FormAction, dispatch);

StepList.navigationOptions = {
  title: 'Perícia',
};

export default connect(mapStateToProps, mapDispatchToProps)(StepList);
