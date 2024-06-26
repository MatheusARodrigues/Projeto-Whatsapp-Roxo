import axios from 'axios';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type Message = {
  id: string;
  contact: string;
  preview: string;
  date: string;
  description: string;
  phone: string;
  imageUri: string;
};

type User = {
  id: string;
  contact: string;
  phone: string;
  description: string;
};

type Call = {
  id: string;
  contact: string;
  type: 'recebida' | 'feita';
  date: string;
  photo: string;
};

// Ajuste no tipo MessagesContextType
type MessagesContextType = {
  messages: Message[];
  archivedMessages: Message[];
  currentUser: User | null;
  calls: Call[];
  fetchCallsByContact: (contact: string) => Call[];
  archiveMessage: (messageId: string) => void;
  unarchiveMessage: (messageId: string) => void;
  updateMessagePreview: (messageId: string, newPreview: string) => void;
  getAvatarImage: (phone: string) => string | undefined;
  fetchUserByPhone: (phone: string) => Promise<void>;
};

const initialMessages: Message[] = [];
const initialCalls: Call[] = []

const MessagesContext = createContext<MessagesContextType>({
  messages: initialMessages,
  archivedMessages: [],
  currentUser: null,
  calls: initialCalls,
  fetchCallsByContact: () => [],
  archiveMessage: () => {},
  unarchiveMessage: () => {},
  updateMessagePreview: () => {},
  getAvatarImage: () => undefined,
  fetchUserByPhone: async () => {},
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [calls, setCalls] = useState<Call[]>(initialCalls);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://6678658a0bd45250561e8a0a.mockapi.io/Wpp');
        setMessages(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
    fetchMessages();
  }, []);

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

  const updateMessagePreview = (chatId: string, newPreview: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === chatId ? { ...msg, preview: newPreview } : msg
      )
    );
  };

  const getAvatarImage = (phone: string): string | undefined => {
    const message = messages.find((msg) => msg.phone === phone) || archivedMessages.find((msg) => msg.phone === phone);
    return message ? message.imageUri : undefined;
  };

  const fetchUserByPhone = async (phone: string): Promise<void> => {
    try {
      const response = await axios.get('https://6678658a0bd45250561e8a0a.mockapi.io/Wpp');
      const foundUser = response.data.find((u: User) => u.phone === phone);
      if (foundUser) {
        setCurrentUser(foundUser);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      setCurrentUser(null);
    }
  };

  const fetchCallsByContact = (contact: string) => {
    return calls.filter(call => call.contact === contact);
  };

  return (
    <MessagesContext.Provider value={{ messages, archivedMessages, currentUser, calls, fetchCallsByContact, archiveMessage, unarchiveMessage, updateMessagePreview, getAvatarImage, fetchUserByPhone }}>
      {children}
    </MessagesContext.Provider>
  );
};