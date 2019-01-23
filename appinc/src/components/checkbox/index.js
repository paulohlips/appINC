import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage, Image, ScrollView, Picker} from 'react-native';
import styles from './styles';
import { CheckBox } from 'react-native-elements';

class Check extends Component {

    state = {
        checked: false,
    }

    /*checkItem(elements){
      let itemChecked = this.state.checked;
      itemChecked = elements.target.checked;
      this.setState({checked: itemChecked});
    }*/

render() {
    const { hint } = this.props.data;
    return(
    <View>

        <CheckBox
            title={"teste"}
            checked={this.state.checked}
            onPress={() => this.setState({checked: !this.state.checked})} 
        />

    </View>
    );
}
}

export default Check; 