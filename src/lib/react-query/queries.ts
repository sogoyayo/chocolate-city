import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";


import {
  getArtists,
  getAlbums,
  getAlbumPhotos,
  getTweets,
  createTweet,
  updateTweet,
  deleteTweet,
  getTweetById,
} from '@/services';

import {
  signup,
  login,
  logout,
  getCurrentUser,
  User,
} from '@/services/auth'
import { Tweet } from "@/types";


export const useArtists = () => {
  return useQuery({
    queryKey: ['artists'],
    queryFn: getArtists,
  });
};

export const useAlbums = () => {
  return useQuery({
    queryKey: ['albums'],
    queryFn: () => getAlbums(),
  });
};

export const useAlbumPhotos = (albumId: number) => {
  return useQuery({
    queryKey: ['albumPhotos', albumId],
    queryFn: () => getAlbumPhotos(albumId),
    enabled: !!albumId,
  });
};

export const useTweets = () => {
  return useQuery({
    queryKey: ['tweets'],
    queryFn: getTweets,
  });
};

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tweets'],
      });
    },
  });
};

export const useUpdateTweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ tweetId, tweet }: { tweetId: number; tweet: Partial<Tweet> }) => updateTweet(tweetId, tweet),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['tweets', data?.id],
      });
    },
  });
};

export const useDeleteTweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tweetId: number) => deleteTweet(tweetId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tweets'],
      });
    },
  });
};

export const useGetTweetById = (postId: string) => {
  return useQuery({
    queryKey: ['tweets', postId],
    queryFn: () => getTweetById(+postId),
    enabled: !!postId,
  });
};

// Auth

type Auth = {
  email: string, 
  password: string
}

export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: Auth) => signup(email, password),
    onSuccess: (data: User) => {
      queryClient.setQueryData(['currentUser'], data);
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: Auth) => login(email, password),
    onSuccess: (data: User) => {
      queryClient.setQueryData(['currentUser'], data);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.setQueryData(['currentUser'], null);
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });
};