# Petzara — site (petzara.app)

Site institucional do Petzara. Vite + React 19 + Tailwind 4, publicado na Vercel.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve o dist/ localmente
```

Configurações centrais (links do sistema, WhatsApp, Play Store, flags) ficam em `src/siteConfig.js`.

## Medição: GA4 e Meta Pixel (com consentimento LGPD)

O site **não carrega nenhuma ferramenta de medição** até a pessoa clicar em **Aceitar** na faixa
"Usamos cookies para medir o uso do site." A escolha (Aceitar/Recusar) fica guardada no navegador
(`localStorage`, chave `pz_cookie_consent`) e pode ser refeita pelo link **Preferências de cookies** no rodapé.

Cada ferramenta só existe no site se a variável de ambiente correspondente estiver preenchida **no build**:

| Variável | Exemplo | O que liga |
|----------|---------|------------|
| `VITE_GA4_ID` | `G-AB12CD34EF` | Google Analytics 4 (gtag.js) |
| `VITE_META_PIXEL_ID` | `123456789012345` | Meta Pixel (fbevents.js) |

Sem nenhuma das duas, a faixa de cookies **não aparece** (não há cookie de medição para pedir).

### Como preencher na Vercel

1. Vercel → projeto do site (petzara.app) → **Settings** → **Environment Variables**.
2. Adicione `VITE_GA4_ID` com o **ID da métrica** do GA4
   (GA4 → Administrador → Fluxos de dados → Web → "ID da métrica", começa com `G-`).
3. Adicione `VITE_META_PIXEL_ID` com o **ID do conjunto de dados/Pixel**
   (Meta Business → Gerenciador de Eventos → Fontes de dados → o número do Pixel).
4. Marque o ambiente **Production** (e **Preview**, se quiser medir as prévias — normalmente não).
5. **Faça um novo deploy** (Deployments → ⋯ → Redeploy). Variáveis `VITE_*` entram no código no
   momento do build; mudar a variável sem redeploy não tem efeito.

Para testar localmente, crie `.env.local` (não vai para o git) a partir de `.env.example`.

### Como conferir

- Abra o site numa janela anônima: a faixa aparece e **nenhuma** requisição para
  `googletagmanager.com` ou `connect.facebook.net` é feita (DevTools → Rede).
- Clique em **Aceitar**: os dois scripts carregam. Confira no GA4 (Relatórios → Tempo real ou
  DebugView) e no Meta (extensão *Meta Pixel Helper* ou Gerenciador de Eventos → Testar eventos).
- Clique em **Recusar** (outra janela anônima): nada carrega, nem depois de recarregar a página.

### Eventos enviados

| Quando | GA4 | Meta Pixel |
|--------|-----|------------|
| Carregou a página / mudou de página | `page_view` (automático; navegação interna pela medição otimizada do GA4) | `PageView` |
| Clique em qualquer link para `app.petzara.app/register` | `click_signup` | `Lead` |
| Clique em qualquer link do Google Play | `click_play` | `Lead` |
| Clique em qualquer link `wa.me` (inclui o botão flutuante) | `click_whatsapp` | `Contact` |
| Seção de preços apareceu na tela | `view_pricing` | — |

Os eventos de clique levam `link_location` (seção da página, ou o `data-track` do link) e `link_text`.
São capturados por um único listener no documento (`src/lib/analytics.js`), pelo destino do link —
um link novo para cadastro, WhatsApp ou Play já é medido sem código extra.

No GA4, marque `click_signup` e `click_play` como **eventos principais (conversões)** em
Administrador → Eventos.

## Origem das visitas (UTM)

`src/lib/attribution.js` lê `?utm_source`, `utm_medium`, `utm_campaign`, `utm_content` e `utm_term`
da URL e guarda a **primeira** origem com UTM no navegador (`localStorage`, chave `pz_utm`).
A UTM da URL atual tem prioridade; sem UTM na URL, vale a guardada.

- Todos os links de cadastro viram `https://app.petzara.app/register?utm_source=…&utm_medium=…`
  (o sistema web lê esses parâmetros e grava a origem do cadastro).
- Todos os links da Play ganham o referrer de instalação:
  `…?id=app.petzara.twa&referrer=utm_source%3D<src>%26utm_medium%3D<med>%26utm_campaign%3D<camp>`;
  o que faltar vira `site` (ex.: visita sem UTM → `utm_source%3Dsite%26utm_medium%3Dsite%26utm_campaign%3Dsite`).
  Aparece no Play Console em Estatísticas → Aquisição de usuários.

Exemplo de link para campanha: `https://petzara.app/?utm_source=instagram&utm_medium=social&utm_campaign=outubro`.

## Prova social (seção de caso real)

A seção `src/components/CaseSection.jsx` está pronta, mas **desligada** (`SHOW_CASE = false` em
`src/siteConfig.js`) e **sem conteúdo**. Nada de depoimento ou número inventado: preencha `CASE_STUDY`
com a loja-piloto (nome, cidade, foto em `/public`, frase, autor, função e até 3 números medidos no
Petzara), com autorização por escrito do pet shop, e troque `SHOW_CASE` para `true`.
Se faltar nome, frase ou autor, a seção não aparece mesmo com a flag ligada.
Prévia do layout com rótulos de exemplo: `npm run dev` e abra `http://localhost:5173/?previewCase=1`.

## Vídeos da Central de Ajuda do app (`public/ajuda-videos.json`)

O app Android (3.4.0+58 em diante) já traz os ids dos vídeos do canal https://www.youtube.com/@Petzara,
mas ao abrir a Ajuda ele lê `https://petzara.app/ajuda-videos.json` (até 4 s, sem aviso se falhar) e, se o
arquivo for válido, usa os ids daqui. Para trocar um vídeo (ex.: "Primeiros passos" regravado), suba o vídeo
no canal, troque o id (os 11 caracteres depois de `watch?v=`) na chave do tema e publique o site — não precisa
de versão nova do app. O arquivo tem cache de 5 min (`vercel.json`).

- `version`: sempre `1` (outro valor faz o app ignorar o arquivo inteiro).
- `channel`: link do canal ("Ver todos os vídeos no YouTube").
- `complete`: tutorial completo (cartão do topo da Ajuda); `intro`: apresentação do app (1 min).
- `topics`: `primeiros-passos`, `inicio`, `agendamentos`, `clientes-pets`, `servicos`, `financeiro`, `equipe`,
  `configuracoes` (Agenda pública e Configurações), `termos`, `suporte` e `assinatura` (Teste grátis e
  assinatura — ainda sem vídeo; incluir a chave faz o cartão aparecer no app).
- Chaves desconhecidas e ids fora do formato `[A-Za-z0-9_-]{11}` são ignorados um a um (o app fica com o id
  embutido daquele tema).
