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

export const reportStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  reasonButton: {
    width: "100%",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  reasonText: {
    fontSize: 16,
  },
});