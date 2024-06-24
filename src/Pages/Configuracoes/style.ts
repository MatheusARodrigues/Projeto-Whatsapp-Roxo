import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ede7f6',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4a148c',
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
    profileImageWrapper: {
        position: 'relative',
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    cameraIconContainer: {
        position: 'absolute',
        bottom: 5,
        right: 58,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 5,
    },
    cameraIcon: {
        width: 20,
        height: 20,
    },
    messageContainer: {
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#1DB499',
    },
    inputContainer: {
        flex: 1,
        marginLeft: 10,
    },
    editableContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 5,
        color: '#000',
        flex: 1,
    },
    inputEditable: {
        backgroundColor: '#fff',
        color: '#000',
    },
    editIcon: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    wallpaper: {
        width: 0,
        height: 0,
    },
});

export default styles;