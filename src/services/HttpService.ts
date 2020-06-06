import axios from "axios";

class HttpService {
  static url = "http://localhost:3080";

  static async get(path?: string): Promise<any> {
    const requestUrl = `${this.url}/${path}`;
    const response = await axios.get(requestUrl);
    return response.data;
  }

  static async post(path: string, data: object): Promise<any> {
    const requestUrl = `${this.url}/${path}`;
    const response = await axios.post(requestUrl, data);
    return response.data;
  }
}

export default HttpService;
