# Prints do sistema usados na landing

Todas as imagens em `public/prints/` são capturas do sistema web rodando **nesta máquina**, com um pet shop
fictício ("Amigo Fiel Banho e Tosa"). Nenhum dado de cliente real aparece.

Para refazer depois de uma mudança visual no sistema:

1. `BE_DIR=<pasta do petzara-backend> node scripts/prints/servidor-demo.cjs`
   (MongoDB em memória + dados fictícios + API em http://localhost:5050; inclui `/__demo/theme/<id>`, que só existe aqui).
2. No `petzara-sistema`: `VITE_API_URL=http://localhost:5050/api npx vite build --outDir /tmp/app-dist`
   e `npx vite preview --outDir /tmp/app-dist --port 5173 --strictPort`.
3. `node scripts/prints/capturar.cjs /tmp/prints` (desktop 1600×960, celular 900×1948, 4 temas).
4. `node scripts/prints/instalar.cjs /tmp/prints` (converte para WebP em `public/prints/`).

Última captura: 20/11/2026, sistema no commit 68d0909 (main).
Observação: o calendário do sistema mostra só os agendamentos da página atual da lista; por isso o roteiro
escolhe o maior "itens por página" antes de abrir o calendário e a base fictícia tem menos de 50 agendamentos.

## Importante: troque a pasta ao trocar as imagens

`/prints/*` é servido com cache de 1 ano no navegador. Se uma imagem mudar e o endereço continuar igual, quem já
visitou o site continua vendo a antiga. Por isso as imagens ficam em `public/prints/v2/`: na próxima captura, crie
`v3/` e troque `/prints/v2/` por `/prints/v3/` em `src/`, `index.html` e `scripts/prints/instalar.cjs`.
