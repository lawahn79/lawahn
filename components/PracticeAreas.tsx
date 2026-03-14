
import React, { useState } from 'react';
import ServiceCard from './ServiceCard';

interface DetailedService {
  title: string;
  category: string;
  isCertified: boolean;
  description: string;
  icon: React.ReactNode;
  details: {
    subtitle: string;
    points: string[];
    strategy: string;
  };
}

const PracticeAreas: React.FC = () => {
  const [selectedService, setSelectedService] = useState<DetailedService | null>(null);

  const services: DetailedService[] = [
    {
      title: '형사사건전문',
      category: 'Criminal Law',
      isCertified: true,
      description: '대한변협 등록 형사법 전문 변호사가 직접 수행합니다. 강력사건, 교통사고, 사기, 성범죄 등 모든 형사 절차에서 의뢰인을 방어합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      details: {
        subtitle: "수사 초기부터 공판까지, 빈틈없는 전략",
        points: ["경찰/검찰 조사 밀착 동행", "구속영장실질심사 적극 대응", "음주운전/교통사고 처리 특화", "사기/공갈/폭행 강력 방어"],
        strategy: "형사사건은 초기 대응이 결과의 90%를 결정합니다. 안재현 변호사가 첫 조사부터 직접 입회하여 불리한 진술을 막고, 의뢰인에게 유리한 증거를 선제적으로 확보하여 불기소 또는 감형을 이끌어냅니다."
      }
    },
    {
      title: '이혼/가사',
      category: 'Family Law',
      isCertified: true,
      description: '대한변협 등록 이혼 전문 변호사가 의뢰인의 새로운 시작을 위한 재산분할과 양육권을 철저히 보호합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      details: {
        subtitle: "새로운 인생을 위한 확실한 정리",
        points: ["재산분할 및 위자료 청구", "양육권/친권/양육비 확보", "상간자 대상 위자료 청구 소송", "조정 이혼 및 협의 이혼 조력"],
        strategy: "감정적인 소모를 최소화하고 실질적인 이익을 지켜드립니다. 치밀한 재산 파악과 논리적인 기여도 입증으로 의뢰인의 권리를 끝까지 찾아드립니다."
      }
    },
    {
      title: '상속/유언',
      category: 'Inheritance Law',
      isCertified: false,
      description: '복잡한 상속 재산 분할과 유류분 반환 청구, 의뢰인의 정당한 상속분을 치밀하게 계산하여 확보합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      details: {
        subtitle: "분쟁 없는 평온한 가산 승계",
        points: ["유류분 반환 청구 소송", "상속재산 분할 협의 및 소송", "기여분 인정 및 특별수익 분석", "유언장 공증 및 집행 자문"],
        strategy: "상속 분쟁은 가족 간의 갈등이기에 더욱 섬세한 접근이 필요합니다. 법리적 근거에 기반한 객관적 분석으로 갈등을 조율하고 의뢰인의 정당한 몫을 지켜냅니다."
      }
    },
    {
      title: '민사/부동산',
      category: 'Civil Law',
      isCertified: false,
      description: '복잡한 금전 관계와 부동산 소유권 분쟁, 정확한 법리 분석으로 의뢰인의 소중한 재산을 보호합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      details: {
        subtitle: "권리 위에 잠자는 자를 구제합니다",
        points: ["대여금 및 미수금 반환 소송", "임대차 보증금 분쟁 대응", "부동산 소유권 및 명도 소송", "불법행위에 따른 손해배상 청구"],
        strategy: "민사 소송은 '증거'와 '타이밍'의 싸움입니다. 가압류, 가처분 등 보전 처분부터 판결 이후의 강제집행까지 원스톱 법률 서비스를 제공합니다."
      }
    },
    {
      title: '경제/기업범죄',
      category: 'Business Law',
      isCertified: false,
      description: '사기, 횡령, 배임 등 중대한 경제적 리스크를 최소화하기 위한 전문적인 법률 전략을 제공합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      details: {
        subtitle: "위기의 순간, 기업의 명예를 지킵니다",
        points: ["사기/횡령/배임 방어 전략", "자본시장법 위반 대응", "기업 법률 자문 및 컴플라이언스", "조세범 처벌법 위반 대응"],
        strategy: "복잡한 자금 흐름을 정확히 분석하여 억울한 누명을 벗겨드립니다. 전문적인 소명 자료 구성과 변론으로 기업의 경영권과 개인의 명예를 동시에 보호합니다."
      }
    }
  ];

  return (
    <section className="py-24 bg-slate-50 scroll-mt-24" id="업무분야">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              당신을 위한 <span className="text-amber-600 font-serif italic">'安'의 전략</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              법률사무소 '安'은 <span className="text-slate-800 font-bold">인증된 전문성</span>을 바탕으로 의뢰인의 사건을 단순히 '처리'하지 않습니다. 
              당신의 일상이 다시 평온해질 수 있도록 끝까지 함께 '동행'하겠습니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className={`relative group h-full cursor-pointer ${idx >= 3 ? 'lg:max-w-[calc(100%+50%)] lg:mx-auto' : ''}`} 
              onClick={() => setSelectedService(service)}
            >
              {service.isCertified && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                  <span className="bg-amber-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg border border-white uppercase tracking-tighter">
                    대한변협 인증 전문
                  </span>
                </div>
              )}
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        {/* 상세 모달 */}
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="bg-slate-900 p-8 text-white flex justify-between items-center relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   {selectedService.icon}
                </div>
                <div>
                  <div className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">{selectedService.category}</div>
                  <h3 className="text-3xl font-black">{selectedService.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors relative z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
                <div>
                  <h5 className="text-slate-900 font-black mb-4 text-xl">
                    {selectedService.details.subtitle}
                  </h5>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {selectedService.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedService.details.points.map((pt, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-amber-600">●</span> {pt}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                   <h6 className="text-amber-900 font-black mb-2 flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                       <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                     </svg>
                     '安'만의 특화 전략
                   </h6>
                   <p className="text-amber-800 text-sm leading-relaxed font-medium">
                     {selectedService.details.strategy}
                   </p>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 text-center flex gap-4">
                <button 
                  onClick={() => {
                    setSelectedService(null);
                    document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-4 bg-blue-900 text-white font-black rounded-xl hover:bg-blue-800 transition-all shadow-lg"
                >
                  지금 바로 상담받기
                </button>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="px-8 py-4 bg-white text-slate-600 font-bold border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PracticeAreas;
