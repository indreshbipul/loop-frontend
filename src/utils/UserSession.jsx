const API_URL = import.meta.env.VITE_API_URL;

const userSession = async () => {
  const response = await fetch(`${API_URL}/session`, {
    method: 'GET',
    credentials: 'include', // ✅ Necessary for cookies/session
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    return { isLoggedIn: false };
  }

  if (!response.ok) {
    throw new Error('Failed to get session');
  }

  const sessionData = await response.json();
  return sessionData;
};

export default userSession;