export interface ApiDoc {
  id: number;
  name: string;
  url: string;
  rating: number;
  votes: number;
  issues: string[];
  strengths: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Vote {
  id: number;
  apiDocId: number;
  userId: string;
  isUpvote: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiComment {
  id: number;
  apiDocId: number;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
