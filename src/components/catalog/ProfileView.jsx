import { useCallback, useEffect, useMemo, useState } from 'react';
import { MapPin, Clock, Phone, Mail, MessageCircle, Instagram, LogOut, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { GoogleLoginButton } from './GoogleLoginButton';
import { ProductAdminPanel } from './ProductAdminPanel';

const getAuthStorageKey = (companyId) => `ucatalogo-google-auth:${companyId}`;

export const ProfileView = ({
  catalogData,
  companyId,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  isSavingProduct = false
}) => {
  const authStorageKey = useMemo(() => getAuthStorageKey(companyId), [companyId]);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    const savedUser = window.localStorage.getItem(authStorageKey);
    setAuthenticatedUser(savedUser ? JSON.parse(savedUser) : null);
  }, [authStorageKey]);

  const handleLoginSuccess = useCallback((user) => {
    window.localStorage.setItem(authStorageKey, JSON.stringify(user));
    setAuthenticatedUser(user);
    toast.success(`Sessao iniciada com ${user.email}`);
  }, [authStorageKey]);

  const handleLogout = () => {
    window.localStorage.removeItem(authStorageKey);
    setAuthenticatedUser(null);
    toast.success('Sessao encerrada');
  };

  const contactItems = [
    { icon: Phone, label: 'Telefone', value: catalogData.phone, href: `tel:${catalogData.phone}` },
    { icon: Mail, label: 'Email', value: catalogData.email, href: `mailto:${catalogData.email}` },
    { icon: MapPin, label: 'Endereco', value: catalogData.address, href: null },
    { icon: Clock, label: 'Horario', value: catalogData.hours, href: null }
  ];

  const socialItems = [
    {
      icon: Instagram,
      platform: 'Instagram',
      value: `@${catalogData.socialMedia.instagram}`,
      color: 'bg-gradient-to-br from-pink-500 to-orange-400',
      url: `https://instagram.com/${catalogData.socialMedia.instagram}`
    }
  ];

  return (
    <div className="space-y-6 pb-6">
      <div className="rounded-b-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
        <div className="mb-4 flex items-center gap-4">
          <div className="h-20 w-20 overflow-hidden rounded-2xl bg-white">
            <img
              src={catalogData.logo}
              alt={catalogData.companyName}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{catalogData.companyName}</h1>
            <p className="mt-1 text-sm text-gray-300">{catalogData.description}</p>
          </div>
        </div>

        <a
          href={`https://wa.me/${catalogData.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="profile-whatsapp-button"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3 font-medium text-white shadow-lg transition-colors hover:bg-[#128C7E]"
        >
          <MessageCircle className="h-5 w-5" />
          Fale Conosco no WhatsApp
        </a>
      </div>

      <div className="px-4">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Informacoes de Contato</h2>
        <div className="space-y-3">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100">
                  <Icon className="h-5 w-5 text-gray-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-xs text-gray-500">{item.label}</p>
                  <p className="text-sm font-medium text-gray-900">{item.value}</p>
                </div>
              </div>
            );

            return item.href ? (
              <a
                key={index}
                href={item.href}
                data-testid={`contact-${item.label.toLowerCase()}`}
                className="block transition-transform hover:scale-[1.02]"
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

      <div className="px-4">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Redes Sociais</h2>
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
                className={`${item.color} rounded-2xl p-4 text-center text-white transition-opacity hover:opacity-90`}
              >
                <Icon className="mx-auto mb-2 h-6 w-6" />
                <p className="text-xs font-medium">{item.platform}</p>
                <p className="mt-1 truncate text-xs opacity-90">{item.value}</p>
              </a>
            );
          })}
        </div>
      </div>

      <div className="px-4">
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Nosso Catalogo</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">{products.length}</p>
              <p className="mt-1 text-sm text-gray-600">Produtos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600">{catalogData.categories.length - 1}</p>
              <p className="mt-1 text-sm text-gray-600">Categorias</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
                <ShieldCheck className="h-4 w-4" />
                Area administrativa
              </div>
              <h2 className="text-xl font-semibold">Gerencie o catalogo pelo perfil</h2>
              <p className="mt-2 text-sm text-slate-300">
                O acesso para adicionar, editar e remover produtos fica liberado apenas apos login com Google.
              </p>
            </div>

            {authenticatedUser ? (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/15"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            ) : null}
          </div>

          {authenticatedUser ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                {authenticatedUser.picture ? (
                  <img
                    src={authenticatedUser.picture}
                    alt={authenticatedUser.name}
                    className="h-12 w-12 rounded-full border border-white/20"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 font-semibold text-emerald-200">
                    {authenticatedUser.name?.[0] ?? 'G'}
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-white">{authenticatedUser.name}</p>
                  <p className="text-xs text-slate-300">{authenticatedUser.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-200">
                Entre com sua conta Google para liberar as acoes autenticadas do catalogo.
              </p>
              <GoogleLoginButton onSuccess={handleLoginSuccess} />
            </div>
          )}
        </div>
      </div>

      {authenticatedUser ? (
        <ProductAdminPanel
          products={products}
          categories={catalogData.categories.map((category) => category.id)}
          onAddProduct={onAddProduct}
          onUpdateProduct={onUpdateProduct}
          onDeleteProduct={onDeleteProduct}
          isSavingProduct={isSavingProduct}
        />
      ) : null}
    </div>
  );
};
