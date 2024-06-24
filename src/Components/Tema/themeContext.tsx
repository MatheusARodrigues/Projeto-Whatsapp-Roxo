import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StyleSheet } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

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
  textInput: {
    backgroundColor: '#e0e0e0',
    color: '#000', 
  },
  button: {
    backgroundColor: '#bb86fc',
  },
  buttonText: {
    color: '#fff',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  userMessage: {
    backgroundColor: '#DCF8C6', 
  },
  otherMessage: {
    backgroundColor: '#fff',
  },
  inputContainer: {
    backgroundColor: '#fff', 
  },
  sendButton: {
    backgroundColor: '#bb86fc', 
  },
  sendButtonText: {
    color: '#fff', 
  },
  profileImage: {
    borderColor: '#ccc', 
  },
  footer: {
    backgroundColor: '#f8f8f8',
  },
  chatItem: {
    backgroundColor: 'none', 
  },
  messageContainer: {
    backgroundColor: 'none', 
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    top: 10,
    paddingHorizontal: 15,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    top: 10,
  },

  seta: {
    fontSize: 40,
    left: -10,
    top: 10,
    color: 'white', 
  },
  pontos: {
    fontSize: 30,
    right: 10,
    top: 10,
    color: 'white', 
  },
  archiveButton: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  unarchiveButton: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  archivedMessageInfo: {
    backgroundColor: '#bb86fc',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  }
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
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
  textInput: {
    backgroundColor: '#333', 
    color: '#ccc', 
  },
  button: {
    backgroundColor: '#4b0082', 
  },
  buttonText: {
    color: '#fff',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  userMessage: {
    backgroundColor: '#a1a1b4', 
  },
  otherMessage: {
    backgroundColor: '#7f7fA0', 
  },
  inputContainer: {
    backgroundColor: '#1f1f1f',
  },
  sendButton: {
    backgroundColor: '#4b0082', 
  },
  sendButtonText: {
    color: '#fff', 
  },
  profileImage: {
    borderColor: '#555', 
  },

  footer: {
    backgroundColor: '#1f1f1f', 
  },
  chatItem: {
    backgroundColor: 'none', 
  },
  messageContainer: {
    backgroundColor: 'none', 
  },
  
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    top: 10,
    paddingHorizontal: 15,
  },

  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#bb86fc',
    flex: 1,
    top: 10,
  },

  seta: {
    fontSize: 40,
    left: -10,
    top: 10,
    color: '#bb86fc', 
  },

  pontos: {
    fontSize: 30,
    right: 10,
    top: 10,
    color: '#bb86fc', 
  },
  archiveButton: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  unarchiveButton: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  archivedMessageInfo: {
    backgroundColor: '#4b0082',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  }
});

export const getThemeStyles = (theme: Theme) => {
  switch (theme) {
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
    default:
      return lightTheme;
  }
};