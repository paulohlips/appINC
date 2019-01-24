import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';

import styles from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';


class MyDatePicker extends Component {

  state = {
    date: '',
    dataAtual: '2019-01-21'
  }

  componentDidMount() {
    const { form, data } = this.props;

    for (var key in form.step) {
      if ( key === data.data_name) {        
        if(form.step[key].filled === true) {
          this.setState({ date: form.step[key].value });
        }
      }
    }
  }

  saveFormInput = data => {
    const { dataAtual, date } = this.state;
    const { form, getSaveStateForm, startControlArray } = this.props;

    //console.tron.log(form.step);
    if ( date === '' ) {
      for (var key in form.step) {
        if ( key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: dataAtual, filled: null };
          //console.tron.log(['formsavecampo', form])
          getSaveStateForm(form);
        }
      }
    }
    else {
      for (var key in form.step) {
        if ( key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: date, filled: true };
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
    //console.tron.log(['redux date', this.props]); 
    
    if (saveStep) {
      this.saveFormInput({data_name, default_value});
    }
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>{label}:</Text>
        <View style={styles.direcao}>
          <DatePicker
            style={styles.dataPicker}
            mode="date"
            placeholder="selecionar"
            format="YYYY-MM-DD"
            minDate="2018-01-01"
            maxDate="2100-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => { this.props.submitDATE({ date }); this.setState({ date }); }}
            customStyles={{
              dateIcon: {
                position: 'relative',
                width: 0,
                height: 0,
                // marginLeft: -50,
              },
              dateInput: {
                height: 320,
                width: 55,
                borderWidth:0,
                borderRadius: 10,
                backgroundColor: 'transparent',

              },
            }}
            onDateChange={(date) => { this.setState({ date }); this.getDate(); }}
           
          />

          <View style={styles.datecontainer}>
            <Text style={styles.date}>{this.state.date}</Text>
          </View>
        </View>

      </View>
    );
  }
}

const mapStateToProps = state => ({
  form: state.formState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FormActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyDatePicker);
