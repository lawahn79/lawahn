import React, { useEffect, useMemo, useState } from 'react';

type CaseResult = {
  id: string;
  slug?: string;
  title?: string;
  result?: string;
  summary?: string;
  category: string;
  image: string;
  thumb?: string;
  visible?: boolean;
  order?: number;
  date?: string;
  datePublished?: string;
};

const CaseResultMarquee: React.FC = () => {
  const [items, setItems] = useState<CaseResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadCases = async () => {
      try {
        const response = await fetch('/data/case-results.json', {
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error(
            `수행사건 데이터를 불러오지 못했습니다: ${response.status}`
          );
        }

        const data: CaseResult[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('수행사건 데이터 형식이 올바르지 않습니다.');
        }

        if (isMounted) {
          setItems(data);
        }
      } catch (error) {
       
