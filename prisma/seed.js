import prisma from "../api/prisma.js"; // Ajuste o caminho se necessário

async function main() {
  console.log("🌱 Iniciando a plantação (Seed)...");

  // ====================================================

  // ====================================================
  const diasDeTrabalho = [1, 2, 3, 4, 5, 6];

  // 2. Crie os dados para o Prisma
  const dadosParaInserir = diasDeTrabalho.map((dia) => ({
    profissionalId: "5c94a9cc-29e2-4cba-8e82-1d70cf5dd2cb",
    diaSemana: dia,
    horaInicio: "08:00",
    horaFim: "18:00",
  }));

  const criarDisponibilidade = await prisma.disponibilidade.createMany({
    data: dadosParaInserir,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
