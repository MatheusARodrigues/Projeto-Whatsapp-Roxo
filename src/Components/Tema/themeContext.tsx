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

const lightTheme = StyleSheet.create({
    container: {
        backgroundColor: '#ede7f6',
    },
    header: {
        backgroundColor: '#4b0082',
    },
    headerText: {
        color: '#fff',
    },
    menuButtonText: {
        color: '#fff',
    },
    info: {
        backgroundColor: '#e6e6fa',
        color: '#555',
    },
    contact: {
        color: '#4b0082',
    },
    preview: {
        color: '#555',
    },
    date: {
        color: '#aaa',
    },
    footerText: {
        color: '#4b0082',
    },
});

const darkTheme = StyleSheet.create({
    container: {
        backgroundColor: '#301934',
    },
    header: {
        backgroundColor: '#1f1f1f',
    },
    headerText: {
        color: '#bb86fc',
    },
    menuButtonText: {
        color: '#bb86fc',
    },
    info: {
        backgroundColor: '#333',
        color: '#ccc',
    },
    contact: {
        color: '#bb86fc',
    },
    preview: {
        color: '#bbb',
    },
    date: {
        color: '#888',
    },
    footerText: {
        color: '#bb86fc',
    },
});

export const getThemeStyles = (theme: string) => (theme === 'light' ? lightTheme : darkTheme);