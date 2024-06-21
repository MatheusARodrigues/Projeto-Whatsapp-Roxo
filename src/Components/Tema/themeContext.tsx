import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StyleSheet } from 'react-native';

type ThemeContextType = {
    theme: string;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => {},
});

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

const lightStyles = StyleSheet.create({
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
    },
    button: {
        marginTop: 20,
    },
    text: {
        color: '#000',
    },
    menuButtonText: {
        fontSize: 24,
        color: '#fff',
    },
});

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#bb86fc',
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
    },
    text: {
        color: '#fff',
    },
    menuButtonText: {
        fontSize: 24,
        color: '#bb86fc',
    },
});

export const getStyles = (theme: string) => (theme === 'light' ? lightStyles : darkStyles);