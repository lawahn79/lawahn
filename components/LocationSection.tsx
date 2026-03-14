
import React from 'react';

const LocationSection: React.FC = () => {
  // 구글 지도 임베드 URL (사용자 제공)
  const googleMapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3167.6718248479287!2d126.66741167719782!3d37.44485673109375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b7988238dbc31%3A0xd784ddcb9de4da40!2z7J247LKc7J207Zi87KCE66y467OA7Zi47IKsIOyViOyerO2YhCDrspXrpaDsgqzrrLTshowgLSDtmJXsgqzrr7zsgqzsnbTtmLzsoITrrLg!5e0!3m2!1sko!2skr!4v1767008548755!5m2!1sko!2skr";

  return (
    <section className="py-24 bg-white scroll-mt-24" id="오시는길">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* 정보 영역 */}
          <div className="lg:w-1/3">
            <div className="text-amber-600 font-bold mb-4 tracking-widest uppercase text-xs">Our Office</div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-10 tracking-tighter">
              오시는 길
            </h2>
            
            <div className="space-y-10">
              <div className="group">
                <h4 className="text-slate-900 font-black text-xl mb-3 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-amber-600 rounded-full"></span> 주소
                </h4>
                <p className="text-slate-600 leading-relaxed text-lg">
                  인천광역시 미추홀구 학익소로 29,<br />
                  <span className="font-bold text-slate-900">석목법조빌딩 104호 (학익동)</span>
                </p>
              </div>

              <div className="group">
                <h4 className="text-slate-900 font-black text-xl mb-3 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-slate-900 rounded-full"></span> 연락처
                </h4>
                <div className="space-y-2">
                  <p className="text-slate-600 text-lg flex items-center gap-3">
                    <span className="text-amber-600 font-bold min-w-[50px]">전화</span> 
                    <a href="tel:1688-5644" className="hover:text-amber-600 transition-colors">1688-5644</a>
                  </p>
                  <p className="text-slate-600 text-lg flex items-center gap-3">
                    <span className="text-amber-600 font-bold min-w-[50px]">팩스</span> 032-715-5559
                  </p>
                </div>
              </div>

              <div className="group">
                <h4 className="text-slate-900 font-black text-xl mb-3 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-slate-200 rounded-full"></span> 방문 안내
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  인천구치소 정문 바로 앞에 위치하여 찾으시기 매우 쉽습니다.<br />
                  석목법조빌딩 1층 104호로 내방해 주시면 친절히 안내해 드리겠습니다.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <a 
                href="https://maps.app.goo.gl/uXj9X6eKzD6R8e7B9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 hover:shadow-xl transition-all hover:scale-[1.02] active:scale-95 text-base shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-amber-500" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                구글 지도로 크게보기
              </a>
            </div>
          </div>
          
          {/* 지도 영역 */}
          <div className="lg:w-2/3 w-full">
            <div className="rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl bg-slate-50 relative min-h-[450px]">
              {/* 구글 지도 iframe */}
              <iframe 
                src={googleMapSrc}
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full grayscale hover:grayscale-0 transition-all duration-700"
                title="법률사무소 안 오시는 길"
              ></iframe>
              
              {/* 로딩 표시 (배경) */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col md:flex-row items-center justify-between px-4 gap-4">
              <p className="text-xs text-slate-400 font-medium order-2 md:order-1">
                * 위 지도는 Google Maps API를 통해 실시간 위치를 제공합니다.
              </p>
              <div className="flex items-center gap-2 order-1 md:order-2 opacity-60 grayscale">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Powered by Google</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
