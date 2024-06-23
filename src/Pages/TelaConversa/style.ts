import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ede7f6',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 25,
      backgroundColor: '#4a148c',
      paddingBottom: 14,
      marginBottom: -15,
      paddingHorizontal: 15,
    },
    avatar: {
      display: 'flex',
      marginTop: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 15,
      marginLeft: 30,
      paddingBottom: 14,
      marginBottom: -7,
      paddingHorizontal: 15,
    },
    contactName: {
      display: 'flex',
      marginTop: 15,
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    messageList: {
      flex: 1,
      padding: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      backgroundColor: 'white',
    },
    input: {
      flex: 1,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 8,
      marginRight: 8,
    },
    sendButton: {
      padding: 10,
      backgroundColor: '#4a148c',
      borderRadius: 4,
    },
    sendButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    messageContainer: {
      backgroundColor: '#fff', //Quando eu adicionar a mudança de tema, essa mensagem tem que ficar cinza
      borderRadius: 8,
      padding: 8,
      marginBottom: 8,
      maxWidth: '80%',
      alignSelf: 'flex-end',
    },
    messageText: {
      fontSize: 16,
    },
    pontos: {
      fontSize:  25,
      color: 'white',
      right: -285,
      marginTop: 1,
      position: 'absolute',
    },

    seta: {
      fontSize:  25,
      color: 'white',
      right: -20,
      marginTop: 1,
      position: 'absolute',
    }
  });

  export default styles;