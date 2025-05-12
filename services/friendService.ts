import api from './api';
import { UserProfile } from './authService';

export interface FriendRequest {
  sender: number;
  receiver: number;
}

const friendService = {
  // Get all friends of a user
  getFriends: async (userId: number) => {
    const response = await api.post<UserProfile[]>('/friend', { userid: userId });
    return response.data;
  },

  // Get close friends of a user
  getCloseFriends: async (userId: number) => {
    const response = await api.patch<UserProfile[]>('/friend/add_close', { userid: userId });
    return response.data;
  },

  // Add friend
  addFriend: async (userId: number, friendId: number) => {
    const response = await api.put('/friend/add', {
      userid: userId,
      friend_id: friendId
    });
    return response.data;
  },

  // Get friend requests
  getFriendRequests: async (userId: number) => {
    const response = await api.post<number[]>('/friend/requests', { userid: userId });
    return response.data;
  },

  // Send friend request
  sendFriendRequest: async (senderId: number, receiverId: number) => {
    const response = await api.put('/friend/requests/send', {
      sender: senderId,
      receiver: receiverId
    });
    return response.data;
  },

  // Accept friend request
  acceptFriendRequest: async (senderId: number, receiverId: number) => {
    const response = await api.put('/friend/requests/accept', {
      sender: senderId,
      receiver: receiverId
    });
    return response.data;
  },

  // Reject friend request
  rejectFriendRequest: async (senderId: number, receiverId: number) => {
    const response = await api.delete('/friend/requests/reject', {
      data: {
        sender: senderId,
        receiver: receiverId
      }
    });
    return response.data;
  },

  // Remove friend
  removeFriend: async (userId: number, friendId: number) => {
    const response = await api.delete('/friend/remove', {
      data: {
        userid: userId,
        friend_id: friendId
      }
    });
    return response.data;
  },

  // Get social distance between users
  getSocialDistance: async (userId: number, friendId: number) => {
    const response = await api.post<number>('/friend/distance', {
      userid: userId,
      friend_id: friendId
    });
    return response.data;
  },

  // Get all social distances for a user
  getAllSocialDistances: async (userId: number) => {
    const response = await api.post<Record<string, number>>('/friend/all_distance', {
      userid: userId
    });
    return response.data;
  }
};

export default friendService; 