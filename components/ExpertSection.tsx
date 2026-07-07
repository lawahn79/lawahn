import React from 'react';

const certificates = [
  {
    title: '변호사 등록증서',
    src: '/images/haja/certificates/attorney-registration.webp',
  },
  {
    title: '사법연수원 수료증',
    src: '/images/haja/certificates/judicial-training-certificate.webp',
  },
  {
    title: '이혼전문 등록증서',
    src: '/images/haja/certificates/divorce-specialist-certificate.webp',
  },
  {
    title: '형사전문 등록증서',
    src: '/images/haja/certificates/criminal-specialist-certificate.webp',
  },
  {
    title: '인천서부경찰서 위촉장',
    src: '/images/haja/certificates/seobu-police-appointment.webp',
  },
  {
    title: '인천계양경찰서 위촉장',
    src: '/images/haja/certificates/gyeyang-police-appointment.webp',
  },
  {
    title: '민주노총 업무제휴협약서',
    src: '/images/haja/certificates/kctu-mou.webp',
  },
];

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
          <div className="text-amber-600 font-bold mb-4 tracking-widest uppercase text-xs">
            Representative Attorney
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">
            결과로 입증하는 <span className="text-amber-600">안재현 대표변호사</span>
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            대한변호사협회가 공식 인정한 '더블 전문성'은 <br className="hidden md:block" />
            단순한 자격증이 아닌, 수많은 승소로 증명된 실력입니다.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="group bg-white rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-10 items-stretch min-h-[500px]">
            <div className="md:col-span-4 relative bg-[#f8fafc] overflow-hidden flex items-stretch">
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

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <div className="md:col-span-6 p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-white relative">
              <div className="absolute top-0 right-0 text-[12rem] md:text-[18rem] font-serif text-slate-50 opacity-[0.1] pointer-events-none select-none translate-x-1/4 -translate-y-1/4">
                安
              </div>

              <div className="relative z-10">
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-12 bg-amber-500"></span>
                    <span className="text-amber-600 text-xs md:text-sm font-black tracking-widest uppercase">
                      Representative Partner
                    </span>
                  </div>

                  <div className="flex items-baseline gap-4 flex-wrap">
                    <h4 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                      {expert.name}
                    </h4>
                    <span className="text-slate-300 text-xl md:text-2xl font-light">
                      Ahn Jae-hyun
                    </span>
                  </div>
                </div>

                <div className="space-y-6 mb-12">
                  <div className="grid grid-cols-1 gap-4">
                    {expert.specialties.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-5 bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-amber-200 transition-all shadow-sm"
                      >
                        <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>

                        <span className="text-slate-800 font-black text-lg md:text-xl">
                          {spec}
                        </span>
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

          <div className="mt-20">
            <div className="text-center mb-12">
              <div className="text-amber-600 font-bold mb-4 tracking-widest uppercase text-xs">
                Verified Expertise
              </div>

              <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                자격과 공적 활동으로 확인하는 전문성
              </h3>

              <p className="mt-5 max-w-3xl mx-auto text-slate-500 text-base md:text-xl leading-relaxed">
                사법시험 합격, 사법연수원 수료, 대한변호사협회 등록 전문분야,
                공공기관 위촉 및 대외 협력 이력을 한눈에 확인할 수 있습니다.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((cert) => (
                <div
                  key={cert.title}
                  className="overflow-hidden rounded-[2rem] bg-white shadow-xl border border-slate-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex h-[280px] items-center justify-center bg-slate-50 p-5">
                    <img
                      src={cert.src}
                      alt={cert.title}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="bg-slate-900 px-5 py-4 text-center">
                    <p className="text-sm md:text-base font-black text-white">
                      {cert.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[2rem] bg-slate-900 px-8 py-8 text-center shadow-xl">
              <p className="text-white text-lg md:text-2xl font-black leading-relaxed">
                대한변호사협회가 공식 인정한 이혼·형사 더블 전문성을 바탕으로,
                의뢰인의 사건을 직접 검토합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertSection;
