import User from '../model/userSchema.js';

export const userLogIn = async (request, response) => {
    try {
        // Find user by username and password
        let user = await User.findOne({ username: request.body.username });

        if (!user) {
            return response.status(401).json({ message: 'Invalid Username or Password' });
        }

        // Check if the password matches
        if (user.password !== request.body.password) {
            return response.status(401).json({ message: 'Invalid Username or Password' });
        }

        // If the credentials match, return success response
        return response.status(200).json({ message: `${request.body.username} logged in successfully` });

    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

export const userSignUp = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });
        if (exist) {
            return response.status(401).json({ message: 'User already exists' });
        }
        const user = request.body;
        const newUser = new User(user);
        await newUser.save();
        response.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
