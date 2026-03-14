
import React from 'react';
import { ServiceCardProps } from '../types';

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, category }) => {
  return (
    <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-amber-200 hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors duration-500">
        {icon}
      </div>
      <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-2">{category}</div>
      <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6">
        {description}
      </p>
      <button className="mt-auto text-xs font-bold text-slate-400 group-hover:text-amber-600 flex items-center gap-1 transition-colors">
        자세히 보기 <span className="text-lg">→</span>
      </button>
    </div>
  );
};

export default ServiceCard;
