import prisma from "../api/prisma.js"; // Ajuste o caminho se necessário

async function main() {
  console.log("🌱 Iniciando a plantação (Seed)...");

  // ====================================================
  // 1. CRIANDO SERVIÇOS E USUÁRIOS (Igual ao anterior)
  // ====================================================

  const servicoCabelo = await prisma.servico.upsert({
    where: { id: "2" },
    update: {},
    create: {
      id: "2",
      nome: "Cabelo",
      descricao: "Corte de cabelo masculino somente",
      preco: 60,
      duracaoMin: 30,
      createdAt: new Date("2026-02-04T21:44:59.824Z"),
    },
  });

  const servicoBarba = await prisma.servico.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      nome: "Cabelo e barba",
      descricao: "cabelo + barba",
      preco: 80,
      duracaoMin: 60,
      createdAt: new Date("2026-02-05T02:00:45.000Z"),
    },
  });

  const cliente = await prisma.user.upsert({
    where: { id: "aba77ac5-ef2b-44b6-84f6-0af62d23f4f5" },
    update: {},
    create: {
      id: "aba77ac5-ef2b-44b6-84f6-0af62d23f4f5",
      nome: "João Cliente",
      email: "joao.cliente@teste.com",
      telefone: "11999999999",
      senha: "123",
      role: "CLIENTE",
    },
  });

  const profissional = await prisma.user.upsert({
    where: { id: "5c94a9cc-29e2-4cba-8e82-1d70cf5dd2cb" },
    update: {},
    create: {
      id: "5c94a9cc-29e2-4cba-8e82-1d70cf5dd2cb",
      nome: "João profissional",
      email: "joao.profissional@teste.com",
      telefone: "11999999999",
      senha: "123",
      role: "PROFISSIONAL",
    },
  });

  // ====================================================
  // 2. CRIANDO OS AGENDAMENTOS E OCUPANDO OS SLOTS
  // ====================================================
  console.log("📅 Criando agendamentos...");

  // --- AGENDAMENTO 1: Cabelo (30 min) às 09:00 ---
  const agendamento1 = await prisma.agendamento.upsert({
    where: { id: "ag-01-seed" }, // ID fixo para o seed não duplicar
    update: {},
    create: {
      id: "ag-01-seed",
      dataHora: new Date("2026-02-05T09:00:00.000Z"),
      status: "AGENDADO",
      precoHistorico: 60,
      clienteId: cliente.id,
      profissionalId: profissional.id,
      servicoId: servicoCabelo.id,
    },
  });

  // Agora, marcamos o horário das 09:00 como OCUPADO na tabela Horario
  await prisma.horario.upsert({
    where: {
      profissionalId_dataHora: {
        profissionalId: profissional.id,
        dataHora: new Date("2026-02-05T09:00:00.000Z"),
      },
    },
    update: { disponivel: false, agendamentoId: agendamento1.id },
    create: {
      profissionalId: profissional.id,
      dataHora: new Date("2026-02-05T09:00:00.000Z"),
      disponivel: false,
      agendamentoId: agendamento1.id,
    },
  });

  // --- AGENDAMENTO 2: Cabelo + Barba (60 min) às 14:00 ---
  // Esse ocupa 2 slots (14:00 e 14:30)
  const agendamento2 = await prisma.agendamento.upsert({
    where: { id: "ag-02-seed" },
    update: {},
    create: {
      id: "ag-02-seed",
      dataHora: new Date("2026-02-05T14:00:00.000Z"),
      status: "AGENDADO",
      precoHistorico: 80,
      clienteId: cliente.id,
      profissionalId: profissional.id,
      servicoId: servicoBarba.id,
    },
  });

  // Slot 1: 14:00
  await prisma.horario.upsert({
    where: {
      profissionalId_dataHora: {
        profissionalId: profissional.id,
        dataHora: new Date("2026-02-05T14:00:00.000Z"),
      },
    },
    update: { disponivel: false, agendamentoId: agendamento2.id },
    create: {
      profissionalId: profissional.id,
      dataHora: new Date("2026-02-05T14:00:00.000Z"),
      disponivel: false,
      agendamentoId: agendamento2.id,
    },
  });

  // Slot 2: 14:30 (Pois dura 60 min)
  await prisma.horario.upsert({
    where: {
      profissionalId_dataHora: {
        profissionalId: profissional.id,
        dataHora: new Date("2026-02-05T14:30:00.000Z"),
      },
    },
    update: { disponivel: false, agendamentoId: agendamento2.id },
    create: {
      profissionalId: profissional.id,
      dataHora: new Date("2026-02-05T14:30:00.000Z"),
      disponivel: false,
      agendamentoId: agendamento2.id,
    },
  });

  console.log("✅ Seed finalizado com sucesso!");
  console.log("Agendamentos criados:", agendamento1.id, agendamento2.id);
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
