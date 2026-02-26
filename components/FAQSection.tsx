
import React, { useState } from 'react';
import { FAQS } from '../constants';
import { Plus, Minus } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#F8F4F1]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#8B2E46] font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Dúvidas Frequentes</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">Perguntas Comuns</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <button
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="text-base md:text-lg font-bold text-gray-800 uppercase tracking-tight leading-tight">{faq.question}</span>
                {openIndex === idx ? (
                  <Minus size={20} className="text-[#8B2E46]" />
                ) : (
                  <Plus size={20} className="text-[#8B2E46]" />
                )}
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-8 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4 font-light text-refined">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-[#a89b92] text-[10px] font-black uppercase tracking-widest mb-6">Não encontrou sua dúvida?</p>
          <a href="#contato" className="bg-[#833c4e] text-white px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#6D2437] transition-all shadow-lg">
            Falar com a equipe
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
