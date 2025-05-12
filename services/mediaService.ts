import api from './api';
import { Media } from './postService';

const mediaService = {
  // Upload media
  uploadMedia: async (file: File, userId: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        try {
          // Remove the data:image/jpeg;base64, part
          const base64String = (reader.result as string).split(',')[1];
          
          const response = await api.put<{ media_id: number }>('/media', { 
            media: {
              userid: userId,
              image_data: base64String
            } 
          });
          
          resolve(response.data.media_id);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
    });
  },
  
  // Get media by ID
  getMedia: async (mediaId: number): Promise<Media> => {
    const response = await api.get<Media>(`/media?media_id=${mediaId}`);
    return response.data;
  },
  
  // Delete media
  deleteMedia: async (mediaId: number) => {
    const response = await api.delete('/media', { 
      data: { media_id: mediaId } 
    });
    return response.data;
  },
  
  // Helper function to convert base64 to URL
  getMediaUrl: (base64: string): string => {
    return `data:image/jpeg;base64,${base64}`;
  },
  
  // Helper function to handle file input change
  handleFileUpload: async (
    event: React.ChangeEvent<HTMLInputElement>,
    userId: number
  ): Promise<number[]> => {
    const files = event.target.files;
    if (!files || files.length === 0) return [];
    
    const mediaIds: number[] = [];
    
    for (let i = 0; i < files.length; i++) {
      try {
        const mediaId = await mediaService.uploadMedia(files[i], userId);
        mediaIds.push(mediaId);
      } catch (error) {
        console.error('Error uploading media:', error);
      }
    }
    
    return mediaIds;
  }
};

export default mediaService; 