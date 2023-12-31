const UserRepository = require('../repository/user-repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppErrors = require('../utils/error-handler');


// for bringing key
const { JWT_KEY } = require('../config/serverConfig');
const role = require('../models/role');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw error;
            }
            console.log("Something went wrong in the service layer ");
            throw new AppErrors(
                'ServerError',
                'Something went wrong in service',
                'Logical issue found',
                500);
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1d' })// it expects a key => so we create it in .env file => it is any random string
            return result;
        } catch (error) {
            console.log("Something went wrong in the token creation ");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in the token validation ", error);
            throw error;
        }
    }


    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison ");
            throw error;
        }
    }
    

    async signIn(email, plainpassword) {
        try {
            //step 1 --> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            //step 2 --> comapare incoming plain password with stores encrypted password
            const passwordsMatch = this.checkPassword(plainpassword, user.password);// user.password: encrpyted password

            if (!passwordsMatch) {
                console.log(" Password doesn't match");
                throw { error: 'Incorrect password' };
            }
            // step 3  --->if the passwords mathced,  then we will generate token and send it to user
            const newJWT = this.createToken({ email: user.email, id: user.id });
            return newJWT;

        } catch (error) {
            console.log("Something went wrong in the sign in process ");
            throw error;
        }
    }



    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if (!response) {
                throw { error: 'Invalid Token' };
            }

            const user = this.userRepository.getbyId(response.id);
            if (!user) {
                throw { error: 'No user with the corresponding token exists' };
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the auth process  in service layer ");
            throw error;
        }
    }


      isAdmin(userId) {
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong isAdmin  in service layer ");
            throw error;
        }
      }
}

module.exports = UserService;