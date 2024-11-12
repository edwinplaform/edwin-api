import db from "../models/index.js";
const User = db.user;

const userService = {
    async createUser(data) {
        return await User.create(data);
    },

    async getAllUsers(){
        return await User.findAll();
    },

    async getUserById(id) {
        return await User.findByPk(id);
    },

    async updateUser(id, data){
        const user = await User.findByPk(id);
        if (user){
            return await user.update(data);
        }
        throw new Error('User not found');
    },

    async deleteUser(id){
        const user = await User.findByPk(id);
        if (user){
            await user.destroy();
        }else {
            throw new Error("User not found");
        }
    }
};

export default userService;