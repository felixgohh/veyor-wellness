import { createContext, useContext, useState, ReactNode } from 'react';

type SectionContextType = {
  activeSection: number;
  setActiveSection: (value: number) => void;
  sectionList: string[];
  nextSection: () => void;
};

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const useSection = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSection must be used within an SectionProvider');
  }
  return context;
};

// Provider component
export const SectionProvider = ({ children }: { children: ReactNode }) => {
  const sectionList = ['Choose Appoinment', 'Your Info', 'Confirmation'];
  const [activeSection, setActiveSection] = useState<number>(0);

  const nextSection = () => {
    if (activeSection < sectionList.length - 1)
      setActiveSection(activeSection + 1);
  };

  return (
    <SectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        sectionList,
        nextSection,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};
