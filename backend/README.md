# Backend Ucatalog

API Express + MongoDB Atlas focada apenas na collection `products`.

## Variaveis

- `MONGODB_URI`: string de conexao do MongoDB Atlas.
- `PORT`: porta local opcional, padrao `4000`.
- `FRONTEND_URL`: origem do frontend para CORS, ex: `http://localhost:3000`.

## Rodando localmente

1. Instale as dependencias com `npm install`.
2. Crie `.env` com base em `.env.example`.
3. Rode `npm run dev`.

## Rotas

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/products/seed`

## Seed inicial

Envie para `POST /api/products/seed` um JSON assim:

```json
{
  "products": [
    {
      "legacyId": 1,
      "name": "Produto",
      "category": "Moveis",
      "price": 0,
      "description": "Descricao",
      "image": "https://...",
      "imageAlt": "Imagem do produto"
    }
  ]
}
```

A rota so popula a collection se ela ainda estiver vazia.
