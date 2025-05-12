import api from './api';

export interface Comment {
  comment_id?: number;
  userid: number;
  word_content: string;
  like_count?: number;
  commented_at?: string;
}

export interface PostComment extends Comment {
  post_id: number;
}

const commentService = {
  // Get comments for a post
  getPostComments: async (postId: number) => {
    const response = await api.get<Comment[]>(`/comment?post_id=${postId}`);
    return response.data;
  },
  
  // Add a comment to a post
  addComment: async (comment: PostComment) => {
    const response = await api.put('/comment', { 
      comment: {
        userid: comment.userid,
        word_content: comment.word_content,
        like_count: comment.like_count || 0
      },
      post_id: comment.post_id
    });
    return response.data;
  },
  
  // Delete a comment
  deleteComment: async (commentId: number) => {
    const response = await api.delete('/comment', { 
      data: { comment_id: commentId } 
    });
    return response.data;
  },
  
  // Like a comment
  likeComment: async (commentId: number, userId: number) => {
    const response = await api.put('/comment/like', {
      comment_id: commentId,
      userid: userId
    });
    return response.data;
  },
  
  // Unlike a comment
  unlikeComment: async (commentId: number, userId: number) => {
    const response = await api.delete('/comment/like', {
      data: {
        comment_id: commentId,
        userid: userId
      }
    });
    return response.data;
  }
};

export default commentService; 