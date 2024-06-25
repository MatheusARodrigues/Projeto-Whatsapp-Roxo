import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede7f6',
    padding: 10,
  },
  title: {
    fontSize: 34,
    color: '#4a148c',
    marginTop: 10,
    marginLeft: 5,
    textAlign: "left",
  },

  subtitle: {
    fontSize: 20,
    color: '#4a148c',
    marginTop: 20,
    marginLeft: 5,
    textAlign: "left",
  },

  subtitle2: {
    fontSize: 15,
    color: '#4a148c',
    marginTop: 20,
    marginLeft: 5,
    textAlign: "left",
  },

  atualizacoesItem: {
    marginLeft: 5,
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },

  avatar: {
    marginLeft: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  atualizacoesInfo: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  
  time: {
    fontSize: 14,
    color: '#4a148c',
  },
  boxArray: {
    gap: 5,
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#aaa',
    marginVertical: 5,
  },
  divider2: {
    height: 1,
    backgroundColor: '#aaa',
    marginVertical: 10,
    marginBottom: 14
  },

  divider3: {
    height: 1,
    backgroundColor: '#aaa',
    
  },

  StatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    height: 60,
  },

  StatusAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },

  StatusInfo: {
    flex: 1
  },

  StatusText: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  StatusTime: {
    fontSize: 14,
    color: '#666'
  },

  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  icon: {
    marginLeft: 5,
    marginTop: 5,
    marginRight: 8
  },
  
});