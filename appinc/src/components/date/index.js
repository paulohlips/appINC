import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Image, Text, TouchableOpacity, AsyncStorage, NativeModules } from 'react-native';
import styles from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import moment from 'moment';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { responsividade } from '../../styles';

// var DatePicker = NativeModules.DatePicker;


class MyDatePicker extends Component {

  state = {
    date: null,
    formattedDate: "DD/MM/AAAA",
    dataAtual: '2019-01-21',
    showDate: false,
    call: true,
  }


  componentDidMount() {
    const { form, data } = this.props;

    for (var key in form.step) {
      if (key === data.data_name) {
        if (form.step[key].filled === true) {
          this.setState({ date: form.step[key].value });
        }
      }
    }

  }

  getNewDate = () => {
    const oldDate = new Date(this.state.date);
    const newDate = moment.utc(oldDate).format("DD/MM/YYYY");

    if (this.state.call) {
      this.state.formattedDate = newDate;
      this.setState({ formattedDate: newDate, call: false });
    }
  }

  saveFormInput = data => {
    const { dataAtual, date } = this.state;
    const { form, getSaveStateForm, startControlArray } = this.props;

    if (date) {
      for (var key in form.step) {
        if (key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: date, filled: true };
          getSaveStateForm(form);
        }
      }
    } else {
      for (var key in form.step) {
        if (key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: '1980-01-21', filled: false };
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
  }


  render() {
    const { data_name, label, hint, default_value, newState } = this.props.data
    const { saveStep } = this.props.form;
    const { showDate } = this.state;
    const  { largura_tela } = responsividade;

    if (saveStep) {
      this.saveFormInput({ data_name, default_value });
    }
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>{label}:</Text>
        
         
          <View style={styles.button}>
            <View style={styles.square}><Icon name="date-range" size={largura_tela< 430 ? 28 : 40} color="black" style={styles.icon} /></View>
            <View style={styles.parale}>
            <DatePicker
              mode="date"
              placeholder={this.state.formattedDate}
              format="YYYY-MM-DD"
              minDate="2018-01-01"
              maxDate="2100-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => { this.props.submitDATE({ date }); this.setState({ date, call: true }); }}
              customStyles={{
                dateIcon: {                  
                  width: 0,
                  height: 0,
                },
                dateInput: {
                  //height: 320,
                  //width: 300,
                  borderWidth: 0,
                  borderRadius: 60,
                  backgroundColor: 'white',
                },
              }}
              onDateChange={(date) => { this.setState({ date, showDate: true, call: true }); this.getDate(); }}
            />
                    

            </View>
            
        </View>  
          {
            this.state.date && (

             
                this.getNewDate()
               

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

export default connect(mapStateToProps, mapDispatchToProps)(MyDatePicker);
