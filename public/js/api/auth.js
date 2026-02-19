async function login({ email, password }) {
  try {
    const { data } = await axios.post("/auth", {
      email: email,
      senha: password,
    });
    return data;
  } catch (error) {
    const message = error.response?.data?.message || "Erro de conexão";
    console.log(error);
    throw new Error(message);
  }
}

export { login };
