import React, { useEffect, useMemo, useState } from 'react';

type CaseResult = {
  id: string;
  slug?: string;
  title?: string;
  result?: string;
  summary?: string;
  category: string;
  image: string;
  thumb?: string;
  visible?: boolean;
  order?: number;
  date?: string;
  datePublished?: string;
};

const CaseResultMarquee: React.FC = () => {
  const [items, setItems] = useState<CaseResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadCases = async () => {
      try {
        const response = await fetch('/data/case-results.json', {
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error(
            `수행사건 데이터를 불러오지 못했습니다: ${response.status}`
          );
        }

        const data: CaseResult[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('수행사건 데이터 형식이 올바르지 않습니다.');
        }

        if (isMounted) {
          setItems(data);
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setItems([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCases();

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleItems = useMemo(() => {
    return items
      .filter((item) => item.visible !== false)
      .sort((a, b) => {
        const orderA =
          typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;

        const orderB =
          typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;

        return orderA - orderB;
      });
  }, [items]);

  const getCaseUrl = (item: CaseResult) => {
    const identifier = item.slug?.trim() || item.id;

    return `/case-results/${encodeURIComponent(identifier)}`;
  };

  if (isLoading || visibleItems.length === 0) {
    return null;
  }

  const marqueeItems = [
    ...visibleItems,
    ...visibleItems,
    ...visibleItems
  ];

  return (
    <section
      className="bg-slate-950 pt-8 pb-10 overflow-hidden border-y border-amber-500/20 scroll-mt-24"
      id="수행사건-요약"
      aria-labelledby="case-result-marquee-title"
    >
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

          .case-result-marquee-track:hover,
          .case-result-marquee-track:focus-within {
            animation-play-state: paused;
          }

          @media (max-width: 768px) {
            .case-result-marquee-track {
              animation-duration: 36s;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .case-result-marquee-track {
              animation: none;
              overflow-x: auto;
              max-width: 100%;
              padding-bottom: 0.5rem;
            }
          }
        `}
      </style>

      <div className="mb-6 text-center px-6">
        <p className="text-amber-500 text-[11px] font-black tracking-[0.28em] uppercase">
          Proven Case Results
        </p>

        <h2
          id="case-result-marquee-title"
          className="mt-3 text-2xl md:text-4xl font-black text-white tracking-tight"
        >
          실제 수행사건으로 확인하는 결과
        </h2>

        <p className="mt-3 text-sm md:text-base text-slate-400 font-semibold leading-relaxed">
          판결문과 수행결과를 바탕으로 정리한 주요 사건 사례입니다.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-14 md:w-32 bg-gradient-to-r from-slate-950 to-transparent"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-14 md:w-32 bg-gradient-to-l from-slate-950 to-transparent"
          aria-hidden="true"
        />

        <div className="case-result-marquee-track gap-5 px-5">
          {marqueeItems.map((item, index) => {
            const caseUrl = getCaseUrl(item);
            const cardImage = item.thumb || item.image;
            const isFirstSet = index < visibleItems.length;

            return (
              <article
                key={`${item.id}-${index}`}
                className="w-[220px] md:w-[270px] shrink-0"
                itemScope
                itemType="https://schema.org/Article"
                aria-hidden={!isFirstSet ? true : undefined}
              >
                <a
                  href={caseUrl}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white shadow-xl ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
                  aria-label={`${item.title || '수행사건'} ${
                    item.result || ''
                  } 자세히 보기`}
                  tabIndex={isFirstSet ? 0 : -1}
                  itemProp="url"
                >
                  <div className="relative h-[275px] md:h-[335px] bg-slate-100 overflow-hidden">
                    <img
                      src={cardImage}
                      alt={
                        item.title
                          ? `${item.title} ${item.result ?? ''} 수행사건`
                          : '안재현 법률사무소 수행사건 결과'
                      }
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                      loading={index < 4 ? 'eager' : 'lazy'}
                      decoding="async"
                      width={540}
                      height={770}
                      itemProp="image"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/70 to-transparent" />

                    <div className="absolute left-3 top-3 rounded-full bg-slate-950/90 px-3 py-1 text-[10px] md:text-[11px] font-black text-amber-400 backdrop-blur">
                      {item.category}
                    </div>

                    {typeof item.order === 'number' && (
                      <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] md:text-[11px] font-black text-slate-800 backdrop-blur">
                        CASE {String(item.order).padStart(2, '0')}
                      </div>
                    )}
                  </div>

                  <div className="flex min-h-[145px] flex-1 flex-col p-5">
                    <h3
                      className="text-base md:text-lg font-black text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-900 transition-colors"
                      itemProp="headline"
                    >
                      {item.title || '주요 수행사건'}
                    </h3>

                    {item.result && (
                      <p className="mt-2 text-sm md:text-base font-black text-red-700 leading-snug line-clamp-2">
                        {item.result}
                      </p>
                    )}

                    {item.summary && (
                      <p
                        className="mt-2 text-xs md:text-sm font-semibold text-slate-500 leading-relaxed line-clamp-2"
                        itemProp="description"
                      >
                        {item.summary}
                      </p>
                    )}

                    <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-black text-amber-600">
                      자세히 보기

                      <span
                        className="transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </div>
                </a>

                <meta
                  itemProp="author"
                  content="안재현 법률사무소"
                />

                <meta
                  itemProp="mainEntityOfPage"
                  content={`https://lawahn.kr${caseUrl}`}
                />
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-7 text-center px-6">
        <a
          href="#성공사례"
          className="inline-flex items-center justify-center rounded-full border border-amber-500/40 px-6 py-3 text-xs md:text-sm font-black text-amber-400 transition-all hover:bg-amber-500 hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/40"
        >
          수행사건 전체 보기

          <span className="ml-2" aria-hidden="true">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
};

export default CaseResultMarquee;
