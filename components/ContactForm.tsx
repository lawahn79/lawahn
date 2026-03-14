
import React, { useState, useRef, useEffect } from 'react';

const ContactForm: React.FC = () => {
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '선택해 주세요',
    content: '',
    privacy: false
  });

  // 포커스 제어용 Ref
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwpAeaJLVzSkzrAaHoJYQyXMd0PCKtw_oHvo-2YAhSxEvHqenTR90rwz6R6egp4pawS4Q/exec";

  // 접수 완료 시 해당 위치로 스크롤 포커싱
  useEffect(() => {
    if (submitted) {
      const element = document.getElementById('consultation-form');
      if (element) {
        const offset = 100; // 상단 여백
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [submitted]);

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent, nextRef: React.RefObject<any>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    let val: string | boolean = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    if (name === 'phone' && typeof val === 'string') {
      val = formatPhoneNumber(val);
    }
    
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('성함을 입력해 주세요.');
      nameRef.current?.focus();
      return;
    }
    if (!formData.phone.trim()) {
      alert('연락처를 입력해 주세요.');
      phoneRef.current?.focus();
      return;
    }
    if (formData.category === '선택해 주세요') {
      alert('상담 분야를 선택해 주세요.');
      categoryRef.current?.focus();
      return;
    }
    if (!formData.content.trim()) {
      alert('문의 내용을 입력해 주세요.');
      contentRef.current?.focus();
      return;
    }
    if (!formData.privacy) return alert('개인정보 수집 및 이용에 동의해 주세요.');

    setIsSending(true);

    try {
      await fetch(GAS_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: '하단 메인상담폼',
          timestamp: new Date().toLocaleString('ko-KR'),
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          category: formData.category,
          content: formData.content,
          message: formData.content
        })
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Submit Error:', error);
      alert('전송 중 오류가 발생했습니다. 잠시 후 다시 시도하시거나 1688-5644로 전화 부탁드립니다.');
    } finally {
      setIsSending(false);
    }
  };

  if (submitted) {
    return (
      <section id="consultation-form" className="py-24 bg-white scroll-mt-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-xl mx-auto p-12 bg-slate-50 rounded-[3rem] border border-amber-100 shadow-xl animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">상담 신청이 완료되었습니다</h2>
            <p className="text-slate-600 mb-10 leading-relaxed">
              남겨주신 번호로<br />
              <span className="text-amber-600 font-bold">신속하게 직접 연락</span> 드리겠습니다.
            </p>
            <button 
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', phone: '', email: '', category: '선택해 주세요', content: '', privacy: false });
              }}
              className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-amber-600 transition-all shadow-lg"
            >
              확인
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="consultation-form" className="py-24 bg-slate-50 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-amber-600 font-bold mb-4 tracking-[0.2em] uppercase text-xs">Direct Consultation</div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">
              무료 법률상담 예약
            </h2>
            <p className="text-slate-500 text-lg">
              사건의 핵심을 찌르는 명쾌한 해답, 법률사무소 '安'이 함께합니다.
            </p>
          </div>

          <div className="bg-white p-8 md:p-16 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-100 relative overflow-hidden">
            {isSending && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center rounded-[3rem] animate-in fade-in duration-300">
                <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-blue-900 font-black">상담 접수가 진행 중입니다...</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mb-10">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-800 ml-1">의뢰인 성함</label>
                  <input 
                    ref={nameRef}
                    name="name"
                    type="text" 
                    value={formData.name}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, phoneRef)}
                    placeholder="성함을 입력하세요"
                    enterKeyHint="next"
                    className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-800 ml-1">연락처</label>
                  <input 
                    ref={phoneRef}
                    name="phone"
                    type="tel" 
                    inputMode="numeric"
                    value={formData.phone}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, categoryRef)}
                    placeholder="연락처를 입력해 주세요"
                    enterKeyHint="next"
                    className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="mb-10 space-y-2">
                <label className="text-sm font-black text-slate-800 ml-1">상담 분야</label>
                <div className="relative">
                  <select 
                    ref={categoryRef}
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option disabled>선택해 주세요</option>
                    <option>성범죄/마약</option>
                    <option>이혼/가사/상속</option>
                    <option>민사/부동산</option>
                    <option>형사/경제범죄</option>
                    <option>기타 법률 상담</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="mb-10 space-y-2">
                <label className="text-sm font-black text-slate-800 ml-1">상담 내용</label>
                <textarea 
                  ref={contentRef}
                  name="content"
                  rows={5}
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="상담을 원하시는 내용을 간략하게 적어주시면 더 정확한 상담이 가능합니다."
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-3 mb-12 ml-1">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  name="privacy"
                  checked={formData.privacy}
                  onChange={handleChange}
                  className="w-6 h-6 accent-amber-600 rounded cursor-pointer" 
                />
                <label htmlFor="privacy" className="text-sm text-slate-500 cursor-pointer select-none font-bold">
                  개인정보 수집 및 이용에 동의합니다. (작성하신 내용은 비밀이 보장됩니다.)
                </label>
              </div>

              <button 
                type="submit"
                disabled={isSending}
                className="w-full py-6 bg-slate-900 text-white font-black text-xl rounded-2xl shadow-2xl hover:bg-amber-600 transition-all duration-300 disabled:bg-slate-400"
              >
                {isSending ? '상담 접수 진행 중...' : '무료 법률상담 신청하기'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
