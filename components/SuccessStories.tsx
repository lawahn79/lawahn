
import React, { useState, useEffect } from 'react';
import { SuccessCase } from '../types';

const SuccessStories: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<SuccessCase | null>(null);
  const [cases, setCases] = useState<SuccessCase[]>([]);
  const [showImageModal, setShowImageModal] = useState(false);

  const defaultCases: SuccessCase[] = [
    { 
      id: '1',
      category: '성범죄', 
      title: '강제추행 혐의 의뢰인 - 경찰 단계 무혐의 처분', 
      date: '2024.03.15',
      summary: '의뢰인은 술자리 이후 발생한 오해로 인해 강제추행 혐의로 고소당하여 경찰 조사를 앞두고 있었습니다.',
      solution: '본 사무소는 현장 CCTV 분석 및 목격자 진술을 확보하여 신체 접촉의 강제성이 없었음을 입증하는 변호인 의견서를 제출했습니다.',
      result: '경찰 단계에서 혐의없음(무혐의) 불송치 결정을 이끌어내어 사건을 조기 종결시켰습니다.'
    },
    { 
      id: '2',
      category: '이혼', 
      title: '상간남 위자료 청구 소송 - 원고 승소 (전액 인용)', 
      date: '2024.03.12',
      summary: '배우자의 부정행위 사실을 알게 된 의뢰인이 상대 남성을 대상으로 위자료 청구 소송을 제기했습니다.',
      solution: '부정행위를 입증할 수 있는 객관적 증거(채팅 내역, 카드 결제 기록 등)를 논리적으로 정리하여 제출하고 위자료 산정의 정당성을 주장했습니다.',
      result: '법원은 본 사무소의 주장을 모두 받아들여 청구 금액 전액 인용 판결을 내렸습니다.'
    }
  ];

  useEffect(() => {
    const savedCases = localStorage.getItem('an_law_cases');
    if (savedCases) {
      setCases(JSON.parse(savedCases));
    } else {
      // 로컬 스토리지가 비어있는 경우 기본 데이터를 보여주되, 
      // 관리자 페이지와의 싱크를 위해 초기화하지는 않음 (관리자 페이지에서 첫 접속 시 초기화함)
      setCases(defaultCases);
    }
  }, []);

  return (
    <section className="py-24 bg-white scroll-mt-24" id="성공사례">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-amber-600 font-bold mb-4 tracking-widest uppercase text-xs">Success Board</div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tighter">결과로 증명하는 실력</h2>
          <p className="text-slate-500">법률사무소 '安'이 이끌어낸 실제 승소 및 성공 사례 게시판입니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cases.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedCase(item)}
              className="flex flex-col p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-amber-200 hover:bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold px-3 py-1 bg-slate-200 text-slate-500 rounded-full group-hover:bg-amber-600 group-hover:text-white transition-colors uppercase">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400">{item.date}</span>
              </div>
              <h4 className="text-xl font-black text-slate-800 mb-4 group-hover:text-blue-900 transition-colors leading-snug">
                {item.title}
              </h4>
              <p className="text-slate-500 text-sm line-clamp-2 mb-6">
                {item.summary}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                  상세 사례 보기 <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                {item.image && (
                   <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">판결문 첨부됨</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Case Detail */}
        {selectedCase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="bg-blue-900 p-8 text-white flex justify-between items-center">
                <div>
                  <div className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">{selectedCase.category}</div>
                  <h3 className="text-2xl font-black">{selectedCase.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-8 space-y-8 overflow-y-auto max-h-[60vh]">
                <div>
                  <h5 className="text-blue-900 font-black mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-amber-500 rounded-full"></span> 사건의 개요
                  </h5>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl">{selectedCase.summary}</p>
                </div>
                <div>
                  <h5 className="text-blue-900 font-black mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-amber-500 rounded-full"></span> '安'의 조력 (Solution)
                  </h5>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl">{selectedCase.solution}</p>
                </div>
                <div>
                  <h5 className="text-blue-900 font-black mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-amber-500 rounded-full"></span> 사건의 결과 (Result)
                  </h5>
                  <p className="text-slate-800 font-bold leading-relaxed bg-amber-50 p-4 rounded-2xl border border-amber-100">{selectedCase.result}</p>
                </div>
                
                {selectedCase.image && (
                  <div>
                    <h5 className="text-blue-900 font-black mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-amber-500 rounded-full"></span> 판결문 (이미지)
                    </h5>
                    <button 
                      onClick={() => setShowImageModal(true)}
                      className="w-full h-32 bg-slate-100 rounded-2xl overflow-hidden relative group"
                    >
                      <img src={selectedCase.image} alt="판결문 미리보기" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-700">판결문 크게 보기</div>
                    </button>
                  </div>
                )}
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4">
                <button 
                  onClick={() => {
                    setSelectedCase(null);
                    document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-4 bg-blue-900 text-white font-black rounded-2xl hover:bg-blue-800 transition-all shadow-lg"
                >
                  유사한 사건 상담받기
                </button>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="px-8 py-4 bg-white text-slate-500 font-bold rounded-2xl border border-slate-200 hover:bg-slate-100 transition-all"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Large View Modal */}
        {showImageModal && selectedCase?.image && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowImageModal(false)}>
            <div className="max-w-4xl w-full max-h-[90vh] relative" onClick={e => e.stopPropagation()}>
               <img src={selectedCase.image} alt="판결문 원본" className="w-full h-full object-contain shadow-2xl rounded-lg" />
               <button 
                  onClick={() => setShowImageModal(false)}
                  className="absolute -top-12 right-0 text-white flex items-center gap-2 font-bold"
               >
                 닫기 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessStories;
