import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: "#eeeeee90",
    alignItems: 'center',
    justifyContent: 'center'
  },

  container: {
    backgroundColor: "#ff000060",
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "#f00",
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
  },

  title: {
    color: "#000",
    fontSize: 22,
    fontWeight: 'bold',
  },

  button: {
    width: '40%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "red",
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'flex-end'
   
  },

  titleButton: {
    color: '#fff',
    fontSize: 18
  }
});