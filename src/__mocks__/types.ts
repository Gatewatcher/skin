export type User = {
  id: number;
  firstname: string;
  lastname: string;
  avatar: string;
  email: string;
  age: number;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type Comment = {
  id: string;
  content: string;
  created_at: string;
  updated_at?: string;
  created_by: string;
};

export type WorkspaceType = 'community' | 'organisation' | 'group';

export type Workspace = {
  id: string;
  name: string;
  type: WorkspaceType;
};

export type PaginatedApiResponse<T> = {
  count: number;
  next: number | null;
  prev: number | null;
  results: T[];
};

export type ApiError = {
  detail: string;
  statusCode: number;
};

export type HTTPVerb = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
