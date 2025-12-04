import React from 'react';
import { Header } from './components/Header';
import { Generator } from './components/Generator';
import { SeoInfo } from './components/SeoInfo';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="prose max-w-none">
              <h1 className="text-3xl font-bold text-zap-blue-dark">
                Crie seu link do WhatsApp em segundos
              </h1>
              <p className="text-gray-600 text-lg">
                Facilite o contato com seus clientes. Gere um link direto e um QR Code personalizado gratuitamente. 
                Ideal para bio do Instagram, cartões de visita e marketing.
              </p>
            </div>
            
            <div className="hidden lg:block bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-zap-blue-light mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                Como funciona?
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="bg-zap-green/10 text-zap-green font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">1</span>
                  Digite o número do WhatsApp com DDD.
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-zap-green/10 text-zap-green font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">2</span>
                  Escreva uma mensagem opcional que seu cliente enviará ao iniciar a conversa.
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-zap-green/10 text-zap-green font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">3</span>
                  Copie o link ou baixe o QR Code em alta definição (720px).
                </li>
              </ul>
            </div>
          </div>

          <Generator />
        </div>

        <SeoInfo />
      </main>

      <Footer />
    </div>
  );
}