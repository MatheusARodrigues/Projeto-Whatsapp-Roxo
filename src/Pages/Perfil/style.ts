import { StyleSheet } from "react-native";
    
export const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#f5f5f5',
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 24,
    },
    profileLeave: {
      flexDirection: 'row',
      gap: 90,
      marginRight: 130,
      marginTop: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 16,
    },
    profileName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    profilePhone: {
      fontSize: 16,
      color: '#888',
      marginBottom: 8,
    },
    profileDescription: {
      fontSize: 14,
      color: '#666',
      textAlign: 'justify',
    },
    sectionContainer: {
      marginBottom: 24,
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    sectionContainerBlock: {
      marginBottom: 24,
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      gap: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    sectionButton: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: '#007AFF',
      borderRadius: 5,
      alignItems: 'center',
    },
    sectionButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    actionButton: {
      paddingVertical: 15,
      alignItems: 'center',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    actionButtonText: {
      fontSize: 16,
    },
    blockButton: {
      backgroundColor: '#ff3b30',
      borderColor: '#ff3b30',
    },
    blockButtonText: {
      color: '#fff',
    },
    reportButton: {
      backgroundColor: '#ff9500',
      borderColor: '#ff9500',
    },
    reportButtonText: {
      color: '#fff',
    },
})