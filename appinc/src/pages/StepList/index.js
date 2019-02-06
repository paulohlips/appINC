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

  }

  cancel() {
    this.props.navigation.goBack();
  }

  saveForm = () => {
    const { reference, saveForm, setSaveContentForm, form } = this.props;
    //console.tron.log(['saveformstep', reference]);
    saveForm(reference);
  }

  resetAsync = () => {
    AsyncStorage.clear();
  }

  errorMessage = () => {
    this.setState({ viewError: true });
  }

  enviaForm = async () => {
    this.setState({ load: true });
    //console.tron.log('entrei')
    const { formulario } = this.props;
    const data = new FormData();
    data.append('form_name', formulario.form.form_name);

    for (var key in formulario.step) {
      data.append(formulario.step[key].key, formulario.step[key].value)
      //console.tron.log(['elemente forech', formulario.step[key]])
    }

    axios({
      method: 'post',
      url: 'http://35.231.239.168/api/pericia/formulario/envio',
      data: data,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }}
      })
      .then(response => {
          this.setState({ viewError: false, load: false });
          console.tron.log(['errop', response]);
          AsyncStorage.setItem('@IDlaudo', response.data.number);
          const resp = JSON.stringify(response);
          Alert.alert('ID do laudo','O número do seu laudo é ' + response.data.number);
          console.tron.log(['errop', response]);

          //console.tron.log(['elemente forech', response]);
      })
      .catch(response => {
          this.setState({ viewError: false, load: false });
          this.errorMessage();
          console.tron.log(['error', response]);
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
    const { viewError, load } = this.state;
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
              <Text style={styles.messageError}>Sem conexão</Text>
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
            { load ?
              <ActivityIndicator size={35} color='#FFF' />
              : <Text style={styles.buttonText}>
                  Enviar
                </Text>
          }


            </TouchableOpacity>

            <TouchableOpacity style={styles.salvarbutton} onPress={() => this.saveForm()}>
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
