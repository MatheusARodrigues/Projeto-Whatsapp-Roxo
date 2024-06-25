import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede7f6',
  },

  subtitle: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#bb86fc',
  },

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
    fontWeight: 'bold',
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