import { createContext, useState } from 'react';

interface IMenuContextValue {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

interface TMenuProviderProps {
  children: React.ReactNode;
}

// Исправляем название контекста
export const MenuContext = createContext<IMenuContextValue>({
  isOpen: false,
  setIsOpen: () => {},
});

export const MenuProvider = ({ children }: TMenuProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuContext.Provider>
  );
};
