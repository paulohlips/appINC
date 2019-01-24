import { StyleSheet } from 'react-native';
import { colors } from '../../styles';
const styles = StyleSheet.create({
    container: { 
        flex: 1,      
    },
    main: {             
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#666",     
    },
    card: {
        marginHorizontal: 20,
        marginVertical: 10, 
        padding: 15,
        borderRadius: 5,
        elvation: 3,   
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    title: {
        fontSize: 16,
        color: colors.darker,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black
    }

});

export default styles;