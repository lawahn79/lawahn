import React, { useEffect } from 'react';
import { trackFunnelEvent } from '../services/analytics';

const GOLD = '#B89445';
const NAVY = '#08213D';

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-3 text-xs font-black tracking-[0.28em] text-[#B89445] uppercase">
    {children}
  </p>
);

const SectionTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight ${className}`}>
    {children}
  </h2>
);

const SectionLead = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-5 text-base md:text-xl leading-relaxed text-slate-600">
    {children}
  </p>
);

const CTAButton = ({
  href,
  children,
  variant = 'dark',
  ctaLocation = 'haja_cta'
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'dark' | 'gold' | 'light';
  ctaLocation?: string;
}) => {
  const className =
    variant === 'gold'
      ? 'bg-[#B89445] text-white hover:bg-[#a78132]'
      : variant === 'light'
      ? 'bg-white text-[#08213D] hover:bg-slate-100 border border-white/40'
      : 'bg-[#08213D] text-white hover:bg-slate-800';

  return (
    <a
      href={href}
      onClick={() => {
        if (href.startsWith('tel:')) {
          trackFunnelEvent('click_to_call', { cta_location: ctaLocation });
        }
      }}
      className={`inline-flex items-center justify-center rounded-2xl px-7 py-4 text-sm md:text-base font-black shadow-lg transition-all hover:scale-[1.02] active:scale-95 ${className}`}
    >
      {children}
    </a>
  );
};

const CheckItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200">
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#B89445] text-sm font-black text-white">
      ✓
    </span>
    <span className="text-base md:text-lg font-semibold leading-relaxed text-slate-700">
      {children}
    </span>
  </li>
);

const InfoCard = ({
  number,
  title,
  children,
  tone = 'white'
}: {
  number?: string;
  title: string;
  children: React.ReactNode;
  tone?: 'white' | 'beige' | 'navy';
}) => {
  const toneClass =
    tone === 'navy'
      ? 'bg-[#08213D] text-white ring-[#08213D]'
      : tone === 'beige'
      ? 'bg-[#F2EBDD] text-slate-900 ring-[#d7c7a4]'
      : 'bg-white text-slate-900 ring-slate-200';

  return (
    <div className={`rounded-[2rem] p-6 md:p-8 shadow-sm ring-1 ${toneClass}`}>
      {number && <p className="mb-4 text-2xl font-black text-[#B89445]">{number}</p>}
      <h3 className="text-xl md:text-2xl font-black leading-tight">{title}</h3>
      <div className={`mt-4 text-sm md:text-base leading-relaxed ${tone === 'navy' ? 'text-white/80' : 'text-slate-600'}`}>
        {children}
      </div>
    </div>
  );
};

const ProcessStep = ({ no, title, desc }: { no: string; title: string; desc?: string }) => (
  <div className="relative rounded-3xl border border-[#B89445]/45 bg-white p-5 shadow-sm">
    <div className="mb-4 inline-flex h-9 min-w-9 items-center justify-center rounded-xl bg-[#B89445] px-3 text-sm font-black text-white">
      {no}
    </div>
    <h4 className="text-xl font-black leading-snug text-slate-900 whitespace-pre-line">
      {title}
    </h4>
    {desc && <p className="mt-2 text-sm leading-relaxed text-slate-500">{desc}</p>}
  </div>
);

const FAQItem = ({ q, a }: { q: string; a: string }) => (
  <details className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 open:ring-[#B89445]/45">
    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg md:text-xl font-black text-slate-900">
      <span>{q}</span>
      <span className="text-[#B89445] transition-transform group-open:rotate-45">+</span>
    </summary>
    <p className="mt-4 text-base leading-relaxed text-slate-600">{a}</p>
  </details>
);

const certificates = [
  {
    title: '변호사 등록증서',
    desc: '대한변호사협회 등록 변호사',
    src: '/images/haja/certificates/attorney-registration.webp',
  },
  {
    title: '사법연수원 수료증',
    desc: '사법연수원 수료 이력',
    src: '/images/haja/certificates/judicial-training-certificate.webp',
  },
  {
    title: '이혼전문 등록증서',
    desc: '대한변협 등록 전문분야',
    src: '/images/haja/certificates/divorce-specialist-certificate.webp',
  },
  {
    title: '형사전문 등록증서',
    desc: '대한변협 등록 전문분야',
    src: '/images/haja/certificates/criminal-specialist-certificate.webp',
  },
  {
    title: '인천서부경찰서 위촉장',
    desc: '수사민원 상담 변호사 위촉',
    src: '/images/haja/certificates/seobu-police-appointment.webp',
  },
  {
    title: '인천계양경찰서 위촉장',
    desc: '수사민원 상담관 위촉',
    src: '/images/haja/certificates/gyeyang-police-appointment.webp',
  },
  {
    title: '민주노총 업무제휴협약서',
    desc: '법률 자문 및 대외 협력',
    src: '/images/haja/certificates/kctu-mou.webp',
  },
];

const HajaLandingPage: React.FC = () => {
  useEffect(() => {
    document.title = '아파트 하자소송 법률 자문 제안서 | 안재현 변호사 법률사무소';

    const description =
      '입주자대표회의와 관리단을 위한 아파트 하자소송 법률 자문 제안서입니다. 사용검사일, 하자 유형, 보증기간, 채권양도 가능성을 기준으로 하자소송 검토 방향을 안내합니다.';

    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;

    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }

    metaDescription.content = description;
  }, []);

  const googleMapUrl =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('인천광역시 미추홀구 학익소로 29 석목법조빌딩 안재현 변호사 법률사무소');

  const googleMapSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3167.6718248479287!2d126.66741167719782!3d37.44485673109375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b7988238dbc31%3A0xd784ddcb9de4da40!2z7J247LKc7J207Zi87KCE66y467OA7Zi47IKsIOyViOyerO2YhCDrspXrpaDsgqzrrLTshowgLSDtmJXsgqzrr7zsgqzsnbTtmLzsoITrrLg!5e0!3m2!1sko!2skr!4v1767008548755!5m2!1sko!2skr';

  const processSteps = [
    ['01', '하자진단\n및 적출', '공용부·전유부 하자 유형 확인'],
    ['02', '채권\n양도·양수', '입주민 권리 이전 절차 검토'],
    ['03', '소장 접수', '청구 구조와 상대방 정리'],
    ['04', '재판부 확정', '사건 진행 일정 관리'],
    ['05', '감정진행\n현장조사', '법원 감정 및 현장 대응'],
    ['06', '감정보고서\n제출', '하자 항목과 금액 검토'],
    ['07', '변론 및\n감정 보완 신청', '누락·오류 보완 주장'],
    ['08', '감정보완서', '보완감정 결과 검토'],
    ['09', '1심 판결', '판결 및 조정 가능성 검토'],
    ['10', '소송비용\n상환', '회수 후 약정 기준 정산'],
  ];

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-slate-900">
      {/* Top fixed CTA */}
      <div className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-[620px] -translate-x-1/2 gap-2 rounded-3xl bg-[#08213D]/95 p-2 shadow-2xl backdrop-blur md:hidden">
        <a
          href="tel:1688-5644"
          onClick={() => trackFunnelEvent('click_to_call', { cta_location: 'haja_mobile_phone' })}
          className="flex-1 rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-[#08213D]"
        >
          전화 상담
        </a>
        <a
          href="tel:1688-5644"
          onClick={() => trackFunnelEvent('click_to_call', { cta_location: 'haja_mobile_inquiry' })}
          className="flex-1 rounded-2xl bg-[#B89445] px-4 py-3 text-center text-sm font-black text-white"
        >
          하자소송 문의
        </a>
      </div>

      {/* 01 Hero */}
      <section className="relative overflow-hidden bg-[#08213D] text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full border border-white/30" />
          <div className="absolute right-[-8%] bottom-[-20%] h-[620px] w-[620px] rounded-full border border-[#B89445]/40" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="relative mx-auto grid min-h-[92vh] max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-10">
          <div>
            <p className="mb-6 text-sm font-black tracking-[0.28em] text-[#D8C084]">
              APARTMENT DEFECT LITIGATION
            </p>
            <h1 className="text-5xl font-black leading-[1.08] tracking-tight md:text-7xl">
              아파트<br />하자소송<br />법률 자문 제안서
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/80 md:text-2xl">
              입주민의 초기비용 부담은 줄이고<br className="hidden md:block" />
              단지의 자산가치 회복을 위한 하자소송 검토 제안
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="tel:1688-5644" variant="gold">하자소송 검토 문의</CTAButton>
              <CTAButton href="/" variant="light">법률사무소 메인으로</CTAButton>
            </div>
          </div>

          <div className="rounded-[3rem] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
            <div className="mb-10 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D8C084] text-3xl font-black text-[#D8C084]">
                安
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.25em] text-[#D8C084]">LAW OFFICE</p>
                <p className="text-xl font-black">안재현 변호사 법률사무소</p>
              </div>
            </div>
            <div className="grid gap-4">
              {['하자진단', '채권양도', '감정 대응', '배상금 회수'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-lg font-black">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 Office Intro */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionLabel>APARTMENT DEFECT LITIGATION</SectionLabel>
        <SectionTitle>법률사무소 소개</SectionTitle>
        <SectionLead>
          분쟁을 단순한 소송으로 보지 않고, 자산가치 회복과 실질적 해결을 함께 설계합니다.
        </SectionLead>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2.5rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
            <div className="space-y-7 text-lg leading-relaxed text-slate-700">
              <p>
                안재현 변호사 법률사무소는 의뢰인의 분쟁을 단순한 소송 사건으로만 보지 않습니다.
                사건의 배경, 분쟁의 구조, 향후 회수 가능성까지 함께 검토하여 실질적인 해결 방향을 제시하는 것을 목표로 합니다.
              </p>
              <p>
                하자소송은 법률 검토만으로 진행되는 사건이 아닙니다.
                건축자료 분석, 하자진단, 감정절차, 입주민 동의, 입주자대표회의 의사결정이 함께 움직이는 복합적인 분쟁입니다.
              </p>
              <p>
                대표변호사의 직접 검토 아래 송무 진행, 자료 정리, 감정 대응, 입주민 안내까지 사건 진행 전 과정을 체계적으로 관리합니다.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            <InfoCard title="전문성">사건 구조와 법적 쟁점을 정확히 분석합니다.</InfoCard>
            <InfoCard title="체계성" tone="beige">자료 검토부터 소송 진행까지 단계별로 관리합니다.</InfoCard>
            <InfoCard title="사건관리력">기일, 자료, 감정, 의사결정 과정을 놓치지 않도록 관리합니다.</InfoCard>
          </div>
        </div>
      </section>

      {/* 03 Attorney */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionLabel>APARTMENT DEFECT LITIGATION</SectionLabel>
          <SectionTitle>대표변호사 소개</SectionTitle>
          <SectionLead>
            사법시험 출신 경력과 기업 법무 경험을 바탕으로 하자소송의 법률·실무 구조를 함께 검토합니다.
          </SectionLead>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2.5rem] bg-[#f6f1e8] p-8 shadow-sm ring-1 ring-slate-200">
              <div className="mb-8 flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#B89445] text-3xl font-black text-[#B89445]">
                  安
                </div>
                <div>
                  <h3 className="text-3xl font-black">안재현 변호사</h3>
                  <p className="mt-2 font-bold text-[#B89445]">하자소송 및 건축 분야 법률 자문</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  ['학력', '한양대학교 법학과'],
                  ['자격', '제50회 사법시험 합격'],
                  ['연수', '사법연수원 수료'],
                  ['전직', '㈜다본다 법무팀장'],
                  ['전직', '㈜다음에너지 법무이사'],
                  ['현직', '법률사무소 安 대표변호사'],
                ].map(([label, value]) => (
                  <div key={`${label}-${value}`} className="flex items-center gap-4 border-b border-slate-200 pb-3">
                    <span className="w-16 rounded-lg bg-white px-3 py-2 text-center text-sm font-black text-[#B89445]">
                      {label}
                    </span>
                    <span className="font-bold text-slate-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-[2.5rem] bg-[#08213D] p-8 text-white shadow-xl md:p-10">
              <div>
                <h3 className="text-3xl font-black">복합 분쟁 대응</h3>
                <p className="mt-6 text-lg leading-relaxed text-white/80">
                  하자소송은 법률 검토, 건축자료 분석, 하자 적출 및 감정, 입주민 설명이 결합된 복합 분쟁입니다.
                  감정 절차와 회수 구조까지 고려한 전략 수립이 필요합니다.
                </p>
              </div>
              <div className="mt-10 rounded-3xl bg-white/10 p-6 text-xl font-black leading-relaxed">
                단순히 소장을 제출하는 데 그치지 않고,<br />
                단지별 회수 가능성을 기준으로 전략을 설계합니다.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 Experience */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionLabel>APARTMENT DEFECT LITIGATION</SectionLabel>
        <SectionTitle>건축 분야 주요 수행 경험</SectionTitle>
        <SectionLead>
          주요 하자소송 및 건축 분야 사건 수행 경험을 바탕으로 단지별 하자 구조와 소송 절차를 검토합니다.
        </SectionLead>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <InfoCard title="하자소송 수행 단지">
            <ul className="grid gap-3 text-lg font-semibold text-slate-700">
              {[
                '동탄역○○지오 하자소송',
                '원주○○더원그레이스 하자소송',
                'e편한세상 독○○타워 하자소송',
                '트○○제주더힐 하자소송',
                '범어○○포레스트 하자소송',
                '창원메○○시티2단지 하자소송',
                '증평○○루휴티스 하자소송',
                '부산센○○르지오 하자소송',
                '㈜더쿨○○트호텔 하자소송'
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#B89445]">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title="공사대금 및 건축분쟁" tone="beige">
            <ul className="grid gap-3 text-lg font-semibold text-slate-700">
              {[
                '㈜극동에이앤씨 공사대금',
                '○○삼환아파트 공사대금',
                '㈜라라건설 공사대금',
                '㈜수명엔지니어링 공사대금'
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#B89445]">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </InfoCard>
        </div>

        <div className="mt-10 rounded-3xl bg-[#08213D] px-8 py-6 text-center text-xl font-black leading-relaxed text-white">
          수행 경험은 단순 이력 나열이 아니라, 단지별 하자 구조와 소송 절차를 이해하는 근거입니다.
        </div>
      </section>

      {/* 05 Strength */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionLabel>APARTMENT DEFECT LITIGATION</SectionLabel>
          <SectionTitle>안재현 변호사 법률사무소의 강점</SectionTitle>
          <SectionLead>
            하자소송은 법률 검토만으로 끝나는 사건이 아닙니다.
            건축자료, 하자적출, 채권양도, 입주민 설명이 함께 움직여야 합니다.
          </SectionLead>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <InfoCard number="01" title="건축·하자소송 수행 경험">
              아파트·집합건물 하자소송, 공사대금 분쟁 수행 경험을 바탕으로 검토합니다.
            </InfoCard>
            <InfoCard number="02" title="입대의 의사결정 지원" tone="beige">
              회의자료, 입주민설명회, 채권양도 절차를 함께 고려합니다.
            </InfoCard>
            <InfoCard number="03" title="감정 절차 중심 대응">
              현장조사, 감정보고서, 보완감정, 조정 전략을 관리합니다.
            </InfoCard>
          </div>

          <div className="mt-10 rounded-3xl border border-[#B89445]/40 bg-[#F2EBDD] p-8">
            <h3 className="text-2xl font-black text-[#08213D]">기업 법무 및 분쟁 경험</h3>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              법무팀장·법무이사 경력을 바탕으로 한 실무형 대응.
              하자소송은 “소송”이면서 동시에 단지의 “자산관리” 전략입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 06 Checklist */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionLabel>APARTMENT DEFECT LITIGATION</SectionLabel>
        <SectionTitle>우리 단지도 하자소송 검토가 필요한가?</SectionTitle>
        <SectionLead>
          반복되는 누수·균열·결로·타일 들뜸은 단순 민원이 아니라 단지의 손해일 수 있습니다.
        </SectionLead>

        <div className="mt-12 rounded-[2.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-10">
          <h3 className="mb-8 text-2xl font-black text-[#08213D]">검토 체크리스트</h3>
          <ul className="grid gap-4 md:grid-cols-2">
            <CheckItem>사용검사 후 2년 이상 지났거나 하자보수기간 종료가 임박했다.</CheckItem>
            <CheckItem>공용부 누수, 균열, 결로, 타일 들뜸, 승강기 고장 민원이 반복된다.</CheckItem>
            <CheckItem>시공사 보수가 임시방편에 그치거나 동일 하자가 재발한다.</CheckItem>
            <CheckItem>하자보수 예치금을 사용했지만 여전히 하자가 남아 있다.</CheckItem>
            <CheckItem>입주민 사이에 하자보상 또는 정밀진단 요구가 늘고 있다.</CheckItem>
            <CheckItem>아직 전문 하자진단이나 법률 검토를 받은 적이 없다.</CheckItem>
          </ul>
        </div>

        <div className="mt-10 rounded-3xl bg-[#08213D] px-8 py-6 text-center text-xl font-black leading-relaxed text-white">
          하자소송은 “하자가 있느냐”만 보는 절차가 아니라 사용검사일, 하자 유형, 보증기간, 채권양도 가능성을 함께 검토하는 절차입니다.
        </div>
      </section>

      {/* 07 Barrier */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionLabel>APARTMENT DEFECT LITIGATION</SectionLabel>
          <SectionTitle>소송을 망설이게 만드는 현실적 장벽</SectionTitle>
          <SectionLead>
            입주자대표회의가 하자소송을 검토할 때 가장 먼저 부딪히는 문제는 비용, 동의, 기간, 책임 부담입니다.
          </SectionLead>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              ['01', '변호사 선임비', '착수금과 성공보수 구조 검토'],
              ['02', '하자진단비', '전문가 현장조사와 보고서 비용'],
              ['03', '법원 실비', '인지대, 송달료, 공탁 관련 비용'],
              ['04', '감정료', '법원 감정 진행 시 고액 부담 가능'],
              ['05', '입주민 동의', '채권양도율 확보와 설명회 부담'],
              ['06', '패소 리스크', '비용 회수 가능성과 책임 문제'],
            ].map(([no, title, desc], idx) => (
              <InfoCard key={no} number={no} title={title} tone={idx % 2 ? 'beige' : 'white'}>
                {desc}
              </InfoCard>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-[#08213D] px-8 py-6 text-center text-xl font-black leading-relaxed text-white">
            그래서 필요한 것은 초기 비용 부담을 줄이고, 하자진단부터 감정 대응까지 일괄 관리하는 구조입니다.
          </div>
        </div>
      </section>

      {/* 08 Proposal */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionLabel>APARTMENT DEFECT LITIGATION</SectionLabel>
        <SectionTitle>안재현 변호사 법률사무소의 제안</SectionTitle>
        <SectionLead>
          초기비용 부담을 줄이고, 단지별 하자 규모와 법적 회수 가능성을 기준으로 하자소송 전략을 설계합니다.
        </SectionLead>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2.5rem] bg-[#08213D] p-8 text-white shadow-xl md:p-10">
            <div className="text-[9rem] font-black leading-none text-[#B89445] md:text-[12rem]">0</div>
            <h3 className="mt-4 text-4xl font-black leading-tight">
              입주민 초기부담<br />0원 구조
            </h3>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              구체적인 비용 부담 범위와 정산 방식은 단지별 검토 후 약정 기준에 따라 정리됩니다.
            </p>
          </div>

          <div className="rounded-[2.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-10">
            <h3 className="mb-6 text-2xl font-black text-[#08213D]">비용 부담 구조 예시</h3>
            <div className="divide-y divide-slate-200">
              {[
                ['변호사 선임비', '사무소 선부담'],
                ['하자진단비 및 보고서 작성비', '사무소 선부담'],
                ['채권양도 관련 비용', '사무소 선부담'],
                ['인지대·송달료 등 법원 실비', '사무소 선부담'],
                ['감정료', '사무소 선부담'],
                ['정산 방식', '승소·회수 후 약정 기준 정산'],
              ].map(([left, right]) => (
                <div key={left} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-4 text-base md:text-lg">
                  <span className="font-bold text-slate-700">{left}</span>
                  <span className="font-black text-[#B89445]">→</span>
                  <span className="text-right font-black text-[#08213D]">{right}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 09 Defects */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionLabel>APARTMENT DEFECT LITIGATION</SectionLabel>
          <SectionTitle>하자는 단순 불편이 아니라 입주민의 재산 손해입니다</SectionTitle>
          <SectionLead>
            공동주택 하자는 생활 불편을 넘어 보수비용, 안전 문제, 자산가치 하락으로 이어질 수 있습니다.
          </SectionLead>

          <div className="mt-10 rounded-[2.5rem] bg-[#08213D] p-8 text-center text-2xl font-black text-white shadow-xl">
            하자는 보이는 균열보다 더 넓은 손해 구조를 의미합니다.
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <InfoCard title="공용부 하자">
              지하주차장, 옥상, 외벽, 계단, 승강기, 설비 배관
            </InfoCard>
            <InfoCard title="전유부 하자" tone="beige">
              세대 내부 누수, 결로, 마감 불량, 창호, 타일, 욕실
            </InfoCard>
            <InfoCard title="시공상 하자">
              미시공, 오시공, 설계와 다른 시공, 저품질 자재 사용
            </InfoCard>
            <InfoCard title="기능·미관·안전 하자" tone="beige">
              균열, 누수, 곰팡이, 탈락, 침하, 소음, 설비 고장
            </InfoCard>
          </div>

          <div className="mt-10 rounded-3xl border border-[#B89445]/40 bg-[#F2EBDD] p-8">
            <h3 className="text-2xl font-black text-[#08213D]">
              하자는 민원이 아니라, 회수해야 할 손해입니다.
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              하자소송은 단순 보수 요청이 아니라, 입주민이 부담해서는 안 될 손해를 법적으로 회수하는 절차입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 10 Legal Structure */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionLabel>APARTMENT DEFECT LITIGATION</SectionLabel>
        <SectionTitle>하자소송의 두 가지 법적 구조</SectionTitle>
        <SectionLead>
          하자소송은 하나의 절차처럼 보이지만, 실제 청구 구조는 하자 발생 시점과 성격에 따라 나뉩니다.
        </SectionLead>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-sm ring-1 ring-slate-200">
            <div className="bg-[#08213D] px-8 py-6 text-white">
              <h3 className="text-3xl font-black">사용검사 전 하자</h3>
              <p className="mt-1 font-bold text-[#D8C084]">전체 하자의 60~70%</p>
            </div>
            <div className="divide-y divide-slate-200 p-8">
              {[
                ['특징', '보수가 어려운 근본적 하자'],
                ['원인', '미시공·오시공·변경시공'],
                ['사례', '지하주차장 지붕, 층간소음, 스프링클러 누락'],
                ['대응', '손해배상 청구 중심'],
              ].map(([label, text]) => (
                <p key={label} className="grid grid-cols-[70px_1fr] gap-4 py-5 text-lg">
                  <span className="font-black text-[#B89445]">{label}</span>
                  <span className="font-bold text-slate-700">{text}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-sm ring-1 ring-slate-200">
            <div className="bg-[#B89445] px-8 py-6 text-white">
              <h3 className="text-3xl font-black">사용검사 후 하자</h3>
              <p className="mt-1 font-bold text-white/80">전체 하자의 30~40%</p>
            </div>
            <div className="divide-y divide-slate-200 p-8">
              {[
                ['특징', '보수가 가능한 기능적 하자'],
                ['원인', '균열·침하·누수, 기능 및 미관상 지장'],
                ['사례', '결로, 곰팡이, 타일 파손, 누수'],
                ['대응', '하자보수보증금 청구 중심'],
              ].map(([label, text]) => (
                <p key={label} className="grid grid-cols-[70px_1fr] gap-4 py-5 text-lg">
                  <span className="font-black text-[#B89445]">{label}</span>
                  <span className="font-bold text-slate-700">{text}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-[#08213D] px-8 py-6 text-center text-xl font-black leading-relaxed text-white">
          하자예치금을 사용했더라도, 사용검사 전 하자에 대한 손해배상청구는 별도로 검토될 수 있습니다.
        </div>
      </section>

      {/* 11 Limitation */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionLabel>APARTMENT DEFECT LITIGATION</SectionLabel>
          <SectionTitle>
            우리 법은 입주민의 편이지만,<br />
            시간은 시공사의 편입니다
          </SectionTitle>
          <SectionLead>
            집합건물법상 하자담보책임의 제척기간이 도과하기 전,
            사용검사일과 하자보수 이력을 먼저 확인해야 합니다.
          </SectionLead>

          <div className="mt-12 rounded-[2.5rem] bg-[#f6f1e8] p-6 shadow-sm ring-1 ring-slate-200 md:p-10">
            <h3 className="text-2xl font-black text-[#08213D]">하자 유형별 기간 검토</h3>
            <p className="mt-3 text-slate-600">
              기간이 지나면 청구 가능한 범위가 줄어들 수 있으므로, 초기 검토가 중요합니다.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <InfoCard title="2~3년 하자" tone="white">
                <strong className="text-[#08213D]">마감·설비</strong><br />
                마감공사·건축설비, 도배·타일, 목공사, 창호, 조경공사
              </InfoCard>
              <InfoCard title="5년 하자" tone="white">
                <strong className="text-[#08213D]">구조·방수</strong><br />
                미시공·오시공·방수, 대지조성, 철근콘크리트, 방수공사
              </InfoCard>
              <InfoCard title="10년 하자" tone="white">
                <strong className="text-[#08213D]">주요 구조부</strong><br />
                건물의 주요 구조부 및 지반공사, 치명적 하자는 장기 검토 대상
              </InfoCard>
            </div>
            <div className="mt-8 rounded-3xl bg-white p-6 text-base font-bold leading-relaxed text-slate-700 ring-1 ring-slate-200">
              단지별 검토 기준: 사용검사일 · 분양시기 · 하자 발생 시점 · 하자 유형 · 보수 이력 · 청구 상대방 · 채권양도 가능성
            </div>
          </div>

          <div className="mt-10 rounded-3xl bg-[#08213D] px-8 py-6 text-xl font-black leading-relaxed text-white">
            기간이 지나면 청구가 어려워질 수 있습니다.<br />
            2013년 6월 이후 분양 아파트는 제척기간 검토가 특히 중요합니다.
            사용검사일과 하자보수 이력부터 먼저 확인해야 합니다.
          </div>
        </div>
      </section>

      {/* 12 Process */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionLabel>APARTMENT DEFECT LITIGATION</SectionLabel>
        <SectionTitle>하자소송 진행 절차</SectionTitle>
        <SectionLead>
          하자진단 및 적출부터 채권양도, 소장 접수, 감정, 판결, 소송비용 상환까지 단계별로 진행됩니다.
        </SectionLead>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {processSteps.map(([no, title, desc]) => (
            <ProcessStep key={no} no={no} title={title} desc={desc} />
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-[#08213D] px-8 py-6 text-center text-xl font-black leading-relaxed text-white">
          절차의 핵심은 “하자 적출 → 권리 이전 → 감정 대응 → 배상금 회수”입니다.
        </div>
      </section>

      {/* 13 Documents */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionLabel>APARTMENT DEFECT LITIGATION</SectionLabel>
          <SectionTitle>초기 검토를 위한 기본자료 안내</SectionTitle>
          <SectionLead>
            초기 검토에서는 사용검사일, 하자 발생 경위, 보수 이력, 입주민 민원자료를 기준으로 청구 가능성을 먼저 확인합니다.
          </SectionLead>

          <div className="mt-12 rounded-[2.5rem] bg-[#f6f1e8] p-6 shadow-sm ring-1 ring-slate-200 md:p-10">
            <h3 className="mb-8 text-2xl font-black text-[#08213D]">준비자료 체크리스트</h3>
            <ul className="grid gap-4 md:grid-cols-2">
              {[
                '사용검사일 확인 자료',
                '하자보수 요청 내역',
                '시공사·시행사 답변 자료',
                '하자보수 예치금 사용 내역',
                '입주민 민원 자료',
                '공용부 하자 사진',
                '관리사무소 보수 이력',
                '기존 하자진단 보고서',
                '입주자대표회의 회의록'
              ].map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </div>

          <div className="mt-10 rounded-3xl bg-[#08213D] px-8 py-6 text-center text-xl font-black leading-relaxed text-white">
            준비자료가 정리되면 사용검사일, 하자 유형, 보증기간, 채권양도 가능성을 더 빠르게 검토할 수 있습니다.
          </div>
        </div>
      </section>

      {/* 14 FAQ */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionLabel>APARTMENT DEFECT LITIGATION</SectionLabel>
        <SectionTitle>입주자대표회의 핵심 Q&A</SectionTitle>
        <SectionLead>
          자주 확인하는 질문을 기준으로 하자소송 검토 포인트를 정리했습니다.
        </SectionLead>

        <div className="mt-12 grid gap-5">
          <FAQItem
            q="Q1. 하자예치금을 이미 사용했는데도 소송이 가능한가요?"
            a="사용검사 후 하자보수보증금 청구와 사용검사 전 하자 손해배상청구는 별도로 검토될 수 있습니다."
          />
          <FAQItem
            q="Q2. 입주민 전원이 동의해야 하나요?"
            a="채권양도율은 회수 규모와 절차 안정성에 영향을 주므로, 설명자료와 동의 절차를 체계적으로 준비해야 합니다."
          />
          <FAQItem
            q="Q3. 패소하면 비용 부담이 생기나요?"
            a="비용 부담 구조는 약정 기준으로 정리되며, 사전 검토 단계에서 범위와 정산 방식을 명확히 확인해야 합니다."
          />
          <FAQItem
            q="Q4. 소송기간은 어느 정도 걸리나요?"
            a="법원 감정, 보완감정, 조정 여부에 따라 달라지므로 단지별 하자 규모와 사건 진행 상황을 기준으로 안내합니다."
          />
        </div>
      </section>

      {/* 15 Trust */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionLabel>APARTMENT DEFECT LITIGATION</SectionLabel>

          <SectionTitle>
            자격과 공적 활동으로 확인하는<br className="hidden md:block" />
            안재현 대표변호사의 전문성
          </SectionTitle>

          <SectionLead>
            하자소송은 장기간의 감정절차와 입주민 의사결정이 함께 움직이는 사건입니다.
            대표변호사의 자격, 전문분야 등록, 공공기관 위촉 및 대외 협력 이력을 기준으로
            신뢰할 수 있는 소송 수행 체계를 확인할 수 있습니다.
          </SectionLead>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <InfoCard title="공식 자격">
              변호사 등록, 사법연수원 수료 및 대한변호사협회 등록 전문분야 자료를 확인할 수 있습니다.
            </InfoCard>

            <InfoCard title="공공기관 위촉" tone="beige">
              인천서부경찰서, 인천계양경찰서 수사민원 상담 관련 위촉 이력을 확인할 수 있습니다.
            </InfoCard>

            <InfoCard title="대외 협력">
              노동조합 등 외부 기관과의 업무협약을 통해 법률 자문 기반을 넓혀 왔습니다.
            </InfoCard>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <div
                key={cert.title}
                className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex h-[300px] items-center justify-center bg-[#f6f1e8] p-5">
                  <img
                    src={cert.src}
                    alt={cert.title}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="bg-[#08213D] px-5 py-4 text-center">
                  <p className="text-sm md:text-base font-black text-white">
                    {cert.title}
                  </p>
                  <p className="mt-1 text-xs md:text-sm font-semibold text-white/60">
                    {cert.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-[#08213D] px-8 py-7 text-center shadow-xl">
            <p className="text-lg md:text-2xl font-black leading-relaxed text-white">
              하자소송은 단순한 법률 상담이 아니라,
              건축자료 검토·하자진단·감정 대응·입주민 절차까지 함께 관리해야 하는 복합 분쟁입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 16 Location */}
      <section className="mx-auto max-w-7xl px-6 py-24 pb-32 md:px-10 md:pb-24" id="haja-contact">
        <SectionLabel>CONTACT & LOCATION</SectionLabel>
        <SectionTitle>오시는 길</SectionTitle>
        <SectionLead>
          방문 상담 및 입주자대표회의 검토 미팅을 위한 안내 페이지입니다.
        </SectionLead>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-5">
            <InfoCard title="주요 위치">
              인천지방법원 · 인천지방검찰청 인근 / 학익2동 행정복지센터 인근
            </InfoCard>
            <InfoCard title="방문 안내" tone="beige">
              인천광역시 미추홀구 학익소로 29, 103호·104호<br />
              학익동, 석목법조빌딩
            </InfoCard>
            <InfoCard title="대중교통">
              인천지방법원·인천지방검찰청 주변 도로를 기준으로 접근 가능합니다.
            </InfoCard>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CTAButton href="tel:1688-5644">전화 상담</CTAButton>
              <CTAButton href={googleMapUrl} variant="gold">구글 지도로 크게보기</CTAButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl">
            <iframe
              src={googleMapSrc}
              title="안재현 변호사 법률사무소 오시는 길"
              width="100%"
              height="520"
              className="h-[420px] w-full md:h-[520px]"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-[#08213D] px-8 py-6 text-center text-xl font-black leading-relaxed text-white">
          방문 전 단지명과 사용검사일을 알려주시면 초기 검토가 더 원활합니다.
        </div>
      </section>
    </main>
  );
};

export default HajaLandingPage;
