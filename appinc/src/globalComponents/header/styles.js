import { StyleSheet } from 'react-native';
import { colors, metric, responsividade } from '../../styles';

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#344955",
    padding: responsividade.padding.mainPadding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: responsividade.ALTURA_HEADER,
  },

  iconMenu: {
    color: colors.white,
    alignSelf: 'flex-start',
    margin: 5,
  },
  iconExit: {
    color: colors.regular,
    alignSelf: 'flex-start',
  },

  viewIcon: {
    //marginLeft: 4,
  },

  viewTitle: {
    flex: 1,
  },

  headerTitle: {
    color: colors.white,
    fontSize: responsividade.fonts.titleSize,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  concerto: {
    color: "#344955",
    width: 20,
    height: 20,
  }
});

export default styles; 