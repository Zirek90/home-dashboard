import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_URL } from "@src/globals/api-url.constant";

export const httpClient = axios.create({
  baseURL: API_URL || "/",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { retry: boolean };
    // Safely cast response data to check for the "message" property
    const responseData = error.response?.data as { message?: string } | undefined;

    const isTokenExpired = error.response?.status === 401 && responseData?.message === "Token expired";

    if (isTokenExpired && !originalRequest.retry) {
      originalRequest.retry = true;
      try {
        const userJson = localStorage.getItem("user_auth");
        if (!userJson) {
          return;
          // throw new Error("User not found in local storage");
        }

        const user_auth = JSON.parse(userJson);
        const refresh_token = user_auth.refresh_token;

        const response = await axios.post(
          `${API_URL}/auth/refresh-token`,
          {
            refresh_token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { access_token: newAccessToken, refresh_token: newRefreshToken } = response.data;

        user_auth.access_token = newAccessToken;
        user_auth.refresh_token = newRefreshToken;

        localStorage.setItem("user_auth", JSON.stringify(user_auth));

        httpClient.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return httpClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("user_auth");
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);
