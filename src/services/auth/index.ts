export type User = {
    email: string;
    password: string;
};

export const signup = async (email: string, password: string): Promise<User> => {
    try {
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            throw new Error('User already exists');
        }

        const newUser: User = { email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        return newUser;
    } catch (error) {
        console.error('Error during signup:', error);
        throw error; // rethrow the error after logging it
    }
};

export const login = async (email: string, password: string): Promise<User> => {
    try {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
    } catch (error) {
    console.error('Error during login:', error);
    throw error; // rethrow the error after logging it
    }
};

export const logout = async (): Promise<null> => {
    try {
    localStorage.removeItem('currentUser');
    return null
    } catch (error) {
    console.error('Error during logout:', error);
    throw error; // rethrow the error after logging it
    }
};

export const getCurrentUser = (): User | null => {
    try {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
    } catch (error) {
    console.error('Error getting current user:', error);
    return null;
    }
};
