import User from '../models/User';
import Cache from '../cache/Cache';
class UserController {
    async store(req,res) {
        const {email, name, password} = req.body;
        const user = await User.create({
            name, 
            email,
            password
        })
        const users = await User.find();
        await Cache.set('users', users);
        return res.json(user);
    }

    async index(req,res) {
        const cachedUsers = await Cache.get('users');
        if(cachedUsers && cachedUsers.length != 0) {
            return res.json({cachedUsers, message: 'Usou o cache'});
        }
        const users = await User.find();
        await Cache.set('users', users);
        return res.json(users);
    }

    async update(req,res) {
        const {id} = req.params;
        const user = await User.findOne({_id: id});
        if(!user) return res.status(400).json({error: 'Not found'});
        const {name = user.name, email = user.email} = req.body;
        const updatedUser = await User.update({_id: id}, {
            name,
            email
        })

        return res.json(updatedUser);
    }

    async delete(req,res) {
        const {id} = req.params;
        await User.findByIdAndDelete(id);
        return res.json({message: 'User is deleted'});
    }
}

module.exports =  new UserController;