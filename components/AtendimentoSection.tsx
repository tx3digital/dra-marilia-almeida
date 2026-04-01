
import React from 'react';
import { MapPin, Globe, Clock, ShieldCheck } from 'lucide-react';

interface AtendimentoSectionProps {
  onAgendar: () => void;
}

const AtendimentoSection: React.FC<AtendimentoSectionProps> = ({ onAgendar }) => {
  return (
    <section className="py-16 bg-white" id="atendimento">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#a89b92] font-extrabold uppercase tracking-[0.5em] text-[10px] mb-4 block">Flexibilidade & Excelência</span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight uppercase">Sua Saúde, Seu Momento</h2>
          <p className="text-[#a89b92] max-w-2xl mx-auto text-lg font-light leading-relaxed text-refined">
            Oferecemos atendimento presencial de alto padrão em São Paulo e consultas via Telemedicina para pacientes em todo o mundo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Presencial */}
          <div className="bg-[#f7f5f3] p-16 rounded-[3rem] relative overflow-hidden group border border-[#e0d5c7]/50 shadow-sm">
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#833c4e] shadow-sm">
                  <MapPin size={24} />
                </div>
                <span className="text-[#833c4e] font-extrabold uppercase tracking-[0.3em] text-[11px]">Itaim Bibi, SP</span>
              </div>
              <h3 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight uppercase">Presencial</h3>
              <p className="text-gray-600 mb-12 leading-relaxed font-light text-refined">
                Infraestrutura moderna e tecnologia b.ia para uma análise minuciosa da sua composição corporal e metabolismo.
              </p>

              <ul className="space-y-6 mb-12">
                {[
                  { icon: Clock, text: 'Consultas exclusivas de 60 minutos' },
                  { icon: ShieldCheck, text: 'Avaliação b.ia incluída' },
                  { icon: MapPin, text: 'Ambiente seguro e privativo' },
                  { icon: Clock, text: 'Suporte exclusivo via WhatsApp' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-4 text-sm font-semibold text-gray-700">
                    <item.icon size={20} className="text-[#833c4e]/50" />
                    <span className="tracking-tight">{item.text}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onAgendar}
                className="inline-block bg-[#833c4e] text-white px-12 py-5 rounded-full text-[12px] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#833c4e]/20 hover:scale-105 transition-all"
              >
                Agendar Agora
              </button>
            </div>
          </div>

          {/* Online */}
          <div className="bg-[#708075] p-16 rounded-[3rem] relative overflow-hidden group text-white shadow-2xl">
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                  <Globe size={24} />
                </div>
                <span className="text-white/70 font-extrabold uppercase tracking-[0.3em] text-[11px]">Alcance Global</span>
              </div>
              <h3 className="text-4xl font-extrabold mb-8 tracking-tight uppercase">Telemedicina</h3>
              <p className="text-white/80 mb-12 leading-relaxed font-light text-refined">
                A mesma precisão clínica no conforto da sua casa. Atendimento seguro para pacientes em todo o Brasil e exterior.
              </p>

              <ul className="space-y-6 mb-12">
                {[
                  { icon: Clock, text: 'Consultas por vídeo HD' },
                  { icon: ShieldCheck, text: 'Prescrições digitais imediatas' },
                  { icon: Globe, text: 'Sem barreiras geográficas' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-4 text-sm font-semibold text-white/90">
                    <item.icon size={20} className="text-white/40" />
                    <span className="tracking-tight">{item.text}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onAgendar}
                className="inline-block bg-white text-[#708075] px-12 py-5 rounded-full text-[12px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#f7f5f3] hover:scale-105 transition-all"
              >
                Agendar Online
              </button>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-black/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtendimentoSection;
