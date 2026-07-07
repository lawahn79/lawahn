import React, { useEffect, useMemo, useState } from 'react';

type CaseResult = {
  id: string;
  title: string;
  result: string;
  summary: string;
  category: string;
  image: string;
  thumb?: string;
  visible: boolean;
  order: number;
};

const fallbackCaseResults: CaseResult[] = [
  {
    "id": "case-01",
    "title": "미성년자약취미수",
    "result": "벌금형으로 종결",
    "summary": "벌금 200만 원 선고",
    "category": "형사",
    "image": "/images/case-results/case-01-minor-abduction-attempt-fine.webp",
    "thumb": "/images/case-results/thumbs/case-01-minor-abduction-attempt-fine-thumb.webp",
    "visible": true,
    "order": 1
  },
  {
    "id": "case-02",
    "title": "택배기사 폭행사건",
    "result": "공소기각 확보",
    "summary": "처벌 없이 종결",
    "category": "형사",
    "image": "/images/case-results/case-02-delivery-driver-assault-dismissal.webp",
    "thumb": "/images/case-results/thumbs/case-02-delivery-driver-assault-dismissal-thumb.webp",
    "visible": true,
    "order": 2
  },
  {
    "id": "case-03",
    "title": "경찰관 폭행 사건",
    "result": "일부 공소 기각",
    "summary": "징역 1년 집행유예 2년",
    "category": "형사",
    "image": "/images/case-results/case-03-police-assault-probation.webp",
    "thumb": "/images/case-results/thumbs/case-03-police-assault-probation-thumb.webp",
    "visible": true,
    "order": 3
  },
  {
    "id": "case-04",
    "title": "강간미수 사건",
    "result": "강간미수 무죄",
    "summary": "강제추행만 유죄, 집행유예 선고",
    "category": "성범죄",
    "image": "/images/case-results/case-04-sexual-assault-attempt-acquittal.webp",
    "thumb": "/images/case-results/thumbs/case-04-sexual-assault-attempt-acquittal-thumb.webp",
    "visible": true,
    "order": 4
  },
  {
    "id": "case-05",
    "title": "자전거 사고 구상금",
    "result": "원고 일부 승소",
    "summary": "과실비율 50% 인정",
    "category": "민사",
    "image": "/images/case-results/case-05-bicycle-accident-partial-win.webp",
    "thumb": "/images/case-results/thumbs/case-05-bicycle-accident-partial-win-thumb.webp",
    "visible": true,
    "order": 5
  },
  {
    "id": "case-06",
    "title": "유족 손해배상",
    "result": "원고 승소",
    "summary": "배우자 5,000만 원, 자녀 각 3,500만 원 지급",
    "category": "민사",
    "image": "/images/case-results/case-06-family-damages-win.webp",
    "thumb": "/images/case-results/thumbs/case-06-family-damages-win-thumb.webp",
    "visible": true,
    "order": 6
  },
  {
    "id": "case-07",
    "title": "음주운전 재범",
    "result": "집행유예 선고 방어",
    "summary": "징역 1년 집행유예 2년",
    "category": "형사",
    "image": "/images/case-results/case-07-dui-repeat-probation.webp",
    "thumb": "/images/case-results/thumbs/case-07-dui-repeat-probation-thumb.webp",
    "visible": true,
    "order": 7
  },
  {
    "id": "case-08",
    "title": "손해배상 항소심",
    "result": "원고 승소",
    "summary": "제1심 판결 유지",
    "category": "민사",
    "image": "/images/case-results/case-08-appeal-damages-win.webp",
    "thumb": "/images/case-results/thumbs/case-08-appeal-damages-win-thumb.webp",
    "visible": true,
    "order": 8
  },
  {
    "id": "case-09",
    "title": "임대차보증금 반환",
    "result": "보증금 반환 성공",
    "summary": "260,562,980원 지급",
    "category": "부동산",
    "image": "/images/case-results/case-09-lease-deposit-return-win.webp",
    "thumb": "/images/case-results/thumbs/case-09-lease-deposit-return-win-thumb.webp",
    "visible": true,
    "order": 9
  },
  {
    "id": "case-10",
    "title": "윗집 누수 손해배상",
    "result": "원고 일부 승소",
    "summary": "14,088,899원 배상",
    "category": "부동산",
    "image": "/images/case-results/case-10-water-leak-damages-win.webp",
    "thumb": "/images/case-results/thumbs/case-10-water-leak-damages-win-thumb.webp",
    "visible": true,
    "order": 10
  }
];

const CaseResultMarquee: React.FC = () => {
  const [items, setItems] = useState<CaseResult[]>(fallbackCaseResults);

  useEffect(() => {
    fetch('/data/case-results.json', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('case-results.json load failed');
        }

        return response.json();
      })
      .then((data: CaseResult[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch(() => {
        setItems(fallbackCaseResults);
      });
  }, []);

  const visibleItems = useMemo(() => {
    return items
      .filter((item) => item.visible !== false)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, [items]);

  const marqueeItems = [...visibleItems, ...visibleItems];

  return (
    <section className="bg-slate-950 py-12 overflow-hidden border-y border-amber-500/20">
      <style>
        {`
          @keyframes case-result-marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .case-result-marquee-track {
            animation: case-result-marquee 55s linear infinite;
          }

          .case-result-marquee-track:hover {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .case-result-marquee-track {
              animation: none;
            }
          }
        `}
      </style>

      <div className="mb-8 text-center px-6">
        <p className="text-amber-500 text-xs font-black tracking-[0.28em] uppercase">
          Proven Case Results
        </p>

        <h3 className="mt-3 text-2xl md:text-4xl font-black text-white tracking-tight">
          실제 수행사건으로 확인하는 결과
        </h3>

        <p className="mt-4 text-sm md:text-base text-slate-400 font-semibold">
          판결문과 수행결과를 바탕으로 정리한 안재현 변호사의 주요 사건 사례입니다.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 md:w-40 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 md:w-40 bg-gradient-to-l from-slate-950 to-transparent" />

        <div className="case-result-marquee-track flex w-max gap-6 px-6">
          {marqueeItems.map((item, index) => (
            <a
              key={`${item.id}-${index}`}
              href="#성공사례"
              className="group w-[230px] md:w-[270px] shrink-0 overflow-hidden rounded-[1.6rem] bg-white shadow-xl ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative flex h-[325px] md:h-[382px] items-center justify-center bg-slate-100 p-0">
                <img
                  src={item.image}
                  alt={`${item.title} ${item.result}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  loading="lazy"
                />

                <div className="absolute left-3 top-3 rounded-full bg-slate-950/85 px-3 py-1 text-[11px] font-black text-amber-400 backdrop-blur">
                  {item.category}
                </div>
              </div>

              <div className="bg-white px-4 py-4">
                <p className="text-xs font-black tracking-[0.18em] text-amber-600 uppercase">
                  Case Result
                </p>

                <h4 className="mt-1 text-base md:text-lg font-black leading-snug text-slate-950">
                  {item.result}
                </h4>

                <p className="mt-1 text-sm font-bold text-slate-500">
                  {item.title}
                </p>

                <p className="mt-2 text-sm font-black text-slate-800">
                  {item.summary}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
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
