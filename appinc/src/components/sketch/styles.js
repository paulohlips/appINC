import { StyleSheet } from 'react-native';
import { colors, metrics,responsividade } from '../../styles';

const styles = StyleSheet.create({

   Name: {
    width: responsividade.LARGURABOX,
    height: 30,
    backgroundColor: colors.transparent,
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 21,
   },

  input: {
     backgroundColor: 'white',
     height: responsividade.ALTURABOX,
     borderRadius: 4,
     paddingLeft: 20,
     fontSize: 16,
  },
  button: {
    backgroundColor: "#B83E3E",
    borderRadius: 50,
    height: responsividade.ALTURAFORM,
    width: responsividade.LARGURAFORM,
    margin: 10,
    paddingHorizontal: metrics.basePadding,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
 picker:{
  width: 10
 },
  button_text:{

    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,

  },

  hint:{

    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    opacity: 0.3,
    paddingVertical: 10,

  },
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF', 
  },
  strokeColorButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
  },
  functionButton: {
    marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60, right: 20,
    backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
  }

});

export default styles;