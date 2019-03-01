import { StyleSheet } from 'react-native';
import { colors, metrics, responsividade } from '../../styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EDF0F2',        
    },
    salvarbutton: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 40,
      width: responsividade.LARGURA_BUTTON,
      height: responsividade.LARGURA_BUTTON,
      borderRadius: 100,
      backgroundColor: '#F9AA33',
    },

    buttonText: {
      color: '#ffffff',
      fontFamily: 'Roboto',
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 28,
    },
    numberType: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: responsividade.fonts.descriptionSize,
      color: 'black',
      fontWeight: 'bold',
      width: responsividade.LARGURABOLA * 0.8,
      textAlign: 'center',
      // backgroundColor: '#8484'
    },
    ball: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderRadius: 30,
      width: responsividade.LARGURABOLA,
      height: responsividade.LARGURABOLA,
      backgroundColor: '#F9AA33',
      margin: 15,
      marginLeft: responsividade.margin.mainMargin,
      flexDirection: 'row',
    },

    textType: {
      fontSize: responsividade.fonts.descriptionSize,
      color: 'black',
      fontWeight: 'bold',
    },

    coluna:{
      flexDirection: 'column',
    },

    linha: {
      flexDirection: 'row',
      alignItems: 'center',
    // distância entre componentes
      // marginTop: 30,
    },
});

export default styles;