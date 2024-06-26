import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  callItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  foto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  callDetails: {
    flex: 1,
    marginLeft: 10,
  },
  nome: {
    fontSize: 16,
    color: '#fff',
  },
  hora: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default styles;