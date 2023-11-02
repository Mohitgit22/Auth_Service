const UserRepository = require('../repository/user-repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// for bringing key
const { JWT_KEY } = require('../config/serverConfig');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer ");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: 3 })// it expects a key => so we create it in .env file => it is any random string
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


     async signIn(email, password){
        try {
            //step 1 --> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            //step 2 --> comapare incoming plain password with stores encrypted password
            const passwordsMatch = this.checkPassword( password, user.password);// user.password: encrpyted password

            if(!passwordsMatch) {
                console.log(" Password doesn't match");
                throw { error: 'Incorrect password'};
            }
             // step 3  --->if the passwords mathced,  then we will generate token and send it to user
             const newJWT = this.createToken({email: user.email , id: user.id});
             return newJWT;

        } catch (error) {
            console.log("Something went wrong in the sign in process ");
            throw error;
        }
     }

}

module.exports = UserService;