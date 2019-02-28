import { StyleSheet } from 'react-native';
import { colors, metrics, responsividade } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#344955"
    //alignItems: 'center',
  },
  bodyS: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#344955"
    //paddingHorizontal: 21,
  },
  halfBody: {
    height: responsividade.largura_tela < 430 ? 170 : 200,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#344955"
  },
  tokenView: {
    marginTop: 25,
    width: responsividade.largura_tela < 430 ? responsividade.largura_tela * 0.7 : responsividade.largura_tela * 0.55,
    height: responsividade.largura_tela < 430 ? 55 : 70,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  token: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff"
  },
  tokenD: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#2afe3f",
  },

  info: {
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: 80,
  },

  profile: {
    alignSelf: 'center',
    margin: metrics.baseMargin,
    elevation: 1,
    width: responsividade.largura_tela < 430 ? 100 : 150
  },

  ImageStyle: {
    width: 150,
    height: 150,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 100,
  },

  name_view:{
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  name: {
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "white",
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: metrics.baseMargin,
    width: responsividade.largura_tela < 430 ? responsividade.LARGURABUTTON : 700,
    height: responsividade.largura_tela < 430 ? responsividade.ALTURABUTTON : responsividade.largura_tela * 0.11,
    borderRadius: 200,
    backgroundColor: "#F9AA33",
  },

  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: metrics.baseMargin,
    width: responsividade.LARGURABUTTON,
    height: responsividade.ALTURABUTTON,
    borderRadius: 200,
    backgroundColor: "#344955",
    borderColor: "#F9AA33",
    borderWidth: 0,

  },

  button_text2: {
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#F9AA33",
  },

  button_text: {
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#344955",
  },

  icon:{
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
 },


});

export default styles;