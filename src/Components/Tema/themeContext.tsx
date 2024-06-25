import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Chamadas from '../../Pages/Chamadas';

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
  containerPerfil: {
    backgroundColor: '#ede7f6',
    height: '100%',
  },
  header: {
    backgroundColor: '#4b0082',
  },
  headerConfigText: {
    color: '#bb86fc',
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
  buttonConfig: {
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
    top: 10,
    marginTop: 8,
  },

  seta: {
    fontSize: 40,
    left: -15,
    top: 10,
    color: 'white', 
  },
  pontos: {
    fontSize: 30,
    right: 10,
    top: 10,
    color: 'white', 
  },
  chamada: {
    fontSize: 30,
    right: 20,
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
  },
  recordButton: {
    backgroundColor: '#bb86fc',
    borderRadius: 50,
    padding: 10,
  },
  recordButtonText: {
    color: '#fff',
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileLeave: {
    flexDirection: "row",
    gap: 90,
    marginRight: 130,
    marginTop: 20,
  },
  perfilImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  profilePhone: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  perfilContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  perfilLeave: {
    flexDirection: "row",
    gap: 90,
    marginRight: 130,
    marginTop: 20,
  },
  profileDescription: {
    fontSize: 16,
    color: "#000",
    textAlign: "justify",
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: "#bb86fc",
    padding: 16,
    width: 400,
    marginLeft: 42,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionContainerBlock: {
    marginBottom: 24,
    backgroundColor: "#bb86fc",
    padding: 16,
    width: 400,
    marginLeft: 42,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    gap: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#4b0082",
    borderRadius: 10,
    alignItems: "center",
  },
  sectionButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  actionButton: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  actionButtonText: {
    fontSize: 16,
  },

  blockButton: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingRight: 40,
  },

  blockButtonText: {
    color: "#000",
  },
  reportButton: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingRight: 30,
  },
  reportButtonText: {
    color: "#000",
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
  },
  containerPerfil: {
    backgroundColor: '#121212',
    height: '100%',
  },
  headerConfigText: {
    color: '#4b0082',
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
  buttonConfig: {
    marginTop: 10,
    height: 50,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4b0082',
    alignContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
  chamada: {
    fontSize: 30,
    right: 20,
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
  },
  recordButton: {
    backgroundColor: '#4b0082',
    borderRadius: 50,
    padding: 10,
  },
  recordButtonText: {
    color: '#fff',
  },
  perfilImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  profilePhone: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  perfilContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  perfilLeave: {
    flexDirection: "row",
    gap: 90,
    marginRight: 130,
    marginTop: 20,
  },
  profileDescription: {
    fontSize: 16,
    color: "#fff",
    textAlign: "justify",
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: "#4b0082",
    padding: 16,
    width: 400,
    marginLeft: 42,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionContainerBlock: {
    marginBottom: 24,
    backgroundColor: "#4b0082",
    padding: 16,
    width: 400,
    marginLeft: 42,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    gap: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  sectionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#bb86fc",
    borderRadius: 10,
    alignItems: "center",
  },
  sectionButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  actionButton: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  actionButtonText: {
    fontSize: 16,
    color: "#fff",
  },

  blockButton: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingRight: 40,
  },

  blockButtonText: {
    color: "#fff",
  },
  reportButton: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingRight: 30,
  },
  reportButtonText: {
    color: "#fff",
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