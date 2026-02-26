
export interface Specialty {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Story {
  id: number;
  thumbnail: string;
  mediaUrl: string;
  type: 'video' | 'image';
  title: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
}

export interface SocialHighlight {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  platform: 'instagram' | 'tiktok';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Hormônios' | 'Emagrecimento' | 'Longevidade' | 'Estilo de Vida';
  author: string;
  date: string;
  readingTime: string;
  imageUrl: string;
  instagramEmbedUrl?: string;
}