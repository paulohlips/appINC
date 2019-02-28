import { StyleSheet } from 'react-native';
import { colors, metrics, responsividade } from '../../styles';
import { bold } from 'ansi-colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
        paddingBottom: 40,
    },

    avatarContainer: {
        width: responsividade.LARGURAFOTO,
        height: responsividade.ALTURAFOTO,
        flexDirection: 'row',
        backgroundColor: "white",
        padding: 15,
        margin: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatarContainer2: {
        flexDirection: 'row',
        backgroundColor: "white",
    },
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
        width: responsividade.largura_tela * 0.9,
        borderRadius: 4,
        paddingLeft: 20,
        fontSize: 16,
        flexDirection: 'row',
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
    button_text: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    hint: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        opacity: 0.3,
        paddingVertical: 10,
    },
    codecontainer: {
        width: (responsividade.LARGURABOX),
        height: (responsividade.ALTURABOX),
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    code: {
        color: '#000000',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 18,
        //fontWeight: '400',
        lineHeight: 21,
    },
    info_text: {
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center',
        color: "black",
        opacity: 0.5,
    },

});

export default styles;