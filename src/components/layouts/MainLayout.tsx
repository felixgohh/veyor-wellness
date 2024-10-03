import React, { useEffect } from 'react';
import { useSection } from '../../context/SectionContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sectionList, activeSection, setActiveSection } = useSection();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const active = sectionList.find((section) => section.path === pathname);
    if (active && activeSection.path !== active.path) {
      setActiveSection(active);
    }
  }, [location.pathname, activeSection, sectionList, setActiveSection]);

  return (
    <div className="flex flex-col justify-center items-center md:w-[60%] mx-auto p-8 md:py-[5%]">
      <header>
        <h1 className="text-3xl md:text-6xl text-center">
          Book a Wellness session.
        </h1>
        <p className="text-center my-6 text-gray-500 text-sm md:text-base">
          Visit one of our expert consultant to get yourself feeling 100% again.
        </p>
      </header>
      <main className="w-full">
        <div className="flex flex-row w-full border border-gray-400 mb-10">
          {sectionList.map((section) => (
            <button
              type="button"
              key={section.path}
              onClick={() => {
                if (section.path !== activeSection.path) navigate(section.path);
              }}
              className={`text-xs md:text-sm p-2 flex-1 font-semibold ${
                activeSection.path === section.path
                  ? 'bg-white text-black border-b border-b-black'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>
        {children}
      </main>
    </div>
  );
}
