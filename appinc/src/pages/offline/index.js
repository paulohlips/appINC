import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header } from '../../globalComponents';
import { NavigationActions, withNavigation } from 'react-navigation';
import styles from './styles';

class Offline extends Component {
  
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header
          showMenu
          openMenu={navigation.toggleDrawer}
          title='Minhas Perícias Offline'
        />
        <View style={styles.card}>
            <Text style={styles.title}>Nome da Perícia</Text>
            <Text style={styles.name}>Incendio</Text>
        </View>
      </View>
    );
  }
}

export default Offline;