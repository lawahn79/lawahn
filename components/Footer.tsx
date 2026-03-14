
import React from 'react';

interface FooterProps {
  onAdminOpen?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminOpen }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="text-2xl font-black tracking-tighter text-white flex items-baseline mb-6">
              LAW OFFICE <span className="text-amber-500 font-serif ml-2">安</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              법률사무소 '安'은 안재현 대표변호사의 '더블 전문성'을 바탕으로 당신의 평온한 내일을 위해 가장 든든한 법률 방패가 되어 드립니다. 
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">전담 센터</h4>
            <ul className="space-y-3 text-sm">
              <li>형사법 전문 센터</li>
              <li>이혼/가사 전문 센터</li>
              <li>성범죄/마약 특화 센터</li>
              <li>상속/재산분할 센터</li>
              <li>민사/부동산 분쟁</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">의뢰인 지원</h4>
            <ul className="space-y-3 text-sm">
              <li>실시간 성공사례</li>
              <li>비밀보장 1:1 상담</li>
              <li>오시는 길 안내</li>
              <li>안재현 변호사 소개</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">연락처 및 주소</h4>
            <div className="text-sm leading-relaxed space-y-4">
              <p>인천광역시 미추홀구 학익소로 29, 석목법조빌딩 104호(학익동)</p>
              <div className="flex items-center gap-2 text-white">
                <span className="text-amber-500">TEL.</span> 1688-5644
              </div>
              <div className="flex items-center gap-2 text-white">
                <span className="text-amber-500">FAX.</span> 032-715-5559
              </div>
              <div className="flex items-center gap-2 text-white">
                <span className="text-amber-500">MAIL.</span> lawahn79@gmail.com
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 법률사무소 安 (Law Office An). 대표변호사 안재현.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">이용약관</span>
            <span className="font-bold text-slate-400 hover:text-white cursor-pointer transition-colors" onClick={onAdminOpen}>개인정보처리방침</span>
            <span className="hover:text-white cursor-pointer transition-colors">이메일무단수집거부</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
