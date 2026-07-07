import React, { useEffect, useMemo, useState } from 'react';

type CaseResult = {
  id: string;
  title?: string;
  result?: string;
  summary?: string;
  category: string;
  image: string;
  thumb?: string;
  visible: boolean;
  order: number;
};

const CaseResultMarquee: React.FC = () => {
  const [items, setItems] = useState<CaseResult[]>([]);

  useEffect(() => {
    fetch('/data/case-results.json', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data: CaseResult[]) => {
        if (Array.isArray(data)) {
          setItems(data);
        }
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  const visibleItems = useMemo(() => {
    return items
      .filter((item) => item.visible !== false)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, [items]);

  if (visibleItems.length === 0) {
    return null;
  }

  const marqueeItems = [...visibleItems, ...visibleItems, ...visibleItems];

  return (
    <section className="bg-slate-950 pt-8 pb-10 overflow-hidden border-y border-amber-500/20">
      <style>
        {`
          @keyframes case-result-marquee {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-33.333%, 0, 0);
            }
          }

          .case-result-marquee-track {
            display: flex;
            width: max-content;
            animation: case-result-marquee 58s linear infinite;
            will-change: transform;
          }

          .case-result-marquee-track:hover {
            animation-play-state: paused;
          }

          @media (max-width: 768px) {
            .case-result-marquee-track {
              animation-duration: 36s;
            }
          }
        `}
      </style>

      <div className="mb-6 text-center px-6">
        <p className="text-amber-500 text-[11px] font-black tracking-[0.28em] uppercase">
          Proven Case Results
        </p>

        <h3 className="mt-3 text-2xl md:text-4xl font-black text-white tracking-tight">
          실제 수행사건으로 확인하는 결과
        </h3>

        <p className="mt-3 text-sm md:text-base text-slate-400 font-semibold">
          판결문과 수행결과로 정리한 주요 사건 사례입니다.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-14 md:w-32 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-14 md:w-32 bg-gradient-to-l from-slate-950 to-transparent" />

        <div className="case-result-marquee-track gap-5 px-5">
          {marqueeItems.map((item, index) => (
            <a
              key={`${item.id}-${index}`}
              href="#성공사례"
              className="group relative w-[220px] md:w-[270px] shrink-0 overflow-hidden rounded-[1.6rem] bg-white shadow-xl ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-[315px] md:h-[385px] bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title ? `${item.title} ${item.result ?? ''}` : '수행사건 결과'}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  loading="lazy"
                />

                <div className="absolute left-3 top-3 rounded-full bg-slate-950/90 px-3 py-1 text-[10px] md:text-[11px] font-black text-amber-400 backdrop-blur">
                  {item.category}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-7 text-center">
        <a
          href="#성공사례"
          className="inline-flex items-center justify-center rounded-full border border-amber-500/40 px-6 py-3 text-xs md:text-sm font-black text-amber-400 transition-all hover:bg-amber-500 hover:text-white"
        >
          성공사례 자세히 보기
        </a>
      </div>
    </section>
  );
};

export default CaseResultMarquee;
