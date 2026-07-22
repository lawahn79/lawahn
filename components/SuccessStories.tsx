import React, { useEffect, useMemo, useState } from 'react';

interface CaseResult {
  id: string;
  slug?: string;
  category: string;
  title: string;
  result: string;
  summary?: string;
  solution?: string;
  date?: string;
  datePublished?: string;
  image: string;
  thumb?: string;
  visible?: boolean;
  order?: number;
}

const SuccessStories: React.FC = () => {
  const [cases, setCases] = useState<CaseResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

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
          setCases(data);
          setLoadFailed(false);
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setCases([]);
          setLoadFailed(true);
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

  const visibleCases = useMemo(() => {
    return cases
      .filter((item) => item.visible !== false)
      .sort((a, b) => {
        const orderA =
          typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;

        const orderB =
          typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;

        return orderA - orderB;
      });
  }, [cases]);

  const getCaseUrl = (item: CaseResult) => {
    const identifier = item.slug?.trim() || item.id;

    return `/case-results/${encodeURIComponent(identifier)}`;
  };

  const getDisplayDate = (item: CaseResult) => {
    return item.datePublished || item.date || '';
  };

  if (!isLoading && !loadFailed && visibleCases.length === 0) {
    return null;
  }

  return (
    <section
      className="py-24 bg-white scroll-mt-24"
      id="성공사례"
      aria-labelledby="success-stories-title"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-amber-600 font-bold mb-4 tracking-widest uppercase text-xs">
            Success Cases
          </div>

          <h2
            id="success-stories-title"
            className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tighter"
          >
            실제 수행사건으로 확인하는 결과
          </h2>

          <p className="text-slate-500 leading-relaxed">
            안재현 법률사무소가 직접 수행한 주요 사건의 진행 내용과
            결과를 확인하실 수 있습니다.
          </p>
        </div>

        {isLoading && (
          <div
            className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
            aria-live="polite"
            aria-label="수행사건을 불러오는 중"
          >
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 animate-pulse"
              >
                <div className="h-56 bg-slate-200" />

                <div className="p-8">
                  <div className="w-20 h-5 bg-slate-200 rounded-full mb-5" />
                  <div className="w-full h-7 bg-slate-200 rounded mb-3" />
                  <div className="w-3/4 h-7 bg-slate-200 rounded mb-6" />
                  <div className="w-full h-4 bg-slate-200 rounded mb-2" />
                  <div className="w-5/6 h-4 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && loadFailed && (
          <div
            className="max-w-3xl mx-auto rounded-3xl border border-slate-200 bg-slate-50 px-6 py-12 text-center"
            role="status"
          >
            <p className="font-bold text-slate-700">
              수행사건 목록을 불러오지 못했습니다.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              잠시 후 페이지를 새로고침해 주시기 바랍니다.
            </p>
          </div>
        )}

        {!isLoading && !loadFailed && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {visibleCases.map((item) => {
                const caseUrl = getCaseUrl(item);
                const displayDate = getDisplayDate(item);
                const caseImage = item.thumb || item.image;

                return (
                  <article
                    key={item.id}
                    className="h-full"
                    itemScope
                    itemType="https://schema.org/Article"
                  >
                    <a
                      href={caseUrl}
                      className="flex h-full flex-col overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:border-amber-200 hover:bg-white hover:shadow-2xl transition-all duration-300 group focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/40"
                      aria-label={`${item.title} 수행사건 자세히 보기`}
                      itemProp="url"
                    >
                      {caseImage && (
                        <div className="relative h-56 md:h-64 overflow-hidden bg-slate-100">
                          <img
                            src={caseImage}
                            alt={`${item.title} ${item.result} 수행사건`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            loading="lazy"
                            decoding="async"
                            width={800}
                            height={600}
                            itemProp="image"
                          />

                          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/65 to-transparent" />

                          <span className="absolute left-4 top-4 rounded-full bg-slate-950/90 px-3 py-1.5 text-[11px] font-black text-amber-400 backdrop-blur">
                            {item.category}
                          </span>
                        </div>
                      )}

                      <div className="flex flex-1 flex-col p-7 md:p-8">
                        <div className="flex justify-between items-start gap-4 mb-4">
                          {!caseImage && (
                            <span className="text-[10px] font-bold px-3 py-1 bg-slate-200 text-slate-500 rounded-full group-hover:bg-amber-600 group-hover:text-white transition-colors uppercase">
                              {item.category}
                            </span>
                          )}

                          {typeof item.order === 'number' && (
                            <span className="text-[10px] font-black tracking-widest text-amber-600">
                              CASE {String(item.order).padStart(2, '0')}
                            </span>
                          )}

                          {displayDate && (
                            <time
                              className="ml-auto text-xs text-slate-400"
                              dateTime={displayDate}
                              itemProp="datePublished"
                            >
                              {displayDate}
                            </time>
                          )}
                        </div>

                        <h3
                          className="text-xl font-black text-slate-800 mb-3 group-hover:text-blue-900 transition-colors leading-snug"
                          itemProp="headline"
                        >
                          {item.title}
                        </h3>

                        <p className="text-base font-black text-red-700 mb-4 leading-relaxed">
                          {item.result}
                        </p>

                        {item.summary && (
                          <p
                            className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6"
                            itemProp="description"
                          >
                            {item.summary}
                          </p>
                        )}

                        <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
                          <span className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                            수행사건 자세히 보기
                            <span
                              className="transition-transform group-hover:translate-x-1"
                              aria-hidden="true"
                            >
                              →
                            </span>
                          </span>

                          {item.image && (
                            <span className="shrink-0 text-[10px] text-blue-700 font-bold bg-blue-50 px-2.5 py-1.5 rounded-full">
                              결과 이미지
                            </span>
                          )}
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

            <div className="mt-12 text-center">
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                각 사건의 결과는 구체적인 사실관계와 제출된 자료에 따라
                달라질 수 있습니다.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SuccessStories;
