# 🛍️ [Catálogo Digital Premium](https://ucatalogo.vercel.app/)  

Catálogo digital mobile-first para pequenos negócios, lojas e prestadores de serviços. Design premium minimalista com integração WhatsApp.

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


## 🎯 Como Usar

### 1. Acessar um Catálogo

Navegue para: `dominio.com/[nome-da-empresa]`

Exemplos:

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


**Desenvolvido usando React + Tailwind CSS **
"
