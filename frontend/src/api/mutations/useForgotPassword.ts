import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "./mutation-keys";
import { httpClient } from "../api";
import { ForgotPasswordRequestType } from "../request-type/forgot-password-request.type";
import { ForgotPasswordResponseType } from "../response-type/forgot-password-response.type";

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.FORGOT_PASSWORD],
    mutationFn: async (credential: ForgotPasswordRequestType) => {
      const response = await httpClient.post<ForgotPasswordResponseType>("/auth/forgot-password", credential);
      return response.data;
    },
  });
};
