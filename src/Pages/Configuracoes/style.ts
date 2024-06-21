import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ede7f6', // Cor de fundo do nosso app roxa clarinha
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4a148c', // Cor roxa escura para o texto no nosso app
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#1DB499',
    },
    button: {
        marginTop: 10,
        height: 50,
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#935FB4',
        alignContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },

    profileImageContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: 'hidden', 
        marginBottom: 20,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    
    profileImage: {
        width: 150,
        height: 150,
    },

    messageContainer: {
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#1DB499',
    },

    input: {
        height: 40,
        width: 1000,
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5,
        marginTop: 20,
    },


});

export default styles;