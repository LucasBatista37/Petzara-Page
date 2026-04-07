# Política de Privacidade — Petzara

**Última atualização:** abril de 2026

---

## Aviso legal

Esta Política descreve como o operador da plataforma **Petzara** (“**nós**”, “**nosso**” ou “**operador**”) trata dados pessoais no contexto do software como serviço (SaaS) oferecido a estabelecimentos de serviços para animais. **Não substitui consultoria jurídica.** A identificação societária completa do operador (razão social, CNPJ e endereço) **será publicada nesta página quando estiver disponível**; até lá, você pode solicitar informações pelo canal de contato indicado na seção 14.

Esta Política está alinhada à **Lei nº 13.709/2018 (Lei Geral de Proteção de Dados — LGPD)**.

---

## 1. Controlador e encarregado (DPO)

**1.1** O **controlador** dos dados pessoais tratados em nome do operador da Plataforma Petzara é o próprio **operador da Petzara**, na medida em que define as finalidades e os meios do tratamento.

**1.2** O **encarregado de dados (DPO)**, quando nomeado, poderá ser contatado pelo e-mail indicado na seção 14. Enquanto não houver nomeação pública, as solicitações relacionadas à LGPD poderão ser encaminhadas ao **canal de contato** indicado na seção 14.

**1.3** Estabelecimentos que utilizam a Petzara para tratar dados de **seus** clientes e tutores podem atuar como **controladores** ou **operadores** em relação a esses titulares, conforme o caso. Esses Usuários são responsáveis por fornecer avisos e bases legais adequados aos **seus** titulares.

---

## 2. Escopo: quem é titular nesta Política

**2.1** Esta Política aplica-se principalmente ao tratamento de dados de:

- **Usuários da Plataforma** (administradores e colaboradores dos estabelecimentos);
- em caráter **acessório**, dados de **clientes finais, tutores e animais** que o estabelecimento **cadastra ou registra** na Petzara (por exemplo, em agendamentos ou cadastros).

**2.2** A **consulta pública de horários** na página vinculada à URL do estabelecimento **não exige login** do tutor; dados pessoais do visitante **não são coletados pela Petzara nessa tela** de forma identificada além do que o navegador e provedores habituais processam (vide seção 8). O contato subsequente pode ocorrer por **WhatsApp** ou outro canal externo, fora do controle desta Política quanto ao conteúdo da conversa.

---

## 3. Dados pessoais que podemos tratar

Conforme as funcionalidades utilizadas, podemos tratar as categorias abaixo.

### 3.1 Dados de conta e autenticação (Usuários)

- Identificação: **nome**, **nome do estabelecimento**, **e-mail**, **telefone**;
- autenticação: **hash de senha**, tokens de **verificação de e-mail**, tokens de **recuperação de senha**, **identificador Google** quando utilizado login social;
- sessão: **token de acesso** (JWT) e **refresh token** (por exemplo, em **cookie httpOnly**);
- vínculos: **papel** (administrador ou colaborador), referência ao **titular da conta** (proprietário), **departamento**, convites;
- preferências: **tema**, **ordenação de agenda**, **URL pública**, **ativação da URL**, **limites de serviços simultâneos**, **configurações de horário de trabalho** e afins.

### 3.2 Dados de assinatura e pagamento (SaaS)

- Identificadores e status no **Stripe** (cliente, assinatura), **período vigente**, **período de teste**, datas de cobrança, situação (ativa, em teste, inadimplente, cancelada, etc.).

**Não** tratamos, em nossos servidores de aplicação, o **número completo** do cartão de crédito; o processamento de pagamento é realizado pelo **Stripe**.

### 3.3 Dados operacionais inseridos pelo estabelecimento

- **Clientes:** nome, e-mail, telefone, **endereço** (logradouro, número, complemento, bairro, cidade, estado, CEP), observações;
- **Pets:** nome, espécie, raça, porte, data de nascimento, observações, vínculo opcional com cliente;
- **Agendamentos:** dados do animal e do responsável (nome, telefone), serviços, valores, data/hora, status, responsável interno;
- **Financeiro:** lançamentos (descrição, valores, categorias, datas, métodos de pagamento, vínculos com agendamentos, conforme uso);
- **Notificações** geradas pela Plataforma.

### 3.4 Dados de comunicação e suporte

- Mensagens enviadas pelos canais de **suporte** autenticado (nome, e-mail, assunto, conteúdo);
- registros de **e-mail transacional** (confirmação de conta, convites, redefinição de senha), enviados por provedor de e-mail.

### 3.5 Dados técnicos e de segurança

- Registros de **erro e desempenho** por meio de ferramentas como **Sentry** (podem incluir dados técnicos do dispositivo, navegador, **endereço IP** em incidentes, stack traces);
- **logs** de servidor e tráfego em nível de infraestrutura, quando aplicável;
- informações necessárias à **prevenção a fraudes** e **segurança** da conta.

---

## 4. Finalidades do tratamento

Tratamos dados pessoais para:

1. **Cadastrar, autenticar e gerenciar contas** de administradores e colaboradores;
2. **Fornecer e operar** as funcionalidades da Petzara (agenda, cadastros, financeiro, notificações, página pública de horários);
3. **Cobrar e administrar assinaturas** (incluindo período de teste quando oferecido), via Stripe;
4. **Comunicar-se** com o Usuário (e-mail transacional, suporte);
5. **Cumprir obrigações legais** e responder a solicitações legítimas de autoridades;
6. **Proteger direitos**, prevenir fraudes e garantir a **segurança** da Plataforma;
7. **Melhorar estabilidade e qualidade** do serviço (diagnóstico de erros com Sentry e dados técnicos correlatos);
8. **Cumprir esta Política** e os [Termos de Uso](./TERMOS_DE_USO.md).

---

## 5. Bases legais (LGPD)

Dependendo do caso, utilizamos as seguintes bases legais, nos termos do art. 7º da LGPD:

| Finalidade (resumo) | Base legal típica |
|---------------------|---------------------|
| Execução do contrato de uso da Plataforma | **Execução de contrato** (inc. III) |
| Criação e gestão de conta; cobrança | **Execução de contrato** e **exercício regular de direitos** (inc. VI), quando aplicável |
| Cumprimento de obrigação legal ou regulatória | **Obrigação legal** (inc. II) |
| Suporte, segurança, prevenção a fraudes | **Legítimo interesse** (inc. IX), com avaliação de expectativa do titular e balanceamento |
| Comunicações transacionais essenciais | **Execução de contrato** ou **legítimo interesse** em informar o titular sobre o serviço |
| Dados inseridos pelo estabelecimento sobre seus clientes | Em geral, **execução do contrato** entre o operador e o estabelecimento; o estabelecimento responde perante seus titulares |

Quando necessário **consentimento** (por exemplo, para comunicações opcionais não essenciais), será solicitado de forma destacada.

---

## 6. Compartilhamento de dados com terceiros

Podemos compartilhar dados com prestadores que atuam em nosso nome ou como parte da infraestrutura do serviço:

| Categoria | Exemplos de finalidade |
|-----------|------------------------|
| **Pagamentos** | **Stripe** — processamento de assinaturas, portal do cliente, eventos de cobrança |
| **Autenticação** | **Google** — login OAuth quando habilitado |
| **E-mail** | **Resend** (ou provedor equivalente) — envio de mensagens transacionais |
| **Monitoramento de erros** | **Sentry** — diagnóstico de falhas e desempenho |
| **Hospedagem e banco de dados** | Provedores de nuvem onde a aplicação e o **MongoDB** são hospedados |
| **Ordem judicial ou requisição legal** | Autoridades, quando obrigatório |

Exigimos contratos ou cláusulas que tratem dados conforme a LGPD, na medida aplicável (incluindo operações de **suboperador**).

---

## 7. Transferência internacional de dados

Alguns prestadores (como **Stripe**, **Google**, **Sentry** ou **Resend**) podem processar dados em **servidores localizados fora do Brasil**, inclusive nos Estados Unidos ou na União Europeia.

Nesses casos, adotamos medidas previstas na LGPD (arts. 33 a 36), como **cláusulas contratuais padrão**, **certificações** ou outras garantias compatíveis, e informamos os titulares sobre essa possibilidade nesta Política.

---

## 8. Cookies, armazenamento local e tecnologias similares

**8.1** Utilizamos **cookies** estritamente necessários à sessão, incluindo cookie **httpOnly** para **refresh token** (configurações de segurança e domínio dependem do ambiente, por exemplo `.petzara.app` em produção).

**8.2** O **token de acesso** pode ser armazenado no **armazenamento local do navegador** (`localStorage` ou similar) para manter a sessão do Usuário.

**8.3** O uso de **“Entrar com Google”** está sujeito às políticas de cookies e privacidade da **Google**.

**8.4** Atualmente não utilizamos **cookies de publicidade** de terceiros para perfilagem de marketing. Caso isso mude, esta Política será atualizada e, quando exigido, será obtido consentimento.

---

## 9. Segurança das informações

Adotamos medidas técnicas e organizacionais razoáveis, como:

- comunicação **HTTPS** em produção;
- **hash** de senhas;
- tokens de acesso de **curta duração** e renovação controlada;
- limitação de taxa em operações sensíveis (por exemplo, checkout);
- monitoramento de erros e acesso a infraestrutura restrito.

Nenhum sistema é totalmente seguro. Em caso de **incidente de segurança** que possa acarretar risco aos titulares, comunicaremos às autoridades e aos afetados quando a lei assim exigir.

---

## 10. Retenção de dados

**10.1** Mantemos dados pelo tempo necessário para **cumprir as finalidades** descritas, respeitando prazos legais (fiscal, civil, etc.).

**10.2** Após **encerramento da conta**, poderemos **reter** dados por período adicional para cumprimento de obrigação legal, resolução de litígios ou exercício regular de direitos.

**10.3** Logs e dados técnicos de segurança podem ser retidos por períodos **mais curtos ou mais longos**, conforme política interna e lei.

---

## 11. Direitos dos titulares (LGPD)

Nos termos do art. 18 da LGPD, o titular pode solicitar:

- **confirmação** da existência de tratamento;
- **acesso** aos dados;
- **correção** de dados incompletos, inexatos ou desatualizados;
- **anonimização, bloqueio ou eliminação** de dados desnecessários ou excessivos, ou tratados em desconformidade com a LGPD;
- **portabilidade**, quando aplicável;
- **eliminação** dos dados tratados com consentimento, salvo exceções legais;
- **informação** sobre compartilhamentos;
- **revogação** do consentimento, quando a base for o consentimento.

**11.1** Pedidos podem ser feitos pelo **canal de contato** da seção 14. Poderemos solicitar informações para **confirmar identidade**.

**11.2** Algumas solicitações podem ser **atendidas diretamente pelo Usuário** na própria Plataforma (edição de cadastros). Dados tratados pelo **Stripe** ou pela **Google** podem exigir solicitação também diretamente a esses provedores.

**11.3** O titular pode **peticionar à Autoridade Nacional de Proteção de Dados (ANPD)**.

---

## 12. Decisões automatizadas

Atualmente, a Petzara **não** realiza decisões unicamente automatizadas que afetem titulares de forma significativa sem revisão humana. Caso funcionalidades desse tipo sejam introduzidas, esta seção será atualizada.

---

## 13. Crianças e adolescentes

A Plataforma é voltada a **empresários e profissionais**. Não direcionamos serviços a crianças. Dados de menores podem aparecer apenas como **parte dos cadastros** inseridos pelo estabelecimento (por exemplo, tutor menor); nesses casos, o **controlador em relação ao menor** é o estabelecimento, que deve observar os art. 14 e 20 da LGPD.

---

## 14. Contato

Para exercer direitos, tirar dúvidas sobre privacidade ou estes tratamentos:

- **E-mail:** suporte@petzara.app
- **Suporte na Plataforma:** formulário autenticado em **Suporte**, quando disponível

---

## 15. Alterações desta Política

Podemos atualizar esta Política para refletir mudanças legais ou na Plataforma. A **data no topo** será revisada. Alterações relevantes poderão ser comunicadas por e-mail ou aviso na aplicação.

---

## 16. Relação com os Termos de Uso

Esta Política complementa os [Termos de Uso](./TERMOS_DE_USO.md). Em caso de conflito sobre tratamento de dados, prevalece o disposto aqui em matéria de privacidade, salvo norma legal em contrário.
