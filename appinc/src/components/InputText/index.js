import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';

// styles
import { View, TextInput, Text } from 'react-native';
import styles from './styles';


class InputText extends Component {
  state = {
    inputSave: null,
  }

  componentDidMount() {
    const { form, data } = this.props;

    for (var key in form.step) {
      if (key === data.data_name) {
        if (form.step[key].filled === true) {
          this.setState({ inputSave: form.step[key].value });
        }
      }
    }
  }

  saveFormInput = data => {
    const { inputSave } = this.state;
    const { form, getSaveStateForm, startControlArray } = this.props;

    if (inputSave) {
      for (var key in form.step) {
        if (key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: inputSave, filled: true };
          getSaveStateForm(form);
        }
      }
    } else {
      for (var key in form.step) {
        if (key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: inputSave, filled: false };
          getSaveStateForm(form);
        }
      }
    }

    startControlArray();
  }

  render() {
    const { data_name, label, hint, default_value, newState } = this.props.data;
    const { saveStep, step } = this.props.form;

    if (saveStep) {
      this.saveFormInput({ data_name, default_value });
    }
    return (
      <View style={styles.container}>
        <Text style={styles.hint}>{hint}</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="sentences"
          autoCorrect={false}
          placeholder={"Digite aqui..."}
          maxLength={255}
          underlineColorAndroid="rgba(0,0,0,0)"
          onChangeText={inputSave => this.setState({ inputSave })}
          value={this.state.inputSave}
        />

      </View>
    );
  }
}

const mapStateToProps = state => ({
  form: state.formState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FormActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InputText);