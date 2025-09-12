import axios, { AxiosRequestConfig } from "axios";
import server from "./server.config";

interface ConnectOptions extends AxiosRequestConfig {
  body?: any;
}

const connectServer = async (url: string, options?: ConnectOptions) => {
  const { method = "POST", headers = {}, body, ...rest } = options || {};

  try {
    const response = await axios({
      url: `${server.apiGateway}/${url}`,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      data: body,
      ...rest,
    });

    return response.data;
  } catch (error: any) {
    console.error("Error connecting to server:", error);
    throw error;
  }
};

export default connectServer;
