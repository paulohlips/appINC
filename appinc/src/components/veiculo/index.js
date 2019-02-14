import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage, Image, ScrollView, Picker} from 'react-native';
import styles from './styles';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';


class Veiculos extends Component {

   state = {
     dadosVeiculo: '',
     dadosFipe:'',
     urlFipe: '',
     placa: '',
     marcas: null,
     marcaAtual:'',
     dadosMarcas: '',
     viewDenatran: false,
     viewFipe: false,
     dadosModelos: '',
     modelos: '',
     renderPickerModelos: false,
     renderPickerAno: false,
     renderPicker: false,
     ano: '',
   }

  async componentWillMount() {
    const { form, data } = this.props;
    await this.consultaMarcas();

    for (var key in form.step) {
      if ( key === data.data_name) {
               
        if(form.step[key].filled === true) {
          await this.setState({ 
            dadosVeiculo: form.step[key].dadosVeiculo, 
            dadosFipe: form.step[key].dadosFipe,
            viewDenatran: true, 
            viewFipe: true,
          })                  
        }
      }
    }
 }

 consultaPlaca = async() => {
    this.setState({
      viewDenatran: true,
    });
      axios.get('http://35.231.239.168/api/pericia/denatran/' +this.state.placa)
      .then((resp) => {
        AsyncStorage.setItem('@InfoPlaca', JSON.stringify(resp.data));
        this.getDadosPlaca(resp.data);
      }).catch(err => {});
  }

  async getDadosPlaca(data) {
    this.setState({ dadosVeiculo: data});
  }
  
  consultaFipe = async () => {
    //console.tron.log(['MARCA PICKER', this.state.anos])    
      const urlFipe = 'http://fipeapi.appspot.com/api/1/carros/veiculo/'+this.state.marca+'/'+this.state.modelo+'/'+this.state.anos+'.json';
   
      axios.get(urlFipe)
      .then(async resp => {
        const dadosPuro = resp.data;
        await this.setState({ dadosFipe: dadosPuro, viewFipe: true,});
        //console.tron.log('DEPOIS', this.state);

        //this.getDadosFipe();
      }).catch(err => {
        //console.tron.log(err);
      });
  }

  /*async getDadosFipe() {
    const dadosPuro = await AsyncStorage.getItem('@InfoFipe');
    const dadosFipe = JSON.parse(dadosPuro);
    this.setState({ dadosFipe: dadosFipe});
  }*/


  consultaMarcas = () => {
      axios.get('http://fipeapi.appspot.com/api/1/carros/marcas.json')
      .then((resp) => {
        //console.tron.log(['true', resp])
        //AsyncStorage.setItem('@Marcas', JSON.stringify(resp.data));
        this.getMarcas(resp.data);
      }).catch(err => {
        //console.tron.log(err);
      });
  }

  getMarcas = async data => {
    //console.tron.log(['dar', data])
    //const dadosPuro = await AsyncStorage.getItem('@Marcas');
   
    //const marcas = this.state.dadosMarcas;
    await this.setState({
      dadosMarcas: data,
      renderPicker: true,
    });
    
    //this.setState({ marcas });
    //const listaDeMarcas = marcas.map(item => item.name);
    //const listaDeValor = marcas.map(item => item.id);
    //this.setState({ renderPicker:true })
    //console.tron.log(['state', this.state])
  }



  pegaModelos = (value) => {
    this.setState({ marca: value});
    axios.get('http://fipeapi.appspot.com/api/1/carros/veiculos/'+value+'.json')
    .then((resp) => {
      //AsyncStorage.setItem('@Modelos', JSON.stringify(resp.data));
      this.getModelos(resp.data);
    }).catch(err => {
      //console.tron.log(err);
    });
  }

  getModelos = async data => {
    await this.setState({
      dadosModelos: data,
      renderPickerModelos: true,
    });
  }
    
  pegaAno = value => {
    this.setState({ modelo : value});
    axios.get('http://fipeapi.appspot.com/api/1/carros/veiculo/'+this.state.marca+'/'+value+'.json')
    .then((resp) => {
      //AsyncStorage.setItem('@Ano', JSON.stringify(resp.data));
      this.getAno(resp.data);
    }).catch(err => {
      //console.tron.log(err);
    });
  }

  getAno = async data => {
    this.setState({
      dadosAno : data,
      renderPickerAno: true,
    });
  }

saveFormVeiculo = data => {
  const { dadosVeiculo, dadosFipe } = this.state;
  const { form, getSaveStateForm, startControlArray } = this.props;
  const dados = { dadosVeiculo, dadosFipe }
  const dv = JSON.stringify(dados);
  
  //console.tron.log(['teste salvar info veiculo', dv, dadosVeiculo, dadosFipe]);
  if ( dadosVeiculo ) {
    for (var key in form.step) {
      if ( key === data.data_name) {
        const form = {};
        form[data.data_name] = { key: data.data_name, value: dv , dadosVeiculo: dadosVeiculo, dadosFipe: dadosFipe, filled: true };
        //console.tron.log(['formsavecampo', form])
        getSaveStateForm(form);
      }
    }
  } else {
    for (var key in form.step) {
      if ( key === data.data_name) {
        const form = {};
        form[data.data_name] = { key: data.data_name, value: '' , dadosVeiculo: null, dadosFipe: null, filled: false };
        //console.tron.log(['formsavecampo', form])
        getSaveStateForm(form);
      }
    }
  }
  startControlArray();
}

  render() {
    const { data_name, label, hint, default_value, newState} = this.props.data;
    const { saveStep } = this.props.form;
    const { 
      dadosVeiculo, 
      dadosModelos,
      dadosAno,
      dadosFipe, 
      dadosMarcas, 
      marcas, 
      modelos, 
      renderPicker, 
      renderPickerModelos, 
      ano, 
      anos, 
      renderPickerAno 
    } = this.state;
    
    if (saveStep) {
      this.saveFormVeiculo({data_name, default_value});
    }
    return (
      <View style={styles.container}>
        <View style = {styles.main}>
          <View style = {styles.hint_title}>
            <View style={styles.miniball}>
              <Text style={styles.numberType}>1</Text>
            </View>
            <View style = {styles.hintview}>
              <Text style = {styles.hint}>Preencha os campos abaixo para consultar a tabela FIPE</Text>
            </View>
          </View>
            {
              renderPicker && (
                <View style={styles.Picker}>
                  <Picker
                      style={styles.estiloPicker}
                      onValueChange={(marca => this.setState({ marca }), this.pegaModelos)}
                      selectedValue={this.state.marca}
                      collapsable = {true}
                      >
                        <Picker.Item label='Fabricante'/>
                        {
                          dadosMarcas.map(item => <Picker.Item label={item.name} value={item.id}></Picker.Item>)
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
                    onValueChange={(modelo => this.setState({ modelo }), this.pegaAno )}
                  >
                    <Picker.Item label='Modelo'/>
                      {
                        dadosModelos.map(item => <Picker.Item label={item.name} value={item.id}></Picker.Item>)
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
                      onValueChange={(anos => this.setState({ anos }) )}
                      >
                        <Picker.Item label='Ano'/>
                        {
                          dadosAno.map(item => <Picker.Item label={item.id} value={item.id}></Picker.Item>)
                        }
                  </Picker>
                </View>
              )
            }
          </View>

          <View>
              <View style={styles.cabecalho}>
              </View>

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
          <View style = {styles.hint_title}>
            <View style={styles.miniball}>
              <Text style={styles.numberType}>2</Text>
            </View>
            <View style = {styles.hintview}>
              <Text style = {styles.hint}>Informe a placa para recuperar dados do DENATRAN</Text>
            </View>
          </View>
          <View style={styles.cabecalho} >
              <View style ={styles.texto_geo}>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
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
            <Text style={styles.button_text}>Consultar "DENATRAN"</Text>
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
                <Text style={styles.info_text}>Fabricante: {dadosVeiculo.marca}</Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Modelo: {dadosVeiculo.modelo} </Text>
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
                <Text style={styles.info_text}>Chassi: {dadosVeiculo.chassi} </Text>
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
