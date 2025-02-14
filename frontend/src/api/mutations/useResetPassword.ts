import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "./mutation-keys";
import { httpClient } from "../api";
import { ResetPasswordRequestType } from "../request-type/reset-password-request.type";

export const useResetPassword = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.RESET_PASSWORD],
    mutationFn: async (credential: ResetPasswordRequestType) => {
      await httpClient.post("/auth/reset-password", credential);
    },
  });
};
