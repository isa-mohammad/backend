export const users = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'admin',
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user',
    },
    {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'password123',
        role: 'user',
    },
];

export const getHobbies = (userIds: any[]) => [
    {
        name: 'Photography',
        description: 'Taking pictures of landscapes and wildlife',
        user: userIds[0]._id, // John Doe
    },
    {
        name: 'Coding',
        description: 'Writing TypeScript and building web applications',
        user: userIds[0]._id, // John Doe
    },
    {
        name: 'Cooking',
        description: 'Baking sourdough bread',
        user: userIds[1]._id, // Jane Smith
    },
];

export const getFoods = (userIds: any[]) => [
    {
        item: 'Pizza',
        quantity: 2,
        user: userIds[0]._id,
    },
    {
        item: 'Burger',
        quantity: 1,
        user: userIds[1]._id,
    },
    {
        item: 'Pasta',
        quantity: 3,
        user: userIds[2]._id,
    },
];