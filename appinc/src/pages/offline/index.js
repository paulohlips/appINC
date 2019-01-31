import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Header } from '../../globalComponents';
import { NavigationActions, withNavigation } from 'react-navigation';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';

class Offline extends Component {

    state = {
        arrayRef: null,
        modalVisible: false,
        form: null,
    }
    async componentWillMount() {
        const arrayRef = await AsyncStorage.getItem('arrayRef');
        const array = JSON.parse(arrayRef)
        this.setState({ arrayRef: array });
        // console.tron.log(['arrayRef', JSON.parse(arrayRef)]);
        //console.tron.log(this.props);
    }

    renderCard = item => {
        return (
            <TouchableOpacity onPress={() => this.restoreForm(item)}>
                <View style={styles.card}>
                    <Text style={styles.title}>Nome da Perícia:</Text>
                    <Text style={styles.name}>{item}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    restoreForm = async name => {
        //console.tron.log(['props1', this.props]);
        const { navigation } = this.props;
        const formAsync = await AsyncStorage.getItem(name);
        const form = JSON.parse(formAsync);
        //console.tron.log(['fomr', form]);
        await this.props.restoreFormState(form);
        navigation.navigate('StepList', { inputSave: form.form });
        //console.tron.log(['props', this.props]);
        this.setState({ modalVisible: true, form: formAsync })
    }


  render() {
    const { arrayRef, modalVisible, form } = this.state;
    const { navigation } = this.props;
    //console.tron.log(['arrayRefrender',arrayRef]);
    return (
      <View style={styles.container}>
        <Header
          showMenu
          openMenu={navigation.toggleDrawer}
          title='Minhas Perícias Offline'
        />
        <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {}}
            >
                <View style={styles.containerModal}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.setState({ modalVisible: false})}>
                            <Icon name="md-close" size={28} style={styles.iconClose} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View style={styles.box}>
                        {
                            form && (
                                <Text style={styles.text}>{form}</Text>
                            )
                        }

                        </View>
                    </ScrollView>
                </View>
            </Modal>
        <View style={styles.main}>
          <ScrollView>
            {
              arrayRef && (
                  arrayRef.map(item => this.renderCard(item))
              )
            }
          </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Offline);
