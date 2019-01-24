
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
    const { getCreateForm, steps } = this.props;
    this.setState({ createdForms: true });
    const arrayProgress = {
      name: steps.item.step_name,
      array: [],
      length: 0,
    };

    steps.item.components.forEach(component => {
      // console.tron.log(component);
      const form = {};      
      if(component.component_type === 'date') {
        form[component.data_name] = { key: component.data_name, value: '1980-01-21', filled: null };
      }else{
        form[component.data_name] = { key: component.data_name, value: component.default_value, filled: null }; 
      }
      getCreateForm(form);
      arrayProgress.array.push(component.data_name);
      const lengthArray = arrayProgress.array.length;
      arrayProgress.length = lengthArray;      
      this.setState({ arrayProgress: arrayProgress, callFunction: true });         
    });
        
    /* if(arrayProgress.length > 0) {
      this.compareProgress();
      //console.tron.log(['entrei no if', this.state.arrayProgress])
    } */
  }

  compareProgress = async () => {
    this.setState({ callFunction: null, functionConstructor: true })
    this.props.finishUpdateProgress()
    const { step } = this.props.form;
    const { arrayProgress } = this.state;
    var progress = 0;
    var countProgress = 0;
    
    if( arrayProgress.length > 0) {      
      for(var key in step) {               
        arrayProgress.array.map(item => { 
          //console.tron.log(['teste conut in for do ayrtinho', item, step[key].filled]); 
          if(item === key && step[key].filled === true) {
            //console.tron.log(['teste conut in for e if', progress, countProgress])
            countProgress++;
            //console.tron.log(['teste conut in for e if2', progress, countProgress])
          }
        })
      }
    }    
    progress = countProgress/arrayProgress.length;
    //console.tron.log(['teste conut progress', progress, countProgress, arrayProgress.length])
    this.setState({ progress })    
  }

  render() {
    // console.tron.log(this.props);
    const { steps, form } = this.props;
    const { createdForms, arrayProgress, callFunction, progress } = this.state;
    const { item } = steps;
    if (!createdForms) {
      this.createFormsSave();
      //console.tron.log('createFormSave');
    }
    if(callFunction || form.updateProgress) {
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
  form: state.formState,
});

const mapDispatchToProps = dispatch => bindActionCreators(FormsActions, dispatch);

const StepBox = connect(mapStateToProps, mapDispatchToProps)(StepBoxComponent);

export default withNavigation(StepBox);
