import { HttpException, InternalServerErrorException } from '@nestjs/common';

export function handleAxiosError(error: any): never {
  console.error('Axios Error:', error.response?.data || error.message);

  if (error.response) {
    throw new HttpException(error.response.data.message, error.response.status);
  } else {
    throw new InternalServerErrorException(
      'Service unavailable. Please try again later.',
    );
  }
}
