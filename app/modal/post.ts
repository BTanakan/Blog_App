export interface PostResponse {
  posts: Post[];
  page: number;
  limit: number;
  count: number;
  total_page: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  created_at: string;
}
