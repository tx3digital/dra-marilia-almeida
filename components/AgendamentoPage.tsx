
import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, MessageSquare, Shield, DollarSign, Zap, Crown, Info } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

interface AgendamentoPageProps {
  onBack: () => void;
}

const AgendamentoPage: React.FC<AgendamentoPageProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    investment: '',
    qualified: null as boolean | null,
  });

  const handleGoal = (goal: string) => {
    setFormData({ ...formData, goal });
    setStep(2);
  };

  const handleQualification = (isQualified: boolean) => {
    if (isQualified) {
      setFormData({ ...formData, qualified: true });
      setStep(3);
    } else {
      setFormData({ ...formData, qualified: false });
      setStep(5);
    }
  };

  const handleInvestment = (range: string) => {
    setFormData({ ...formData, investment: range });
    setStep(4);
  };

  const handleFinalStep = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá Simone, gostaria de agendar uma consulta com a Dra. Marília Almeida. 
    
Me chamo ${formData.name}.
Objetivo: ${formData.goal}.
Faixa de Investimento: ${formData.investment}.

Estou ciente que o atendimento é exclusivamente particular e que suplementação/outros custos são à parte.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`${CONTACT_INFO.whatsappUrl}?text=${encodedMessage}`, '_blank');
  };

  const investmentOptions = [
    {
      id: 'nivel-1',
      title: 'ESSENCIAL',
      price: 'R$ 1.000 — R$ 2.000',
      icon: DollarSign,
      color: 'text-gray-400'
    },
    {
      id: 'nivel-2',
      title: 'AVANÇADO',
      price: 'R$ 1.000 — R$ 4.000',
      icon: Zap,
      color: 'text-[#833c4e]'
    },
    {
      id: 'nivel-3',
      title: 'ALTA PERFORMANCE',
      price: 'Acima de R$ 5.000',
      icon: Crown,
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#f7f5f3]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Espaçamento superior ajustado após remoção do botão de voltar */}
        <div className="mt-8 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#e0d5c7]/20">
          <div className="bg-[#833c4e] p-10 md:p-14 text-white text-center">
            <h1 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter leading-none">Agendamento Exclusivo</h1>
            <p className="text-white/80 font-light text-xs md:text-sm tracking-wide max-w-xl mx-auto leading-relaxed">Sua jornada para uma saúde extraordinária começa aqui.</p>
          </div>

          <div className="p-8 md:p-16">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-widest text-center">Qual seu principal objetivo?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Emagrecimento saudável e sustentado', 'Menopausa e climatério', 'Longevidade', 'Lipedema'].map((goal) => (
                    <button
                      key={goal}
                      onClick={() => handleGoal(goal)}
                      className="w-full text-left p-6 rounded-2xl border border-[#e0d5c7]/50 hover:border-[#833c4e] hover:bg-[#833c4e]/5 transition-all flex items-center justify-between group"
                    >
                      <span className="font-bold text-gray-700 uppercase text-[11px] tracking-wider">{goal}</span>
                      <ChevronRight size={18} className="text-[#a89b92] group-hover:text-[#833c4e] transform group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-lg mx-auto">
                <div className="flex justify-center mb-6 text-[#833c4e]">
                  <Shield size={40} strokeWidth={1.5} />
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-5 uppercase tracking-widest text-center">Atendimento Particular</h2>
                <div className="space-y-4 text-center text-gray-600 leading-relaxed mb-8">
                  <p className="text-sm">
                    Para garantir excelência, o atendimento é <span className="font-black text-gray-900">exclusivamente particular</span>.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleQualification(true)}
                    className="w-full bg-[#833c4e] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#6D2437] transition-all shadow-lg"
                  >
                    Prosseguir
                  </button>
                  <button
                    onClick={() => handleQualification(false)}
                    className="w-full border border-[#e0d5c7] text-[#a89b92] py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-50 transition-all"
                  >
                    Voltar
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter text-center">FAIXA DE INVESTIMENTO</h2>
                <p className="text-center text-gray-500 text-xs font-light mb-10 tracking-wide">Estimativa inicial em saúde:</p>

                <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                  {investmentOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleInvestment(`${opt.title} (${opt.price})`)}
                      className="w-full text-left p-5 rounded-3xl border border-[#e0d5c7]/40 hover:border-[#833c4e]/30 hover:shadow-lg transition-all flex items-center space-x-5 bg-white"
                    >
                      <div className={`p-4 bg-[#f7f5f3] rounded-xl ${opt.color} group-hover:scale-110 transition-transform flex items-center justify-center border border-gray-100`}>
                        <opt.icon size={24} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">{opt.title}</h3>
                          <span className="text-[9px] font-black text-[#833c4e] bg-[#833c4e]/5 px-2 py-1 rounded-md">{opt.price}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-[#f7f5f3] rounded-[2rem] border border-[#e0d5c7]/50 flex items-start space-x-4 max-w-xl mx-auto">
                  <div className="text-[#833c4e] mt-0.5">
                    <Info size={20} />
                  </div>
                  <div className="text-[10px] text-gray-500 font-bold leading-normal uppercase tracking-wider">
                    <p className="mb-2">Atendimento exclusivamente particular.</p>
                    <p>Custo com suplementos e exames <span className="text-[#833c4e]">à parte</span>.</p>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-in fade-in zoom-in-95 duration-500 max-w-md mx-auto">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500 mb-6 border border-green-100">
                    <CheckCircle2 size={32} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-3">Quase Pronto</h2>
                  <p className="text-gray-500 text-sm font-light">Informe seu nome para finalizar via WhatsApp.</p>
                </div>

                <form onSubmit={handleFinalStep} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-[#a89b92] ml-1">Seu Nome Completo</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Maria Almeida"
                      className="w-full px-6 py-5 rounded-2xl border border-[#e0d5c7] focus:ring-4 focus:ring-[#833c4e]/10 focus:border-[#833c4e] outline-none transition-all font-bold text-gray-900 text-base placeholder:text-gray-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#25D366] text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#1eb954] transition-all flex items-center justify-center space-x-3 shadow-xl"
                  >
                    <MessageSquare size={20} />
                    <span>Enviar para Simone</span>
                  </button>
                </form>
              </div>
            )}

            {step === 5 && (
              <div className="animate-in fade-in duration-500 text-center max-w-md mx-auto">
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-6 leading-none">Agradecemos o contato</h2>
                <p className="text-gray-600 font-light leading-relaxed mb-10 text-base">
                  Entendido. Continue acompanhando os conteúdos da Dra. Marília no Instagram para cuidar da sua saúde diariamente.
                </p>
                <button
                  onClick={onBack}
                  className="bg-gray-900 text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.3em] text-[9px] hover:bg-black transition-all shadow-lg"
                >
                  Voltar ao site
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendamentoPage;
