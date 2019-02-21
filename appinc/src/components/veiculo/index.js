import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage, Image, ScrollView, Picker, ActivityIndicator } from 'react-native';
import styles from './styles';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';

class Veiculos extends Component {

  state = {
    dadosVeiculo: '',
    dadosFipe: '',
    urlFipe: '',
    placa: '',
    marcas: null,
    marcaAtual: '',
    dadosMarcas: '',
    viewDenatran: false,
    viewFipe: false,
    dadosModelos: '',
    modelos: '',
    renderPickerModelos: false,
    renderPickerAno: false,
    renderPicker: false,
    ano: '',
    consulta: true,
    loading: false,
    erroconsulta: false,
    naoexiste: false,
    tipo: '',
    erroFipeAPI: false,

    dadosEnvio: {
      id: '',
      placa: '',
      marca: '',
      modelo: '',
      procedencia: '',
      ano_fab: '',
      ano_mod: '',
      combustivel: '',
      chassi: '',
      numero_motor: '',
      etiquetas: '',
      referencia: '',
      preco: '',
      veiculo: '',
    }
  }

  async componentWillMount() {
    const { form, data } = this.props;

    for (let key in form.step) {
      if (key === data.data_name) {
        if (form.step[key].filled === true) {
          await this.setState({
            dadosVeiculo: form.step[key].dadosVeiculo,
            dadosFipe: form.step[key].dadosFipe,
            viewDenatran: true,
            viewFipe: true,
          });
        }
      }
    }
  }

  loading() {
    this.setState({ consulta: false });
    this.setState({ loading: true });
  }

  consultaPlaca = async () => {
    this.setState({
      consulta: false,
      loading: true,
      erroconsulta: false,
      naoexiste: false,
    });
    axios.get(`http://35.231.239.168/api/pericia/denatran/${  this.state.placa}`)
      .then((resp) => {
        if (resp.data.placa !== null) {
          const dadossinesp = resp.data;
          this.getDadosPlaca(resp.data);
          this.setState({ consulta: true, loading: false, viewDenatran: true });
        }        else {
          this.setState({ naoexiste: true, loading: false, consulta: true, viewDenatran: false });
        }
      }).catch(err => {
        this.setState({ erroconsulta: true, loading: false, consulta: true, viewDenatran: false });
      });
  }

  async getDadosPlaca(data) {
    this.setState({ dadosVeiculo: data });
  }

  consultaFipe = async () => {
    const urlFipe = `http://fipeapi.appspot.com/api/1/${  this.state.tipo  }/veiculo/${  this.state.marca  }/${  this.state.modelo  }/${  this.state.anos  }.json`;
    axios.get(urlFipe)
      .then(async resp => {
        if (resp.status === 200) {
          const dadosPuro = resp.data;
          await this.setState({ erroFipeAPI: false, dadosFipe: dadosPuro, viewFipe: true, });
        } else if (resp.status === 0) {
          this.setState({ erroFipeAPI: true });
        }
      }).catch(err => {
        this.setState({ erroFipeAPI: true });
      });
  }

  consultaMarcas = (value) => {
    this.setState({ tipo: value });
    axios.get(`http://fipeapi.appspot.com/api/1/${  value  }/marcas.json`)
      .then((resp) => {
        if (resp.status === 200) {
          this.getMarcas(resp.data);
          this.setState({ erroFipeAPI: false });
        } else if (resp.state === 0) {
          this.setState({ erroFipeAPI: true });
        }
      }).catch(err => {
        this.setState({ erroFipeAPI: true });
      });
  }

  getMarcas = async data => {
    await this.setState({
      dadosMarcas: data,
      renderPicker: true,
    });
  }

  pegaModelos = (value) => {
    this.setState({ marca: value });
    axios.get(`http://fipeapi.appspot.com/api/1/${  this.state.tipo  }/veiculos/${  value  }.json`)
      .then((resp) => {
        if (resp.status === 200) {
          this.getModelos(resp.data);
          this.setState({ erroFipeAPI: false });
        }
      }).catch(err => {
        //this.setState({ erroFipeAPI: true })
      });
  }

  getModelos = async data => {
    await this.setState({
      dadosModelos: data,
      renderPickerModelos: true,
    });
  }

  pegaAno = value => {
    this.setState({ modelo: value });
    axios.get(`http://fipeapi.appspot.com/api/1/${  this.state.tipo  }/veiculo/${  this.state.marca  }/${  value  }.json`)
      .then((resp) => {
        if (resp.status === 200) {
          this.getAno(resp.data);
          this.setState({ erroFipeAPI: false });
        }
      }).catch(err => {
        //this.setState({ erroFipeAPI: true })
      });
  }

  getAno = async data => {
    this.setState({
      dadosAno: data,
      renderPickerAno: true,
    });
  }

  saveFormVeiculo = data => {
    const { dadosVeiculo, dadosFipe, dadosEnvio } = this.state;
    const { form, getSaveStateForm, startControlArray } = this.props;
    let dados = dadosEnvio;

    console.tron.log(dadosFipe);
    Object.keys(dados).map(key => {
      if (dadosVeiculo) {
        Object.keys(dadosVeiculo).map(key1 => {
          if (key === key1) {
            dados[key] = dadosVeiculo[key1];
          }
        });
      }
      if (dadosFipe) {
        Object.keys(dadosFipe).map(key2 => {
          if (key === key2) {
            dados[key] = dadosFipe[key2];
          }
        });
      }      
    });

    const dv = JSON.stringify(dados);

    if (dadosVeiculo || dadosFipe) {
      for (var key in form.step) {
        if (key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: dv, dadosVeiculo, dadosFipe, filled: true };
          getSaveStateForm(form);
        }
      }
    } else {
      for (var key in form.step) {
        if (key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: dadosEnvio, dadosVeiculo: null, dadosFipe: null, filled: false };
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
  }

  render() {
    const { data_name, label, hint, default_value, newState } = this.props.data;
    const { saveStep } = this.props.form;
    const {
      dadosVeiculo,
      dadosModelos,
      dadosAno,
      dadosFipe,
      dadosMarcas,
      renderPicker,
      renderPickerModelos,
      erroFipeAPI,
      renderPickerAno
    } = this.state;

    if (saveStep) {
      this.saveFormVeiculo({ data_name, default_value });
    }
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.hint_title}>
            <View style={styles.miniball}>
              <Text style={styles.numberType}>1</Text>
            </View>
            <View style={styles.hintview}>
              <Text style={styles.hint}>Preencha os campos abaixo para consultar a tabela FIPE</Text>
            </View>

          </View>
          {
            erroFipeAPI && (
              <View style={styles.errov}>
                <Text style={styles.erro}>API FIPE não responde. Tente mais tarde.</Text>
              </View>
            )
          }
          <View style={styles.Picker}>
            <Picker
              style={styles.estiloPicker}
              onValueChange={(tipo => this.setState({ tipo }), this.consultaMarcas)}
              selectedValue={this.state.tipo}
              collapsable
            >
              <Picker.Item label='Tipo do veículo' />
              <Picker.Item label='Carro' value='carro' />
              <Picker.Item label='Moto' value='motos' />
              <Picker.Item label='Caminhão ou Microônibus' value='caminhao' />
            </Picker>
          </View>
          {
            renderPicker && (
              <View style={styles.Picker}>
                <Picker
                  style={styles.estiloPicker}
                  onValueChange={(marca => this.setState({ marca }), this.pegaModelos)}
                  selectedValue={this.state.marca}
                  collapsable
                >
                  <Picker.Item label='Fabricante' />
                  {
                    dadosMarcas.map(item => <Picker.Item label={item.name} value={item.id} />)
                  }
                </Picker>
              </View>
            )
          }
          {
            renderPickerModelos && (
              <View style={styles.Picker}>
                <Picker
                  style={styles.estiloPicker}
                  selectedValue={this.state.modelo}
                  onValueChange={(modelo => this.setState({ modelo }), this.pegaAno)}
                >
                  <Picker.Item label='Modelo' />
                  {
                    dadosModelos.map(item => <Picker.Item label={item.name} value={item.id} />)
                  }
                </Picker>
              </View>
            )
          }
          {
            renderPickerAno && (
              <View style={styles.Picker}>
                <Picker
                  style={styles.estiloPicker}
                  selectedValue={this.state.anos}
                  onValueChange={(anos => this.setState({ anos }))}
                >
                  <Picker.Item label='Ano' />
                  {
                    dadosAno.map(item => <Picker.Item label={item.id} value={item.id} />)
                  }
                </Picker>
              </View>
            )
          }
        </View>

        <View>
          <View style={styles.cabecalho} />

          {
            this.state.error && (
              <View style={styles.input}>
                <Text style={styles.info_text}>Error: {this.state.error}</Text>
              </View>
            )
          }
          {
            this.state.viewFipe && (
              <View style={styles.info}>
                <View style={styles.input_o}>
                  <Text style={styles.info_text}>Data deferência: {dadosFipe.referencia}</Text>
                </View>
                <View style={styles.input_o}>
                  <Text style={styles.info_text}>Código Fipe: {dadosFipe.fipe_codigo}</Text>
                </View>
                <View style={styles.input_o}>
                  <Text style={styles.info_text}>Modelo: {dadosFipe.name} </Text>
                </View>
                <View style={styles.input_o}>
                  <Text style={styles.info_text}>Combustível: {dadosFipe.combustivel} </Text>
                </View>
                <View style={styles.input_o}>
                  <Text style={styles.info_text}>Fabricante: {dadosFipe.marca}</Text>
                </View>
                <View style={styles.input_o}>
                  <Text style={styles.info_text}>Ano Modelo: {dadosFipe.ano_modelo}</Text>
                </View>
                <View style={styles.input_o}>
                  <Text style={styles.info_text}>Preço: {dadosFipe.preco} </Text>
                </View>
              </View>
            )
          }
        </View>
        <View styles={styles.main}>
          <TouchableOpacity onPress={this.consultaFipe} style={styles.button}>
            <Text style={styles.button_text}>Consultar Tabela FIPE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.hint_title}>
          <View style={styles.miniball}>
            <Text style={styles.numberType}>2</Text>
          </View>
          <View style={styles.hintview}>
            <Text style={styles.hint}>Informe a placa para recuperar dados do DENATRAN</Text>
          </View>
        </View>
        <View style={styles.cabecalho} >
          {
            this.state.erroconsulta && (
              <View style={styles.errov}>
                <Text style={styles.erro}>Consulta falhou.Tente novamente!</Text>
              </View>
            )
          }

          {
            this.state.naoexiste && (
              <View style={styles.errov}>
                <Text style={styles.erro}>Veículo não encontrado</Text>
              </View>
            )
          }
          <View style={styles.texto_geo}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              multiline
              placeholder={hint}
              maxLength={72}
              autoCapitalize="characters"
              underlineColorAndroid="rgba(0,0,0,0)"
              onChangeText={(placa) => this.setState({ placa })}
            />
          </View>
        </View>
        <View styles={styles.main}>
          <TouchableOpacity onPress={this.consultaPlaca} style={styles.button}>

            {
              this.state.consulta && (

                <Text style={styles.button_text}>Consultar "DENATRAN"</Text>
              )
            }
            {
              this.state.loading && (
                <ActivityIndicator size="large" color="#fff" />
              )
            }

          </TouchableOpacity>

        </View>
        {
          this.state.error && (
            <View style={styles.input}>
              <Text style={styles.info_text}>Error: {this.state.error}</Text>
            </View>
          )
        }
        {
          this.state.viewDenatran && (
            <View style={styles.info}>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Placa: {dadosVeiculo.placa}</Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Marca: {dadosVeiculo.marca}</Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Modelo: {dadosVeiculo.modelo} </Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Cor: {dadosVeiculo.cor} </Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Procedência: {dadosVeiculo.procedencia} </Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Ano Fabricação: {dadosVeiculo.ano_fab}</Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Ano Modelo: {dadosVeiculo.ano_mod}</Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Combustível: {dadosVeiculo.combustivel} </Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Chassi: ***{dadosVeiculo.chassi} </Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Número Motor: {dadosVeiculo.numero_motor} </Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Etiquetas: {dadosVeiculo.etiquetas} </Text>
              </View>
            </View>
          )
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  form: state.formState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FormActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Veiculos);
