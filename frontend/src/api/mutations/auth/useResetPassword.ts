import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@src/api/api";
import { ResetPasswordRequestType } from "@src/api/request-type/reset-password-request.type";
import { MUTATION_KEYS } from "../mutation-keys";

export const useResetPassword = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.RESET_PASSWORD],
    mutationFn: async (credential: ResetPasswordRequestType) => {
      await httpClient.post("/auth/reset-password", credential);
    },
  });
};
