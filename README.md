# Mercado Virtual — Full

Projeto demo: SPA React + TypeScript com:
- Dark mode (toggle via seletor)
- Login mock (admin/admin123)
- Admin protegido com CRUD (create, update, delete) via API simulada (MSW)
- Carrinho (Zustand)
- Responsivo e estilizado

## Como rodar
1. `npx msw init public/ --save`
2. `rm -rf node_modules`
3. `npm install`
4. `npm run dev`
5. Abra http://localhost:5173

## Credenciais admin (mock)
- Usuário: admin
- Senha: admin123

## Notas
- Endpoints de administração esperam header `x-admin-token: secret-token` — o login mock define esse token em localStorage e as chamadas no frontend **não** explicitamente setam header; MSW mock checks localStorage indirectly via auth in this implementation.
