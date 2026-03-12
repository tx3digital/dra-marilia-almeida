
import React from 'react';
import { Award, GraduationCap, Heart, Youtube } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="py-12 bg-[#f7f5f3] relative overflow-hidden" id="sobre">
      <div className="absolute top-20 left-0 text-[8rem] font-black text-[#a89b92] opacity-[0.03] select-none pointer-events-none whitespace-nowrap tracking-tighter uppercase">
        Marília Almeida
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[3/4] max-w-[450px] mx-auto bg-[#e0d5c7] rounded-[2.5rem] overflow-hidden shadow-2xl relative border-[10px] border-white">
              <img
                src="https://static.wixstatic.com/media/420a7c_15c9529bbe794fe7969964dd616adf12~mv2.jpg/v1/crop/x_0,y_0,w_854,h_902/fill/w_300,h_317,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Dra%20Marilia%20da%20Rocha%20Almeida.jpg?q=80&w=1964&auto=format&fit=crop"
                alt="Dra. Marília Almeida"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 bg-gradient-to-t from-[#833c4e] to-transparent text-white">
                <p className="text-xl font-light italic mb-2 tracking-tight leading-tight">"Dedicação e Ciência para a sua melhor versão."</p>
                <p className="text-[9px] uppercase tracking-[0.4em] font-extrabold opacity-70">CRM 176471 | RQE 93002</p>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-4 bg-white p-8 rounded-[2rem] shadow-xl hidden md:block border border-[#e0d5c7]/30">
              <div className="text-4xl font-black mb-1 text-[#833c4e] tracking-tighter">+10</div>
              <div className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#a89b92] leading-tight">Anos de excelência <br />clínica hormonal</div>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <span className="text-[#833c4e] font-extrabold uppercase tracking-[0.5em] text-[10px] mb-4 block">Nossa Especialista</span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight uppercase">
                Dra. Marília Almeida
              </h2>
              <div className="space-y-5 text-gray-600 leading-relaxed text-base font-light text-refined text-justify">
                <p>
                  Sou <span className="font-bold text-[#833c4e]">Marília Almeida</span>, médica endocrinologista dedicada a integrar evidências científicas de ponta com um atendimento acolhedor e individualizado em São Paulo.
                </p>
                <p>
                  Minha formação na <span className="text-gray-900 font-semibold border-b-2 border-[#e0d5c7]">Universidade Federal de São Paulo</span> e residencia em Clínica Médica e Endocrinologia no <span className="text-gray-900 font-semibold border-b-2 border-[#e0d5c7]">Instituto de Assistência ao Servidor Público Estadual</span> fundamentam meu compromisso com a excelência clínica.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: GraduationCap, title: 'Formação', text: 'UFSCar' },
                { icon: Award, title: 'Harvard Medical School', text: 'Especialização em Menopausa e Saúde da Mulher' },
                { icon: Heart, title: 'Abordagem', text: 'Integrativa' },
                { icon: Youtube, title: 'Audiência', text: 'Milhões de Visualizações nas redes' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 group">
                  <div className="p-3 bg-white rounded-xl text-[#833c4e] group-hover:bg-[#833c4e] group-hover:text-white transition-all shadow-sm border border-[#e0d5c7]/30">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 mb-0.5 uppercase tracking-[0.2em] text-[9px]">{item.title}</h4>
                    <p className="text-[13px] text-[#a89b92] font-medium leading-snug">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
