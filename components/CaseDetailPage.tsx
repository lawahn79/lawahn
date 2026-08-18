import React, { useEffect, useState } from 'react';
import { trackFunnelEvent } from '../services/analytics';

interface CaseResult {
  id: string;
  slug?: string;
  title: string;
  result: string;
  summary?: string;
  solution?: string;
  category: string;
  image: string;
  thumb?: string;
  visible?: boolean;
  order?: number;
  date?: string;
  datePublished?: string;
  dateModified?: string;
}

interface CaseDetailPageProps {
  caseIdentifier: string;
}

const SITE_NAME = '안재현 법률사무소';
const SITE_URL = 'https://lawahn.kr';

const CaseDetailPage: React.FC<CaseDetailPageProps> = ({
  caseIdentifier
}) => {
  const [caseData, setCaseData] = useState<CaseResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadCase = async () => {
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

        const selectedCase = data.find((item) => {
          const matchedIdentifier = item.slug?.trim() || item.id;

          return (
            item.visible !== false &&
            (matchedIdentifier === caseIdentifier ||
              item.id === caseIdentifier)
          );
        });

        if (isMounted) {
          setCaseData(selectedCase || null);
          setLoadFailed(false);
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setCaseData(null);
          setLoadFailed(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCase();

    return () => {
      isMounted = false;
    };
  }, [caseIdentifier]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const upsertMeta = (
      attribute: 'name' | 'property',
      key: string,
      content: string
    ) => {
      let element = document.head.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`
      );

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    const upsertCanonical = (url: string) => {
      let canonical = document.head.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]'
      );

      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }

      canonical.setAttribute('href', url);
    };

    const structuredDataId = 'case-detail-structured-data';
    const oldStructuredData = document.getElementById(structuredDataId);

    if (oldStructuredData) {
      oldStructuredData.remove();
    }

    if (!caseData) {
      document.title = `수행사건을 찾을 수 없습니다 | ${SITE_NAME}`;

      upsertMeta(
        'name',
        'description',
        '요청한 수행사건 정보를 찾을 수 없습니다.'
      );

      upsertMeta('name', 'robots', 'noindex, nofollow');

      return;
    }

    const identifier = caseData.slug?.trim() || caseData.id;
    const canonicalUrl = `${SITE_URL}/case-results/${encodeURIComponent(
      identifier
    )}`;

    const absoluteImageUrl = new URL(
      caseData.image,
      SITE_URL
    ).toString();

    const pageTitle = `${caseData.title} ${caseData.result} | ${SITE_NAME}`;

    const pageDescription = [
      caseData.category,
      caseData.title,
      caseData.result,
      caseData.summary
    ]
      .filter(Boolean)
      .join(' - ')
      .slice(0, 160);

    document.title = pageTitle;

    upsertMeta('name', 'description', pageDescription);
    upsertMeta('name', 'robots', 'index, follow');

    upsertMeta('property', 'og:type', 'article');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', pageTitle);
    upsertMeta('property', 'og:description', pageDescription);
    upsertMeta('property', 'og:image', absoluteImageUrl);
    upsertMeta('property', 'og:url', canonicalUrl);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', pageTitle);
    upsertMeta('name', 'twitter:description', pageDescription);
    upsertMeta('name', 'twitter:image', absoluteImageUrl);

    if (caseData.datePublished || caseData.date) {
      upsertMeta(
        'property',
        'article:published_time',
        caseData.datePublished || caseData.date || ''
      );
    }

    if (caseData.dateModified) {
      upsertMeta(
        'property',
        'article:modified_time',
        caseData.dateModified
      );
    }

    upsertCanonical(canonicalUrl);

    const articleStructuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${canonicalUrl}#article`,
          headline: `${caseData.title} ${caseData.result}`,
          description: pageDescription,
          image: [absoluteImageUrl],
          url: canonicalUrl,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl
          },
          author: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL
          },
          ...(caseData.datePublished || caseData.date
            ? {
                datePublished:
                  caseData.datePublished || caseData.date
              }
            : {}),
          ...(caseData.dateModified
            ? {
                dateModified: caseData.dateModified
              }
            : {})
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: SITE_NAME,
              item: SITE_URL
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: '수행사건',
              item: `${SITE_URL}/#성공사례`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: caseData.title,
              item: canonicalUrl
            }
          ]
        }
      ]
    };

    const structuredDataScript =
      document.createElement('script');

    structuredDataScript.id = structuredDataId;
    structuredDataScript.type = 'application/ld+json';
    structuredDataScript.textContent = JSON.stringify(
      articleStructuredData
    );

    document.head.appendChild(structuredDataScript);

    return () => {
      const currentStructuredData =
        document.getElementById(structuredDataId);

      if (currentStructuredData) {
        currentStructuredData.remove();
      }
    };
  }, [caseData, isLoading]);

  const scrollToConsultation = () => {
    trackFunnelEvent('inquiry_open', { cta_location: 'case_detail_cta', form_type: 'bottom_main' });
    window.location.href = '/#consultation-form';
  };

  if (isLoading) {
    return (
      <section
        className="min-h-[70vh] bg-slate-50 px-6 py-32"
        aria-live="polite"
        aria-label="수행사건을 불러오는 중"
      >
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mb-5 h-5 w-28 rounded-full bg-slate-200" />

          <div className="mb-4 h-12 w-full max-w-3xl rounded-xl bg-slate-200" />

          <div className="mb-12 h-8 w-full max-w-xl rounded-xl bg-slate-200" />

          <div className="aspect-[4/3] w-full rounded-[2rem] bg-slate-200" />
        </div>
      </section>
    );
  }

  if (loadFailed) {
    return (
      <section className="min-h-[70vh] bg-slate-50 px-6 py-32">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-xl">
          <p className="text-sm font-black text-amber-600">
            수행사건
          </p>

          <h1 className="mt-4 text-2xl md:text-4xl font-black text-slate-900">
            수행사건 정보를 불러오지 못했습니다
          </h1>

          <p className="mt-5 text-slate-500 leading-relaxed">
            일시적인 오류가 발생했습니다. 잠시 후 다시 확인해
            주시기 바랍니다.
          </p>

          <a
            href="/#성공사례"
            className="mt-8 inline-flex rounded-full bg-blue-900 px-7 py-4 text-sm font-black text-white hover:bg-blue-800 transition-colors"
          >
            전체 수행사건으로 돌아가기
          </a>
        </div>
      </section>
    );
  }

  if (!caseData) {
    return (
      <section className="min-h-[70vh] bg-slate-50 px-6 py-32">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-xl">
          <p className="text-sm font-black text-amber-600">
            수행사건
          </p>

          <h1 className="mt-4 text-2xl md:text-4xl font-black text-slate-900">
            요청한 수행사건을 찾을 수 없습니다
          </h1>

          <p className="mt-5 text-slate-500 leading-relaxed">
            주소가 변경되었거나 현재 공개되지 않은 사건일 수
            있습니다.
          </p>

          <a
            href="/#성공사례"
            className="mt-8 inline-flex rounded-full bg-blue-900 px-7 py-4 text-sm font-black text-white hover:bg-blue-800 transition-colors"
          >
            전체 수행사건 확인하기
          </a>
        </div>
      </section>
    );
  }

  const identifier = caseData.slug?.trim() || caseData.id;
  const canonicalPath = `/case-results/${encodeURIComponent(
    identifier
  )}`;

  const displayDate =
    caseData.datePublished || caseData.date || '';

  return (
    <article
      className="bg-slate-50"
      itemScope
      itemType="https://schema.org/Article"
    >
      <header className="bg-slate-950 px-6 pb-20 pt-28 text-white">
        <div className="mx-auto max-w-5xl">
          <nav
            className="mb-8 flex flex-wrap items-center gap-2 text-xs md:text-sm text-slate-400"
            aria-label="현재 페이지 경로"
          >
            <a
              href="/"
              className="hover:text-amber-400 transition-colors"
            >
              홈
            </a>

            <span aria-hidden="true">›</span>

            <a
              href="/#성공사례"
              className="hover:text-amber-400 transition-colors"
            >
              수행사건
            </a>

            <span aria-hidden="true">›</span>

            <span className="text-slate-200">
              {caseData.title}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-amber-500/15 px-4 py-2 text-xs font-black text-amber-400 ring-1 ring-amber-500/30">
              {caseData.category}
            </span>

            {typeof caseData.order === 'number' && (
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-black text-slate-300">
                CASE {String(caseData.order).padStart(2, '0')}
              </span>
            )}

            {displayDate && (
              <time
                dateTime={displayDate}
                className="text-xs font-bold text-slate-400"
                itemProp="datePublished"
              >
                {displayDate}
              </time>
            )}
          </div>

          <h1
            className="mt-7 max-w-4xl text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
            itemProp="headline"
          >
            {caseData.title}
          </h1>

          <p className="mt-6 text-xl md:text-3xl font-black text-red-400 leading-relaxed">
            {caseData.result}
          </p>

          {caseData.summary && (
            <p
              className="mt-5 max-w-3xl text-base md:text-xl font-semibold text-slate-300 leading-relaxed"
              itemProp="description"
            >
              {caseData.summary}
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <section
          className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl"
          aria-labelledby="case-image-title"
        >
          <div className="border-b border-slate-100 px-6 py-5 md:px-8">
            <h2
              id="case-image-title"
              className="text-lg md:text-xl font-black text-slate-900"
            >
              수행사건 결과
            </h2>
          </div>

          <div className="bg-slate-100 p-3 md:p-8">
            <img
              src={caseData.image}
              alt={`${caseData.title} ${caseData.result} 수행사건 결과`}
              className="mx-auto h-auto w-full max-w-[900px] rounded-xl bg-white object-contain"
              width={900}
              height={1200}
              decoding="async"
              itemProp="image"
            />
          </div>
        </section>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 md:p-9 shadow-lg">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="h-5 w-1.5 rounded-full bg-amber-500"
                aria-hidden="true"
              />

              <h2 className="text-xl md:text-2xl font-black text-slate-900">
                사건의 결과
              </h2>
            </div>

            <p className="text-lg font-black text-red-700 leading-relaxed">
              {caseData.result}
            </p>

            {caseData.summary && (
              <p className="mt-4 text-slate-600 leading-relaxed">
                {caseData.summary}
              </p>
            )}
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 md:p-9 shadow-lg">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="h-5 w-1.5 rounded-full bg-amber-500"
                aria-hidden="true"
              />

              <h2 className="text-xl md:text-2xl font-black text-slate-900">
                사건 분야
              </h2>
            </div>

            <p className="text-lg font-black text-blue-900 leading-relaxed">
              {caseData.category} 사건
            </p>

            <p className="mt-4 text-slate-600 leading-relaxed">
              이 페이지는 안재현 법률사무소가 수행한 사건의
              주요 결과를 정리한 자료입니다.
            </p>
          </section>
        </div>

        {caseData.solution && (
          <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-7 md:p-9 shadow-lg">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="h-5 w-1.5 rounded-full bg-amber-500"
                aria-hidden="true"
              />

              <h2 className="text-xl md:text-2xl font-black text-slate-900">
                안재현 법률사무소의 조력
              </h2>
            </div>

            <p className="whitespace-pre-line text-slate-600 leading-loose">
              {caseData.solution}
            </p>
          </section>
        )}

        <section className="mt-10 overflow-hidden rounded-[2rem] bg-blue-950 px-7 py-10 text-center text-white md:px-12 md:py-14">
          <p className="text-xs font-black tracking-widest text-amber-400">
            CASE REVIEW
          </p>

          <h2 className="mt-4 text-2xl md:text-4xl font-black tracking-tight">
            유사한 사건도 사실관계와 자료에 따라
            <br className="hidden md:block" />
            대응 방향이 달라질 수 있습니다
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm md:text-base text-blue-200 leading-relaxed">
            현재 진행 단계와 보유한 자료를 바탕으로 사건의
            쟁점과 필요한 대응 방향을 확인하시기 바랍니다.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={scrollToConsultation}
              className="rounded-full bg-amber-500 px-7 py-4 text-sm font-black text-white hover:bg-amber-400 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/50"
            >
              상담 신청하기
            </button>

            <a
              href="/#성공사례"
              className="rounded-full border border-white/25 px-7 py-4 text-sm font-black text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              다른 수행사건 보기
            </a>
          </div>
        </section>

        <p className="mt-8 text-center text-xs md:text-sm text-slate-400 leading-relaxed">
          각 사건의 결과는 구체적인 사실관계와 제출된 자료에
          따라 달라질 수 있습니다.
        </p>
      </div>

      <meta
        itemProp="mainEntityOfPage"
        content={`${SITE_URL}${canonicalPath}`}
      />

      <meta
        itemProp="author"
        content={SITE_NAME}
      />
    </article>
  );
};

export default CaseDetailPage;
