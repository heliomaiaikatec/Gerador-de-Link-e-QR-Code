import React from 'react';
import { MessageCircle } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
        <div className="flex items-center gap-2">
          <div className="bg-zap-green p-2 rounded-lg text-white">
            <MessageCircle size={24} strokeWidth={2.5} />
          </div>
          <div className="text-xl font-bold text-zap-blue-dark tracking-tight">
            Gerador de Link e QR Code
          </div>
        </div>
        
        <a 
          href="https://faq.whatsapp.com/5913398998672934" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm font-medium text-zap-blue-light hover:text-zap-blue-dark transition-colors"
        >
          Ajuda
        </a>
      </div>
    </header>
  );
};