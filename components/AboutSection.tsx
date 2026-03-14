
import React from 'react';

const AboutSection: React.FC = () => {
  const LAWYER_PHOTO_URL = "https://postfiles.pstatic.net/MjAyNTEyMjZfMjIy/MDAxNzY2NzE3MzQ1OTEw.JUbFIRE3bg0mZv0hv-dQoqCgBLMEusggyxP3ln-DNCsg.yqrEw9VZWmDMcBPnJYkF61of2ws677bpyGAg7qvnkBMg.PNG/lawyer_ahn.png?type=w966";

  return (
    <section className="py-32 bg-white overflow-hidden scroll-mt-24" id="사무소소개">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-24 lg:gap-32">
          {/* Visual Side */}
          <div className="lg:w-[45%] relative">
            <div className="absolute -top-12 -left-12 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.06),transparent_70%)] -z-10"></div>
            
            <div className="relative rounded-[4rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border-[12px] border-slate-50 group aspect-[1/1] bg-slate-100">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-50"></div>
              
              <img 
                src={LAWYER_PHOTO_URL} 
                alt="안재현 대표변호사" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center relative z-10 transition-transform duration-1000 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = LAWYER_PHOTO_URL;
                }}
              />
              
              <div className="absolute bottom-12 left-12 right-12 z-20">
                <div className="text-amber-500 text-[80px] font-serif leading-none mb-2 opacity-90 select-none">安</div>
                <div className="h-1 w-16 bg-amber-500 mb-6 shadow-xl"></div>
                <div className="text-white font-black text-4xl tracking-tighter mb-1">안재현 변호사</div>
                <div className="text-amber-400 text-sm font-bold uppercase tracking-[0.2em] opacity-80">Representative Attorney</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-amber-600 p-8 rounded-full shadow-2xl z-30 border-[6px] border-white flex flex-col items-center justify-center animate-pulse">
               <span className="text-white font-black text-2xl">100%</span>
               <span className="text-white/80 text-[8px] font-bold uppercase tracking-widest text-center">Direct<br/>Consult</span>
            </div>
          </div>
          
          {/* Text Side */}
          <div className="lg:w-[55%]">
            <div className="text-amber-600 font-bold mb-6 tracking-[0.3em] uppercase text-sm">Authenticity & Expertise</div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-10 leading-tight tracking-tighter">
              변호사가 <span className="text-amber-600 italic font-serif">직접</span> <br />
              처음부터 끝까지 <br />
              책임집니다.
            </h2>
            <div className="space-y-10 text-slate-600 text-xl leading-relaxed">
              <p className="font-medium text-slate-700">
                사무장이 상담하고 변호사는 이름만 올리는 기존 관행을 거부합니다. <br />
                법률사무소 <span className="text-slate-900 font-black">'安'</span>은 <span className="text-blue-700 font-black underline decoration-amber-500/30 decoration-8 underline-offset-4">안재현 대표변호사</span>가 모든 의뢰인과 1:1로 직접 소통하고 전략을 수립합니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
                <div className="group">
                  <div className="text-slate-900 font-black text-3xl mb-3 flex items-center gap-3 group-hover:text-amber-600 transition-colors">
                    <span className="w-1.5 h-8 bg-amber-600 rounded-full"></span> 형사전문
                  </div>
                  <p className="text-base text-slate-500 font-bold leading-relaxed">경찰 조사부터 재판까지 <br />전문적인 방어 전략 수립</p>
                </div>
                <div className="group">
                  <div className="text-slate-900 font-black text-3xl mb-3 flex items-center gap-3 group-hover:text-blue-900 transition-colors">
                    <span className="w-1.5 h-8 bg-blue-900 rounded-full"></span> 이혼전문
                  </div>
                  <p className="text-base text-slate-500 font-bold leading-relaxed">의뢰인의 새로운 시작을 위한 <br />재산분할 및 양육권 보호</p>
                </div>
              </div>

              <div className="bg-slate-900 p-10 rounded-[3rem] shadow-xl relative overflow-hidden group mt-10">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 rounded-full blur-[60px]"></div>
                 <h4 className="text-white text-2xl font-black mb-2 group-hover:text-amber-500 transition-colors">"당신의 평온을 되찾아 드립니다."</h4>
                 <p className="text-slate-400 text-base">지금 바로 안재현 변호사에게 직접 상담받으세요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
