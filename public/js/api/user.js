async function getAllUsers({ page, limit }) {
  try {
    const { data: apiResponse } = await axios.get("/user", {
      params: {
        page,
        limit,
      },
    });

    return { users: apiResponse.data, meta: apiResponse.meta };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de conexão";
    console.log(error);
    throw new Error(message);
  }
}

export { getAllUsers };
