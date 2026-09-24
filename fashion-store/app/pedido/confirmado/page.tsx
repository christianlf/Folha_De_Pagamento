import Link from 'next/link';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';

export default function PedidoConfirmadoPage() {
  const orderNumber = `FS${Date.now().toString(36).toUpperCase().slice(-8)}`;
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg p-8 text-center mb-8">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
            
            <h1 className="text-4xl font-bold mb-4">Pedido Confirmado!</h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Obrigado pela sua compra. Seu pedido foi recebido com sucesso.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Número do Pedido</p>
              <p className="text-2xl font-bold">#{orderNumber}</p>
            </div>

            <p className="text-gray-600">
              Enviamos um e-mail de confirmação com todos os detalhes do seu pedido.
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Próximos Passos</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Confirmação por E-mail</h3>
                  <p className="text-sm text-gray-600">
                    Você receberá um e-mail com os detalhes do pedido e instruções de pagamento (se necessário).
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Package size={24} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Preparação do Pedido</h3>
                  <p className="text-sm text-gray-600">
                    Após a confirmação do pagamento, começaremos a separar seus produtos.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Truck size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Envio e Entrega</h3>
                  <p className="text-sm text-gray-600">
                    Previsão de entrega: <strong>{estimatedDelivery}</strong>. Você receberá o código de rastreamento por e-mail.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-white rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Informações do Pedido</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Número do Pedido</span>
                <span className="font-semibold">#{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data do Pedido</span>
                <span className="font-semibold">
                  {new Date().toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Método de Pagamento</span>
                <span className="font-semibold">Cartão de Crédito</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status do Pagamento</span>
                <span className="text-green-600 font-semibold">Aprovado</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/conta/pedidos"
              className="flex-1 bg-black text-white text-center py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Acompanhar Pedido
            </Link>
            <Link
              href="/produtos"
              className="flex-1 border-2 border-gray-300 text-center py-4 rounded-lg font-semibold hover:border-black transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>

          {/* Help */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Precisa de ajuda?
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link href="/faq" className="text-black hover:underline">
                FAQ
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/contato" className="text-black hover:underline">
                Fale Conosco
              </Link>
              <span className="text-gray-400">|</span>
              <a href="mailto:contato@fashionstore.com" className="text-black hover:underline">
                contato@fashionstore.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
