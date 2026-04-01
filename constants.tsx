
import React from 'react';
import { Specialty, FAQItem, Story, YouTubeVideo, BlogPost, SocialHighlight } from './types';

export const COLORS = {
  primary: '#833c4e', // Bordô Médio
  secondary: '#e0d5c7', // Champagne
  offWhite: '#f7f5f3', // Off-White
  warmGray: '#a89b92', // Cinza Quente
  healthAccent: '#708075', // Verde Eucalipto
  whatsapp: '#25D366',
  text: '#1F2937',
};

export const CONTACT_INFO = {
  crm: '176471',
  rqe: '93002',
  address: 'Rua Pais de Araújo, 29 - Itaim Bibi, São Paulo - SP',
  phone: '(11) 91219-5580',
  whatsappUrl: 'https://wa.me/5511912195580',
  instagram: 'marilia.endocrino',
  instagramUrl: 'https://www.instagram.com/marilia.endocrino/',
  youtube: 'endocrinologia.marilia',
  youtubeUrl: 'https://www.youtube.com/@endocrinologia.marilia',
  tiktok: 'marilia.endocrino',
  tiktokUrl: 'https://www.tiktok.com/@marilia.endocrino'
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Reposição Hormonal: Mitos vs. Verdades Científicas',
    excerpt: 'Descubra por que a terapia de reposição hormonal moderna é segura e essencial para a qualidade de vida na maturidade.',
    content: 'A reposição hormonal passou por grandes transformações nas últimas décadas. Hoje, com hormônios bioidênticos e doses personalizadas, o foco é a segurança e o bem-estar da paciente...',
    category: 'Hormônios',
    author: 'Dra. Marília Almeida',
    date: '15 Mai 2024',
    readingTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
    instagramEmbedUrl: 'https://www.instagram.com/p/DHEBzd1M5HN/'
  },
  {
    id: '2',
    title: 'O Papel da Insulina no Emagrecimento Sustentável',
    excerpt: 'Entenda como o equilíbrio da insulina pode ser o fator decisivo para quem não consegue perder peso com dietas convencionais.',
    content: 'Muitas vezes, a dificuldade em emagrecer não é falta de vontade, mas sim um desajuste metabólico conhecido como resistência à insulina...',
    category: 'Emagrecimento',
    author: 'Dra. Marília Almeida',
    date: '10 Mai 2024',
    readingTime: '5 min',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Estratégias para uma Longevidade Vibrante',
    excerpt: 'Pequenos ajustes no estilo de vida e monitoramento hormonal precoce podem garantir décadas de vitalidade extra.',
    content: 'Envelhecer faz parte da vida, mas envelhecer com saúde é uma escolha baseada em prevenção e otimização dos processos biológicos...',
    category: 'Longevidade',
    author: 'Dra. Marília Almeida',
    date: '02 Mai 2024',
    readingTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2046&auto=format&fit=crop'
  }
];

export const SOCIAL_HIGHLIGHTS: SocialHighlight[] = [
  {
    id: '1',
    title: 'Mitos da Menopausa - Vídeo Explicativo',
    thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&h=600&auto=format&fit=crop',
    url: 'https://instagram.com/dramariliaalmeida',
    platform: 'instagram'
  },
  {
    id: '2',
    title: 'Dica de Ouro: Sono e Hormônios',
    thumbnail: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&h=600&auto=format&fit=crop',
    url: 'https://www.tiktok.com/@dramariliaalmeida',
    platform: 'tiktok'
  },
  {
    id: '3',
    title: 'Rotina de Bem-estar na Clínica',
    thumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=400&h=600&auto=format&fit=crop',
    url: 'https://instagram.com/dramariliaalmeida',
    platform: 'instagram'
  }
];

export const SPECIALTIES: Specialty[] = [
  {
    id: 'medicina-hormonal',
    title: 'Equilíbrio Hormonal',
    description: 'Tratamento especializado para equilíbrio hormonal em todas as fases da vida da mulher.',
    icon: 'Dna',
    details: ['Terapia de reposição hormonal', 'Tratamento da menopausa e climatério', 'Distúrbios da tireoide', 'Ovários policísticos', 'Lipedema']
  },
  {
    id: 'emagrecimento',
    title: 'Emagrecimento e Metabolismo',
    description: 'Abordagem completa para perda de peso saudável e manutenção dos resultados.',
    icon: 'Scale',
    details: ['Tratamento da obesidade e sobrepeso', 'Ajuste metabólico', 'Controle de compulsão alimentar', 'Bioimpedância e composição corporal']
  },
  {
    id: 'longevidade',
    title: 'Longevidade e Antienvelhecimento',
    description: 'Prevenção e tratamento focados em saúde, vitalidade e qualidade de vida prolongada.',
    icon: 'Sparkles',
    details: ['Medicina preventiva e preditiva', 'Otimização da saúde celular', 'Prevenção de doenças crônicas', 'Controle de fatores de risco']
  }
];

export const STORIES: Story[] = [
  { id: 1, thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=200&h=200&auto=format&fit=crop', mediaUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop', type: 'image', title: 'Consultório' },
  { id: 2, thumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=200&h=200&auto=format&fit=crop', mediaUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop', type: 'image', title: 'Rotina' },
  { id: 3, thumbnail: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=200&h=200&auto=format&fit=crop', mediaUrl: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1000&auto=format&fit=crop', type: 'image', title: 'Dicas' },
  { id: 4, thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=200&h=200&auto=format&fit=crop', mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop', type: 'image', title: 'Saúde' },
  { id: 5, thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=200&h=200&auto=format&fit=crop', mediaUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop', type: 'image', title: 'Pergunta' },
];

export const YOUTUBE_VIDEOS: YouTubeVideo[] = [
  { id: 'vvpJVmcyYQY', title: 'Entrevista: A Jornada da Saúde Hormonal', thumbnail: 'https://img.youtube.com/vi/vvpJVmcyYQY/maxresdefault.jpg' },
  { id: '1', title: 'Tudo sobre Reposição Hormonal', thumbnail: 'https://picsum.photos/seed/yt1/640/360' },
  { id: '2', title: 'Como funciona a primeira consulta?', thumbnail: 'https://picsum.photos/seed/yt2/640/360' },
  { id: '3', title: 'Mitos e Verdades sobre o Emagrecimento', thumbnail: 'https://picsum.photos/seed/yt3/640/360' },
];

export const FAQS: FAQItem[] = [
  { question: 'Há exames incluídos na consulta?', answer: 'Os exames laboratoriais não estão incluídos. No entanto, é possível realizar bioimpedância e avaliação de composição corporal durante o atendimento presencial.' },
  { question: 'Quais condições você trata?', answer: 'Atendo principalmente mulheres e trato diversas condições como menopausa, lipedema, SOP, hipotireoidismo, obesidade, osteoporose e distúrbios hormonais em geral.' },
  { question: 'Você trabalha com implantes hormonais?', answer: 'Sim, após uma avaliação médica criteriosa e dependendo da necessidade, podemos optar pela terapia de reposição hormonal com implantes.' },
  { question: 'Atende plano de saúde?', answer: 'Atendemos exclusivamente de forma particular, mas fornecemos toda a documentação necessária para que você possa solicitar o reembolso junto ao seu plano.' }
];