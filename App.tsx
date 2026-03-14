
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import PracticeAreas from './components/PracticeAreas';
import SuccessStories from './components/SuccessStories';
import ExpertSection from './components/ExpertSection';
import ContactForm from './components/ContactForm';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import KakaoTalkFAB from './components/KakaoTalkFAB';
import ConsultationPopup from './components/ConsultationPopup';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const kakaoLink = "https://open.kakao.com/o/sPg32K7h";
  const ADMIN_PASSWORD = "lawahn0325";

  // 관리자 모드 진입 공통 로직
  const tryAdminAccess = () => {
    const pw = prompt('관리자 비밀번호를 입력하세요.');
    if (pw === ADMIN_PASSWORD) {
      setShowAdmin(true);
    } else if (pw !== null) {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  // 숨겨진 키 입력 감지 (Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shift 키와 A(또는 a)가 함께 눌렸는지 확인
      if (e.shiftKey && e.key.toUpperCase() === 'A') {
        tryAdminAccess();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKakaoClick = () => {
    window.open(kakaoLink, '_blank');
  };

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

  return (
    <div className="min-h-screen selection:bg-amber-100 selection:text-amber-900 scroll-smooth text-slate-900 overflow-x-hidden">
      {/* 팝업 등장 */}
      {showPopup && <ConsultationPopup onClose={() => setShowPopup(false)} />}
      
      {/* 관리자 대시보드 */}
      {showAdmin && <AdminDashboard onClose={() => setShowAdmin(false)} />}
      
      <Navbar />
      <main>
        <Hero />
        
        {/* Quick Links Section (Top) */}
        <div className="container mx-auto px-6 -mt-10 lg:-mt-16 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: '전화 상담', value: '1688-5644', icon: '📞', action: () => window.location.href = 'tel:1688-5644' },
              { label: '카톡 상담', value: 'ID : lawkr', icon: '💬', action: handleKakaoClick },
              { label: '온라인 상담', value: '24시간 접수 중', icon: '📝', action: scrollToForm },
            ].map((item, idx) => (
              <div 
                key={idx} 
                onClick={item.action}
                className="bg-white p-4 lg:p-6 rounded-2xl shadow-xl border border-slate-100 hover:translate-y-[-5px] transition-all cursor-pointer group"
              >
                <div className="text-xl lg:text-2xl mb-2">{item.icon}</div>
                <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">{item.label}</div>
                <div className="text-xs md:text-base font-black text-slate-800 group-hover:text-amber-600 transition-colors">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <AboutSection />
        <PracticeAreas />

        {/* Brand Philosophy Section */}
        <section className="py-24 bg-blue-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
            <svg width="600" height="600" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" />
              <path d="M50 10 L50 90 M10 50 L90 50" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-1 border border-amber-500/50 text-amber-500 text-xs font-bold uppercase tracking-widest mb-6">
                Our Core Value
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tighter">
                "의뢰인이 우선입니다."<br /> 
                <span className="text-amber-500 font-medium text-xl md:text-2xl opacity-90">언제나 의뢰인의 입장에서 진정성 있게 답합니다.</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                <div>
                  <div className="text-4xl font-black text-amber-500 mb-4 font-serif">01</div>
                  <h4 className="text-xl font-bold mb-4">공감과 경청</h4>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    의뢰인이 겪고 있는 고통과 불안을 가장 먼저 깊이 공감하고, 진심 어린 경청에서부터 모든 해결책을 찾습니다.
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-black text-amber-500 mb-4 font-serif">02</div>
                  <h4 className="text-xl font-bold mb-4">진정성 있는 수행</h4>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    단순한 결과 도출을 넘어, 의뢰인의 삶이 다시 평온해질 수 있도록 모든 과정에 진정성을 담아 조력합니다.
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-black text-amber-500 mb-4 font-serif">03</div>
                  <h4 className="text-xl font-bold mb-4">의뢰인 권익 보호</h4>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    어떤 외압이나 어려움 앞에서도 의뢰인의 정당한 권익을 최우선으로 생각하며 끝까지 곁을 지킵니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SuccessStories />
        <ExpertSection />
        <ContactForm />
        <LocationSection />

        {/* CTA Section (Bottom) */}
        <section className="py-24 bg-amber-50 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            <div className="text-amber-600 font-bold mb-4 tracking-widest uppercase text-xs">Direct Consultation</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-12 max-w-2xl tracking-tighter">
              "의뢰인이 우선입니다."<br />
              법률사무소 '安'이 당신의 편에 서겠습니다.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
              {/* Phone Card */}
              <div className="flex flex-col items-center p-8 bg-white rounded-[2.5rem] shadow-xl border border-amber-100 hover:scale-[1.02] transition-transform">
                <div className="text-4xl mb-4">📞</div>
                <div className="text-slate-400 text-[10px] font-black mb-1 uppercase tracking-widest">상담 전화</div>
                <div className="text-2xl font-black text-slate-800 mb-6 tracking-tight">1688-5644</div>
                <button 
                  onClick={() => window.location.href = 'tel:1688-5644'}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-slate-800 transition-all shadow-md"
                >
                  지금 바로 전화걸기
                </button>
              </div>

              {/* Kakao Card */}
              <div className="flex flex-col items-center p-8 bg-white rounded-[2.5rem] shadow-xl border border-amber-100 hover:scale-[1.02] transition-transform">
                <div className="text-4xl mb-4">💬</div>
                <div className="text-slate-400 text-[10px] font-black mb-1 uppercase tracking-widest">카카오톡 상담</div>
                <div className="text-2xl font-black text-slate-800 mb-6 tracking-tight">ID : lawkr</div>
                <button 
                  onClick={handleKakaoClick}
                  className="w-full py-4 bg-[#FEE500] text-[#3C1E1E] rounded-2xl text-sm font-black hover:bg-[#FADA0A] transition-all shadow-md"
                >
                  실시간 카톡문의
                </button>
              </div>

              {/* Online Form Card */}
              <div className="flex flex-col items-center p-8 bg-white rounded-[2.5rem] shadow-xl border border-amber-100 hover:scale-[1.02] transition-transform">
                <div className="text-4xl mb-4">📝</div>
                <div className="text-slate-400 text-[10px] font-black mb-1 uppercase tracking-widest">온라인 상담</div>
                <div className="text-2xl font-black text-slate-800 mb-6 tracking-tight">24시간 접수 중</div>
                <button 
                  onClick={scrollToForm}
                  className="w-full py-4 bg-amber-600 text-white rounded-2xl text-sm font-black hover:bg-amber-500 transition-all shadow-md"
                >
                  상담 예약 신청
                </button>
              </div>
            </div>
          </div>
          {/* Background Decoration */}
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </section>
      </main>

      <Footer onAdminOpen={tryAdminAccess} />
      <KakaoTalkFAB />
    </div>
  );
};

export default App;
