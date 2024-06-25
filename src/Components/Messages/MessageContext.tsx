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

type MessagesContextType = {
  messages: Message[];
  archivedMessages: Message[];
  archiveMessage: (messageId: string) => void;
  unarchiveMessage: (messageId: string) => void;
  updateMessagePreview: (messageId: string, newPreview: string) => void;
  getImageUri: (phone: string) => string | undefined;
  getAvatarImage: (phone: string) => string | undefined;
};

const initialMessages: Message[] = [
  { id: '1', contact: '+55 24 99324-0212', phone: '+55 24 99324-0212', preview: '.', date: new Date().toLocaleDateString(), description: '...', imageUri: 'https://static.escolakids.uol.com.br/2019/07/coala.jpg' },
  { id: '2', contact: 'Aula 2024', phone: '+55 24 99324-2012', preview: '.', date: new Date().toLocaleDateString(), description: '...', imageUri: 'https://alconpet.com.br/common/img/pet/img_lg/chinchila.webp' },
  { id: '3', contact: ':)', phone: '+55 24 99324-0212', preview: '.', date: new Date().toLocaleDateString(), description: '...', imageUri: 'https://s2.glbimg.com/shVyfsOkEsvzsdRQWbutCuMJrxs=/400x350/top/e.glbimg.com/og/ed/f/original/2013/12/03/como_criar_tucano.jpg' },
  { id: '4', contact: 'Patricia', phone: '+55 24 99324-8212', preview: '.', date: new Date().toLocaleDateString(), description: '...', imageUri: 'https://ak-br-pic.kwai.net/kimg/EKzM1y8qmgEKAnMzEg1waG90by1vdmVyc2VhGoQBdXBpYy8yMDIyLzExLzI1LzIzL0JNakF5TWpFeE1qVXlNekUwTlRCZk1UVXdNREF4TXpjeU9UVXlPRGszWHpFMU1ERXdNVFF3TXpNMU1EUXhNVjh5WHpNPV9vZmZuX0I1OGJhMjUzZWNkYTY4NjFjNGQ2ODRlZDgxMDMxMzdiNi53ZWJw.webp' },
  { id: '5', contact: 'Juju', phone: '+55 24 99324-1221', preview: '.', date: new Date().toLocaleDateString(), description: '...', imageUri: 'https://super.abril.com.br/wp-content/uploads/2018/07/568d54ba0e216336d722d657thinkstockphotos-163945072.jpeg?&w=720&crop=1' },
  { id: '6', contact: 'Eduardo Pereira', phone: '+55 24 99324-1201', preview: '.', date: new Date().toLocaleDateString(), description: '...', imageUri: 'https://static.wikia.nocookie.net/mundo-animal/images/d/d1/Narval.jpg/revision/latest?cb=20150831002447&path-prefix=pt' }
];

const MessagesContext = createContext<MessagesContextType>({
  messages: initialMessages,
  archivedMessages: [],
  archiveMessage: () => {},
  unarchiveMessage: () => {},
  updateMessagePreview: () => {},
  getImageUri: () => undefined,
  getAvatarImage: () => undefined,
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

  const getImageUri = (phone: string) => {
    const message = messages.find((msg) => msg.phone === phone);
    return message ? message.imageUri : undefined;
  };

  const getAvatarImage = (phone: string): string | undefined => {
    const message = messages.find((msg) => msg.phone === phone);
    return message ? message.imageUri : undefined;
  };

  return (
    <MessagesContext.Provider value={{ messages, archivedMessages, archiveMessage, unarchiveMessage, updateMessagePreview, getImageUri, getAvatarImage }}>
      {children}
    </MessagesContext.Provider>
  );
};