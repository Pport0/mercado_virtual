import { setupWorker, rest } from 'msw';

let products = [
  {
    "id": "1",
    "name": "Arroz Tio Jo\u00e3o 5kg",
    "price": 25.9,
    "description": "Arroz branco tipo 1.",
    "image": "https://images.unsplash.com/photo-1585238342028-0d9f1b8d5b6b"
  },
  {
    "id": "2",
    "name": "Feij\u00e3o Carioca 1kg",
    "price": 8.9,
    "description": "Feij\u00e3o selecionado.",
    "image": "https://images.unsplash.com/photo-1604908177522-2d6e7b1e5b5b"
  },
  {
    "id": "3",
    "name": "A\u00e7\u00facar Uni\u00e3o 1kg",
    "price": 4.5,
    "description": "A\u00e7\u00facar refinado.",
    "image": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2"
  },
  {
    "id": "4",
    "name": "\u00d3leo de Soja 900ml",
    "price": 7.8,
    "description": "\u00d3leo de soja.",
    "image": "https://images.unsplash.com/photo-1582719478250-0b9b3c6a0f3a"
  },
  {
    "id": "5",
    "name": "Caf\u00e9 Pil\u00e3o 500g",
    "price": 15.0,
    "description": "Caf\u00e9 torrado.",
    "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
  },
  {
    "id": "6",
    "name": "Macarr\u00e3o Renata 500g",
    "price": 4.2,
    "description": "Macarr\u00e3o.",
    "image": "https://images.unsplash.com/photo-1604908177500-2f6e7b1e5a5a"
  },
  {
    "id": "7",
    "name": "Leite Integral 1L",
    "price": 5.5,
    "description": "Leite pasteurizado.",
    "image": "https://images.unsplash.com/photo-1582719478000-1a9b3c6a0f1a"
  },
  {
    "id": "8",
    "name": "Biscoito Maizena",
    "price": 3.9,
    "description": "Biscoito leve.",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    "id": "9",
    "name": "Sab\u00e3o em P\u00f3 OMO 1,6kg",
    "price": 22.0,
    "description": "Limpeza potente.",
    "image": "https://images.unsplash.com/photo-1581579180442-2a1c1a3a1a1a"
  },
  {
    "id": "10",
    "name": "Papel Higi\u00eanico Neve (12)",
    "price": 18.9,
    "description": "Maciez e resist\u00eancia.",
    "image": "https://images.unsplash.com/photo-1582719478240-0b9b3c6a0f3e"
  }
];

export const worker = setupWorker(
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  rest.get('/api/products/:id', (req, res, ctx) => {
    const product = products.find((p) => p.id === req.params.id);
    if (!product) return res(ctx.status(404));
    return res(ctx.status(200), ctx.json(product));
  }),

  rest.post('/api/products', async (req, res, ctx) => {
    const body = await req.json();
    const newP = { id: String(products.length+1), ...body };
    products.push(newP);
    return res(ctx.status(201), ctx.json(newP));
  }),

  rest.put('/api/products/:id', async (req, res, ctx) => {
    const body = await req.json();
    const id = req.params.id;
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return res(ctx.status(404));
    products[idx] = { id, ...body };
    return res(ctx.status(200), ctx.json(products[idx]));
  }),

  rest.delete('/api/products/:id', (req, res, ctx) => {
    const id = req.params.id;
    products = products.filter(p => p.id !== id);
    return res(ctx.status(204));
  })
);
