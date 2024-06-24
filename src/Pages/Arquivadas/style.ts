import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerText: {
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  menuButton: {
    padding: 10,
  },
  menuButtonText: {
    fontSize: 20,
  },
  info: {
    padding: 10,
    textAlign: 'center',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 10,
  },
  contact: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  preview: {
    fontSize: 14,
    color: '#777',
  },
  date: {
    fontSize: 12,
    color: '#aaa',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  lockIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  footerText: {
    flex: 1,
    fontSize: 12,
    color: '#aaa',
  },
});