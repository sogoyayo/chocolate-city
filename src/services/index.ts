import { Artist, Tweet } from '@/types';
import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';


export interface Album {
    userId: number;
    id: number;
    title: string;
}

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  // Add other relevant fields if needed
}


export const getArtists = async (): Promise<Artist[]> => {
    try {
        const response = await axios.get<Artist[]>(`${API_BASE_URL}/users`);  
        return response.data;
    } catch (error) {
        console.error('Error fetching artists:', error);
        if (axios.isAxiosError(error)) {
            throw new Error('Something went wrong while fetching artists');
        } else {
            throw error;
        }
    }
};


export const getAlbums = async (): Promise<Album[]> => {
    try {
        const response = await axios.get<Album[]>(`${API_BASE_URL}/albums`);
        
        
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error('Something went wrong while fetching artists');
        } else {
            throw error;
        }
    }
};

export const getAlbumPhotos = async (albumId: number): Promise<Photo[]> => {
    try {
        const response = await axios.get<Photo[]>(`${API_BASE_URL}/albums/${albumId}/photos`);
        
        return response.data;
    } catch (error) {
        console.error(`Error fetching photos for album ${albumId}:`, error);
        if (axios.isAxiosError(error)) {
            throw new Error('Something went wrong while fetching artists');
        } else {
            throw error;
        }
    }
};

export const getTweets = async (): Promise<Tweet[]> => {
    try {
        const response = await axios.get<Tweet[]>(`${API_BASE_URL}/comments`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tweets:', error);
        if (axios.isAxiosError(error)) {
            throw new Error('Something went wrong while fetching artists');
        } else {
            throw error;
        }
    }
};

export const createTweet = async (tweet: Omit<Tweet, 'id'>): Promise<Tweet> => {
    try {
        const response = await axios.post<Tweet>(`${API_BASE_URL}/comments`, tweet);
        return response.data;
    } catch (error) {
        console.error('Error creating tweet:', error);
        if (axios.isAxiosError(error)) {
            throw new Error('Something went wrong while fetching artists');
        } else {
            throw error;
        }
    }
};

export const updateTweet = async (tweetId: number, tweet: Partial<Tweet>): Promise<Tweet> => {
    try {
        const response = await axios.put<Tweet>(`${API_BASE_URL}/comments/${tweetId}`, tweet);
        return response.data;
    } catch (error) {
        console.error(`Error updating tweet ${tweetId}:`, error);
        if (axios.isAxiosError(error)) {
            throw new Error('Something went wrong while fetching artists');
        } else {
            throw error;
        }
    }
};

export const deleteTweet = async (tweetId: number): Promise<void> => {
    try {
        const response = await axios.delete<void>(`${API_BASE_URL}/comments/${tweetId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting tweet ${tweetId}:`, error);
        if (axios.isAxiosError(error)) {
            throw new Error('Something went wrong while fetching artists');
        } else {
            throw error;
        }
    }
};

export const getTweetById = async (tweetId: number): Promise<Tweet> => {
    try {
        const response = await axios.get<Tweet>(`${API_BASE_URL}/comments/${tweetId}`);
        return response.data;
    } catch (error) {
        console.error(`Error getting tweet ${tweetId}:`, error);
        if (axios.isAxiosError(error)) {
            throw new Error('Something went wrong while fetching artists');
        } else {
            throw error;
        }
    }
};
