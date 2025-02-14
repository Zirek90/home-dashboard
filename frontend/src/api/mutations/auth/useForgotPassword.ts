import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@src/api/api";
import { ForgotPasswordRequestType } from "@src/api/request-type/forgot-password-request.type";
import { ForgotPasswordResponseType } from "@src/api/response-type/forgot-password-response.type";
import { MUTATION_KEYS } from "../mutation-keys";

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.FORGOT_PASSWORD],
    mutationFn: async (credential: ForgotPasswordRequestType) => {
      const response = await httpClient.post<ForgotPasswordResponseType>("/auth/forgot-password", credential);
      return response.data;
    },
  });
};
