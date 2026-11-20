// Servidor local de demonstração (só nesta máquina): MongoDB em memória + dados fictícios + backend do branch.
const { createRequire } = require("module");
const path = require("path");
const BE = process.env.BE_DIR || "/home/claude/work/petzara-backend";
const r = createRequire(path.join(BE, "package.json"));

Object.assign(process.env, {
  NODE_ENV: "development",
  JWT_SECRET: "demo-jwt-secret-local-only-at-least-32-chars",
  REFRESH_SECRET: "demo-refresh-secret-local-only-32-chars-min",
  STRIPE_SECRET_KEY: "sk_test_demo_local_only_not_real_000000",
  STRIPE_WEBHOOK_SECRET: "whsec_demo_local_only_not_real",
  RESEND_API_KEY: "re_demo_local_only",
  EMAIL_USER: "demo@petzara.test",
  BASE_URL: "http://localhost:5050",
  CLIENT_URL: "http://localhost:5173",
  SENTRY_DSN: "",
  RATE_LIMIT_GLOBAL_MAX: "100000",
});

(async () => {
  const { MongoMemoryReplSet } = r("mongodb-memory-server");
  const mongoose = r("mongoose");
  const bcrypt = r("bcryptjs");
  const repl = await MongoMemoryReplSet.create({ replSet: { count: 1, storageEngine: "wiredTiger" }, instanceOpts: [{ launchTimeout: 60000 }] });
  await mongoose.connect(repl.getUri("petzara_demo"));

  const User = r("./models/User");
  const Service = r("./models/Service");
  const Client = r("./models/Client");
  const Pet = r("./models/Pet");
  const Appointment = r("./models/Appointment");
  const Package = r("./models/Package");
  const Transaction = r("./models/Transaction");
  await Promise.all(mongoose.modelNames().map((n) => mongoose.model(n).init()));


  const DAY = 86400000;
  const owner = await User.create({
    _id: new mongoose.Types.ObjectId("64b000000000000000000001"),
    name: "Mariana Costa", petshopName: "Amigo Fiel Banho e Tosa", email: "demo@petzara.test",
    password: bcrypt.hashSync("Demo@1234", 8), isVerified: true, role: "admin", owner: null, phone: "11999990000",
    onboardingCompleted: true, customUrl: "amigofiel", isUrlActive: true, maxSimultaneousServices: 3,
    schedule: { workDays: [1, 2, 3, 4, 5, 6], workHours: { start: "08:00", end: "18:00" }, breaks: [{ start: "12:00", end: "13:00" }], serviceDuration: 60 },
    subscription: { status: "active", currentPeriodEnd: new Date(Date.now() + 25 * DAY) },
  });
  global.__demoOwner = owner._id; global.__User = User;
  const team = [];
  for (const [name, email, department] of [["Vinícius Barbosa", "vinicius@amigofiel.test", "Banho"], ["Camila Duarte", "camila@amigofiel.test", "Tosa"], ["Rafael Nogueira", "rafael@amigofiel.test", "Recepção"]]) {
    team.push(await User.create({ name, email, password: bcrypt.hashSync("Demo@1234", 8), isVerified: true, role: "collaborator", owner: owner._id, department, petshopName: owner.petshopName, onboardingCompleted: true, inviteAcceptedAt: new Date() }));
  }
  const S = {};
  for (const [k, name, price, duration, extra] of [["banho", "Banho", 60, 60, false], ["bt", "Banho e Tosa", 95, 90, false], ["th", "Tosa Higiênica", 45, 40, false], ["tt", "Tosa na Tesoura", 120, 120, false], ["tb", "Tosa Bebê", 110, 100, false], ["hid", "Hidratação", 25, 20, true], ["unha", "Corte de unhas", 15, 10, true], ["dente", "Escovação de dentes", 20, 10, true], ["perf", "Perfume e laço", 10, 5, true]]) {
    S[k] = await Service.create({ name, price, duration, extra, user: owner._id });
  }
  const tutors = [
    ["Vinícius Almeida", "11991234501", [["Maya", "Dachshund", "Pequeno"]]], ["Paula Reis", "11991234502", [["Luna", "Poodle", "Pequeno"], ["Sol", "Poodle", "Pequeno"]]],
    ["Carlos Lima", "11991234503", [["Bob", "Beagle", "Medio"]]], ["Bia Souza", "11991234504", [["Mel", "Shih-tzu", "Pequeno"]]],
    ["Rita Alves", "11991234505", [["Nina", "Yorkshire", "Pequeno"]]], ["João Melo", "11991234506", [["Pipoca", "Golden Retriever", "Grande"]]],
    ["Fernanda Rocha", "11991234507", [["Thor", "Labrador", "Grande"]]], ["Diego Martins", "11991234508", [["Simba", "Spitz Alemão", "Pequeno"]]],
    ["Larissa Prado", "11991234509", [["Amora", "Maltês", "Pequeno"], ["Fred", "Schnauzer", "Medio"]]], ["Gustavo Pires", "11991234510", [["Zeca", "Border Collie", "Medio"]]],
    ["Helena Farias", "11991234511", [["Lola", "Lhasa Apso", "Pequeno"]]], ["Marcos Teixeira", "11991234512", [["Duque", "Bulldog Francês", "Medio"]]],
    ["Aline Barros", "11991234513", [["Cacau", "Cocker Spaniel", "Medio"]]], ["Otávio Nunes", "11991234514", [["Bento", "Pug", "Pequeno"]]],
  ];
  const pets = [];
  let order = 0;
  for (const [name, phone, ps] of tutors) {
    const c = await Client.create({ name, phone, email: name.toLowerCase().normalize("NFD").replace(/[^a-z ]/g, "").replace(/ /g, ".") + "@exemplo.test", address: { city: ["São Paulo", "Santo André", "São Bernardo"][order % 3], state: "SP" }, user: owner._id, order: order++ });
    for (const [pn, breed, size] of ps) { await Pet.create({ name: pn, species: "Cachorro", breed, size, client: c._id, user: owner._id }); pets.push({ pn, breed, size, owner: name, phone }); }
  }
  const d = (k) => new Date(`${k}T00:00:00Z`);
  const svc = ["banho", "bt", "banho", "tt", "th", "bt", "tb", "banho"];
  const times = ["08:00", "08:30", "09:30", "10:30", "11:00", "13:30", "14:30", "15:30", "16:30"];
  const appts = []; const txs = [];
  const TODAY = "2026-11-20";
  let n = 0;
  for (let day = 2; day <= 28; day++) {
    const key = `2026-11-${String(day).padStart(2, "0")}`;
    const wd = d(key).getUTCDay(); if (wd === 0) continue;
    const count = key === TODAY ? 8 : wd === 6 ? 3 : 1 + (day % 2);
    for (let i = 0; i < count; i++) {
      const p = pets[(n * 5) % pets.length]; const s = S[svc[(n + i) % svc.length]]; const extra = (n + i) % 3 === 0 ? S.hid : (n + i) % 5 === 0 ? S.unha : null;
      const price = s.price + (extra ? extra.price : 0);
      let status = key < TODAY ? ((n + i) % 17 === 5 ? "Cancelado" : "Finalizado") : "Pendente";
      if (key === TODAY) status = i < 3 ? "Finalizado" : i === 3 ? "Em Andamento" : "Pendente";
      appts.push({ petName: p.pn, ownerName: p.owner, ownerPhone: p.phone, breed: p.breed, species: "Cachorro", size: p.size, baseService: s._id, extraServices: extra ? [extra._id] : [], price, user: owner._id, responsible: team[(n + i) % 3]._id, status, date: d(key), time: times[i % times.length] });
      if (status === "Finalizado") txs.push({ description: `${s.name}: ${p.pn} - ${p.owner}`, amount: price, type: "income", category: "Serviço", date: d(key), status: (n + i) % 9 === 0 ? "pending" : "paid", paymentMethod: ["pix", "credit_card", "debit_card", "cash"][(n + i) % 4], user: owner._id });
      n++;
    }
  }
  await Appointment.create(appts);
  for (const [description, amount, category, key, status] of [["Aluguel do ponto", 1800, "Aluguel", "2026-11-05", "paid"], ["Shampoo e condicionador (5 L)", 320, "Produtos", "2026-11-07", "paid"], ["Conta de luz", 410, "Contas", "2026-11-10", "paid"], ["Conta de água", 265, "Contas", "2026-11-10", "paid"], ["Lâminas e manutenção das máquinas", 180, "Equipamentos", "2026-11-14", "paid"], ["Toalhas e laços", 140, "Produtos", "2026-11-18", "paid"], ["Internet", 110, "Contas", "2026-11-25", "pending"]]) {
    txs.push({ description, amount, type: "expense", category, date: d(key), status, paymentMethod: "pix", user: owner._id });
  }
  // Meses anteriores (só lançamentos, para o gráfico de fluxo de caixa ter histórico).
  for (const [ym, inc, exp] of [["2026-06", 5200, 2900], ["2026-07", 5900, 3050], ["2026-08", 6400, 3100], ["2026-09", 7100, 3300], ["2026-10", 7850, 3400]]) {
    for (let w = 0; w < 4; w++) {
      txs.push({ description: "Atendimentos da semana", amount: inc / 4, type: "income", category: "Serviço", date: d(`${ym}-${String(4 + w * 7).padStart(2, "0")}`), status: "paid", paymentMethod: "pix", user: owner._id });
      txs.push({ description: ["Aluguel do ponto", "Produtos", "Contas", "Equipamentos"][w], amount: exp * [0.55, 0.2, 0.18, 0.07][w], type: "expense", category: ["Aluguel", "Produtos", "Contas", "Equipamentos"][w], date: d(`${ym}-${String(5 + w * 7).padStart(2, "0")}`), status: "paid", paymentMethod: "pix", user: owner._id });
    }
  }
  await Transaction.create(txs);
  try {
    const Notification = r("./models/Notification");
    await Notification.create([
      { recipient: owner._id, message: "Novo pedido pelo link de agendamento: Luna (Paula Reis) — sábado, 10:30", type: "info", category: "appointment", read: false, createdAt: new Date(Date.now() - 12 * 60000) },
      { recipient: owner._id, message: "Atendimento iniciado: Zeca — Banho e Tosa, com Camila Duarte", type: "success", category: "appointment", read: false, createdAt: new Date(Date.now() - 50 * 60000) },
      { recipient: owner._id, message: "Conta a vencer em 5 dias: Internet — R$ 110,00", type: "warning", category: "system", read: false, createdAt: new Date(Date.now() - 3 * 3600000) },
      { recipient: owner._id, message: "Atendimento finalizado: Maya — Tosa na Tesoura", type: "success", category: "appointment", read: true, createdAt: new Date(Date.now() - 5 * 3600000) },
      { recipient: owner._id, message: "Rafael Nogueira aceitou o convite da equipe", type: "info", category: "system", read: true, createdAt: new Date(Date.now() - 26 * 3600000) },
    ]);
  } catch (e) { console.log("sem notificações:", e.message); }
  console.log(`SEED: ${appts.length} agendamentos, ${txs.length} lançamentos`);

  const app = r("./app");
  const http = require("http");
  // REQLOG=arquivo: grava "ms MÉTODO caminho" de cada requisição (inclui preflight e socket.io).
  const fs = require("fs");
  const logFile = process.env.REQLOG;
  const server = http.createServer(async (req, res) => {
    // Só nesta demonstração local: troca o tema da conta fictícia para as capturas.
    const m = /^\/__demo\/theme\/(\w+)$/.exec(req.url || "");
    if (m) { await global.__User.updateOne({ _id: global.__demoOwner }, { theme: m[1] }); res.writeHead(204, { "Access-Control-Allow-Origin": "*" }); return res.end(); }
    if (logFile) fs.appendFileSync(logFile, `${Date.now()} ${req.method} ${req.url}\n`);
    app(req, res);
  });
  try {
    const { createSocketServer } = r("./utils/socketServer");
    app.set("io", createSocketServer(server));
  } catch { /* sem socket na demo */ }
  server.listen(Number(process.env.DEMO_PORT || 5050), () => console.log("DEMO API pronta em http://localhost:5050"));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
