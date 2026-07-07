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

const CertificateMarquee: React.FC = () => {
  const marqueeItems = [...certificates, ...certificates];

  return (
    <section className="bg-slate-950 py-8 overflow-hidden border-y border-amber-500/20">
      <style>
        {`
          @keyframes certificate-marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .certificate-marquee-track {
            animation: certificate-marquee 38s linear infinite;
          }

          .certificate-marquee-track:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="mb-6 text-center px-6">
        <p className="text-amber-500 text-xs font-black tracking-[0.28em] uppercase">
          Verified Expertise
        </p>
        <h3 className="mt-3 text-xl md:text-3xl font-black text-white tracking-tight">
          자격과 공적 활동으로 확인하는 안재현 대표변호사의 전문성
        </h3>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-slate-950 to-transparent" />

        <div className="certificate-marquee-track flex w-max gap-6 px-6">
          {marqueeItems.map((cert, index) => (
            <a
              key={`${cert.title}-${index}`}
              href="#변호사소개"
              className="group w-[220px] shrink-0 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-white/10 transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex h-[180px] items-center justify-center bg-slate-50 p-4">
                <img
                  src={cert.src}
                  alt={cert.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="bg-white px-4 py-3 text-center">
                <p className="text-sm font-black text-slate-900">
                  {cert.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <a
          href="#변호사소개"
          className="inline-flex items-center justify-center rounded-full border border-amber-500/40 px-5 py-2 text-xs font-black text-amber-400 transition-all hover:bg-amber-500 hover:text-white"
        >
          대표변호사 소개 자세히 보기
        </a>
      </div>
    </section>
  );
};

export default CertificateMarquee;
