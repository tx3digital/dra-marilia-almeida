
import React from 'react';
import { Story } from '../types';

interface StoryCircleProps {
  story: Story;
}

const StoryCircle: React.FC<StoryCircleProps> = ({ story }) => {
  return (
    <div className="flex flex-col items-center space-y-3 flex-shrink-0 group">
      <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] transition-all duration-300 shadow-lg">
        <div className="bg-white p-[3px] rounded-full">
          <img
            src={story.thumbnail}
            alt={story.title}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border border-gray-100"
          />
        </div>
        {/* Subtle Live Badge for first story */}
        {story.id === 1 && (
           <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#ee2a7b] text-white text-[8px] font-bold px-2 py-0.5 rounded-sm border border-white shadow-md">LIVE</div>
        )}
      </div>
      <span className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">{story.title}</span>
    </div>
  );
};

export default StoryCircle;
