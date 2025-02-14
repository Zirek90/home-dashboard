import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@src/api/api";
import { LoginRequestType } from "@src/api/request-type";
import { LoginResponseType } from "@src/api/response-type";
import { MUTATION_KEYS } from "../mutation-keys";

export const useLogin = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.LOGIN],
    mutationFn: async (credentials: LoginRequestType) => {
      const response = await httpClient.post<LoginResponseType>("/auth/login", credentials);
      return response.data;
    },
  });
};
