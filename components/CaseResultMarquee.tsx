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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CaseResult | null>(null);

  useEffect(() => {
    fetch('/data/case-results.json', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data: CaseResult[]) => {
        if (Array.isArray(data)) {
          setItems(data);
        }
      })
      .catch(() => setItems([]));
  }, []);

  useEffect(() => {
    if (isGalleryOpen || selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isGalleryOpen, selectedItem]);

  const visibleItems = useMemo(() => {
    return items
      .filter((item) => item.visible !== false)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, [items]);

  if (visibleItems.length === 0) return null;

  const marqueeItems = [...visibleItems, ...visibleItems, ...visibleItems];

  return (
    <section className="bg-slate-950 pt-8 pb-10 overflow-hidden border-y border-amber-500/20" id="성공사례">
      <style>
        {`
          @keyframes case-result-marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-33.333%, 0, 0); }
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
            <button
              key={`${item.id}-${index}`}
              type="button"
              onClick={() => setSelectedItem(item)}
              className="group relative w-[220px] md:w-[270px] shrink-0 overflow-hidden rounded-[1.6rem] bg-white shadow-xl ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-left"
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
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 text-center">
        <button
          type="button"
          onClick={() => setIsGalleryOpen(true)}
          className="inline-flex items-center justify-center rounded-full border border-amber-500/40 px-6 py-3 text-xs md:text-sm font-black text-amber-400 transition-all hover:bg-amber-500 hover:text-white"
        >
          성공사례 자세히 보기
        </button>
      </div>

      {isGalleryOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm">
          <div className="h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-12">
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <p className="text-amber-500 text-[11px] font-black tracking-[0.28em] uppercase">
                    Case Results
                  </p>

                  <h3 className="mt-3 text-2xl md:text-5xl font-black text-white tracking-tight">
                    성공사례 전체 보기
                  </h3>

                  <p className="mt-3 text-sm md:text-base text-slate-400 font-semibold">
                    총 {visibleItems.length}건의 주요 수행사건 결과입니다.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsGalleryOpen(false)}
                  className="shrink-0 rounded-full bg-white/10 px-5 py-3 text-sm md:text-base font-black text-white hover:bg-amber-500 transition-all"
                >
                  닫기
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="group overflow-hidden rounded-[1.6rem] bg-white text-left shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className="relative h-[360px] bg-slate-100 overflow-hidden">
                      <img
                        src={item.thumb || item.image}
                        alt={item.title ? `${item.title} ${item.result ?? ''}` : '성공사례'}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />

                      <div className="absolute left-3 top-3 rounded-full bg-slate-950/90 px-3 py-1 text-[10px] font-black text-amber-400">
                        {item.category}
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-xs font-black text-amber-600 mb-2">
                        CASE {String(item.order).padStart(2, '0')}
                      </p>

                      <h4 className="text-lg font-black text-slate-900 leading-tight">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-base font-black text-red-700">
                        {item.result}
                      </p>

                      {item.summary && (
                        <p className="mt-2 text-sm font-semibold text-slate-500">
                          {item.summary}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedItem && (
        <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-sm flex items-center justify-center px-4 py-6">
          <button
            type="button"
            onClick={() => setSelectedItem(null)}
            className="absolute right-4 top-4 md:right-8 md:top-8 rounded-full bg-white/10 px-5 py-3 text-sm md:text-base font-black text-white hover:bg-amber-500 transition-all"
          >
            닫기
          </button>

          <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[1.5rem] bg-white shadow-2xl">
            <div className="bg-slate-950 px-5 md:px-8 py-5">
              <p className="text-xs font-black text-amber-400">
                CASE {String(selectedItem.order).padStart(2, '0')} · {selectedItem.category}
              </p>

              <h4 className="mt-2 text-xl md:text-3xl font-black text-white">
                {selectedItem.title}
              </h4>

              <p className="mt-2 text-base md:text-xl font-black text-red-400">
                {selectedItem.result}
              </p>
            </div>

            <div className="bg-slate-100 p-3 md:p-6">
              <img
                src={selectedItem.image}
                alt={selectedItem.title ? `${selectedItem.title} 상세 이미지` : '성공사례 상세 이미지'}
                className="mx-auto w-full max-w-[900px] rounded-xl bg-white object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CaseResultMarquee;
