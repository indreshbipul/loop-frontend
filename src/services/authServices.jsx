
const userSignIn = async (user) => {
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error('Failed to sign in');
    }
    const userData = await response.json();
    return userData;
}

const userSignUP = async (user) => {
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const status = response.status;
    const datas = await response.json();
    if (status === 400) {       
        return {
            status, 
            data : datas
        };

    }
    else if(status === 500) {
         return {
            status, 
            data : datas
        };
    }
    else{
        return {
            status, 
            data : []
        };
    }
    
}

const userLogout = async () => {
    const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to log out');
    }
    return await response.json();
};

const activeUserData = async (userId)=>{
    const response = await fetch(`http://localhost:3000/loggedinUserdata/${userId}`, {
        method: 'GET',
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const sessionData = await response.json();
    return sessionData;
}

const updateUserData = async (userId, updatedData) => {
    const response = await fetch(`http://localhost:3000/updateUser/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error('Failed to update user data');
    }
    const status = await response.status;
    return status
}

const authService = {
    userSignIn,
    userSignUP,
    userLogout,
    activeUserData,
    updateUserData
};

export default authService;