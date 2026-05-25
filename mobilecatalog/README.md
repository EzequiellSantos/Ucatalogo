# 🛍️ Catálogo Digital Premium - Template SaaS

Template moderno de catálogo digital mobile-first para pequenos negócios, lojas e prestadores de serviços. Design premium minimalista com integração WhatsApp.

## ✨ Características

### 🎨 Design Premium & Clean

- Interface minimalista preto/branco com acento verde esmeralda
- Bordas arredondadas grandes (rounded-2xl)
- Tipografia moderna (Inter)
- Muito espaço em branco para conforto visual
- Glassmorphism na barra de busca

### 📱 Mobile-First

- Grid responsivo: 2 colunas (mobile) → 4 colunas (desktop)
- Bottom navigation fixo (apenas mobile)
- Barra de busca sticky no topo
- Drawer de detalhes deslizante (Vaul)
- Suporte completo de 320px a 4K

### 🚀 Funcionalidades

- **Roteamento Dinâmico**: `dominio.com/[nome-da-empresa]`
- **Busca em Tempo Real**: Filtra produtos instantaneamente
- **Filtros por Categoria**: Chips horizontais scrolláveis
- **Detalhes do Produto**: Modal slide-up com animação
- **Integração WhatsApp**: Botão flutuante com mensagem pré-formatada
- **Animações Suaves**: Fade-in nos produtos, transições elegantes

## 🏗️ Arquitetura

### Stack Tecnológico

- **Frontend**: React 19 + React Router DOM
- **Estilização**: Tailwind CSS
- **Componentes UI**:
  - Vaul (Drawer/Modal)
  - Lucide React (Ícones)
  - Sonner (Toasts)
- **Backend**: FastAPI + MongoDB (opcional)

### Estrutura de Dados

Os dados vêm de um arquivo JSON externo simulado (`/app/frontend/src/data/mockCatalog.js`):

```javascript
{
  companyId: 'nike',
  companyName: 'Nike Store',
  logo: 'https://...',
  whatsappNumber: '5511999999999',
  products: [
    {
      id: '1',
      name: 'Urban Sneakers Black',
      category: 'fashion',
      price: 899.90,
      description: '...',
      image: 'https://images.unsplash.com/...',
      imageAlt: '...'
    }
  ],
  categories: ['Todos', 'fashion']
}
```

### Estrutura de Arquivos

```
frontend/src/
├── components/catalog/
│   ├── CatalogLayout.jsx      # Layout principal com container
│   ├── SearchBar.jsx           # Barra de busca sticky
│   ├── CategoryFilter.jsx      # Chips de categoria
│   ├── ProductGrid.jsx         # Grid de produtos
│   ├── ProductCard.jsx         # Card individual do produto
│   ├── ProductDetail.jsx       # Drawer de detalhes (Vaul)
│   └── BottomNav.jsx          # Navegação inferior (mobile)
├── pages/
│   └── CatalogPage.jsx        # Página principal do catálogo
├── data/
│   └── mockCatalog.js         # Dados mockados das empresas
└── App.js                     # Rotas dinâmicas
```

## 🎯 Como Usar

### 1. Acessar um Catálogo

Navegue para: `dominio.com/[nome-da-empresa]`

Exemplos disponíveis:

- `/nike` - Nike Store (produtos fashion)
- `/apple` - Apple Premium Store (electronics, audio, photography, home)

### 2. Buscar Produtos

Digite na barra de busca no topo. A filtragem acontece em tempo real.

### 3. Filtrar por Categoria

Deslize horizontalmente os chips de categoria e clique para filtrar.

### 4. Ver Detalhes

Clique em qualquer produto para abrir o drawer com informações completas.

### 5. Fazer Pedido

Clique no botão verde \"Pedir pelo WhatsApp\" para abrir uma conversa pré-formatada.

## 🔧 Personalização

### Adicionar Nova Empresa

Edite `/app/frontend/src/data/mockCatalog.js`:

```javascript
export const catalogData = {
  // ... empresas existentes
  'sua-empresa': {
    companyId: 'sua-empresa',
    companyName: 'Sua Empresa',
    whatsappNumber: '5511999999999',
    products: [...],
    categories: ['Todos', 'categoria1', 'categoria2']
  }
};
```

Acesse em: `dominio.com/sua-empresa`

### Alterar Cores

As cores seguem o design minimalista premium. Para alterar, edite os tokens no Tailwind:

- **Primário**: `bg-black text-white` (botões principais)
- **Acento**: `#10B981` (verde esmeralda - WhatsApp e destaques)
- **Superfície**: `bg-white` com bordas `border-gray-100`

### Conectar API Real

Substitua a função mock em `mockCatalog.js` por uma chamada real:

```javascript
export const fetchCatalogData = async (companyId) => {
  const response = await fetch(`https://api.seusite.com/catalog/${companyId}`);
  return response.json();
};
```

### Imagens via Cloudinary

Para usar Cloudinary em produção, substitua as URLs do Unsplash/Pexels:

```javascript
image: "https://res.cloudinary.com/seu-cloud-name/image/upload/v1/produtos/produto-1.jpg";
```

## 🎨 Design System

### Tipografia

- **H1**: `text-2xl font-bold tracking-tight`
- **H2**: `text-xl font-semibold tracking-tight`
- **Body**: `text-sm text-gray-600 leading-relaxed`
- **Price**: `text-lg font-medium text-black`
- **Caption**: `text-xs text-gray-400 uppercase tracking-widest`

### Espaçamento

- **Página**: `p-4` (mobile), `p-8` (desktop)
- **Card**: `p-3`
- **Gap do Grid**: `gap-4` (mobile), `gap-6` (desktop)

### Componentes

- **Bordas**: `rounded-2xl` (cards, inputs, botões)
- **Sombras**: `shadow-md` (hover), `shadow-lg` (WhatsApp)
- **Transições**: `transition-all duration-400`

## 📱 Responsividade

### Breakpoints

- **Mobile**: 320px - 767px (2 colunas, bottom nav visível)
- **Tablet**: 768px - 1023px (3-4 colunas)
- **Desktop**: 1024px+ (4 colunas, bottom nav oculto)

### Container

- Mobile: `max-w-md` (448px) com sombra 2xl
- Desktop: `max-w-5xl` (1024px) com bordas laterais


---

**Desenvolvido usando React + Tailwind CSS**
"
