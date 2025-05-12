import api from './api';
import authService from './authService';
import postService from './postService';
import friendService from './friendService';
import commentService from './commentService';
import mediaService from './mediaService';

export {
  api,
  authService,
  postService,
  friendService,
  commentService,
  mediaService
};

// Export types
export type { 
  LoginCredentials, 
  RegisterData, 
  UserProfile 
} from './authService';

export type { 
  Post, 
  PostWithMedia, 
  Media 
} from './postService';

export type { 
  FriendRequest 
} from './friendService';

export type { 
  Comment, 
  PostComment 
} from './commentService';

export * from './auth.service'; 