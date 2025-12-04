import React from 'react';
import { ShieldCheck, TrendingUp, Users, AlertTriangle, CheckCircle, Smartphone } from 'lucide-react';

export const SeoInfo: React.FC = () => {
  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Potencialize seu Marketing no WhatsApp
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Transforme seu atendimento e aumente suas vendas com estratégias seguras e eficientes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-zap-blue-dark mb-6">
            <TrendingUp size={28} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Aumente a Conversão</h3>
          <p className="text-gray-600 leading-relaxed">
            Links diretos (wa.me) eliminam a barreira de salvar o contato na agenda, aumentando em até 40% a taxa de início de conversa em anúncios e bios.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-red-500 mb-6">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Evite Bloqueios</h3>
          <p className="text-gray-600 leading-relaxed">
            O algoritmo do WhatsApp monitora comportamentos de spam. Aprenda a aquecer seu número e evite o banimento da sua conta comercial.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-zap-green mb-6">
            <Smartphone size={28} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Link Personalizado</h3>
          <p className="text-gray-600 leading-relaxed">
            Use mensagens pré-definidas para identificar a origem do lead (ex: "Vim pelo Instagram") e facilitar a triagem do atendimento.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <Users className="text-zap-green" />
          Guia Antibanimento: O que você precisa saber
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <CheckCircle className="text-zap-green" size={24} />
              <h4 className="font-bold text-gray-700 text-lg">Boas Práticas (Faça)</h4>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600">
                <span className="min-w-[8px] h-2 rounded-full bg-zap-green mt-2"></span>
                <span><strong>Aqueça o chip:</strong> Comece com poucas mensagens diárias e aumente gradualmente.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <span className="min-w-[8px] h-2 rounded-full bg-zap-green mt-2"></span>
                <span><strong>Peça para salvar:</strong> Quando o cliente salva seu número, o WhatsApp entende que é uma conexão confiável.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <span className="min-w-[8px] h-2 rounded-full bg-zap-green mt-2"></span>
                <span><strong>Use o WhatsApp Business:</strong> Passe mais credibilidade e tenha acesso a ferramentas de etiquetas e catálogo.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <AlertTriangle className="text-red-500" size={24} />
              <h4 className="font-bold text-gray-700 text-lg">Riscos (Evite)</h4>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600">
                <span className="min-w-[8px] h-2 rounded-full bg-red-500 mt-2"></span>
                <span><strong>Disparos em massa:</strong> Nunca envie a mesma mensagem para centenas de pessoas desconhecidas de uma vez.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <span className="min-w-[8px] h-2 rounded-full bg-red-500 mt-2"></span>
                <span><strong>Grupos sem permissão:</strong> Adicionar pessoas em grupos sem consentimento gera denúncias e banimentos rápidos.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <span className="min-w-[8px] h-2 rounded-full bg-red-500 mt-2"></span>
                <span><strong>Softwares piratas:</strong> Use apenas parceiros oficiais (BSPs) para automação em larga escala.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
