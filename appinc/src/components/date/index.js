import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';

import styles from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import moment from 'moment';


class MyDatePicker extends Component {

  state = {
    date: null,
    formattedDate: null,
    dataAtual: '2019-01-21',
    showDate: false,
    call: true,
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

  getNewDate = () => {
    const oldDate = new Date(this.state.date);
    const newDate = moment.utc(oldDate).format("DD/MM/YYYY");
    
    if( this.state.call ){
      this.state.formattedDate = newDate;
      this.setState({ formattedDate: newDate, call: false });
    } 
  }

  saveFormInput = data => {
    const { dataAtual, date } = this.state;
    const { form, getSaveStateForm, startControlArray } = this.props;

    //console.tron.log(form.step);
    if ( date ) {
      for (var key in form.step) {
        if ( key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: date, filled: true };
          //console.tron.log(['formsavecampo', form])
          getSaveStateForm(form);
        }
      }
    } else {
      for (var key in form.step) {
        if ( key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: '1980-01-21', filled: false };
          //console.tron.log(['formsavecampo', form])
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
  }

  
  render() {
    const { data_name, label, hint, default_value, newState} = this.props.data
    const { saveStep } = this.props.form;
    const { showDate } = this.state;
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
            placeholder="Calendário"
            format="YYYY-MM-DD"
            minDate="2018-01-01"
            maxDate="2100-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => { this.props.submitDATE({ date }); this.setState({ date, call: true });}}
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
            onDateChange={(date) => { this.setState({ date, showDate: true, call: true }); this.getDate(); }}
         
          />

          { 
            this.state.date && (
              
            <View style={styles.datecontainer}>
            { this.getNewDate()}
              <Text style={styles.date}>{this.state.formattedDate}</Text>
            </View>
           
            )
          }

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
