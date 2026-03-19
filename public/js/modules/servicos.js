import renderLayout from "../components/layout/renderLayout.js";
import { getServices } from "../api/servicos.js";

export async function initServicos() {
  const data = await getServices();
  console.log(data);
  renderLayout({
    HeaderTitle: "Serviços",
    HeaderSubtitle: "Gerencie os serviços da sua barbearia",
  });
}
