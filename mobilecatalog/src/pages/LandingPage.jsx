import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Home,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Truck
} from "lucide-react";

const whatsappNumber = "558899785493";
const whatsappText = encodeURIComponent(
  "Ola, quero criar um catalogo digital para minha empresa"
);

const highlights = [
  {
    icon: BadgeCheck,
    title: "Catalogo para vender mais",
    description: "Uma vitrine online organizada para apresentar produtos e receber pedidos."
  },
  {
    icon: Search,
    title: "Experiencia mobile",
    description: "Busca, categorias e destaques pensados para clientes no celular."
  },
  {
    icon: Truck,
    title: "Contato pelo WhatsApp",
    description: "O cliente encontra o produto e chama sua empresa sem atrito."
  }
];

const featuredProducts = [
  {
    name: "Catalogo com produtos reais",
    image:
      "https://res.cloudinary.com/drjcwf7aq/image/upload/v1776344879/IMG-20260415-WA0044_cetyjd.jpg"
  },
  {
    name: "Categorias organizadas",
    image:
      "https://res.cloudinary.com/drjcwf7aq/image/upload/v1776344888/IMG-20260415-WA0030_knxh0i.jpg"
  },
  {
    name: "Atendimento direto",
    image:
      "https://res.cloudinary.com/drjcwf7aq/image/upload/v1776344883/IMG-20260415-WA0039_y5cdr8.jpg"
  }
];

export const LandingPage = () => {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative min-h-[82vh] overflow-hidden bg-slate-950 text-white">
        <img
          src="https://res.cloudinary.com/drjcwf7aq/image/upload/v1776368132/catalog_cover_uzwtpc.jpg"
          alt="Ambiente mobiliado da GabrielEletromoveis"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/58 to-slate-950/18" />
        <div className="absolute inset-x-0 top-0 z-10 border-b border-white/10 bg-slate-950/20 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <Link to="/" className="flex items-center gap-2 text-sm font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-950">
                <Home className="h-4 w-4" />
              </span>
              uCatalogo
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[82vh] max-w-6xl items-center px-4 pb-14 pt-24 sm:px-6 lg:pt-28">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium uppercase tracking-widest text-white/85 backdrop-blur">
              <Sparkles className="h-4 w-4 text-emerald-300" />
              Catalogos digitais para empresas
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
              Venda com um catalogo digital moderno
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/82 sm:text-lg">
              O uCatalogo transforma seus produtos em uma vitrine rapida,
              bonita e pronta para receber clientes pelo WhatsApp. A
              GabrielEletromoveis e um exemplo real de catalogo em uso.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/GabrielEletromoveis"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Ver exemplo em uso
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/18"
              >
                <MessageCircle className="h-4 w-4" />
                Criar meu catalogo
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-base font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Exemplo real
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
                GabrielEletromoveis usando o uCatalogo
              </h2>
            </div>
            <Link
              to="/GabrielEletromoveis"
              className="inline-flex h-10 items-center gap-2 text-sm font-semibold text-slate-950"
            >
              Abrir exemplo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <Link
                key={product.name}
                to="/GabrielEletromoveis"
                className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-slate-200"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-950/8 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-lg border border-slate-200 bg-slate-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-emerald-400/12 px-3 py-2 text-sm font-medium text-emerald-200">
              <ShieldCheck className="h-4 w-4" />
              Comece pelo WhatsApp
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Crie um catalogo para sua empresa
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
              Fale sobre seu negocio, envie seus produtos e receba uma vitrine
              digital pronta para compartilhar com seus clientes.
            </p>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            <MessageCircle className="h-4 w-4" />
            Falar com uCatalogo
          </a>
        </div>
      </section>
    </main>
  );
};
