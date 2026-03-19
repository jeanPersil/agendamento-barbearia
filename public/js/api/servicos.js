async function getServices() {
  try {
    const { data: apiResponse } = await axios.get("/servico");

    return apiResponse;
  } catch (error) {
    const message = error.response?.data?.message || "Erro de conexão";
    console.log(error);
    throw new Error(message);
  }
}

export { getServices };
