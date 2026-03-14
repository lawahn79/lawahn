
import React, { useState, useEffect, useRef } from 'react';

interface ConsultationPopupProps {
  onClose: () => void;
}

const ConsultationPopup: React.FC<ConsultationPopupProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    content: ''
  });

  // 포커스 이동을 위한 Ref
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwpAeaJLVzSkzrAaHoJYQyXMd0PCKtw_oHvo-2YAhSxEvHqenTR90rwz6R6egp4pawS4Q/exec";

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent, nextRef: React.RefObject<any>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 폼 제출 방지
      nextRef.current?.focus();
    }
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

    setIsSending(true);

    try {
      await fetch(GAS_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formType: '팝업 상담폼',
          timestamp: new Date().toLocaleString('ko-KR'),
          name: formData.name,
          phone: formData.phone,
          category: '팝업 긴급문의',
          content: formData.content,
          message: formData.content
        })
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Popup Error:', error);
      alert('전송 중 오류가 발생했습니다. 직접 전화(1688-5644) 문의 주시면 감사하겠습니다.');
    } finally {
      setIsSending(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-in slide-in-from-bottom-8 duration-700">
        
        {isSending && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-[110] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-blue-900 font-black">신속하게 접수 중입니다...</p>
          </div>
        )}

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-[120] p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full h-full flex flex-col md:flex-row overflow-y-auto">
          {/* Left Side (Identity) */}
          <div className="md:w-5/12 bg-slate-900 p-10 text-white flex flex-col justify-between relative shrink-0">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="text-amber-500 font-serif text-5xl leading-none">安</div>
                <div className="text-white text-lg font-black tracking-tight">법률사무소 '安'</div>
              </div>

              <h3 className="text-3xl font-black mb-6 leading-tight">
                당신의 평안을 위한<br />
                <span className="text-amber-500">24시 무료상담</span>
              </h3>
              
              <ul className="space-y-4">
                {['형사/성범죄 전문', '이혼/재산분할 전문', '변호사 직접 상담'].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center text-[10px] text-white">✓</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <div className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-2">Direct Call</div>
              <a 
                href="tel:1688-5644" 
                className="text-2xl font-black text-white hover:text-amber-500 transition-colors block cursor-pointer"
              >
                1688-5644
              </a>
            </div>
          </div>

          {/* Right Side (Form or Success) */}
          <div className="md:w-7/12 p-10 md:p-14 bg-white flex flex-col justify-center">
            {!isSubmitted ? (
              <div className="animate-in fade-in duration-500">
                <div className="mb-10">
                  <h4 className="text-2xl font-black text-slate-900 tracking-tighter">간편 상담 예약</h4>
                  <p className="text-slate-500 text-sm mt-2">연락처를 남겨주시면 확인 후 신속하게 연락드리겠습니다.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-700 ml-1">의뢰인 성함</label>
                    <input 
                      ref={nameRef}
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      onKeyDown={(e) => handleKeyDown(e, phoneRef)}
                      placeholder="성함 입력"
                      enterKeyHint="next"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-700 ml-1">연락처</label>
                    <input 
                      ref={phoneRef}
                      type="tel" 
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: formatPhoneNumber(e.target.value)})}
                      onKeyDown={(e) => handleKeyDown(e, contentRef)}
                      placeholder="연락처를 입력해 주세요"
                      enterKeyHint="next"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-700 ml-1">문의 내용 (선택)</label>
                    <textarea 
                      ref={contentRef}
                      rows={3}
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      placeholder="간략한 고민 내용을 적어주세요."
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-2 mb-4 ml-1">
                    <input type="checkbox" id="popup-privacy" required className="mt-1 accent-amber-600 w-4 h-4" />
                    <label htmlFor="popup-privacy" className="text-[11px] text-slate-500 font-medium leading-tight cursor-pointer">
                      개인정보 수집 및 이용(비밀보장)에 동의합니다.
                    </label>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSending}
                    className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-amber-600 transition-all shadow-xl disabled:bg-slate-400"
                  >
                    상담 신청하기
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center animate-in zoom-in-95 duration-500 py-10">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">접수가 완료되었습니다</h4>
                <p className="text-slate-600 leading-relaxed mb-10">
                  남겨주신 번호로<br />
                  <span className="text-amber-600 font-bold">신속하게 직접 연락</span> 드리겠습니다.
                </p>
                <button 
                  onClick={onClose}
                  className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-lg"
                >
                  확인
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPopup;
