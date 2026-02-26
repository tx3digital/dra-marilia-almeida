
import React from 'react';
import { STORIES, CONTACT_INFO } from '../constants';
import StoryCircle from './StoryCircle';
import { Instagram, Users, Youtube, Music2 } from 'lucide-react';

const InstagramStories: React.FC = () => {
  const socialFollowLinks = [
    { icon: Instagram, url: CONTACT_INFO.instagramUrl, label: 'Instagram', color: 'hover:bg-[#E1306C]' },
    { icon: Music2, url: CONTACT_INFO.tiktokUrl, label: 'TikTok', color: 'hover:bg-black' },
    { icon: Youtube, url: CONTACT_INFO.youtubeUrl, label: 'YouTube', color: 'hover:bg-[#FF0000]' },
  ];

  return (
    <div className="bg-white py-16 border-b border-[#e0d5c7]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 text-[#833c4e] mb-3">
              <Instagram size={18} />
              <div className="w-1 h-1 bg-[#833c4e]/30 rounded-full"></div>
              <Music2 size={18} />
              <div className="w-1 h-1 bg-[#833c4e]/30 rounded-full"></div>
              <Youtube size={18} />
              <span className="font-black uppercase tracking-[0.5em] text-[10px] ml-2">Nossas Redes Sociais</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none">Bastidores e Dicas Diárias</h2>
          </div>
          
          <div className="flex items-center bg-[#f7f5f3] p-5 md:p-8 rounded-[2rem] border border-[#e0d5c7]/50 shadow-sm w-full md:w-auto">
            <div className="mr-5 p-4 bg-white rounded-2xl text-[#833c4e] shadow-sm flex-shrink-0">
              <Users size={28} />
            </div>
            <div className="mr-6 md:mr-10 flex-grow">
              <div className="text-2xl md:text-3xl font-black text-[#833c4e] tracking-tighter whitespace-nowrap leading-none mb-1">Milhões de</div>
              <div className="text-[10px] uppercase tracking-widest text-[#a89b92] font-black whitespace-nowrap">Visualizações Mensais</div>
            </div>
            
            <div className="flex items-center space-x-3 flex-shrink-0">
              {socialFollowLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 md:p-3 bg-white text-[#833c4e] rounded-full border border-[#e0d5c7]/30 hover:text-white ${social.color} transition-all duration-300 shadow-sm`}
                  title={`Seguir no ${social.label}`}
                >
                  <social.icon size={18} />
                </a>
              ))}
              <a 
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:block bg-[#833c4e] text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#6D2437] transition-all ml-2 whitespace-nowrap"
              >
                Seguir
              </a>
            </div>
          </div>
        </div>

        <div className="flex space-x-8 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 justify-start md:justify-center">
          {STORIES.map((story) => (
            <StoryCircle key={story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstagramStories;
