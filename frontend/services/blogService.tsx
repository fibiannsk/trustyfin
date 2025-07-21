const API_URL = "http://localhost:5000";

export const userService = {
  getUsers: async (): Promise<any> => {
    try {
      const response = await fetch(`${API_URL}/user`);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(response.statusText);
      }
    } catch (error: any) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  createPost: async (postData: any): Promise<any> => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(response.statusText);
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  updatePost: async (userId: any, postData: any): Promise<any> => {
    try {
      const response = await fetch(`${API_URL}/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(response.statusText);
      }
    } catch (error: any) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  deleteUser: async (userId: any): Promise<any> => {
    try {
      const response = await fetch(`${API_URL}/user/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(response.statusText);
      }
    } catch (error: any) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};
