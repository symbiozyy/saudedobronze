// Número do WhatsApp (DDI + DDD + número, só dígitos)
const WHATSAPP = "5511989540003";

const form = document.getElementById("form-agendar");
const erro = document.getElementById("form-erro");

// Data mínima = hoje
const hoje = new Date();
hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
form.data.min = hoje.toISOString().slice(0, 10);

// Links "Agendar" dos cards já selecionam o serviço no formulário
document.querySelectorAll("[data-servico]").forEach((el) => {
  el.addEventListener("click", () => {
    form.servico.value = el.dataset.servico;
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = form.nome.value.trim();
  const data = form.data.value;

  if (!nome || !data) {
    erro.textContent = "Preencha seu nome e a data preferida.";
    erro.hidden = false;
    return;
  }
  erro.hidden = true;

  const [ano, mes, dia] = data.split("-");
  const linhas = [
    `Olá! Vim pelo site e gostaria de agendar.`,
    ``,
    `*Nome:* ${nome}`,
    `*Serviço:* ${form.servico.value}`,
    `*Data:* ${dia}/${mes}/${ano} (${form.periodo.value})`,
  ];
  const obs = form.obs.value.trim();
  if (obs) linhas.push(`*Obs:* ${obs}`);

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(linhas.join("\n"))}`;
  window.open(url, "_blank", "noopener");
});

// Ano no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// Animação suave ao rolar
const alvos = document.querySelectorAll(".section__head, .card, .steps li, .g, blockquote, .booking__form, .promo");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("is-visible");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  alvos.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
}
