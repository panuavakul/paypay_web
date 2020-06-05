import axios from "axios";
import { PPPerformancePostBody } from "../models/PPPerformance";

class HttpService {
  static url = "http://localhost:3080";

  static async get(path: string, id?: string): Promise<any> {
    const requestUrl =
      id == null ? `${this.url}/${path}` : `${this.url}/${path}/${id}`;

    console.log(requestUrl);
    console.log("url", this.url);
    console.log("path", path);
    console.log("id", id);

    const response = await axios.get(requestUrl);
    return response.data;
  }

  static async post(path: string, data: PPPerformancePostBody): Promise<any> {
    const requestUrl = `${this.url}/${path}`;
    console.log(requestUrl);
    const response = await axios.post(requestUrl, data);
    return response.data;
  }
}

export default HttpService;
