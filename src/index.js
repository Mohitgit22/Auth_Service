const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();

const { PORT } = require('./config/serverConfig');

const apiRoutes = require('./routes/index');

// these 2 as we have encrypted details in these
const { User } = require('./models/index');
const bcrypt = require ('bcrypt');

const UserService = require('./services/user-service');


const prepareAndStartServer = () => {
         
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true}));

        app.use('/api',apiRoutes);
     
        app.listen( PORT , async () => {
        console.log(` Server Started at port : ${PORT} `);
        //const incomingpassword = '123456';
      
         
        // printing the new token --------->
    //    const service = new UserService();
    //    const newToken = service.createToken({ email: 'mohit@admin.com', id: 1});
    //    console.log( "new token is ", newToken);

       // doing token validation ---------->
    //    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGl0QGFkbWluLmNvbSIsImlkIjoxLCJpYXQiOjE2OTg4OTkxNTIsImV4cCI6MTY5ODg5OTE1NX0.eSf29QFGJImObepuBy6FFn5wQVrkpXLd7X3tCwQfmdk';
    //    const response = service.verifyToken(token);
    //    console.log(response);
       
        // for comparison of password( hash password and user entered )
        // const user = await User.findByPk(2);
        // const response = bcrypt.compareSync(incomingpassword, user.password);
        // console.log(response);
    });
}

prepareAndStartServer();