import { StyleSheet } from 'react-native';
import { colors, metrics, responsividade } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',   
    justifyContent: 'space-between',
    width: responsividade.LARGURACARD,
    height: responsividade.ALTURACARD,
    backgroundColor: "white",
    borderRadius: 4,
    marginTop: responsividade.margin.mainMargin / 2,
  },
  viewicon: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#111111',
  },
  titulo: {
    width: responsividade.WIDTH_MAIN * 0.7,
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: responsividade.fonts.nameSize,
    fontWeight: '500',
    lineHeight: 21,
  },
  descricao: {
    width: responsividade.WIDTH_MAIN * 0.7,
    color: '#000000',
    opacity: 0.7,
    fontFamily: 'Roboto',
    fontSize: responsividade.fonts.descriptionSize,
    lineHeight: 19,
  },
  icon: {
    color: '#000000',
  },

  card_titulo:{
    marginTop: responsividade.margin.mainMargin,
    marginLeft: responsividade.margin.mainMargin * 0.3,
  },

  card_descricao:{
    marginTop: responsividade.margin.mainMargin * 0.4,
    marginLeft: responsividade.margin.mainMargin * 0.3,
  },

  bar: {
    width: responsividade.LARGURACARD * 0.95,   
    padding: 10,
    marginTop: responsividade.margin.mainMargin,
  },

});

export default styles;
