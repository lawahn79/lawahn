import React from 'react';

const Hero: React.FC = () => {
  const scrollToForm = () => {
    const element = document.getElementById('consultation-form');

    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const LAWYER_PHOTO_URL = "/images/lawyer-photo.webp";

  return (
    <section className="relative overflow-hidden bg-[#0a0f1d] pt-16 pb-8 lg:pt-16 lg:pb-8">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1d] via-[#0a0f1d]/80 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1e293b]/10 -skew-x-12 translate-x-1/3"></div>

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-20 flex flex-col lg:flex-row items-center justify-between w-full">
        {/* Text Area */}
        <div className="lg:w-[55%] mb-8 lg:mb-0 text-center lg:text-left animate-in fade-in slide-in-from-left-10 duration-1000">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-amber-600/10 border border-amber-600/30 rounded-full mb-4">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>

            <span className="text-amber-500 text-xs font-black uppercase tracking-[0.2em]">
              Certified Specialist Law Office
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-[4rem] xl:text-[4.4rem] font-black text-white leading-[1.05] mb-5 tracking-tighter">
            결과가 말해주는<br />
            실력의 차이,<br />
            <span className="text-amber-500">안재현 변호사</span>
          </h1>

          <div className="max-w-xl mx-auto lg:mx-0">
            <p className="text-slate-300 text-base md:text-xl lg:text-[1.25rem] mb-6 font-medium leading-relaxed border-l-4 border-amber-600 pl-6 text-left">
              대한변협 등록 형사·이혼 전문 변호사가<br />
              의뢰인의 입장에서 가장 명쾌한 해답을 제시합니다.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button
                onClick={scrollToForm}
                className="group relative px-7 md:px-9 py-4 bg-amber-600 text-white text-base md:text-lg font-black rounded-2xl shadow-[0_20px_40px_-10px_rgba(217,119,6,0.4)] hover:bg-amber-500 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  24시 실시간 상담 예약
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>

              <button
                onClick={() => window.location.href = 'tel:1688-5644'}
                className="px-7 md:px-9 py-4 bg-white/5 backdrop-blur-md text-white text-base md:text-lg font-black border border-white/20 rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
              >
                <svg
                  className="w-6 h-6 text-amber-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 005.47 5.47l.772-1.547a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                1688-5644
              </button>
            </div>
          </div>
        </div>

        {/* Lawyer Photo Area */}
        <div className="lg:w-[38%] relative flex items-center justify-center animate-in fade-in slide-in-from-right-10 duration-1000 delay-200">
          <div className="relative w-full max-w-[280px] md:max-w-[320px] lg:max-w-[330px] xl:max-w-[350px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border-[10px] border-white/5 shadow-2xl bg-slate-800">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent z-10 opacity-40"></div>

            <img
              src={LAWYER_PHOTO_URL}
              alt="안재현 대표변호사"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-110 translate-y-4"
              onError={(e) => {
                const target = e.target as HTMLImageElement;

                if (target.src !== LAWYER_PHOTO_URL) {
                  target.src = LAWYER_PHOTO_URL;
                }
              }}
            />

            <div className="absolute bottom-6 left-6 z-20">
              <div className="text-amber-500 font-serif text-[2.8rem] lg:text-[3.2rem] leading-none mb-1 opacity-80">
                安
              </div>

              <div className="text-white text-xl lg:text-2xl font-black tracking-tighter">
                안재현 대표변호사
              </div>

              <div className="text-amber-400/60 text-xs font-bold uppercase tracking-widest">
                Representative Attorney
              </div>
            </div>
          </div>

          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/20 rounded-full blur-[80px] -z-10"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[80px] -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
