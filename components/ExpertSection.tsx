
import React from 'react';

const ExpertSection: React.FC = () => {
  const expert = {
    name: "안재현",
    role: "대표변호사",
    image: "https://raw.githubusercontent.com/lawahn79/lawahn/45c096dca647440cd80da7ce8f7d0320a4beae73/lawyer_ahn.png", 
    specialties: [
      "대한변호사협회 등록 형사전문", 
      "대한변호사협회 등록 이혼전문"
    ],
    desc: "사건의 무게를 누구보다 깊이 이해합니다. 형사법과 이혼, 두 분야의 전문 자격을 모두 갖춘 저 안재현이 의뢰인의 가장 고통스러운 순간을 승리로 바꾸기 위해 직접 발로 뜁니다."
  };

  const handleProfileClick = () => {
    const element = document.getElementById('consultation-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-slate-50 scroll-mt-24" id="변호사소개">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-amber-600 font-bold mb-4 tracking-widest uppercase text-xs">Representative Attorney</div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">
            결과로 입증하는 <span className="text-amber-600">안재현 대표변호사</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            대한변호사협회가 공식 인정한 '더블 전문성'은 <br className="hidden md:block" />
            단순한 자격증이 아닌, 수많은 승소로 증명된 실력입니다.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Grid Layout: PC에서 좌우 높이를 강제로 일치시킴 (items-stretch) */}
          <div className="group bg-white rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-10 items-stretch min-h-[500px]">
            
            {/* 사진 영역 (Left Column - 40%) */}
            <div className="md:col-span-4 relative bg-[#f8fafc] overflow-hidden flex items-stretch">
              {/* 이미지: object-cover를 사용하여 빈 공간 없이 꽉 채우고, object-center로 배치 */}
              <img 
                src={expert.image} 
                alt={expert.name} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = expert.image;
                }}
              />
              {/* 이미지 위 오버레이 (사진 하단부를 텍스트 배경과 부드럽게 연결) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
            </div>
            
            {/* 정보 영역 (Right Column - 60%) */}
            <div className="md:col-span-6 p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-white relative">
              {/* 배경 장식 (安) */}
              <div className="absolute top-0 right-0 text-[12rem] md:text-[18rem] font-serif text-slate-50 opacity-[0.1] pointer-events-none select-none translate-x-1/4 -translate-y-1/4">安</div>
              
              <div className="relative z-10">
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-12 bg-amber-500"></span>
                    <span className="text-amber-600 text-xs md:text-sm font-black tracking-widest uppercase">Representative Partner</span>
                  </div>
                  <div className="flex items-baseline gap-4 flex-wrap">
                    <h4 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">{expert.name}</h4>
                    <span className="text-slate-300 text-xl md:text-2xl font-light">Ahn Jae-hyun</span>
                  </div>
                </div>

                <div className="space-y-6 mb-12">
                  <div className="grid grid-cols-1 gap-4">
                    {expert.specialties.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-5 bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-amber-200 transition-all shadow-sm">
                        <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-slate-800 font-black text-lg md:text-xl">{spec}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-8 bg-slate-50 rounded-[2.5rem] border-l-[12px] border-amber-600 shadow-inner">
                    <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed italic">
                      "{expert.desc}"
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleProfileClick}
                  className="w-full py-6 md:py-8 bg-slate-900 text-white rounded-2xl md:rounded-[2.5rem] text-xl md:text-2xl font-black hover:bg-amber-600 hover:shadow-2xl transition-all duration-500 flex items-center justify-center gap-4 group/btn shadow-lg"
                >
                  안재현 변호사와 직접 상담하기
                  <span className="group-hover/btn:translate-x-2 transition-transform">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertSection;
