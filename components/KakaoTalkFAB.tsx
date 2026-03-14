
import React from 'react';

const KakaoTalkFAB: React.FC = () => {
  const kakaoLink = "https://open.kakao.com/o/sPg32K7h";

  const handleClick = () => {
    window.open(kakaoLink, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-3 group">
      {/* Tooltip Label */}
      <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-slate-100 text-xs font-black text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
        24시 카톡 실시간 상담
      </div>
      
      {/* Floating Button */}
      <button 
        onClick={handleClick}
        className="w-16 h-16 bg-[#FEE500] text-[#3C1E1E] rounded-full shadow-[0_10px_30px_rgba(254,229,0,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 relative"
        aria-label="카카오톡 상담하기"
      >
        <div className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
        </div>
        
        <svg viewBox="0 0 24 24" className="w-9 h-9 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C6.477 3 2 6.48 2 10.791c0 2.763 1.835 5.19 4.646 6.611-.169.608-.612 2.207-.701 2.547-.11.433.16.428.339.31.14-.092 2.246-1.54 3.137-2.131.84.117 1.708.181 2.579.181 5.523 0 10-3.48 10-7.791C22 6.48 17.523 3 12 3z"/>
        </svg>
      </button>
    </div>
  );
};

export default KakaoTalkFAB;
