import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "./mutation-keys";
import { httpClient } from "../api";
import { LoginRequestType } from "../request-type";
import { LoginResponseType } from "../response-type";

export const useLogin = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.LOGIN],
    mutationFn: async (credentials: LoginRequestType) => {
      const response = await httpClient.post<LoginResponseType>("/auth/login", credentials);
      return response.data;
    },
  });
};
