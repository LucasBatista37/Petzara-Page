// Capturas para a landing (servidor local, pet shop fictício "Amigo Fiel"). Uso: node cap.cjs <saida> [so=trecho]
const { chromium } = require("playwright");
const fs = require("fs");
const OUT = process.argv[2]; for (const d of ["", "/mobile", "/themes"]) fs.mkdirSync(OUT + d, { recursive: true });
const ONLY = (process.argv[3] || "").replace("so=", "");
const BASE = "http://localhost:5173";
const init = () => { try { const id = "64b000000000000000000001"; for (const k of ["petzara-setup-dismissed:", "petzara-link-shared:"]) localStorage.setItem(k + id, "true"); localStorage.setItem("petzara-tour-completed", "true"); localStorage.setItem("petzara-locale", "pt-BR"); } catch {} };
const ready = async (p) => { await p.waitForFunction(() => !/Carregando/.test(document.body.innerText), null, { timeout: 15000 }).catch(() => {}); await p.waitForTimeout(1500); };
const common = { locale: "pt-BR", timezoneId: "America/Sao_Paulo" };
(async () => {
  const b = await chromium.launch();
  const login = await b.newContext({ viewport: { width: 1440, height: 864 }, ...common });
  await login.addInitScript(init);
  const lp = await login.newPage();
  await lp.goto(BASE + "/login");
  await lp.getByTestId("login-email").fill("demo@petzara.test"); await lp.getByTestId("login-password").fill("Demo@1234"); await lp.getByTestId("login-submit").click();
  await lp.waitForURL(/dashboard/, { timeout: 30000 });
  const state = await login.storageState(); await login.close();
  const mk = async (mobile, wide) => { if (wide) { const c = await b.newContext({ viewport: { width: 1530, height: 918 }, deviceScaleFactor: 1600 / 1530, ...common, storageState: state }); await c.addInitScript(init); return c; } const c = await b.newContext(mobile ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 900 / 390, isMobile: true, hasTouch: true, ...common, storageState: state } : { viewport: { width: 1440, height: 864 }, deviceScaleFactor: 1600 / 1440, ...common, storageState: state }); await c.addInitScript(init); return c; };
  const wizard = async (p) => {
    await p.getByTestId("btn-new-appointment").first().click(); await p.waitForTimeout(900);
    await p.getByTestId("appointment-form").locator("input").first().fill("Paula"); await p.waitForTimeout(900);
    await p.getByText("Paula Reis").first().click(); await p.waitForTimeout(700);
    await p.getByTestId("select-appointment-pet").click(); await p.waitForTimeout(500);
    await p.getByText(/^Luna/).last().click(); await p.waitForTimeout(500);
    await p.getByTestId("appointment-form-next").click(); await p.waitForTimeout(900);
    for (const s of ["Banho e Tosa", "Hidratação"]) { const el = p.getByTestId("appointment-form").getByText(s, { exact: true }).first(); if (await el.count()) { await el.click().catch(() => {}); await p.waitForTimeout(400); } }
  };
  const tomorrow = async (p) => {
    await p.locator('button[id^="data-"]').first().click(); await p.waitForTimeout(700);
    await p.getByRole("gridcell", { name: /^21$/ }).or(p.getByRole("button", { name: /(^21$)|21 de novembro/ })).first().click(); await p.waitForTimeout(1500);
    const slot = p.getByRole("button", { name: /^10:30/ }).first(); if (await slot.count()) await slot.click();
  };
  const errs = [];
  for (const mobile of [false, true]) {
    const ctx = await mk(mobile); let p = await ctx.newPage();
    p.on("pageerror", (e) => errs.push(e.message.slice(0, 120)));
    const shot = async (name, route, fn) => {
      if (ONLY && !name.includes(ONLY)) return;
      try { await p.goto(BASE + route); await ready(p); if (fn) { await fn(p); await p.waitForTimeout(1000); }
        await p.screenshot({ path: `${OUT}/${mobile ? "mobile/" : ""}${name}.png` }); console.log("ok", mobile ? "m" : "d", name);
      } catch (e) { console.log("FALHOU", mobile ? "m" : "d", name, e.message.split("\n")[0].slice(0, 160)); await p.screenshot({ path: `${OUT}/FALHA-${mobile ? "m-" : ""}${name}.png` }).catch(() => {}); }
    };
    const cal = (view) => async (p) => { const sel = p.locator("select").last(); if (await sel.count()) { const vals = await sel.locator("option").evaluateAll((os) => os.map((o) => o.value)); await sel.selectOption(vals.at(-1)); await p.waitForTimeout(1200); } await p.getByRole("button", { name: /Calendário/ }).click(); await p.waitForTimeout(900); if (view) await p.getByRole("button", { name: view, exact: true }).click(); };
    const grid = async (p) => { const btns = p.locator("main button:has(svg)"); const t = await p.evaluate(() => { const bs = [...document.querySelectorAll("button")].filter(b => !b.innerText.trim() && b.querySelector("svg") && b.getBoundingClientRect().top < 200 && b.getBoundingClientRect().left > 1000); bs.at(-1)?.click(); return bs.length; }); if (!t) throw new Error("sem botão de cards"); };
    const tab = (name) => async (p) => { await p.getByRole("tab", { name }).or(p.getByRole("button", { name })).first().click(); };
    if (mobile) await shot("dashboard", "/dashboard");
    else { const w = await mk(false, true); const wp = await w.newPage(); const keep = p; p = wp; await shot("dashboard", "/dashboard"); p = keep; await w.close(); }
    if (!mobile) {
      await shot("agendamentos-lista", "/appointments");
      await shot("agenda-calendario-mes", "/appointments", cal("Mês"));
      await shot("agenda-calendario-semana", "/appointments", cal("Semana"));
      await shot("novo-agendamento-servicos", "/appointments", wizard);
      await shot("clientes", "/clients"); await shot("clientes-cards", "/clients", grid);
      await shot("pets-cards", "/pets", grid);
      await shot("servicos", "/services"); await shot("colaboradores", "/collaborators");
      await shot("financeiro-dashboard", "/financial");
      await shot("financeiro-contas-a-receber", "/financial", tab(/Contas a receber/));
      await shot("financeiro-despesas", "/financial", tab(/Despesas/));
    } else {
      await shot("agendamentos", "/appointments");
      await shot("calendario", "/appointments", cal(null));
      await shot("novo-agendamento", "/appointments", wizard);
      await shot("clientes", "/clients"); await shot("financeiro", "/financial");
    }
    await shot("notificacoes", "/notifications");
    await shot("link-publico", "/agendar/amigofiel", tomorrow);
    if (!ONLY || "themes".includes(ONLY)) {
      const tctx = mobile ? null : await mk(false, true); if (tctx) p = await tctx.newPage();
      for (const t of ["terracotta", "forest", "ocean", "ochre"]) {
        await p.request.get("http://localhost:5050/__demo/theme/" + t);
        await p.goto(BASE + "/dashboard"); await ready(p);
        await p.screenshot({ path: `${OUT}/themes/${t}-${mobile ? "mobile" : "desktop"}.png` }); console.log("ok tema", t);
      }
      await p.request.get("http://localhost:5050/__demo/theme/terracotta");
    }
    await ctx.close();
  }
  console.log("erros de página:", JSON.stringify(errs.slice(0, 5)));
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
