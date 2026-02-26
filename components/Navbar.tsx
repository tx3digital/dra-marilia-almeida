
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'landing' | 'agendamento' | 'blog' | 'atendimento') => void;
  onAgendar: () => void;
  isInternal?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onAgendar, isInternal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#', type: 'link', action: () => onNavigate('landing') },
    { name: 'Conteúdo', href: '#blog', type: 'link', action: () => onNavigate('blog') },
    { name: 'Atendimento', href: '#atendimento', type: 'link', action: () => onNavigate('atendimento') },
  ];

  const handleLogoClick = () => {
    onNavigate('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAgendarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    onAgendar();
  };

  const handleNavLinkClick = (e: React.MouseEvent, link: any) => {
    if (link.href === '#blog' || link.href === '#atendimento') {
      e.preventDefault();
      link.action();
      setIsOpen(false);
    } else if (link.href.startsWith('#')) {
       link.action();
       setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isInternal ? 'bg-white/95 backdrop-blur-sm shadow-sm py-2' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex flex-col cursor-pointer" onClick={handleLogoClick}>
            <span className={`text-xl font-black tracking-tight leading-none ${isScrolled || isInternal ? 'text-[#833c4e]' : 'text-gray-900'}`}>
              DR.<sup>ª</sup> MARÍLIA ALMEIDA
            </span>
            <span className={`text-[9px] tracking-[0.5em] font-extrabold uppercase mt-1 ${isScrolled || isInternal ? 'text-[#a89b92]' : 'text-gray-600'}`}>
              Endocrinologia
            </span>
          </div>

          {!isInternal && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-10">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavLinkClick(e, link)}
                    className={`text-gray-700 hover:text-[#833c4e] transition-colors px-1 py-2 text-[11px] font-extrabold uppercase tracking-[0.25em]`}
                  >
                    {link.name}
                  </a>
                ))}
                <button
                  onClick={handleAgendarClick}
                  className="bg-[#833c4e] text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#6D2437] transition-all transform hover:scale-105 shadow-md shadow-[#833c4e]/20"
                >
                  Agendar
                </button>
              </div>
            </div>
          )}

          {isInternal && (
             <button onClick={handleLogoClick} className="hidden md:flex items-center space-x-2 text-gray-500 hover:text-[#833c4e] transition-colors font-black uppercase text-[10px] tracking-widest">
                <span>Voltar ao site</span>
             </button>
          )}

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#f7f5f3] shadow-xl absolute top-full left-0 w-full border-t border-[#e0d5c7]/20">
          <div className="px-6 pt-6 pb-12 space-y-2 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link)}
                className="text-gray-800 hover:text-[#833c4e] block py-6 text-xs font-extrabold uppercase tracking-[0.3em] border-b border-[#e0d5c7]/10"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={handleAgendarClick}
              className="bg-[#833c4e] text-white block mx-auto mt-10 py-5 rounded-full text-xs font-bold uppercase tracking-[0.3em] shadow-lg w-full max-w-xs"
            >
              Agendar Agora
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
