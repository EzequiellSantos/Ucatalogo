import { useState, useEffect } from "react";
import { Drawer } from "vaul";
import { X, MessageCircle, Pencil } from "lucide-react";
import { ProductAdminPanel } from "./ProductAdminPanel";

export const ProductDetail = ({
  product,
  open,
  onClose,
  activeTab,
  whatsappNumber,
  authenticatedUser,
  categories,
  onUpdateProduct,
  onDeleteProduct,
  isSavingProduct
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);

  // Adicionar/remover a classe CSS ao body
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.pointerEvents = "auto";
    }
  }, [lightboxOpen]);

  // fechar lightbox com ESC
  useEffect(() => {

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setIsEditingProduct(false);
    }
  }, [open, product?.id]);

  useEffect(() => {
    if (open && activeTab !== 'products') {
      onClose(false);
    }
  }, [activeTab, onClose, open]);

  if (!product) return null;

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Olá! Gostaria de fazer um pedido do produto: ${product.name}`
    );

    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <Drawer.Root
        modal={false}
        open={open}
        onOpenChange={(state) => {
          if (lightboxOpen) return; // impede fechar drawer
          onClose(state);
        }}
      >

        <Drawer.Portal>
          <Drawer.Overlay className={`pointer-events-none fixed inset-x-0 top-0 bottom-16 bg-black/40 z-40`}
          />

          {/* LIGHTBOX */}
          {lightboxOpen && (
            <div
              onClick={() => setLightboxOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999]"
            >
              {/* botão fechar */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(false);
                }}
                className="absolute top-6 right-6 text-white hover:opacity-80 z-[1000]"
              >
                <X className="w-8 h-8" />
              </button>

              {/* imagem */}
              <img
                src={product.image}
                alt={product.imageAlt}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
              />
            </div>
          )}

          <Drawer.Content
            data-testid="product-detail-drawer"
            className={`bg-white rounded-t-[2rem] p-6 h-[calc(85vh-1rem)] flex flex-col fixed bottom-16 left-0 right-0 z-50 mx-auto w-full max-w-md md:max-w-5xl`}
          >
            <Drawer.Title className="sr-only">
              {product.name}
            </Drawer.Title>

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
                    onClick={() => setLightboxOpen(true)}
                    className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
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
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </p> */}

                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>

                {authenticatedUser ? (
                  <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                          Area administrativa
                        </p>
                        <h3 className="mt-1 text-base font-semibold text-slate-900">
                          Edite este produto sem sair da visualizacao
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsEditingProduct((current) => !current)}
                        className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                          isEditingProduct
                            ? "bg-slate-900 text-white hover:bg-slate-800"
                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <Pencil className="h-4 w-4" />
                        {isEditingProduct ? "Fechar edicao" : "Editar produto"}
                      </button>
                    </div>

                    {isEditingProduct ? (
                      <div className="mt-4">
                        <ProductAdminPanel
                          product={product}
                          products={[]}
                          categories={categories}
                          onUpdateProduct={onUpdateProduct}
                          onDeleteProduct={onDeleteProduct}
                          isSavingProduct={isSavingProduct}
                          mode="single"
                          title="Editar produto"
                          description="Atualize os dados deste item."
                          onDone={(result) => {
                            setIsEditingProduct(false);

                            if (result?.deleted) {
                              onClose(false);
                            }
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}
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
    </>
  );
};
