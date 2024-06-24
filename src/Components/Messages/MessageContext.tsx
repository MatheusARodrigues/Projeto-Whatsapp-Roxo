import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Message = {
  id: string;
  contact: string;
  preview: string;
  date: string;
  description: string;
  phone: string;
};

type MessagesContextType = {
  messages: Message[];
  archivedMessages: Message[];
  archiveMessage: (messageId: string) => void;
  unarchiveMessage: (messageId: string) => void;
};

const initialMessages: Message[] = [
    { id: '1', contact: '+55 24 99324-0212', phone: '+55 24 99324-0212', preview: 'Bom dia!', date: '15/06/2024', description: 'Apaixonada por viagens e fotografia 📸🌍. Sempre buscando novas aventuras e memórias! Siga meu Instagram para ver minhas últimas fotos e histórias: @mariasilva. Disponível para colaborações e parcerias - entre em contato!'},
    { id: '2', contact: 'Aula 2024', phone: '+55 24 99324-2012', preview: 'Foto', date: '14/06/2024', description: 'Engenheiro de software 💻 e gamer nas horas vagas 🎮. Amante de tecnologia e inovação, curioso sobre IA e desenvolvimento de apps. Me siga no Twitter para atualizações sobre projetos: @joaosouza_dev.'},
    { id: '3', contact: ':)', phone: '+55 24 99324-0212', preview: 'Você bloqueou esse contato', date: '', description: 'esigner gráfico e artista digital 🎨. Transformando ideias em realidade visual. Adoro trabalhar com cores, formas e tipografia.' },
    { id: '4', contact: '+55 18 8839-1213', phone: '+55 18 8839-1213', preview: 'Áudio', date: '17/05/2020', description: 'Chef de cozinha 🍳 e amante de comida 🍕🍣. Explorando sabores e criando receitas únicas. Compartilho dicas culinárias e receitas no meu blog.' },
  ];

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [archivedMessages, setArchivedMessages] = useState<Message[]>([]);

  const archiveMessage = (messageId: string) => {
    const messageToArchive = messages.find((msg) => msg.id === messageId);
    if (messageToArchive) {
      setArchivedMessages((prevArchivedMessages) => [...prevArchivedMessages, messageToArchive]);
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
    }
  };

  const unarchiveMessage = (messageId: string) => {
    const messageToUnarchive = archivedMessages.find((msg) => msg.id === messageId);
    if (messageToUnarchive) {
      setMessages((prevMessages) => [...prevMessages, messageToUnarchive]);
      setArchivedMessages((prevArchivedMessages) => prevArchivedMessages.filter((msg) => msg.id !== messageId));
    }
  };

  return (
    <MessagesContext.Provider value={{ messages, archivedMessages, archiveMessage, unarchiveMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};