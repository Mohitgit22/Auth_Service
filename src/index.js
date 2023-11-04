const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();

const { PORT } = require('./config/serverConfig');

const apiRoutes = require('./routes/index');

const db = require('./models/index');
// these 2 as we have encrypted details in these
const { User,Role } = require('./models/index');
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


        // if(process.env.DB_SYNC){
        //     db.sequelize.sync({ alter: true});
        // }


        // lect 10 : authorisation ----->
        // const u1 = await User.findByPk(1);
        // const r1 = await Role.findByPk(1);
        // u1.addRole(r1);// 'add' is a pre defined function in sequelize
        // const response1 = await r1.getUsers();
        // const response2 = await u1.getRoles();
        // const response = await u1.hasRole(r1);
        
        // console.log(response1);
        // console.log(response2);

    });
}

prepareAndStartServer();