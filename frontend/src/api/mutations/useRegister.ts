import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "./mutation-keys";
import { httpClient } from "../api";
import { RegisterRequestType } from "../request-type";

export const useRegister = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.REGISTER],
    mutationFn: async (credentials: RegisterRequestType) => {
      return await httpClient.post("/auth/register", credentials);
    },
  });
};
