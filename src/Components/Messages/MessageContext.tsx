import axios from 'axios';
import React, { createContext, useState, useContext, ReactNode } from 'react';

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

type MessagesContextType = {
  messages: Message[];
  archivedMessages: Message[];
  currentUser: User | null;
  archiveMessage: (messageId: string) => void;
  unarchiveMessage: (messageId: string) => void;
  updateMessagePreview: (messageId: string, newPreview: string) => void;
  getAvatarImage: (phone: string) => string | undefined;
  fetchUserByPhone: (phone: string) => Promise<void>;
};

const initialMessages: Message[] = [
  { id: '1', contact: '+55 24 99324-0212', phone: '+55 24 99424-0212', preview: '.', date: new Date().toLocaleDateString(), description: 'Apaixonada por viagens e fotografia 📸🌍. Sempre buscando novas aventuras e memórias! Siga meu Instagram para ver minhas últimas fotos e histórias: @mariasilva. Disponível para colaborações e parcerias - entre em contato!', imageUri: 'https://static.escolakids.uol.com.br/2019/07/coala.jpg' },
  { id: '2', contact: 'Aula 2024', phone: '+55 24 99324-2012', preview: '.', date: new Date().toLocaleDateString(), description: 'Engenheiro de software 💻 e gamer nas horas vagas 🎮. Amante de tecnologia e inovação, curioso sobre IA e desenvolvimento de apps. Me siga no Twitter para atualizações sobre projetos: @joaosouza_dev.', imageUri: 'https://alconpet.com.br/common/img/pet/img_lg/chinchila.webp' },
  { id: '3', contact: ':)', phone: '+55 24 99324-0212', preview: '.', date: new Date().toLocaleDateString(), description: 'Designer gráfico e artista digital 🎨. Transformando ideias em realidade visual. Confira meu portfólio online e me siga para mais atualizações: @artesdabela. Aberta a freelas e colaborações criativas.', imageUri: 'https://s2.glbimg.com/shVyfsOkEsvzsdRQWbutCuMJrxs=/400x350/top/e.glbimg.com/og/ed/f/original/2013/12/03/como_criar_tucano.jpg' },
  { id: '4', contact: 'Patricia', phone: '+55 24 99324-8212', preview: '.', date: new Date().toLocaleDateString(), description: 'Especialista em marketing digital 📈 e estrategista de conteúdo. Ajudando marcas a crescer e alcançar seus objetivos. Siga minhas dicas e insights no LinkedIn: Patricia Lima. Sempre em busca de novos desafios e oportunidades!', imageUri: 'https://ak-br-pic.kwai.net/kimg/EKzM1y8qmgEKAnMzEg1waG90by1vdmVyc2VhGoQBdXBpYy8yMDIyLzExLzI1LzIzL0JNakF5TWpFeE1qVXlNekUwTlRCZk1UVXdNREF4TXpjeU9UVXlPRGszWHpFMU1ERXdNVFF3TXpNMU1EUXhNVjh5WHpNPV9vZmZuX0I1OGJhMjUzZWNkYTY4NjFjNGQ2ODRlZDgxMDMxMzdiNi53ZWJw.webp' },
  { id: '5', contact: 'Juju', phone: '+55 24 99324-1221', preview: '.', date: new Date().toLocaleDateString(), description: 'Estudante de medicina 🩺 e apaixonada por ciência e saúde. Compartilhando meu dia a dia e dicas de estudo no Instagram: @med.julia. Em busca de aprender e crescer a cada dia. Vamos juntos nessa jornada!', imageUri: 'https://super.abril.com.br/wp-content/uploads/2018/07/568d54ba0e216336d722d657thinkstockphotos-163945072.jpeg?&w=720&crop=1' },
  { id: '6', contact: 'Eduardo Pereira', phone: '+55 24 99324-1201', preview: '.', date: new Date().toLocaleDateString(), description: 'Fotógrafo de natureza e vida selvagem 📷🌿. Capturando a beleza do mundo natural através das lentes. Confira meu trabalho no site: www.eduardopereirafotos.com. Disponível para projetos e workshops.', imageUri: 'https://static.wikia.nocookie.net/mundo-animal/images/d/d1/Narval.jpg/revision/latest?cb=20150831002447&path-prefix=pt' }
];

const MessagesContext = createContext<MessagesContextType>({
  messages: initialMessages,
  archivedMessages: [],
  currentUser: null,
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
  }

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

  return (
    <MessagesContext.Provider value={{ messages, archivedMessages, currentUser, archiveMessage, unarchiveMessage, updateMessagePreview, getAvatarImage, fetchUserByPhone }}>
      {children}
    </MessagesContext.Provider>
  );
};

