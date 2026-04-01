
import React from 'react';
import { CONTACT_INFO } from '../constants';
import { Instagram, Youtube, Facebook, Mail, Phone, MapPin, Music2, Settings } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#111111] text-white pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex flex-col mb-8">
              <span className="text-2xl font-black tracking-tight text-[#833c4e]">
                MARÍLIA ALMEIDA
              </span>
              <span className="text-[9px] tracking-[0.5em] font-extrabold uppercase text-[#a89b92] mt-1">
                Endocrinologia
              </span>
            </div>
            <p className="text-[#a89b92] text-sm leading-relaxed mb-10 font-light text-refined">
              Promovendo saúde hormonal, emagrecimento consciente e longevidade através de medicina baseada em evidências e um olhar genuinamente humano.
            </p>
            <div className="flex space-x-8">
              {[
                { icon: Instagram, link: CONTACT_INFO.instagramUrl },
                { icon: Music2, link: CONTACT_INFO.tiktokUrl },
                { icon: Youtube, link: CONTACT_INFO.youtubeUrl },
                { icon: Facebook, link: '#' }
              ].map((social, i) => (
                <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#833c4e] transition-all transform hover:scale-125">
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.4em] mb-10 text-white/30">Navegação</h4>
            <ul className="space-y-5 text-[#a89b92] text-[11px] font-extrabold uppercase tracking-[0.2em]">
              <li><button onClick={() => onNavigate?.('landing')} className="hover:text-white transition-colors">Início</button></li>
              <li><button onClick={() => onNavigate?.('blog')} className="hover:text-white transition-colors">Conteúdo</button></li>
              <li><a href="#sobre" className="hover:text-white transition-colors">Biografia</a></li>
              <li><button onClick={() => onNavigate?.('atendimento')} className="hover:text-white transition-colors text-left">Atendimento</button></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Dúvidas</a></li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.4em] mb-10 text-white/30">Contato & Localização</h4>
            <div className="space-y-8 text-[#a89b92] text-sm font-light">
              <div className="flex items-start space-x-5 group">
                <div className="p-2.5 bg-white/5 rounded-xl text-[#833c4e] group-hover:bg-[#833c4e]/20 transition-all">
                  <MapPin size={20} />
                </div>
                <span className="group-hover:text-white transition-colors leading-relaxed">{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-5 group">
                <div className="p-2.5 bg-white/5 rounded-xl text-[#833c4e] group-hover:bg-[#833c4e]/20 transition-all">
                  <Phone size={20} />
                </div>
                <span className="group-hover:text-white transition-colors tracking-tight font-medium">{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-5 group">
                <div className="p-2.5 bg-white/5 rounded-xl text-[#833c4e] group-hover:bg-[#833c4e]/20 transition-all">
                  <Mail size={20} />
                </div>
                <span className="group-hover:text-white transition-colors tracking-tight font-medium break-all">contato@dramariliaalmeida.med.br</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-[#a89b92] uppercase tracking-[0.3em] font-extrabold">
          <div className="mb-8 md:mb-0 flex items-center space-x-6">
            <span className="px-4 py-1.5 bg-white/5 rounded-lg border border-white/5">CRM {CONTACT_INFO.crm}</span>
            <span className="px-4 py-1.5 bg-white/5 rounded-lg border border-white/5">RQE {CONTACT_INFO.rqe}</span>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-12">
            <div className="flex space-x-8">
              <button onClick={() => onNavigate?.('admin')} className="hover:text-[#833c4e] transition-colors flex items-center space-x-2">
                <Settings size={12} />
                <span>Painel Admin</span>
              </button>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            </div>
            <span className="opacity-30 flex items-center gap-2">
              © 2026 Dra. Marília Almeida.
              <span className="opacity-50">|</span>
              Feito por <a href="https://tx3.digital" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-all">TX3.digital</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
