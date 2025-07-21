import { useState, useEffect } from 'react';
import { blogService } from '../services/blogService';

export const useBlog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await blogService.getPosts();
      setPosts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (post: any): Promise<any> => {
    try {
      const newPost = await blogService.createPost(post);
      setPosts([...posts, newPost]);
      return newPost;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updatePost = async (id: any, post: any): Promise<any> => {
    try {
      const updatedPost = await blogService.updatePost(id, post);
      setPosts(posts.map(p => p.id === id ? updatedPost : p));
      return updatedPost;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deletePost = async (id: any): Promise<void> => {
    try {
      await blogService.deletePost(id);
      setPosts(posts.filter(p => p.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
  };
};
