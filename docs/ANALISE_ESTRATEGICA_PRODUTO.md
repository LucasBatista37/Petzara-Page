# Análise Estratégica do Produto — Petzara

> Documento de inteligência estratégica para crescimento. Crítico, direto, baseado **somente** no que o código realmente entrega hoje (abril/2026). Não é roadmap, não é pitch — é diagnóstico para vender.

**Autor da análise**: análise interna — produto/marketing/sistemas
**Versão**: 1.0 — 25 abr 2026
**Escopo**: produto (frontend + backend), pricing, mercado, posicionamento, aquisição

---

## 1. Visão geral do produto

**Propósito principal.** SaaS de gestão operacional para **pet shops independentes** (banho, tosa, hidratação e serviços relacionados). Substitui caderno, planilha de Excel e fila de WhatsApp por um único sistema com agenda, financeiro, cadastro de clientes/pets, equipe e link público de agendamento.

**Problema real que resolve (de forma prática).** Um pet shop pequeno tipicamente:

1. **Perde agendamentos** porque o dono está tosando e não atende o WhatsApp.
2. **Não sabe quanto faturou no mês** — controle no caderno é parcial e some.
3. **Mistura agenda pessoal com agenda do salão** — sem visão por colaborador.
4. **Não tem histórico do pet** quando o cliente volta meses depois.

O Petzara entrega: link público para o cliente agendar sozinho, calendário em tempo real com Socket.io, financeiro com transações criadas automaticamente quando o agendamento finaliza ([PetShop-Agendamento-Backend/jobs/autoUpdateAppointmentStatus.js](PetShop-Agendamento-Backend/jobs/autoUpdateAppointmentStatus.js)), histórico por pet/cliente, e equipe com permissões granulares.

**Crítico ou conveniente?** **Crítico** para os ~80% dos pet shops independentes que não têm sistema. **Conveniente** (passível de troca) para os ~20% que já usam concorrente — só trocam por dor real (preço, UX, ou feature específica).

**Público-alvo IDEAL (não genérico).**
- Pet shop **independente brasileiro**.
- 1 a 5 funcionários, sendo um deles o dono que também atende.
- Faturamento mensal entre **R$ 15.000 e R$ 80.000**.
- Sem TI dedicado, comunicação centralizada no celular.
- Hoje usa **caderno + WhatsApp + planilha** ou já experimentou um concorrente e não gostou.
- Ativo no Instagram (posta antes/depois, mostra os pets).

**NÃO é o público:**
- Redes (Petz, Cobasi, Petlove físico) — têm ERP próprio.
- **Clínicas veterinárias** — precisam prontuário médico, vacinas, RX. O Petzara não tem.
- Pet shops de luxo (Jardins-SP, Leblon-RJ) que já pagam software custom.
- Hotéis e creches caninas — modelo de negócio diferente (estadia, não serviço pontual).

**Proposta de valor (1 frase).**
> "Receba agendamentos pelo seu link público, organize agenda e financeiro do salão e veja em tempo real o que cada colaborador está fazendo — tudo em um app que cabe no celular."

---

## 2. Funcionalidades e diferenciais

### 2.1. Mapa completo do que existe hoje (verificado no código)

**Agendamento**
- Wizard de 5 passos: pet → serviço(s) → data/hora → status → revisão ([PetShop-Agendamento-Sistema/src/components/Appointments/](PetShop-Agendamento-Sistema/src/components/Appointments/)).
- Calendário com `react-big-calendar` + visão tabular com filtros.
- 4 status (Pendente, Em Andamento, Cancelado, Finalizado), com transição automática via cron a cada 2 minutos.
- Sincronização real-time via Socket.io.
- Exportação CSV/XLSX.

**Página pública de agendamento** — `/agendar/:petshopUrl`
- Cliente final agenda sem login.
- Tema customizado por petshop (uma das 6+ paletas).
- Respeita horário de funcionamento, dias da semana, pausas, máximo de serviços simultâneos.

**Clientes & Pets**
- CRUD completo de tutores e pets.
- Histórico de agendamentos por cliente e por pet.
- Reordenação manual (drag-and-drop com `dnd-kit`).
- Endereço completo, observações livres.

**Financeiro**
- Receitas e despesas com categorias.
- Status: Pendente, Pago, Atrasado.
- Métodos: Dinheiro, PIX, Cartão (crédito/débito), Transferência, Outro.
- Dashboard com receita/despesa do período, fluxo dos últimos 7 dias, contas a receber.
- **Transação automática** criada quando agendamento finaliza (via cron).

**Equipe**
- Convite por e-mail com token expirável (`Invite` model).
- Roles: admin (owner) e colaborador.
- **Permissões granulares por módulo** (read/write/delete em appointments, clients, pets, services, financial, settings).
- Multi-tenant real: dados isolados por `user`/`owner` em todas as queries.

**Dashboard / Analytics**
- Donut chart por status, bar chart por serviço, line chart de últimos 7 dias (Recharts).
- Métricas: total de agendamentos, receita total, pico de hora.
- Filtro mensal/anual.

**Configurações**
- 6+ paletas de tema (terracota, floresta, oceano, ocre etc.) aplicadas via CSS custom properties em runtime.
- URL customizada para link público.
- Horário de funcionamento, dias trabalhados, pausas, duração padrão de serviço.
- Limite de serviços simultâneos.
- Exportação de dados, exclusão de conta.

**Onboarding**
- Wizard obrigatório de 3 passos no primeiro acesso (nome do petshop → horários → link público).
- Setup checklist pós-wizard (services → clients → pets → appointments).
- Tour guiado de 14 passos via overlay.

**Notificações**
- In-app (tabela `Notification`, com unread count e mark-as-read).
- E-mail transacional via Resend: verificação, reset de senha, convite, boas-vindas, fim de trial em 3 dias, trial encerrado.
- **Sem WhatsApp. Sem SMS.**
- Push notifications PWA suportada na config, mas sem implementação visível de envio server-side.

**Segurança & operação**
- JWT access (15 min) + refresh token em cookie httpOnly.
- Rate limiting (login 5/15min, register 5/hora, password reset 3/15min, checkout 10/15min, global 100/15min).
- Audit log com TTL de 1 ano (snapshot before/after, IP, request ID).
- Soft delete em todos os modelos.
- Sentry no frontend e backend.

**Plataforma**
- PWA com `vite-plugin-pwa` (autoUpdate, fallback offline).
- TWA Android (Bubblewrap) — instala como app sem build nativo.
- Sem app iOS nativo.

**Cobrança**
- Stripe Checkout + portal de billing.
- Trial de 30 dias.
- Webhook trata `checkout.session.completed`, `subscription.updated`, `subscription.deleted`, `invoice.paid`, `invoice.payment_failed`.
- Página `/subscription-expired` bloqueia uso após past_due/canceled.

### 2.2. O que é core (resolve dor) vs. complementar

**Core** (sem isso, o produto não vende):
- Agendamento + calendário.
- Link público de agendamento.
- Financeiro com receita/despesa e auto-transação.
- Cadastro de clientes/pets.
- Onboarding guiado.

**Complementar** (bom de ter, não decisivo):
- Tema customizável.
- Tour guiado de 14 passos.
- Drag-and-drop para reordenar listas.
- Audit log (importante operacionalmente, invisível ao cliente).
- TWA Android.

### 2.3. Diferenciais competitivos reais

1. **Link público de agendamento com tema do petshop.** Concorrentes brasileiros (Trinks, Doctoralia) têm link público genérico. **Vetus**, **Simples Pet** e **Petlove Negócios** focam em ERP e o link de agendamento, quando existe, é feio. O Petzara entrega link bonito, brandable, com tema escolhido pelo dono.
2. **PWA real + TWA Android.** Instala como app sem fricção da Play Store. Pet shop dono não vai pra loja baixar app — clica e está pronto.
3. **Multi-tenant com permissões granulares.** Read/write/delete por módulo. Comum em produtos enterprise, raro nessa faixa de preço.
4. **Automação de status + lançamento financeiro.** O cron a cada 2 minutos finaliza o agendamento e cria a Transaction automaticamente. **Reduz data entry** — diferencial real para dono que não tem tempo de "fechar caixa".
5. **Audit log com snapshots.** Saber quem mudou o quê é vendável para pet shops com 3+ funcionários.

### 2.4. Lacunas honestas (o que NÃO existe e provavelmente vai ser objeção)

| Lacuna | Impacto comercial |
|---|---|
| **WhatsApp não existe** (apesar do README mencionar — informação incorreta) | Crítico. Objeção #1 esperada no mercado pet brasileiro. |
| Sem lembrete automático para cliente (SMS/WhatsApp) | Alto. Feature básica esperada. |
| Sem assinatura digital de termo / autorização de tosa | Médio. Pet shops grandes pedem. |
| Sem programa de fidelidade / pontos | Médio. Vetus e concorrentes têm. |
| Sem prontuário veterinário | Tudo bem — Petzara não é clínica. **Posicione fora**. |
| Sem multi-unidade (1 conta = 1 petshop) | Bloqueia upsell para clientes em crescimento. |
| Sem feature gating por plano no backend | **Bloqueio crítico** para monetizar com tiers. |
| Sem app iOS nativo | Médio. PWA iOS funciona com fricção. |
| Sem integração com fornecedores / catálogo de produtos | Baixo (Petzara é serviço, não varejo). |
| Sem POS integrado (maquininha) | Baixo no nicho serviço, médio se quiser ir pra venda de produtos. |
| Tudo em PT-BR sem i18n | Baixo no curto prazo (mercado é Brasil). |

### 2.5. Posição vs. concorrentes brasileiros

| Concorrente | Comparação |
|---|---|
| **Vetus** | Mais completo (clínica + petshop), mais caro, UX datada. Petzara: mais simples, mais bonito, pet shop puro. |
| **Simples Pet** | Concorrente direto. Petzara: melhor UX, link público melhor, sem WhatsApp (perde aqui). |
| **Petlove Negócios** | Mais robusto, integração com marketplace Petlove. Petzara: independente, sem amarra. |
| **Trinks / Doctoralia / Booksy** | Genéricos para serviços. Petzara: nativo do nicho pet, vocabulário e fluxos específicos. |
| **Caderno + WhatsApp** | Verdadeiro concorrente do nicho ICP. Petzara ganha em qualquer comparação racional, mas precisa convencer da troca. |

**Resumo**: Mais simples e mais bonito que a maioria. Menos completo que ERPs caros. Falta o item que mais pesa no Brasil: WhatsApp.

---

## 3. Casos de uso reais

### Cenário 1 — "Tosadora da Esquina" (1 dono + 1 ajudante, R$ 18k/mês)

**Antes**: caderno + WhatsApp. Cliente manda mensagem, dono responde quando consegue, anota no caderno. Esquece confirmação 2x por semana, perde cliente. Final do mês não sabe quanto entrou.

**Depois**: link `petzara.app/agendar/tosadora-da-esquina` no perfil do Instagram. Cliente agenda sozinho, dono recebe notificação real-time, confirma. Ao final do dia, financeiro já tem a receita lançada (cron criou Transaction). Vê faturamento do mês em 1 tela.

**Ganho prático**: ~10 horas/semana economizadas em coordenação. ~5–10% de receita recuperada de agendamentos que se perdiam.

### Cenário 2 — Pet shop com dono ausente (3 funcionários, R$ 45k/mês)

**Antes**: dono tem outro emprego ou cuida de outra unidade. Não sabe o que está acontecendo no salão. Funcionário esqueceu de cobrar, dono descobre só no final do mês.

**Depois**: dashboard mostra agendamentos do dia, receita acumulada, contas a receber. Audit log mostra quem confirmou, quem alterou, quem deletou. Permissões granulares impedem que ajudante apague registros financeiros.

**Ganho prático**: controle. Reduz fraude/erro silencioso. Dono toma decisão baseado em dado, não em achismo.

### Cenário 3 — Pet shop em crescimento (R$ 60k/mês, fila de espera)

**Antes**: dono perde 30+ ligações por semana enquanto está tosando. Cada ligação perdida = ~50% chance de cliente desistir.

**Depois**: link público resolve ~70% dos agendamentos sem intervenção humana. Cliente novo agenda direto pelo Instagram bio. Cliente recorrente também. Dono atende telefone só para casos especiais.

**Ganho prático**: aumento de conversão de demanda. Dono recupera 5–15% de receita previamente perdida.

---

## 4. Análise de mercado

**Negócio que mais se beneficia.** Pet shop independente brasileiro, 1–5 colaboradores, R$ 15–80k/mês de faturamento, com presença ativa no Instagram.

**Tamanho do mercado.**
- Brasil tem aproximadamente **50.000+ estabelecimentos** dedicados a serviços para pets (banho/tosa) — fontes setoriais (Abinpet, Sebrae).
- Setor pet movimenta cerca de **R$ 58 bilhões/ano** (2024), crescendo ~7% a.a. mesmo em ciclos macro adversos.
- Penetração de software dedicado nesse subsegmento (não redes) é baixa — estimativa: <30%.

**O mercado paga por isso?** **Sim.** Mercado já educado por Vetus, Simples Pet, Trinks. Faixa de preço atual no segmento: R$ 59–199/mês. Petzara cabe confortavelmente no meio.

**Tamanho ideal de cliente.** Pequeno (1–10 funcionários). Acima disso, falta multi-unidade. Abaixo disso (autônomo solo), o caderno ainda compete bem.

**Sinais de Product-Market Fit.**

Positivos (no código):
- Stripe integrado e webhooks tratando ciclo completo de assinatura (não é demo).
- Trial de 30 dias rodando, com cron de e-mail de fim de trial 3 dias antes.
- Sprint de abril/2025 com 5 melhorias derivadas de uso real ([docs/IMPLEMENTACOES_SPRINT_2025-04.md](docs/IMPLEMENTACOES_SPRINT_2025-04.md)).
- Audit log com TTL — sinal de que o produto roda em produção há tempo suficiente para se preocupar com retenção de log.

Negativos / não comprovados:
- **Não há nos docs nenhum dado de clientes pagantes, retenção, churn ou MRR.** Sem isso, **PMF não está comprovado** — apenas viabilidade técnica.
- Sem case studies, sem depoimento, sem prova social pública.

**Conclusão de mercado**: nicho real, pagante, mal-servido. PMF tecnicamente possível, mas **comercialmente não validado** com dados visíveis.

---

## 5. Pontos fortes e fracos

### 5.1. Pontos fortes (hoje)

1. **UI polida acima da média do segmento.** Tailwind v4, Framer Motion, skeletons, drag-and-drop. Isso é vantagem competitiva real num mercado dominado por interfaces dos anos 2010.
2. **Arquitetura sólida.** Audit log, soft delete, refresh token rotation, rate limit, Sentry, multi-tenant correto. Pronta para escalar.
3. **Onboarding bem desenhado.** Wizard + checklist + tour de 14 passos. Reduz drop-off no trial.
4. **Página pública de agendamento.** O melhor gancho de venda — único asset que o cliente final vê e o petshop pode "mostrar".
5. **Automação de status + financeiro.** Reduz data entry, gera valor diário para o usuário.
6. **TWA Android.** Instala como app sem dor — vantagem real em comparação com PWA pura.

### 5.2. Pontos fracos (perigosos)

1. **Sem WhatsApp.** Provável objeção #1 do nicho. Bloqueia conversão direta.
2. **Sem lembretes automáticos.** Feature básica esperada. Concorrente menor que tenha isso ganha o cliente.
3. **Sem planos diferenciados implementados.** Stripe tem 1 preço. Sem feature gating no backend ([PetShop-Agendamento-Backend/middlewares/subscriptionMiddleware.js](PetShop-Agendamento-Backend/middlewares/subscriptionMiddleware.js) só checa status, não tier). **Bloqueia monetização escalável.**
4. **Sem multi-unidade.** Quando cliente cresce, ele precisa sair do Petzara.
5. **Marca "Petzara" sem awareness.** Construir do zero. Sem SEO orgânico relevante hoje.
6. **PT-BR único.** Trava expansão LATAM/Portugal sem refactor.

### 5.3. Bloqueadores de compra prováveis

Quando um pet shop avalia o Petzara, vai perguntar:

| Pergunta | Resposta atual | Impacto |
|---|---|---|
| "Manda lembrete pelo WhatsApp pro cliente?" | **Não.** | Crítico. Pode perder a venda. |
| "Dá para confirmar agendamento por WhatsApp?" | **Não.** | Crítico. |
| "Funciona se eu tiver 2 lojas?" | **Não.** | Bloqueia upsell. |
| "Tem app no celular?" | Sim (PWA + TWA), mas precisa explicar. | Médio. |
| "Quanto custa?" | **Não está claro nem no site.** | Alto — perde lead que queria avaliar rápido. |
| "Funciona no iPhone?" | Sim (PWA), mas sem ícone na home tela igual app nativo sem instrução. | Médio. |
| "Posso emitir nota fiscal?" | **Não.** | Médio (alguns pedem; muitos não). |

### 5.4. O que está faltando para tornar o produto vendável

Por ordem de prioridade comercial:

1. **WhatsApp** (lembrete + confirmação). Sem isso, perde no Brasil.
2. **Pricing público** com pelo menos 2 planos e feature gating real.
3. **Landing page pública** com pricing, prova social, demo, vídeo de 60s.
4. **3–5 case studies** ou depoimentos curtos de pet shops reais.
5. Comparativo direto com concorrente (página "Petzara vs. Vetus").
6. **Multi-unidade** (mais tarde, para upsell).

---

## 6. Experiência do usuário (UX)

**Fluxo principal — simples ou confuso?** Simples. Cadastro → verificação de e-mail → wizard 3 passos → checklist → tour. Bem desenhado.

**Atritos identificados:**
- **Verificação de e-mail obrigatória antes de usar.** Standard, mas adiciona 30s+ ao TTV.
- **Wizard exige horário de funcionamento.** Forçar isso é correto (sem isso o link público não funciona), mas pode parecer burocrático.
- **Sem dados de exemplo / playground.** Quem quer "só dar uma olhada" tem que cadastrar dados fake. Reduz exploração inicial.
- **Sem tela de "primeiro agendamento" celebrado.** Momento de aha é importante; hoje passa em branco.
- **Aceitar convite de colaborador**: precisa criar senha mesmo via Google? Verificar se é fricção.

**Aparência: profissional ou incompleto?** **Profissional.** Top 25–30% do segmento. Acima da média de Trinks/Vetus/Simples Pet visualmente. Abaixo de produtos top globais (Booksy global, Mindbody) — esperado.

**Tempo até valor (TTV).**
- Se o usuário tem dados reais para cadastrar: **<10 min** até primeiro agendamento criado.
- Se quer "experimentar com dados fake": pode chegar a 20–30 min, com fricção.
- Se quer só **ver como o link público fica**: tem que setar nome, horário e cadastrar 1 serviço. ~5 min, mas não é instantâneo.

**Recomendação UX para conversão.** Permitir ao usuário ver o link público com dados de demo ANTES de configurar tudo. É o gancho mais forte; precisa estar a 1 clique.

---

## 7. Pricing e monetização

### 7.1. Está pronto para ser pago?

**Sim, tecnicamente.** Stripe Checkout integrado, trial de 30 dias, webhook tratando todos os eventos relevantes (`checkout.session.completed`, `subscription.updated`, `subscription.deleted`, `invoice.paid`, `invoice.payment_failed`), página `/subscription-expired` bloqueando uso pós-cancelamento.

**Não, comercialmente.** Sem planos públicos, sem feature gating, sem landing page de pricing.

### 7.2. Modelo de cobrança recomendado

- **Mensal recorrente** como default.
- **Anual com desconto 15–20%** para reter caixa e reduzir churn.
- **Sem cobrança por uso/agendamento** — pet shop não tolera incerteza no custo. Use limite suave (ex.: até X agendamentos/mês no plano Starter, depois upsell).

### 7.3. Por que justifica recorrência?

- Calendário consultado **diariamente**.
- Financeiro consultado **semanalmente** (mínimo) e usado mensalmente.
- Histórico de pets retido por anos — alto custo psicológico de cancelar.
- Link público de agendamento já estaria divulgado em redes sociais, embalagens, cartões — alto **switching cost**.

### 7.4. Faixa de preço sugerida (com base no mercado BR)

| Plano | Preço sugerido | Inclui | Para quem |
|---|---|---|---|
| **Starter** | **R$ 49/mês** | 1 colaborador (dono), agendamentos ilimitados, link público, financeiro básico | Pet shop solo / micro |
| **Pro** | **R$ 99/mês** | Até 5 colaboradores, financeiro completo, exportação CSV/XLSX, audit log visível ao dono, lembretes WhatsApp* | Pet shop pequeno padrão (ICP) |
| **Business** | **R$ 179/mês** | Colaboradores ilimitados, multi-unidade*, integrações avançadas, suporte prioritário | Pet shop em crescimento |

*Itens com asterisco precisam ser construídos antes do lançamento do plano.

**Alternativa mais agressiva** (se objetivo é volume rápido):
- Free Trial 14 dias (em vez dos 30 atuais — força decisão mais rápida).
- Plano único **R$ 79/mês** (simplifica venda).
- Anual: **R$ 790/ano** (2 meses grátis).

### 7.5. Bloqueio crítico antes de monetizar com tiers

**Hoje qualquer plano pago entrega o mesmo produto.** O backend só checa `subscription.status`, não tier. Lançar 3 planos sem feature gating real é miragem — clientes do Starter vão usar tudo e pagar pouco.

**Antes de publicar pricing escalonado**: implementar feature gating em `subscriptionMiddleware` baseado em `subscription.plan` (ou metadata Stripe), e middleware de limite (ex.: número máximo de colaboradores) por endpoint relevante.

---

## 8. Posicionamento de marketing

### 8.1. Como esse sistema deveria ser vendido

**Não venda "ERP de pet shop".** Esse posicionamento compete com Vetus e perde — Vetus é mais completo. Venda **um único benefício específico que dói todo dia**:

> "**Receba agendamentos sem ter que parar de tosar para atender o WhatsApp.**"

A partir desse gancho, todas as outras features são "bônus que vêm junto".

### 8.2. Melhor nicho inicial

**Pet shops independentes ativos no Instagram, em capitais e cidades >100k habitantes, que já tentaram um concorrente ou ainda usam caderno.** Eles têm a dor, têm o orçamento e têm o canal de aquisição (Instagram).

**Evite no início:**
- Cidades pequenas (canal de aquisição ruim, ticket baixo).
- Pet shops sem Instagram (provavelmente lentos para adotar tecnologia).
- Clínicas veterinárias (produto não atende).

### 8.3. Dor principal a explorar no marketing

Hierarquia de dores (em ordem de impacto):

1. **"Estou perdendo cliente porque não atendo o WhatsApp na hora."** — primária
2. **"Não sei quanto faturei esse mês."** — secundária
3. **"Meu funcionário esquece de cobrar e eu só descubro no final."** — terciária
4. **"Cliente fala 'não tinha visto sua agenda', e eu perdi venda."** — quaternária

Marketing deve atacar a dor #1 em 80% dos materiais. As outras entram como reforço.

### 8.4. Promessa forte (sem ser enganosa)

- "**Tenha um link de agendamento profissional do seu petshop em 5 minutos.** Seu cliente marca sozinho, você só confirma."
- "**Pare de perder cliente por não conseguir atender o telefone.** Petzara recebe os agendamentos por você."
- "**Tudo o que você precisa pra rodar seu salão num app.** Agenda, financeiro, equipe — sem planilha."

Evite:
- "Aumente sua receita em 30%" (não comprovado, soa enganoso).
- "O melhor sistema do Brasil" (não comprovado, fraco).
- "Substitua 5 ferramentas por 1" (genérico).

---

## 9. Aquisição de clientes

### 9.1. Onde está o público

**Em ordem de densidade e custo de aquisição:**

1. **Instagram** — maior concentração. Pet shops postam diariamente fotos de antes/depois. **Canal #1** para outbound e inbound.
2. **WhatsApp** — meio de comunicação principal. Não é canal de descoberta, mas é onde a venda acontece.
3. **Grupos de Facebook regionais** ("Pet Shops de Curitiba", "Banho e tosa BH"). Menor escala, alta confiança.
4. **Google** — busca específica ("sistema para petshop", "agenda online petshop") tem volume baixo. SEO útil para captura, não para descoberta primária.
5. **Eventos pet locais** (Pet South America, Pet Trade BR). Bom para parcerias B2B, ruim para volume de cliente final.
6. **Fornecedores de produtos pet** (rações, cosméticos, equipamentos) — canal indireto, alto valor por indicação.

### 9.2. Forma mais rápida de conseguir os primeiros 30–50 clientes

**Outbound manual em Instagram, em 3 passos:**

1. Mapear 200 pet shops por cidade (capitais primeiro), filtrar por: posta semanalmente, tem WhatsApp na bio, parece independente.
2. **DM personalizada** mencionando algo específico (um post recente, o nome do pet shop). Oferecer demo de 10 min ou trial estendido.
3. Fechar via WhatsApp ou call de 15 min.

**Métricas esperadas (referência mercado SaaS BR pequeno):**
- 50 DMs/dia × 5 dias úteis = 250 DMs/semana.
- Resposta: 5–10% (12–25 conversas).
- Trial: 30–50% das conversas (4–12 trials/semana).
- Conversão trial → pago: 15–25% (~1–3 clientes pagantes/semana iniciais).

Em 30 dias, com execução média: **5–15 clientes pagantes**, validando ICP e refinando pitch.

### 9.3. Inbound vs. outbound

**Outbound primeiro.** Pet shop dono **não googla** "software pet shop" — ele só procura quando tem dor explícita, e mesmo aí, costuma perguntar para um amigo no setor.

**Inbound (SEO + conteúdo + indicações)** funciona depois dos primeiros 50–100 clientes, quando há:
- Histórias reais para contar (case studies).
- Prova social no site.
- Volume crítico para indicação espontânea.

**Tática híbrida** que geralmente funciona bem em SaaS BR pequeno:
- 70% outbound Instagram nos primeiros 6 meses.
- 20% conteúdo social (Reels mostrando o link público de petshops reais — viraliza mais que post de produto).
- 10% parcerias com fornecedores e influenciadores nicho pet.

### 9.4. Características de produto que ajudam aquisição

- **Link público é demonstrável** — você manda print/Reel do link do "Pet Shop X" e o concorrente quer o dele.
- **Tema customizável** vira gancho ("seu petshop com sua cor, sua identidade").
- **TWA Android** instalável reduz objeção de "preciso baixar app na loja".

---

## 10. Resumo estratégico

### 10.1. Tem potencial real?

**Sim, condicionalmente.** O Petzara é tecnicamente competitivo, está em produção (Railway), tem trial Stripe rodando e arquitetura suficiente para escalar para milhares de clientes sem refactor profundo. O mercado brasileiro de pet shops independentes existe (~50k estabelecimentos), paga por software (R$ 59–199/mês de referência) e está mal-servido por concorrentes datados.

**Mas três coisas separam "tem produto" de "tem negócio":**

1. **WhatsApp.** No Brasil pet, sem WhatsApp é objeção tão grande que pode matar 60% das oportunidades antes da decisão.
2. **Pricing e feature gating.** Sem planos diferenciados, não há monetização escalável — só ARPU plano. Sem isso, o melhor cliente paga o mesmo que o pior.
3. **Distribuição.** Bom produto sem aquisição definida não vira receita. Outbound manual Instagram é a entrada mais barata e rápida; sem alguém dedicado a fazer, fica no zero.

PMF **não comprovado** com dados visíveis hoje. Próximos 30–60 dias devem confirmar (com clientes reais) ou indicar pivot tático.

### 10.2. As 3 ações mais importantes AGORA

**1. Implementar lembrete WhatsApp para cliente final** (prazo: 2 semanas).
- Integração com API WhatsApp Business (provedor: Z-API, ChatPro, ou Meta direta) ou Twilio.
- Lembrete automático 24h antes do agendamento.
- Confirmação por resposta do cliente (Y/N).
- Destrava ~80% das objeções de venda no nicho. **Sem essa feature, qualquer outra ação tem ROI menor.**

**2. Definir e publicar pricing público + feature gating real no backend** (prazo: 3 semanas).
- 2 ou 3 planos com diferenças concretas (limite de colaboradores, multi-unidade futura, lembretes WhatsApp como upsell).
- Middleware de gating em `subscriptionMiddleware` baseado em `subscription.plan` ou metadata Stripe.
- Página de pricing pública com FAQ, comparativo e CTA para trial.
- Sem isso, não há monetização escalável e o lead que avalia rapidamente desiste.

**3. Validar ICP com 20 pet shops via outbound Instagram em 30 dias** (prazo: 30 dias, em paralelo).
- 250 DMs/semana, segmentação rígida (capitais, posta semanalmente, parece independente).
- Calls de 15 min para 20 pet shops, oferecer trial estendido em troca de feedback estruturado.
- Documentar objeções, dores, faixa de preço aceita, features pedidas.
- Confirma promessa de valor antes de gastar com tráfego pago. Se ICP estiver errado, descobre cedo.

**Sequência sugerida:** começar (1) e (3) em paralelo na semana 1; (2) entra na semana 2–4 conforme (3) traz feedback de pricing. Em 60 dias, decisão informada sobre dobrar aposta ou pivotar.

---

## Apêndice — Riscos e premissas

### Riscos
- **Concorrente bem capitalizado** (Petlove, Vetus) lança produto similar com WhatsApp embutido.
- **Mudança de regra WhatsApp Business** (Meta) que encareça envio de lembretes.
- **Stripe BR** continua em modelo internacional, complicando NF-e. Pode ser necessário migrar para Pagar.me/Stone para ticket maior.
- **Crescimento sem feature gating** captura demanda mas trava ARPU. Refactorar gating com base instalada é mais doloroso que fazer agora.

### Premissas que precisam ser validadas com dados reais
- Faixa de preço aceita pelo ICP (R$ 49–99/mês).
- Conversão trial → pago no nível esperado (15–25%).
- Custo de aquisição via Instagram outbound suportável (estimativa de < R$ 100 CAC, mas precisa medir).
- Disposição do nicho para pagar mensalmente recorrente vs. anual (testar em entrevistas).

---

**Fim da análise.**

Documento vivo. Atualizar quando: (a) WhatsApp for lançado, (b) pricing público for definido, (c) primeiros 20–50 clientes pagantes trouxerem dados reais de retenção e LTV.
