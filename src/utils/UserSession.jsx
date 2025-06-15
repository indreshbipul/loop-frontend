const userSession = async () => {
  const response = await fetch('http://localhost:3000/session', {
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