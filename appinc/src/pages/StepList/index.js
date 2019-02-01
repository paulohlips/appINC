import React, {Component} from 'react';
import {
  View,
  FlatList,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  Text,
  Alert
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
  }

  async componentWillMount() {
    //const form = this.props.navigation.getParam('inputSave', '');
    //console.tron.log(['tste', form2 ]);
    //const { setSaveContentForm } = this.props;
    //const valueForm = await AsyncStorage.getItem('@Formulario');
    //const formLocal = JSON.parse(valueForm);
    //await this.setState({ form: formLocal });
    //setSaveContentForm(formLocal);
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  openModal() {
    this.setState({ modalVisible: true });
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

  enviaForm = async () => {
    //this.setState({ showAlert: true });
    const { formulario } = this.props;
    const data = new FormData();
    data.append('form_name', this.state.form.form_name);

    for (var key in formulario.step) {
      data.append(formulario.step[key].key, formulario.step[key].value)
      //console.tron.log(['elemente forech', formulario.step[key]])
    }

    //console.tron.log(['elemente forech', data]);
    //console.log(['elemente forech', data]);

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
      .then(function (response) {
          AsyncStorage.setItem('@IDlaudo', response.data.number);
          Alert.alert('ID do laudo','O número do seu laudo é '+response.data.number);
          //console.tron.log(['elemente forech', response]);
      })
      .catch(function (response) {
          //handle error
          console.log(response);
          alert(response);
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

    console.tron.log(['form', form]);
    const { navigation } = this.props;
    //const { steps } = this.props;
    const { modalVisible, load, showAlert } = this.state;
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

            <TouchableOpacity style={styles.salvarbutton} onPress={() => this.saveForm()}>
              <Text style={styles.buttonTextsalvar}>
                Salvar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {
          load && (
            <Load
              loadVisible
              textLoad='Salvando...'
            />
          )
        }
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
