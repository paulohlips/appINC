
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


class StepBoxComponent extends Component {
  state = {
    functionConstructor: null,
    callFunction: null,
    createdForms: null,
    arrayProgress: {},
    progress: 0,
  }

  componentWillMount() {
    //console.tron.log(this.props);
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
        // console.tron.log(component);
        const form = {};
        if (component.component_type === 'date') {
          formState.step.map(item => {
            if (component.data_name === item.key) {
              form[component.data_name] = item;
            }
          });
        } else {
          formState.step.map(item => {
            if (component.data_name === item.key) {
              form[component.data_name] = item;
            }
          });
        }
        getCreateForm(form);
        arrayProgress.array.push(component.data_name);
        const lengthArray = arrayProgress.array.length;
        arrayProgress.length = lengthArray;
        this.setState({ arrayProgress: arrayProgress, callFunction: true });
      });
    } else {
      steps.item.components.forEach(component => {
        // console.tron.log(component);
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
        this.setState({ arrayProgress: arrayProgress, callFunction: true });
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
    console.tron.log(['finish', arrayProgress, step, this.props]);

    if( arrayProgress.length > 0) {
      //console.tron.log(['teste ', key, arrayProgress]);
      for(var key in step) {
        //console.tron.log(['teste oiureewtrt', key, arrayProgress]);
        arrayProgress.array.map(item => {
          console.tron.log(['teste conut in for do ayrtinho', item, step[key].filled]);
          if(item === key && step[key].filled === true) {
            console.tron.log([' if 1', progress, countProgress])
            countProgress++;
            console.tron.log([' if2 asfa', progress, countProgress])
          }
        })
      }
    }
    progress = countProgress/arrayProgress.length;
    //console.tron.log(['teste conut progress', progress, countProgress, arrayProgress.length])
    this.setState({ progress });
  }

  render() {
    // console.tron.log(this.props);
    const { steps, form, formState } = this.props;
    const { createdForms, arrayProgress, callFunction, progress } = this.state;
    const { item } = steps;
    if (!createdForms) {
      this.createFormsSave();
      //console.tron.log('createFormSave');
    }
    if (callFunction || formState.updateProgress) {
      this.compareProgress();
      console.tron.log(['avenida', arrayProgress]);
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
});

const mapDispatchToProps = dispatch => bindActionCreators(FormsActions, dispatch);

const StepBox = connect(mapStateToProps, mapDispatchToProps)(StepBoxComponent);

export default withNavigation(StepBox);
