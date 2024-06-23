import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ede7f6',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#4b0082',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    logo: {
        width: 50,
        height: 50,
    },
    menuButton: {
        padding: 10,
    },
    menuButtonText: {
        fontSize: 24,
        color: '#fff',
    },
    messageContainer: {
        flexDirection: 'row',
        padding: 5,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    contact: {
        fontWeight: 'bold',
        color: '#4b0082',
    },
    preview: {
        color: '#555',
    },
    date: {
        color: '#aaa',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    lockIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    footerText: {
        color: '#4b0082',
    },

    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default styles;