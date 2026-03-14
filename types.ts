
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  isCertified?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface SuccessCase {
  id: string;
  category: string;
  title: string;
  date: string;
  summary: string;
  solution: string;
  result: string;
  image?: string; // Base64 encoded image string
}
