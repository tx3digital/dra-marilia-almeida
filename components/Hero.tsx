
import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

interface HeroProps {
  onAgendar: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAgendar }) => {
  const [showVideo, setShowVideo] = useState(false);

  // ID extraído do link: https://youtu.be/hFsj7IZYhQ4
  const videoId = "hFsj7IZYhQ4";

  return (
    <div className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-center overflow-hidden bg-[#f7f5f3] pt-20">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#e0d5c7] -z-10 hidden lg:block opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative z-10 text-center lg:text-left order-2 lg:order-1">
          <span className="text-[#833c4e] font-black uppercase tracking-[0.5em] text-[10px] md:text-[11px] mb-6 block">Endocrinologia & Metabologia</span>
          <h1 className="text-4xl md:text-7xl text-[#1a1c20] font-black mb-8 leading-[1.1] tracking-tighter uppercase flex flex-col">
            <span>Saúde,</span>
            <span>Equilíbrio</span>
            <span className="whitespace-nowrap">
              <span className="text-[#1a1c20] mr-3">&</span>
              <span className="text-[#833c4e] font-light italic normal-case tracking-normal">Longevidade</span>
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-light mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed text-refined">
            Abordagem personalizada para transformar sua saúde através de um cuidado preciso, individualizado e humano.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
            <button
              onClick={onAgendar}
              className="w-full sm:w-auto bg-[#833c4e] text-white px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#6D2437] transition-all transform hover:-translate-y-1 shadow-2xl shadow-[#833c4e]/30"
            >
              Agendar Consulta
            </button>
            <button
              onClick={() => setShowVideo(true)}
              className="flex items-center space-x-3 text-[#a89b92] font-black uppercase tracking-[0.25em] text-[10px] hover:text-[#833c4e] transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border-2 border-[#e0d5c7] flex items-center justify-center group-hover:border-[#833c4e] group-hover:bg-[#833c4e]/5 transition-all">
                <Play size={16} fill="currentColor" className="ml-1" />
              </div>
              <span>Ver Apresentação</span>
            </button>
          </div>
        </div>

        <div className="relative z-10 order-1 lg:order-2">
          <div
            className="relative aspect-[3/4] max-w-[380px] mx-auto lg:max-w-none rounded-[3rem] overflow-hidden shadow-2xl cursor-pointer group border-[12px] border-white bg-white"
            onClick={() => setShowVideo(true)}
          >
            <img
              src="/assets/video-thumb.png"
              alt="Dra. Marília Almeida - Como é uma consulta comigo?"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-all flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-[#833c4e] group-hover:border-[#833c4e] shadow-2xl">
                <Play size={32} fill="white" className="text-white ml-1.5" />
              </div>

              <div className="absolute bottom-20 left-0 right-0 text-center px-4">
                <p className="text-white text-[10px] font-black uppercase tracking-[0.4em] opacity-90 mb-1">Conheça a</p>
                <h3 className="text-white text-4xl md:text-5xl font-light italic tracking-tight">Consulta</h3>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-5 rounded-[2rem] shadow-lg flex items-center justify-between border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#833c4e]/10 flex items-center justify-center text-[#833c4e]">
                  <Play size={14} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#833c4e] font-black mb-0.5">Assista agora</p>
                  <p className="text-[11px] font-black text-gray-900 leading-tight uppercase tracking-tight">DR.<sup>ª</sup> MARÍLIA ALMEIDA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#e0d5c7] rounded-full -z-10 opacity-30 blur-3xl"></div>
        </div>
      </div>

      {showVideo && (
        <div className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <button
            className="absolute top-8 right-8 text-white hover:rotate-90 transition-transform duration-300 p-2 z-[110]"
            onClick={() => setShowVideo(false)}
          >
            <X size={40} />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 relative">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="Apresentação Dra. Marília Almeida"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
