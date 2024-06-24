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
    backgroundColor: '#ede7f6', // Cor de fundo roxo claro
  },
  header: {
    backgroundColor: '#4b0082', // Cor roxa para o header
  },
  headerText: {
    color: '#fff', // Texto branco para o headerText
  },
  menuButtonText: {
    color: '#fff', // Texto branco para o menuButtonText
  },
  info: {
    backgroundColor: '#e6e6fa', // Cor roxa clara para o info
    color: '#555', // Texto cinza para o info
  },
  contact: {
    color: '#4b0082', // Roxo escuro para o contact
  },
  preview: {
    color: '#555', // Texto cinza para o preview
  },
  date: {
    color: '#aaa', // Texto cinza para o date
  },
  footerText: {
    color: '#4b0082', // Roxo escuro para o footerText
  },
  textInput: {
    backgroundColor: '#e0e0e0', // Cor de fundo para o textInput
    color: '#000', // Texto preto para o textInput
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
    backgroundColor: '#DCF8C6', // Cor de fundo para as mensagens do usuário
  },
  otherMessage: {
    backgroundColor: '#fff', // Cor de fundo para as mensagens de outros
  },
  inputContainer: {
    backgroundColor: '#fff', // Cor de fundo para o container de input
  },
  sendButton: {
    backgroundColor: '#bb86fc', // Cor de fundo para o botão de enviar
  },
  sendButtonText: {
    color: '#fff', // Texto branco para o texto do botão de enviar
  },
  profileImage: {
    borderColor: '#ccc', // Cor da borda para a imagem de perfil
  },
  footer: {
    backgroundColor: '#f8f8f8', // Cor de fundo para o footer
  },
  chatItem: {
    backgroundColor: 'none', // Cor de fundo para o chatItem
  },
  messageContainer: {
    backgroundColor: 'none', // Cor de fundo para o messageContainer
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
    fontSize: 25,
    right: 10,
    top: 10,
    color: 'white', 
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#121212', // Cor de fundo roxo escuro
  },
  header: {
    backgroundColor: '#1f1f1f', // Cor de fundo roxo escuro para o header
  },
  headerText: {
    color: '#bb86fc', // Roxo claro para o headerText
  },
  menuButtonText: {
    color: '#bb86fc', // Roxo claro para o menuButtonText
  },
  info: {
    backgroundColor: '#333', // Cor de fundo roxo escuro para o info
    color: '#ccc', // Cinza claro para o info
  },
  contact: {
    color: '#bb86fc', // Roxo claro para o contact
  },
  preview: {
    color: '#bbb', // Cinza claro para o preview
  },
  date: {
    color: '#888', // Cinza médio para o date
  },
  footerText: {
    color: '#bb86fc', // Roxo claro para o footerText
  },
  textInput: {
    backgroundColor: '#333', // Cor de fundo roxo escuro para o textInput
    color: '#ccc', // Texto cinza claro para o textInput
  },
  button: {
    backgroundColor: '#8C9EFF', // Cor de fundo roxo claro para o button
  },
  buttonText: {
    color: '#fff', // Texto branco para o buttonText
  },
  userMessage: {
    backgroundColor: '#a1a1b4', // Cor de fundo roxo claro para as mensagens do usuário
  },
  otherMessage: {
    backgroundColor: '#7f7fA0', // Cor de fundo roxo claro nas mensagens de outros
  },
  inputContainer: {
    backgroundColor: '#1f1f1f', // Cor de fundo roxo escuro para o container de input
  },
  sendButton: {
    backgroundColor: '#4b0082', // Cor de fundo roxo claro para o botão de enviar
  },
  sendButtonText: {
    color: '#fff', // Texto branco para o texto do botão de enviar
  },
  profileImage: {
    borderColor: '#555', // Cor da borda para a imagem de perfil
  },

  footer: {
    backgroundColor: '#1f1f1f', // Cor de fundo roxo escuro para o footer
  },
  chatItem: {
    backgroundColor: 'none', // Cor de fundo para o chatItem
  },
  messageContainer: {
    backgroundColor: 'none', // Cor de fundo para o messageContainer
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
    fontSize: 25,
    right: 10,
    top: 10,
    color: '#bb86fc', 
  },
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