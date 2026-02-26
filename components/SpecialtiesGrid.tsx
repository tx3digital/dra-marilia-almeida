
import React from 'react';
import { SPECIALTIES } from '../constants';
import { Check } from 'lucide-react';

const SpecialtiesGrid: React.FC = () => {
  return (
    <section className="py-24 bg-[#f7f5f3]" id="especialidades">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[#833c4e] font-extrabold uppercase tracking-[0.5em] text-[10px] mb-4 block">Foco Clínico</span>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-16 tracking-tight uppercase">Especialidades</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPECIALTIES.map((spec) => (
            <div key={spec.id} className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 text-left flex flex-col h-full border border-[#e0d5c7]/20 group relative overflow-hidden">
              {/* Decorative accent bar instead of icon */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#833c4e]/10 group-hover:bg-[#833c4e] transition-colors duration-500"></div>
              
              <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-6 tracking-tight uppercase leading-tight pt-2">
                {spec.title}
              </h3>
              
              <p className="text-gray-500 text-sm font-light mb-10 flex-grow leading-relaxed text-refined">
                {spec.description}
              </p>
              
              <div className="w-10 h-0.5 bg-[#e0d5c7] mb-10 group-hover:w-full transition-all duration-700"></div>
              
              <ul className="space-y-4 mt-auto">
                {spec.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-[13px] text-gray-600 font-medium group/item">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#833c4e]/5 flex items-center justify-center group-hover/item:bg-[#833c4e] transition-colors duration-300">
                      <Check size={12} className="text-[#833c4e] group-hover/item:text-white transition-colors" />
                    </div>
                    <span className="leading-tight">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesGrid;
