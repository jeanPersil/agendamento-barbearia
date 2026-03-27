async function createService({ nome, descricao, preco, duracao }) {
  try {
    const data = await axios.post(
      "/servico",
      {
        nome,
        descricao,
        preco,
        duracao,
      },
      {
        withCredentials: true,
      },
    );
    return data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Erro de conexão com o servidor";
    console.error("Erro na API:", error);
    throw new Error(message);
  }
}

async function getServices({ page = 1, limit = 10 }) {
  try {
    const { data: apiResponse } = await axios.get("/servico", {
      params: {
        page,
        limit,
      },
    });

    return apiResponse;
  } catch (error) {
    const message = error.response?.data?.message || "Erro de conexão";
    console.log(error);
    throw new Error(message);
  }
}

export { getServices, createService };
