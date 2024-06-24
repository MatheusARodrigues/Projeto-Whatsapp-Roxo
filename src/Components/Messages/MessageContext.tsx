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
  updateMessagePreview: (messageId: string, newPreview: string) => void;
};

const initialMessages: Message[] = [
    { id: '1', contact: '+55 24 99324-0212', phone: '+55 24 99324-0212', preview: '', date: new Date().toLocaleDateString(), description: 'Apaixonada por viagens e fotografia 📸🌍. Sempre buscando novas aventuras e memórias! Siga meu Instagram para ver minhas últimas fotos e histórias: @mariasilva. Disponível para colaborações e parcerias - entre em contato!'},
    { id: '2', contact: 'Aula 2024', phone: '+55 24 99324-2012', preview: '', date: new Date().toLocaleDateString(), description: 'Engenheiro de software 💻 e gamer nas horas vagas 🎮. Amante de tecnologia e inovação, curioso sobre IA e desenvolvimento de apps. Me siga no Twitter para atualizações sobre projetos: @joaosouza_dev.'},
    { id: '3', contact: ':)', phone: '+55 24 99324-0212', preview: '', date: new Date().toLocaleDateString(), description: 'esigner gráfico e artista digital 🎨. Transformando ideias em realidade visual. Confira meu portfólio online e me siga para mais atualizações: @artesdabela. Aberta a freelas e colaborações criativas.'},
    { id: '4', contact: 'Patricia', phone: '+55 24 99324-8212', preview: '', date: new Date().toLocaleDateString(), description: 'Especialista em marketing digital 📈 e estrategista de conteúdo. Ajudando marcas a crescer e alcançar seus objetivos. Siga minhas dicas e insights no LinkedIn: Patricia Lima. Sempre em busca de novos desafios e oportunidades!'},
    { id: '5', contact: 'Juju', phone: '+55 24 99324-1221', preview: '', date: new Date().toLocaleDateString(), description: 'Estudante de medicina 🩺 e apaixonada por ciência e saúde. Compartilhando meu dia a dia e dicas de estudo no Instagram: @med.julia. Em busca de aprender e crescer a cada dia. Vamos juntos nessa jornada!'},
    { id: '6', contact: 'Eduardo Pereira', phone: '+55 24 99324-1201', preview: '', date: new Date().toLocaleDateString(), description: 'Fotógrafo de natureza e vida selvagem 📷🌿. Capturando a beleza do mundo natural através das lentes. Confira meu trabalho no site: www.eduardopereirafotos.com. Disponível para projetos e workshops.'}
];

const MessagesContext = createContext<MessagesContextType>({
  messages: initialMessages,
  archivedMessages: [],
  archiveMessage: () => {},
  unarchiveMessage: () => {},
  updateMessagePreview: () => {}
});

export const useMessages = () => {
  return useContext(MessagesContext);
};

type MessagesProviderProps = {
  children: ReactNode;
};

export const MessagesProvider: React.FC<MessagesProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [archivedMessages, setArchivedMessages] = useState<Message[]>([]);

  const archiveMessage = (messageId: string) => {
    const messageToArchive = messages.find((message) => message.id === messageId);
    if (messageToArchive) {
      setArchivedMessages([...archivedMessages, messageToArchive]);
      setMessages(messages.filter((message) => message.id !== messageId));
    }
  };

  const unarchiveMessage = (messageId: string) => {
    const messageToUnarchive = archivedMessages.find((message) => message.id === messageId);
    if (messageToUnarchive) {
      setMessages([...messages, messageToUnarchive]);
      setArchivedMessages(archivedMessages.filter((message) => message.id !== messageId));
    }
  };

  const updateMessagePreview = (messageId: string, newPreview: string) => {
    setMessages((prevMessages) => prevMessages.map((message) => 
      message.id === messageId ? { ...message, preview: newPreview } : message
    ));
  };

  return (
    <MessagesContext.Provider value={{ messages, archivedMessages, archiveMessage, unarchiveMessage, updateMessagePreview }}>
      {children}
    </MessagesContext.Provider>
  );
};