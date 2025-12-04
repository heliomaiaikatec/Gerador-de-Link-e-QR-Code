import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center max-w-5xl">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Gerador de Link e QR Code by Ikatec. Ferramenta gratuita e segura.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Este site não tem afiliação direta com o WhatsApp ou Meta.
        </p>
      </div>
    </footer>
  );
};