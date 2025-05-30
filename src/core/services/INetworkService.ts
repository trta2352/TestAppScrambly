import { Post } from '../models/Post';

export interface INetworkService {
  getPosts(): Promise<Post[]>;
}
