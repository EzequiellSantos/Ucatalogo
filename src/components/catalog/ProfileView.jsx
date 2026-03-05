import { MapPin, Clock, Phone, Mail, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';

export const ProfileView = ({ catalogData }) => {
  const contactItems = [
    { icon: Phone, label: 'Telefone', value: catalogData.phone, href: `tel:${catalogData.phone}` },
    { icon: Mail, label: 'Email', value: catalogData.email, href: `mailto:${catalogData.email}` },
    { icon: MapPin, label: 'Endereço', value: catalogData.address, href: null },
    { icon: Clock, label: 'Horário', value: catalogData.hours, href: null }
  ];

  const socialItems = [
    { icon: Instagram, platform: 'Instagram', value: `@${catalogData.socialMedia.instagram}`, color: 'bg-gradient-to-br from-purple-500 to-pink-500', url: `https://instagram.com/${catalogData.socialMedia.instagram}` },
    /* { icon: Facebook, platform: 'Facebook', value: catalogData.socialMedia.facebook, color: 'bg-blue-600' },
    { icon: Twitter, platform: 'Twitter', value: catalogData.socialMedia.twitter, color: 'bg-sky-500' } */
  ];

  return (
    <div className="space-y-6 pb-6">
      {/* Header with Logo */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-b-3xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden">
            <img
              src={catalogData.logo}
              alt={catalogData.companyName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{catalogData.companyName}</h1>
            <p className="text-sm text-gray-300 mt-1">{catalogData.description}</p>
          </div>
        </div>

        {/* WhatsApp Quick Action */}
        <a
          href={`https://wa.me/${catalogData.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="profile-whatsapp-button"
          className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white rounded-2xl py-3 font-medium hover:bg-[#128C7E] transition-colors shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          Fale Conosco no WhatsApp
        </a>
      </div>

      {/* Contact Information */}
      <div className="px-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações de Contato</h2>
        <div className="space-y-3">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <div className="flex items-start gap-3 bg-white rounded-2xl border border-gray-100 p-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-gray-900">{item.value}</p>
                </div>
              </div>
            );

            return item.href ? (
              <a
                key={index}
                href={item.href}
                data-testid={`contact-${item.label.toLowerCase()}`}
                className="block hover:scale-[1.02] transition-transform"
              >
                {content}
              </a>
            ) : (
              <div key={index} data-testid={`contact-${item.label.toLowerCase()}`}>
                {content}
              </div>
            );
          })}
        </div>
      </div>

      {/* Social Media */}
      <div className="px-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Redes Sociais</h2>
        <div className="grid grid-cols-2 gap-3">
          {socialItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`social-${item.platform.toLowerCase()}`}
                className={`${item.color} text-white rounded-2xl p-4 text-center hover:opacity-90 transition-opacity`}
                
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs font-medium">{item.platform}</p>
                <p className="text-xs opacity-90 mt-1 truncate">{item.value}</p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="px-4">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Nosso Catálogo</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">{catalogData.products.length}</p>
              <p className="text-sm text-gray-600 mt-1">Produtos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600">{catalogData.categories.length - 1}</p>
              <p className="text-sm text-gray-600 mt-1">Categorias</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
