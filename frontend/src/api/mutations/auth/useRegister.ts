import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@src/api/api";
import { RegisterRequestType } from "@src/api/request-type";
import { MUTATION_KEYS } from "../mutation-keys";

export const useRegister = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.REGISTER],
    mutationFn: async (credentials: RegisterRequestType) => {
      return await httpClient.post("/auth/register", credentials);
    },
  });
};
