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
    const { data: apiResponse } = await axios.get(
      "/servico",
      {
        params: {
          page,
          limit,
        },
      },

      {
        withCredentials: true,
      },
    );

    return apiResponse;
  } catch (error) {
    const message = error.response?.data?.message || "Erro de conexão";
    console.log(error);
    throw new Error(message);
  }
}

async function editService({ id, nome, descricao, preco, duracaoMin }) {
  try {
    const { data } = await axios.put(
      `/servico/${id}`,
      {
        nome,
        descricao,
        preco,
        duracaoMin,
      },
      {
        withCredentials: true,
      },
    );

    return data;
  } catch (error) {
    const message = error.response?.data?.message || "Erro de conexão";
    throw new Error(message);
  }
}

async function deletService({ id }) {
  try {
    console.log("Id do serviço: ", id);
    const { data } = await axios.delete(`/servico/${id}`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    const message = error.response?.data?.message || "Erro de conexão";
    throw new Error(message);
  }
}

export { getServices, createService, editService, deletService };
