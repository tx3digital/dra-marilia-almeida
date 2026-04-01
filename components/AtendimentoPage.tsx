
import React from 'react';
import { MapPin, Globe, Clock, ShieldCheck, Navigation, Phone, Mail, Info } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

interface AtendimentoPageProps {
  onBack: () => void;
  onAgendar: () => void;
}

const AtendimentoPage: React.FC<AtendimentoPageProps> = ({ onBack, onAgendar }) => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#f7f5f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section - Ajustado padding superior após remoção do breadcrumb */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-10">
          <span className="text-[#833c4e] font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Flexibilidade e Excelência</span>
          <h1 className="text-4xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase mb-6 leading-none">
            Atendimento
          </h1>
          <p className="text-[#a89b92] max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Unindo a precisão da tecnologia presencial à conveniência da telemedicina moderna.
          </p>
        </div>

        {/* Dual Modes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {/* Presencial Block */}
          <div className="bg-white p-12 md:p-16 rounded-[3.5rem] shadow-sm border border-[#e0d5c7]/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#f7f5f3] flex items-center justify-center text-[#833c4e] shadow-inner">
                  <MapPin size={28} />
                </div>
                <div className="bg-[#833c4e]/5 px-4 py-1 rounded-full">
                  <span className="text-[#833c4e] font-black uppercase tracking-widest text-[9px]">Vila Mariana, SP</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Consulta Presencial</h2>
              <p className="text-gray-500 text-lg font-light leading-relaxed mb-10 text-refined">
                Nossa clínica foi projetada para oferecer um ambiente de acolhimento e alta tecnologia. Durante a consulta presencial, realizamos a análise de bioimpedância profissional para um diagnóstico metabólico exato.
              </p>

              <ul className="space-y-5 mb-12">
                {[
                  { icon: Clock, text: 'Atendimento exclusivo e sem pressa' },
                  { icon: ShieldCheck, text: 'Exame de Bioimpedância b.ia incluído' },
                  { icon: Info, text: 'Localização de fácil acesso e estacionamento' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-4">
                    <div className="mt-1 text-[#833c4e] opacity-50"><item.icon size={20} /></div>
                    <span className="text-gray-700 font-bold text-sm tracking-tight uppercase leading-tight">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={onAgendar} className="w-full bg-[#833c4e] text-white py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#6D2437] transition-all shadow-xl shadow-[#833c4e]/20">
              Agendar Presencial
            </button>
          </div>

          {/* Telemedicine Block */}
          <div className="bg-[#708075] p-12 md:p-16 rounded-[3.5rem] shadow-2xl text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                  <Globe size={28} />
                </div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-full border border-white/10">
                  <span className="text-white font-black uppercase tracking-widest text-[9px]">Brasil e Exterior</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter">Telemedicina</h2>
              <p className="text-white/80 text-lg font-light leading-relaxed mb-10 text-refined">
                A mesma atenção e profundidade clínica onde quer que você esteja. Utilizamos plataformas seguras e criptografadas para garantir a sua privacidade e o melhor acompanhamento hormonal à distância.
              </p>

              <ul className="space-y-5 mb-12">
                {[
                  { icon: Clock, text: 'Consultas por videoconferência em alta definição' },
                  { icon: ShieldCheck, text: 'Receituário digital válido em todo o Brasil' },
                  { icon: Globe, text: 'Ideal para quem busca otimização de tempo' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-4">
                    <div className="mt-1 text-white opacity-40"><item.icon size={20} /></div>
                    <span className="text-white font-bold text-sm tracking-tight uppercase leading-tight">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={onAgendar} className="w-full bg-white text-[#708075] py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#f7f5f3] transition-all shadow-2xl relative z-10">
              Agendar Online
            </button>

            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          </div>
        </div>

        {/* Location & Map Section */}
        <div className="bg-white rounded-[4rem] overflow-hidden shadow-sm border border-[#e0d5c7]/20 grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-1 p-12 md:p-16 flex flex-col justify-center">
            <span className="text-[#833c4e] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Onde Estamos</span>
            <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-8 leading-none">Localização</h3>

            <div className="space-y-10">
              <div className="flex items-start space-x-5">
                <MapPin className="text-[#833c4e] shrink-0" size={24} />
                <p className="text-gray-600 font-medium leading-relaxed uppercase text-[11px] tracking-widest">
                  {CONTACT_INFO.address}
                </p>
              </div>
              <div className="flex items-start space-x-5">
                <Phone className="text-[#833c4e] shrink-0" size={24} />
                <p className="text-gray-900 font-black uppercase text-[12px] tracking-widest">
                  {CONTACT_INFO.phone}
                </p>
              </div>
              <div className="flex items-start space-x-5">
                <Mail className="text-[#833c4e] shrink-0" size={24} />
                <p className="text-gray-600 font-medium uppercase text-[11px] tracking-widest break-all">
                  contato@dramariliaalmeida.med.br
                </p>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-[#e0d5c7]/30">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CONTACT_INFO.address)}`}
                target="_blank"
                className="flex items-center space-x-3 text-[#833c4e] font-black uppercase tracking-widest text-[10px] group"
              >
                <div className="p-3 bg-[#833c4e] text-white rounded-full group-hover:scale-110 transition-transform">
                  <Navigation size={16} />
                </div>
                <span>Traçar Rota no Mapa</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 min-h-[450px] relative">
            {/* Real Google Maps Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.634354563!2d-46.674996!3d-23.581232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5757d590a797%3A0xc3f637f5d0f65b8e!2sR.%20Pais%20de%20Ara%C3%BAjo%2C%2029%20-%20Itaim%20Bibi%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004531-090!5e0!3m2!1spt-BR!2sbr!4v1715785000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>

        {/* Logistics FAQ */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <div className="bg-[#e0d5c7]/20 p-10 rounded-[2.5rem] border border-[#e0d5c7]/30">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#833c4e] mb-4">Informações Úteis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Convênios</p>
                <p className="text-[11px] font-bold text-gray-700 leading-tight uppercase tracking-tight">Trabalhamos exclusivamente com o sistema de REEMBOLSO. Auxiliamos com toda a documentação.</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Duração</p>
                <p className="text-[11px] font-bold text-gray-700 leading-tight uppercase tracking-tight">As consultas têm duração média de 60 minutos, garantindo profundidade diagnóstica.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtendimentoPage;
