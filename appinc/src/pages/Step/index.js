import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import { Header } from '../../globalComponents';

// styles
import { View, FlatList, ScrollView, TouchableOpacity, Text, ProgressBarAndroid, BackHandler } from 'react-native';
import styles from './styles';
import ComponentList from './components/ComponentsList';


class StepPage extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.saveStep);
  }

  componentWillMount() {
    BackHandler.removeEventListener('hardwareBackPress', this.saveStep);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.saveStep);
  }

  saveStep = () => {
    this.props.saveStepState();
    this.props.startUpdateProgress();
    this.props.navigation.navigate('StepList');
    return true;
  }

  render() {
    const { navigation } = this.props;
    const step = navigation.getParam('step');

    return (
      <View style={styles.container}>
      <Header 
        title={this.props.navigation.state.params.step.step_name} 
        showArrow
        showProgress 
        showInfo
        info={this.props.navigation.state.params.step.info_step}
        goBack={this.props.navigation.goBack} 
      />
        <ScrollView>
        { step.components.map((item , i) =>
          <View style = {styles.coluna}>
            <View style = {styles.linha}>
              <View style={styles.ball}>
                <Text style={styles.numberType}>{i + 1}</Text>
              </View>
              <Text style={styles.textType}> {item.label}: </Text>
            </View>            
            <ComponentList data={item}/>
          </View>
        ) }
        </ScrollView>
      </View>
    );
  }
}

StepPage.navigationOptions = ({ navigation }) => ({
  title: navigation.state.params.step.titulo,
});

const mapDispatchToProps = dispatch => bindActionCreators(FormActions, dispatch);

export default connect(null, mapDispatchToProps)(StepPage);