import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 25,
    position: 'relative', 
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    flex: 1,
  },
  contactProfile: {
    flexDirection: 'row',
    marginRight: 70,
    width: '66%'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
    borderRadius: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },

  wallpaper:{
    position: 'absolute',
    height: '100%',
    width: '100%',
  }
  
});