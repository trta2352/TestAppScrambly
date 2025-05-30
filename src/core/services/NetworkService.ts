import axios from 'axios';
import { BACKEND_BASE_URL } from 'react-native-dotenv';
import { INetworkService } from './INetworkService';

export const axiosService = axios.create({ baseURL: BACKEND_BASE_URL });

enum Endpoints {
  POSTS = '/posts',
}

export default class NetworkService implements INetworkService {
  private static service: NetworkService;
  static get shared(): NetworkService {
    if (!this.service) {
      this.service = new NetworkService();
    }
    return this.service;
  }
  private constructor() {}

  async getPosts() {
    try {
      console.log('calling getPosts');
      const response = await axiosService.get(Endpoints.POSTS);

      if (response.data) {
        console.log('response.data', response.data);
        return response.data;
      } else {
        throw new Error('No data received');
      }
    } catch (error) {
      console.error(error);
    }
  }
}
