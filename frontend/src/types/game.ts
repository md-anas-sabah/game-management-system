export interface Game {
  _id: string;
  name: string;
  url: string;
  author: string;
  publishedDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface GameFormValues {
  name: string;
  url: string;
  author: string;
  publishedDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}
