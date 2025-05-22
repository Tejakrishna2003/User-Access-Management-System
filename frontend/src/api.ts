import axios from "axios";
import { getAuthToken } from "./auth";
import { Software, AccessRequest, AuthResponse } from "./types";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = async (data: { username: string; password: string; role?: string }): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/signup", data);
  return response.data;
};

export const login = async (data: { username: string; password: string }): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);
  return response.data;
};

export const createSoftware = async (data: { name: string; description: string; accessLevels: string[] }): Promise<Software> => {
  const response = await api.post<Software>("/software", data);
  return response.data;
};

export const getSoftwareList = async (): Promise<Software[]> => {
  const response = await api.get<Software[]>("/software");
  return response.data;
};

export const submitAccessRequest = async (data: { softwareId: number; accessType: string; reason: string }): Promise<AccessRequest> => {
  const response = await api.post<AccessRequest>("/requests", data);
  return response.data;
};

export const getPendingRequests = async (): Promise<AccessRequest[]> => {
  const response = await api.get<AccessRequest[]>("/requests/pending");
  return response.data;
};

export const updateRequestStatus = async (id: number, status: "Approved" | "Rejected"): Promise<AccessRequest> => {
  const response = await api.patch<AccessRequest>(`/requests/${id}`, { status });
  return response.data;
};