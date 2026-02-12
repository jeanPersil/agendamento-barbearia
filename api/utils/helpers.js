function toMinutos(hora) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

function toHora(min) {
  const h = Math.floor(min / 60)
    .toString()
    .padStart(2, "0");
  const m = (min % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

function gerarSlots(inicio, fim) {
  const slots = [];
  let total = toMinutos(inicio);
  const limite = toMinutos(fim);

  while (total < limite) {
    slots.push(toHora(total));
    total += 30;
  }

  return slots;
}

export { toMinutos, toHora, gerarSlots };
