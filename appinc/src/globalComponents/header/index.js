import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Info from '../info';
import Alert from '../alert';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import { responsividade } from '../../styles';

class HeaderRedux extends Component {
  state ={
    modalVisible: false,
    showModalInfo: false,
    showAlert: false,
    alertVisible: false,
  }

  openInfo = () => {
    this.setState({ modalVisible: true, showModalInfo: true });
  }

  closeInfo = () => {
    this.setState({ modalVisible: false, showModalInfo: false });
  }

  openAlert = () => {
    this.setState({ showAlert: true, alertVisible: true })
  }

  closeAlert = () => {
    this.setState({ showAlert: false, alertVisible: false })
  }

  clearAsync = () => {
    AsyncStorage.clear();
  }

  render() {
    const {
      showClear,
      showArrow,
      showMenu,
      showInfo,
      goBack,
      openMenu,
      title,
      info,
      startUpdateProgress,
      showProgress,
      saveStepState,
    } = this.props;
    const { showModalInfo, showAlert } = this.state;
    const { largura_tela } = responsividade;

    return (
      <View style={styles.header}>

        <StatusBar backgroundColor='#344955' barStyle="light-content" />
          <View style={styles.viewIcon}>
            {
              showMenu && (
                <TouchableOpacity onPress={() => openMenu()}>
                  <Icon name="md-menu" size={ largura_tela < 430 ? 28 : 40 } style={styles.iconMenu} />
                </TouchableOpacity>
              )
            }
            {
              showArrow && (
                <TouchableOpacity onPress={() => {
                    if(showProgress){
                      startUpdateProgress();
                      saveStepState();
                    }
                    goBack();
                  }}
                >
                  <Icon name="md-arrow-back" size={ largura_tela < 430 ? 28 : 40 } style={styles.iconMenu} />
                </TouchableOpacity>
              )
            }
          </View>
            <View style={styles.viewTitle}>
              <Text style={styles.headerTitle}>
                {title}
              </Text>
            </View>
          <View>
            {
              showInfo ?
                <TouchableOpacity onPress={() => this.openInfo()}>
                  <Icon name="ios-information-circle-outline" size={28} style={styles.iconMenu} />
                </TouchableOpacity>
              : <View style={styles.concerto} />
            }
            {
              showClear && (
                <TouchableOpacity onPress={() => this.clearAsync()}>
                  <Icon name="md-trash" size={28} style={styles.iconMenu} />
                </TouchableOpacity>
              )
            }
            {
              showModalInfo && (
                <Info
                  closeModalInfo={this.closeInfo}
                  textInfo={info}
                />
              )
            }
            {
              showAlert && (
                <Alert
                  alertVisible
                  goBack={goBack}
                  closeModalAlert={this.closeAlert}
                />
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

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderRedux)
export default withNavigation(Header);
