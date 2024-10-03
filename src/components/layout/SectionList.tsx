import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSection } from '../../context/SectionContext';

export default function SectionList() {
  const { sectionList, activeSection, setActiveSection } = useSection();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const active = sectionList.find((section) => section.path === pathname);
    if (active && activeSection.path !== active.path) {
      setActiveSection(active);
    }
  }, [location.pathname, activeSection, sectionList, setActiveSection]);

  return (
    <ul className="flex flex-row border border-gray-400 rounded-md mb-10">
      {sectionList.map((section, index) => (
        <li
          key={section.path}
          className={`relative first:rounded-tl-md first:rounded-bl-md last:rounded-tr-md last:rounded-br-md text-sm md:text-base p-2 flex-1 font-semibold flex items-center justify-center text-center ${
            activeSection.path === section.path
              ? 'bg-white text-black border-b border-b-black'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {section.name}
          {index !== sectionList.length - 1 ? (
            <div
              className={`absolute z-10 right-[-8px] md:right-[-18px] top-1/2 transform -translate-y-1/2 h-0 md:h-full w-0 border-l-8 md:border-l-[20px] border-transparent border-t-8 md:border-t-[20px] border-b-8 md:border-b-[20px] ${
                activeSection.path === section.path
                  ? 'border-l-white'
                  : 'border-l-gray-100'
              }`}
            ></div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
