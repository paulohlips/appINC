import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StatusBar, ListView, AsyncStorage, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import axios from 'axios';
import { Header } from '../../globalComponents';



import { NavigationActions, withNavigation } from 'react-navigation';

 
const dias = 23;
class Hist extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        IDLaudo: [],
    };
}


  navigateToScreen = (route) => () => {
      const navigateAction = NavigationActions.navigate({
        routeName: route
      });
      this.props.navigation.dispatch(navigateAction);
    }


  static navigationOptions = {
    header: null,
  }

  openDrawer = () => {
    const { drawerStatus } = this.state;

    if  (drawerStatus === true) {
      //this.props.navigation.toggleDrawer();
    }
  }

  requestFroms = () => {
    axios.get('http://35.231.239.168/api/pericia/formularios/1')
      .then((resp) => {
        //console.tron.log(['Requisição', resp.data]);
        AsyncStorage.setItem('@Form', JSON.stringify(resp.data));
      }).catch(err => {
        //console.tron.log(err);
      });
  }

  requestQuerry = () => {
    axios.get('http://35.243.140.44/api/query')
    .then((resp) => {
      AsyncStorage.setItem('@Querry', JSON.stringify(resp.data));
    }).catch(err => {
      //console.tron.log(err);
    });
  }
  state ={
    drawerStatus: null,
  }
  componentWillMount() {
    this.requestFroms();
    this.requestQuerry();
    //console.tron.log(this.props);
  }

  renderSketch = () => {};

  async componentWillMount(){
    console.tron.log(['OK']);
      const id = await AsyncStorage.getItem('@IDlaudo');
      this.setState({ IDLaudo: id });
     // this.setState({ IDLaudo: [...this.state.IDLaudo, id] });
     // console.tron.log(['NUM IDS', this.state.IDLaudo]);
      //const numIds = marcas.map(item => id);
      //console.tron.log(['NUM IDS', numIds]);
      
       //this.setState({ renderPicker:true })
    
      }

  render() {
    const { navigation } = this.props;
    //console.tron.log(navigation);

    return (
      <View style={styles.container}>
        <Header
          showMenu
          showExit
          openMenu={navigation.toggleDrawer}
          title='Minhas Perícias'
        />
       
       <View style={styles.container}>

 
     <View style ={styles.box}>

     
     <TouchableOpacity onPress={() => {Linking.openURL('http://35.231.239.168/pericia/links.php?id_pericia='+this.state.IDLaudo)}}>
          <View style={styles.card_titulo}>
          <Text style={styles.titulo}>Referência</Text>
           
          </View>
          <View style={styles.card_descricao}>
          <Text style={styles.num}>Acessar Laudo nº    
            {' '+this.state.IDLaudo}</Text>
          </View>

          

        </TouchableOpacity>

          


     </View>

          
    

      </View>
    

      </View>

    );
  }
}

export default Hist;