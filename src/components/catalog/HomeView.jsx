import { Sparkles, TrendingUp, Heart } from 'lucide-react';

export const HomeView = ({ catalogData }) => {
  const stats = [
    { icon: TrendingUp, label: 'Produtos', value: catalogData.products.length },
    { icon: Heart, label: 'Categorias', value: catalogData.categories.length - 1 },
    { icon: Sparkles, label: 'Novidades', value: '3+' }
  ];

  const featuredProducts = catalogData.products.slice(0, 3);

  return (
    <div className="space-y-6 pb-6">
      {/* Hero Section */}
      <div className="relative h-48 overflow-hidden rounded-b-3xl">
        <img
          src={catalogData.coverImage}
          alt={catalogData.companyName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h1 className="text-2xl font-bold mb-1">{catalogData.companyName}</h1>
          <p className="text-sm text-white/90">{catalogData.description}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 grid grid-cols-3 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-4 text-center"
            >
              <Icon className="w-5 h-5 mx-auto mb-2 text-gray-700" />
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Featured Products */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Destaques</h2>
          <Sparkles className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="space-y-3">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="flex gap-3 bg-white rounded-2xl border border-gray-100 p-3 hover:shadow-md transition-all"
              data-testid={`featured-product-${product.id}`}
            >
              <img
                src={product.image}
                alt={product.imageAlt}
                className="w-20 h-20 object-cover rounded-xl bg-gray-50"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                  {product.description}
                </p>
                <p className="text-base font-medium text-black mt-2">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Acesso Rápido</h2>
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`https://wa.me/${catalogData.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white rounded-2xl p-4 text-center hover:bg-[#128C7E] transition-colors"
            data-testid="quick-whatsapp"
          >
            <div className="text-2xl mb-1">💬</div>
            <p className="text-sm font-medium">WhatsApp</p>
          </a>
          <a
            href={`tel:${catalogData.phone}`}
            className="bg-gray-900 text-white rounded-2xl p-4 text-center hover:bg-gray-800 transition-colors"
            data-testid="quick-call"
          >
            <div className="text-2xl mb-1">📞</div>
            <p className="text-sm font-medium">Ligar</p>
          </a>
        </div>
      </div>
    </div>
  );
};
