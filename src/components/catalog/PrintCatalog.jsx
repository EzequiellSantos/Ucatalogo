import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const PrintCatalog = ({ catalogData }) => {
  if (!catalogData) return null;

  return (
    <div className="print-area p-0 text-slate-900 bg-white">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          @page { 
            size: A4; 
            margin: 0; 
          }
          
          body { 
            background: white !important; 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact;
          }

          .no-print { display: none !important; }
          
          /* CAPA - ocupa exatamente 1 página A4 e força quebra depois */
          .print-cover {
            width: 100%;
            height: 297mm;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            page-break-after: always;
            break-after: page;
          }

          /* Cada seção de categoria começa em nova página */
          .category-section {
            page-break-before: always;
            break-before: page;
          }

          /* GRID 2x2 */
          .products-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10mm; 
            padding: 10mm;
            justify-items: center;
          }

          .product-image-container {
            width: 90%;
            height: 95mm;
            overflow: hidden;
            border-radius: 12px;
            border: 1px solid #f1f5f9;
          }
          
          .product-card-print {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
          }
        }
      `,
        }}
      />

      {/* CAPA */}
      <div className="print-cover bg-slate-50">
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-8 text-slate-900">
          {catalogData.companyName}
        </h1>

        {catalogData.catalogImage && (
          <div className="w-100 h-100 mb-8 flex items-center justify-center">
            <img
              src={catalogData.catalogImage}
              alt="Logo"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}

        {/* <div className="mt-12 text-center">
          <div className="h-1.5 w-20 bg-slate-900 mx-auto mb-6"></div>

          <p className="text-2xl font-light tracking-[0.4em] uppercase text-slate-500">
            Catálogo Visual
          </p>

          <p className="text-sm mt-6 text-slate-400">
            {format(new Date(), "MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div> */}
      </div>

      {/* CATEGORIAS */}
      <div className="category-group">
        {catalogData.categories
          .filter((c) => c !== 'Todos')
          .map((category) => {
            const categoryId =
              typeof category === 'string' ? category : category.id;
            const categoryName =
              typeof category === 'string' ? category : category.name;

            const productsInCategory = catalogData.products.filter(
              (p) => p.category === categoryId
            );

            if (productsInCategory.length === 0) return null;

            return (
              <section key={categoryId} className="category-section">
                <div className="p-8 pb-2 text-center">
                  <h2 className="text-xl font-bold text-slate-400 uppercase tracking-[0.2em]">
                    {categoryName}
                  </h2>
                </div>

                <div className="products-grid">
                  {productsInCategory.map((product) => (
                    <div key={product.id} className="product-card-print">
                      <div className="product-image-container">
                        <img
                          src={product.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="mt-8 text-center">
                        <span className="text-[18px] text-slate-900 uppercase font-bold tracking-widest">
                          {product.name}
                        </span>

                        {/* <p className="text-3xl font-black text-slate-900">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
      </div>
    </div>
  );
};