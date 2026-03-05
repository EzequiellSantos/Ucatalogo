import { Drawer } from 'vaul';
import { X, MessageCircle } from 'lucide-react';

export const ProductDetail = ({ product, open, onClose, whatsappNumber }) => {
  if (!product) return null;

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Olá! Gostaria de fazer um pedido do produto: ${product.name}`
    );
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, '_blank');

    /* 
    
    text alt: `Olá! Gostaria de fazer um pedido do produto: ${product.name} - R$ ${product.price.toFixed(2).replace('.', ',')}`

    */

  };

  return (
    <Drawer.Root open={open} onOpenChange={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content
          data-testid="product-detail-drawer"
          className="bg-white rounded-t-[2rem] p-6 h-[85vh] flex flex-col focus:outline-none fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Handle */}
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-6" />
          
          {/* Close button */}
          <button
            onClick={() => onClose(false)}
            data-testid="close-drawer-button"
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-lg mx-auto space-y-6">
              {/* Product image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product info */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
                    {product.category}
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    {product.name}
                  </h2>
                </div>

                {/* <p className="text-3xl font-medium text-black">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </p> */}

                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp button */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button
              onClick={handleWhatsAppOrder}
              data-testid="whatsapp-order-button"
              className="w-full bg-[#25D366] text-white hover:bg-[#128C7E] py-4 rounded-2xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              Pedir pelo WhatsApp
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
