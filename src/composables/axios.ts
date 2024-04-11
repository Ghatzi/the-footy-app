import axios from 'axios';

export const api = async (opts: {
  method: string;
  url: string;
  params?: {};
  headers?: {};
}) => {
  try {
    const response = await axios({
      method: opts.method,
      url: opts.url,
      params: opts.params,
      headers: opts.headers
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
