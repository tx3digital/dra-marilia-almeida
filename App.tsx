
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import InstagramStories from './components/InstagramStories';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import AtendimentoSection from './components/AtendimentoSection';
import SpecialtiesGrid from './components/SpecialtiesGrid';
import YouTubeSection from './components/YouTubeSection';
import MediaSection from './components/MediaSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AgendamentoPage from './components/AgendamentoPage';
import BlogPage from './components/BlogPage';
import AtendimentoPage from './components/AtendimentoPage';
import AdminCMS from './components/AdminCMS';

function App() {
  const [view, setView] = useState<'landing' | 'agendamento' | 'blog' | 'admin' | 'atendimento'>('landing');

  const navigateToAgendamento = () => {
    setView('agendamento');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToLanding = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToBlog = () => {
    setView('blog');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToAtendimento = () => {
    setView('atendimento');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigate = (targetView: 'landing' | 'agendamento' | 'blog' | 'admin' | 'atendimento') => {
    setView(targetView);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (view === 'admin') {
    return <AdminCMS onBack={navigateToLanding} />;
  }

  if (view === 'agendamento') {
    return (
      <div className="min-h-screen bg-[#f7f5f3]">
        <Navbar onNavigate={handleNavigate} onAgendar={navigateToAgendamento} isInternal />
        <AgendamentoPage onBack={navigateToLanding} />
        <Footer onNavigate={handleNavigate} />
        <WhatsAppButton />
      </div>
    );
  }

  if (view === 'blog') {
    return (
      <div className="min-h-screen bg-[#f7f5f3]">
        <Navbar onNavigate={handleNavigate} onAgendar={navigateToAgendamento} isInternal />
        <BlogPage onBack={navigateToLanding} />
        <Footer onNavigate={handleNavigate} />
        <WhatsAppButton />
      </div>
    );
  }

  if (view === 'atendimento') {
    return (
      <div className="min-h-screen bg-[#f7f5f3]">
        <Navbar onNavigate={handleNavigate} onAgendar={navigateToAgendamento} isInternal />
        <AtendimentoPage onBack={navigateToLanding} onAgendar={navigateToAgendamento} />
        <Footer onNavigate={handleNavigate} />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f3]">
      <Navbar onNavigate={handleNavigate} onAgendar={navigateToAgendamento} />
      
      <main>
        <Hero onAgendar={navigateToAgendamento} />
        <AboutSection />
        <div id="sobre"></div>
        
        {/* Seção Especialidades movida para cá, entre Sobre e Stories */}
        <SpecialtiesGrid />
        
        <InstagramStories />
        <MediaSection />
        <div id="atendimento"></div>
        <AtendimentoSection onAgendar={navigateToAtendimento} />
        <YouTubeSection />
        
        <section className="py-32 bg-[#e0d5c7]/20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-brand mb-12 italic text-gray-800 leading-relaxed max-w-4xl mx-auto">
              "Cuidar da saúde não é apenas tratar doenças, é cultivar autonomia para viver plenamente cada fase da vida."
            </h2>
            <div className="w-24 h-1 bg-[#833c4e] mx-auto mb-6"></div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#833c4e] font-black uppercase whitespace-nowrap">
              DR.<sup>ª</sup> Marília Almeida
            </p>
          </div>
        </section>

        <div id="faq"></div>
        <FAQSection />
      </main>

      <Footer onNavigate={handleNavigate} />
      <WhatsAppButton />
    </div>
  );
}

export default App;
