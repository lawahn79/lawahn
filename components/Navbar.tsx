import React, { useState, useEffect } from 'react';

type MenuItem =
  | { label: string; id: string; href?: never }
  | { label: string; href: string; id?: never };

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleConsultationClick = () => {
    if (window.location.pathname !== '/') {
      window.location.href = '/#consultation-form';
      return;
    }

    scrollToSection('consultation-form');
  };

  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: MenuItem
  ) => {
    if ('href' in item) {
      return;
    }

    e.preventDefault();

    if (window.location.pathname !== '/') {
      window.location.href = `/#${item.id}`;
      return;
    }

    scrollToSection(item.id);
  };

  const handleLogoClick = () => {
    if (window.location.pathname !== '/') {
      window.location.href = '/';
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems: MenuItem[] = [
    { label: '사무소소개', id: '사무소소개' },
    { label: '업무분야', id: '업무분야' },
    { label: '성공사례', id: '성공사례' },
    { label: '아파트하자소송', href: '/haja-lawsuit' },
    { label: '변호사소개', id: '변호사소개' },
    { label: '오시는길', id: '오시는길' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleLogoClick}
        >
          <div
            className={`text-2xl font-black tracking-tighter flex items-baseline transition-colors ${
              isScrolled ? 'text-blue-900' : 'text-white'
            }`}
          >
            LAW OFFICE <span className="text-amber-500 font-serif ml-2">安</span>
          </div>

          <div
            className={`h-6 w-px mx-2 hidden md:block transition-colors ${
              isScrolled ? 'bg-slate-300' : 'bg-white/30'
            }`}
          ></div>

          <div
            className={`text-xs font-bold hidden md:block leading-none transition-colors ${
              isScrolled ? 'text-slate-500' : 'text-white/80'
            }`}
          >
            법률사무소 安
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-10 font-medium">
  {menuItems.map((item) => (
    <a
      key={item.label}
      href={item.href ? item.href : `/#${item.id}`}
      onClick={(e) => {
        if (item.href) {
          return;
        }

        handleMenuClick(e, item.id as string);
      }}
      className={`text-sm font-bold transition-all hover:text-amber-500 ${
        isScrolled ? 'text-slate-800' : 'text-white drop-shadow-sm'
      }`}
    >
      {item.label}
    </a>
  ))}
</div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleConsultationClick}
            className={`${
              isScrolled ? 'bg-blue-900' : 'bg-amber-600'
            } text-white text-xs font-bold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition-all`}
          >
            상담신청하기
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
