export const refreshToken = async () => {
  try {
    const response = await fetch("http://localhost:3000/refresh", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Token refresh failed");

    const { accessToken } = await response.json();
    sessionStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    throw new Error("Session expired. Please login again.");
  }
};

export const validateToken = async (token) => {
  try {
    const response = await fetch("http://localhost:3000/validate", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};
