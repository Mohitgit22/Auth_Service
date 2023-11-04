const { User,Role } = require('../models/index');

class UserRepository {


    // for creating a user
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log(" Something went wrong on the repository layer ");
            throw error;
        }
    }



    async destroy(userId) {
        try {
            await User.destroy({
                where:
                {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log(" Something went wrong on the repository layer ");
            throw error;
        }
    }



    async getbyId(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id']
            });
            return user;
        } catch (error) {
            console.log(" Something went wrong on the repository layer ");
            throw error;
        }
    }


    async getByEmail ( userEmail ) {
        try {
            const user = await User.findOne({
                where:{
                    email: userEmail,
                }
            });
            return user;
        } catch (error) {
            console.log( " Something went wrong on repository layer");
            throw error;
        }
    }


    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            // console.log(adminRole);
            return user.hasRole(adminRole);
          d  } catch (error) {
            console.log("Something went wrong in the auth process  in service layer ");
            throw error;
        }
    }

}

module.exports = UserRepository;