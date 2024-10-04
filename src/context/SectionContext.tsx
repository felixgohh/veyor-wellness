import { createContext, useContext, useState, ReactNode } from 'react';

type SectionType = {
  name: string;
  path: string;
};

type SectionContextType = {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  sectionList: SectionType[];
};

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const useSection = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSection must be used within an SectionProvider');
  }
  return context;
};

const sectionList: SectionType[] = [
  { name: 'Choose Appointment', path: '/' },
  { name: 'Your Info', path: '/guest-info' },
  { name: 'Confirmation', path: '/confirmation' },
];

// Provider component
export const SectionProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<SectionType>(
    sectionList[0]
  );

  return (
    <SectionContext.Provider
      value={{ activeSection, setActiveSection, sectionList }}
    >
      {children}
    </SectionContext.Provider>
  );
};
