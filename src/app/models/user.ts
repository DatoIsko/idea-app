import { Idea } from './idea';
import { Comment } from './comment';

export interface User {
  id: string;
  created: Date;
  username: string;
  token?: string;
  bookmarks?: Idea[];
  comments?: Comment[];
}

export interface UserDTO {
  username: string;
  password: string;
}
