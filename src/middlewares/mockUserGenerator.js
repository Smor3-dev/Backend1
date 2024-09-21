import bcrypt from 'bcrypt';

const generateUsers = async (numUsers) => {
    const users = [];
    const password = await bcrypt.hash('coder123', 10);

    for (let i = 0; i < numUsers; i++) {
        const role = Math.random() > 0.5 ? 'admin' : 'user';
        const user = {
            id: i + 1, 
            username: `user${i + 1}`, 
            password: password,
            role: role,
            pets: [],
            email: `user${i + 1}@example.com`
        };
        users.push(user);
    }

    return users;
};

export default generateUsers;
