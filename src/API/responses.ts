import { AxiosResponse } from 'axios';

const Responses = async (response: Promise<any>): Promise<AxiosResponse> => {
  try {
    return await response;
  } catch (e) {
    const error = await e.response;
    return error;
  }
};

export default Responses;
