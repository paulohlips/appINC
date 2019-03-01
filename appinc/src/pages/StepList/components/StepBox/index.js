
import React, { Component } from 'react';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormsActions } from '../../../../store/ducks/form'

// styles
import { View, Text, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { responsividade } from '../../../../styles';


class StepBoxComponent extends Component {
  state = {
    functionConstructor: null,
    callFunction: null,
    createdForms: null,
    arrayProgress: {},
    progress: 0,
  }

  componentWillMount() {
  }

  createFormsSave = async () => {
    const { getCreateForm, steps, formState } = this.props;

    this.setState({ createdForms: true });
    const arrayProgress = {
      name: steps.item.step_name,
      array: [],
      length: 0,
    };

    if (formState.formEdit) {
      steps.item.components.forEach(component => {

        const form = {};
        if (component.component_type === 'date') {

          for (var key1 in formState.step) {
            if (component.data_name === key1.key) {
              form[component.data_name] = key1;
            }
          }

        } else {
          for (var key in formState.step) {
            if (component.data_name === key.key) {
              form[component.data_name] = key;
            }
          }
        }
        getCreateForm(form);
        arrayProgress.array.push(component.data_name);
        const lengthArray = arrayProgress.array.length;
        arrayProgress.length = lengthArray;
        this.setState({ arrayProgress, callFunction: true });
      });
    } else {
      steps.item.components.forEach(component => {
        const form = {};
        if (component.component_type === 'date') {
          form[component.data_name] = { key: component.data_name, value: '1980-01-21', filled: null };
        } else {
          form[component.data_name] = { key: component.data_name, value: component.default_value, filled: null };
        }
        getCreateForm(form);
        arrayProgress.array.push(component.data_name);
        const lengthArray = arrayProgress.array.length;
        arrayProgress.length = lengthArray;
        this.setState({ arrayProgress, callFunction: true });
      });
    }
  }

  compareProgress = async () => {
    this.setState({ callFunction: null, functionConstructor: true })
    this.props.finishUpdateProgress();
    const { step } = this.props.formState;
    const { arrayProgress } = this.state;
    var progress = 0;
    var countProgress = 0;

    if (arrayProgress.length > 0) {
      for (var key in step) {
        arrayProgress.array.map(item => {
          if (item === key && step[key].filled === true) {
            countProgress++;
          }
        })
      }
    }
    progress = countProgress / arrayProgress.length;
    this.setState({ progress });
  }

  render() {
    const { steps, form, formState } = this.props;
    const { createdForms, arrayProgress, callFunction, progress } = this.state;
    const { item } = steps;
    if (!createdForms) {
      this.createFormsSave();
    }
    if (callFunction || formState.updateProgress) {
      this.compareProgress();
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('StepPage', { step: item })}>
          <View style={styles.card_titulo}>
            <Text style={styles.titulo}>{item.step_name}</Text>
          </View>
          <View style={styles.card_descricao}>
            <Text style={styles.descricao}>{item.step_description}</Text>
          </View>

          <View style={styles.bar}>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={progress}
            />
          </View>

        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  formState: state.formState,
  form: state.formState,
});

const mapDispatchToProps = dispatch => bindActionCreators(FormsActions, dispatch);

const StepBox = connect(mapStateToProps, mapDispatchToProps)(StepBoxComponent);

export default withNavigation(StepBox);
