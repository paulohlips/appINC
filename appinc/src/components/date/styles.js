import { StyleSheet } from 'react-native';
import { metrics, colors, responsividade } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: responsividade.largura_tela,
    padding: 20,
    paddingBottom: 40,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  titulo: {
    width: responsividade.LARGURABOX,
    height: 22,
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 21,
    marginBottom: 15,
  },
  direcao: {
    flexDirection: 'row',
  },
  datecontainer: {
    width: (responsividade.LARGURABOX*0.46),
    height:  (responsividade.ALTURABOX*0.9),
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  date: {
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 21,
  }

});

export default styles;