import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Info from '../info';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';

class HeaderRedux extends Component {
  state ={
    modalVisible: false,
    showModalInfo: false,
  }

  openInfo = () => {
    this.setState({ modalVisible: true, showModalInfo: true });
  }

  closeInfo = () => {
    this.setState({ modalVisible: false, showModalInfo: false });
  }

  render() {  
    const { showArrow, showMenu, showInfo, goBack, openMenu, title, info, startUpdateProgress } = this.props;
    const { showModalInfo } = this.state;    

    return (
      <View style={styles.header}>

        <StatusBar backgroundColor='#344955' barStyle="light-content" />
          <View style={styles.viewIcon}>
            {
              showMenu && (
                <TouchableOpacity onPress={() => openMenu()}>
                  <Icon name="md-menu" size={28} style={styles.iconMenu} />
                </TouchableOpacity>
              )
            }
            {
              showArrow && (
                <TouchableOpacity onPress={() => { goBack(); startUpdateProgress()}} >
                  <Icon name="md-arrow-back" size={28} style={styles.iconMenu} />
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
              showModalInfo && (
                <Info 
                  closeModalInfo={this.closeInfo}
                  textInfo={info}
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
