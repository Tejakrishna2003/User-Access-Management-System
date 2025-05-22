export const setAuthToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

export const setUserRole = (role: string) => {
  localStorage.setItem("role", role);
};

export const getUserRole = (): string | null => {
  return localStorage.getItem("role");
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};