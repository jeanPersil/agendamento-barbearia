async function createUser({
  nome,
  email,
  senha,
  confirmarSenha,
  role,
  telefone,
}) {
  try {
    const data = await axios.post(
      "/user",
      {
        nome,
        email,
        senha,
        confirmarSenha,
        role,
        telefone,
      },
      {
        withCredentials: true,
      },
    );

    return data;
  } catch (error) {
    const message = error.response?.data?.message || "Erro de conexão";
    console.log(error);
    throw new Error(message);
  }
}

async function getAllUsers({ page, limit, nome, tipo, status }) {
  try {
    const { data: apiResponse } = await axios.get("/user", {
      params: {
        page,
        limit,
        nome,
        tipo,
        status,
      },
    });

    return { users: apiResponse.data, meta: apiResponse.meta };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de conexão";
    console.log(error);
    throw new Error(message);
  }
}

export { getAllUsers, createUser };
