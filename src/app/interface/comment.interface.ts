export interface Comment {
    id: number;
    postId: number;
    name: string;
    body: string;
    author?: string;
  }