import api from './api';

export interface Post {
  post_id?: number;
  uploader: number;
  posturl?: string;
  word_content?: string;
  like_count?: number;
  created_at?: string;
}

export interface PostWithMedia extends Post {
  media_ids: number[];
}

export interface Media {
  media_id?: number;
  userid: number;
  image_data: string; // Base64 encoded image
}

const postService = {
  // Get all posts
  getAllPosts: async () => {
    const response = await api.get<Post[]>('/post');
    return response.data;
  },
  
  // Get posts from current user
  getCurrentUserPosts: async () => {
    const response = await api.get<Post[]>('/post/self');
    return response.data;
  },
  
  // Get posts from a specific user
  getUserPosts: async (userId: number) => {
    const response = await api.post<Post[]>('/post', { uploader: userId });
    return response.data;
  },
  
  // Get media IDs associated with a post
  getPostMedia: async (postId: number) => {
    const response = await api.get<number[]>(`/post/media?post_id=${postId}`);
    return response.data;
  },
  
  // Get recommended posts
  getRecommendedPosts: async (numberOfPosts: number) => {
    const response = await api.get<Post[]>(`/post/recommendations?number_of_posts=${numberOfPosts}`);
    return response.data;
  },
  
  // Create a new post with media
  createPost: async (post: Post, mediaIds: number[]) => {
    const response = await api.put('/post', { 
      post: post,
      media_id_list: mediaIds 
    });
    return response.data;
  },
  
  // Upload media and get media ID
  uploadMedia: async (media: Media) => {
    const response = await api.put('/media', { media: media });
    return response.data;
  },
  
  // Delete a post
  deletePost: async (postId: number) => {
    const response = await api.delete('/post', { 
      data: { post_id: postId } 
    });
    return response.data;
  },
  
  // Update a post
  updatePost: async (post: Post, mediaIds: number[]) => {
    const response = await api.patch('/post', { 
      post: post,
      media_id_list: mediaIds 
    });
    return response.data;
  },
};

export default postService; 