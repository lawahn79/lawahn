
import React, { useState, useEffect } from 'react';
import { SuccessCase } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [cases, setCases] = useState<SuccessCase[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SuccessCase>>({
    category: '성범죄',
    title: '',
    date: new Date().toISOString().split('T')[0],
    summary: '',
    solution: '',
    result: '',
    image: ''
  });

  const defaultCases: SuccessCase[] = [
    { 
      id: '1',
      category: '성범죄', 
      title: '강제추행 혐의 의뢰인 - 경찰 단계 무혐의 처분', 
      date: '2024.03.15',
      summary: '의뢰인은 술자리 이후 발생한 오해로 인해 강제추행 혐의로 고소당하여 경찰 조사를 앞두고 있었습니다.',
      solution: '본 사무소는 현장 CCTV 분석 및 목격자 진술을 확보하여 신체 접촉의 강제성이 없었음을 입증하는 변호인 의견서를 제출했습니다.',
      result: '경찰 단계에서 혐의없음(무혐의) 불송치 결정을 이끌어내어 사건을 조기 종결시켰습니다.'
    },
    { 
      id: '2',
      category: '이혼', 
      title: '상간남 위자료 청구 소송 - 원고 승소 (전액 인용)', 
      date: '2024.03.12',
      summary: '배우자의 부정행위 사실을 알게 된 의뢰인이 상대 남성을 대상으로 위자료 청구 소송을 제기했습니다.',
      solution: '부정행위를 입증할 수 있는 객관적 증거(채팅 내역, 카드 결제 기록 등)를 논리적으로 정리하여 제출하고 위자료 산정의 정당성을 주장했습니다.',
      result: '법원은 본 사무소의 주장을 모두 받아들여 청구 금액 전액 인용 판결을 내렸습니다.'
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('an_law_cases');
    if (saved) {
      setCases(JSON.parse(saved));
    } else {
      // 로컬 스토리지가 비어있으면 기본 데이터를 저장하고 상태에 반영
      localStorage.setItem('an_law_cases', JSON.stringify(defaultCases));
      setCases(defaultCases);
    }
  }, []);

  const saveToLocal = (newCases: SuccessCase[]) => {
    localStorage.setItem('an_law_cases', JSON.stringify(newCases));
    setCases(newCases);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('이미지 크기는 2MB를 초과할 수 없습니다.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedCases: SuccessCase[];
    
    if (editingId) {
      // 수정 모드: ID가 같은 항목을 찾아 업데이트
      updatedCases = cases.map(c => c.id === editingId ? { ...formData, id: editingId } as SuccessCase : c);
    } else {
      // 추가 모드: 새로운 ID 생성 후 맨 앞에 추가
      const newCase = { ...formData, id: Date.now().toString() } as SuccessCase;
      updatedCases = [newCase, ...cases];
    }
    
    saveToLocal(updatedCases);
    resetForm();
    alert(editingId ? '성공적으로 수정되었습니다.' : '새로운 사례가 등록되었습니다.');
    // 즉시 반영을 위해 페이지 새로고침
    window.location.reload();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('이 사례를 정말 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.')) {
      const filtered = cases.filter(c => c.id !== id);
      saveToLocal(filtered);
      window.location.reload();
    }
  };

  const handleEdit = (item: SuccessCase) => {
    setEditingId(item.id);
    setFormData(item);
    setIsAdding(true); // 폼 화면으로 전환
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      category: '성범죄',
      title: '',
      date: new Date().toISOString().split('T')[0],
      summary: '',
      solution: '',
      result: '',
      image: ''
    });
  };

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(cases, null, 2));
    alert('전체 데이터를 복사했습니다. 코드에 영구 반영할 때 사용하세요.');
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-900/90 backdrop-blur-md overflow-y-auto p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-800 p-8 text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-black">성공 사례 관리자 패널</h2>
            <p className="text-slate-400 text-sm">등록/수정/삭제 시 실시간으로 홈페이지에 반영됩니다.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={copyJSON} className="hidden md:block px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-xs font-bold transition-all">전체 데이터 복사</button>
            <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        <div className="p-6 md:p-10 flex-1 overflow-y-auto">
          {!isAdding ? (
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <h3 className="text-xl font-black text-slate-800">등록된 사례 목록 ({cases.length}건)</h3>
                <button 
                  onClick={() => setIsAdding(true)}
                  className="px-6 py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg"
                >
                  + 새로운 사례 추가
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {cases.length === 0 ? (
                  <div className="text-center py-20 text-slate-400 bg-slate-50 rounded-3xl border-2 border-dashed">
                    등록된 사례가 없습니다. 새로운 사례를 추가해 주세요.
                  </div>
                ) : (
                  cases.map(c => (
                    <div key={c.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-white hover:shadow-xl transition-all group">
                      <div className="flex gap-6 items-center">
                        <div className="w-16 h-16 rounded-2xl bg-slate-200 overflow-hidden shrink-0 border border-slate-200">
                          {c.image ? (
                            <img src={c.image} className="w-full h-full object-cover" alt="판결문" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 uppercase tracking-tighter">
                              {c.category}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">{c.date}</span>
                          </div>
                          <h4 className="font-black text-slate-800 text-lg leading-tight">{c.title}</h4>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 w-full md:w-auto">
                        <button 
                          onClick={() => handleEdit(c)}
                          className="flex-1 md:flex-none px-6 py-2.5 bg-white text-blue-700 text-sm font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-all"
                        >
                          수정
                        </button>
                        <button 
                          onClick={() => handleDelete(c.id)}
                          className="flex-1 md:flex-none px-6 py-2.5 bg-white text-red-600 text-sm font-bold rounded-xl border border-red-100 hover:bg-red-50 transition-all"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-black text-slate-800">
                  {editingId ? '성공 사례 수정하기' : '새로운 성공 사례 등록'}
                </h3>
                <button type="button" onClick={resetForm} className="text-slate-400 hover:text-slate-600 font-bold">돌아가기</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-3">카테고리 분류</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option>성범죄</option>
                    <option>형사</option>
                    <option>이혼</option>
                    <option>민사</option>
                    <option>상속</option>
                    <option>경제/마약</option>
                    <option>부동산</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-3">판결/조정 날짜</label>
                  <input 
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-slate-700 mb-3">사례 제목</label>
                <input 
                  type="text"
                  required
                  placeholder="예: 강제추행 혐의 의뢰인 - 경찰 단계 무혐의 처분"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-3">사건 개요</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="의뢰인이 처했던 상황과 혐의 내용을 적어주세요."
                    value={formData.summary}
                    onChange={e => setFormData({...formData, summary: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none text-sm leading-relaxed"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-3">'安'의 조력 (Solution)</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="변호인이 어떻게 대응하고 어떤 증거를 제출했는지 적어주세요."
                    value={formData.solution}
                    onChange={e => setFormData({...formData, solution: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none text-sm leading-relaxed"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-3">사건 결과 (Result)</label>
                  <textarea 
                    rows={3}
                    required
                    placeholder="최종 판결 내용이나 조정 결과를 적어주세요."
                    value={formData.result}
                    onChange={e => setFormData({...formData, result: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none text-sm leading-relaxed font-bold text-blue-900"
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-slate-700 mb-3">판결문 이미지 업로드</label>
                <div className="p-8 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 flex flex-col items-center gap-6">
                  {formData.image ? (
                    <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl border shadow-xl overflow-hidden group">
                       <img src={formData.image} className="w-full h-full object-contain bg-white" alt="업로드된 판결문" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <button 
                           type="button" 
                           onClick={() => setFormData({...formData, image: ''})} 
                           className="bg-red-500 text-white px-6 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform"
                         >
                           이미지 삭제
                         </button>
                       </div>
                    </div>
                  ) : (
                    <div className="text-center">
                       <div className="w-16 h-16 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                       </div>
                       <p className="text-slate-500 font-bold mb-4">이미지 파일을 드래그하거나 선택하세요.</p>
                       <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="text-xs text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-blue-900 file:text-white hover:file:bg-blue-800 cursor-pointer"
                      />
                      <p className="mt-4 text-[10px] text-slate-400 italic">판결문 업로드 시 개인정보(주소, 주민번호 뒷자리 등)는 마스킹 처리 후 올려주세요.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-8 border-t">
                <button type="submit" className="flex-1 py-5 bg-blue-900 text-white font-black text-lg rounded-2xl shadow-xl hover:bg-blue-800 hover:scale-[1.01] transition-all">
                  {editingId ? '수정 내용 저장' : '새로운 사례 등록하기'}
                </button>
                <button type="button" onClick={resetForm} className="px-10 py-5 bg-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-200 transition-all">
                  취소
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
