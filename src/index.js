const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();

const { PORT } = require('./config/serverConfig');

const apiRoutes = require('./routes/index');

// these 2 as we have encrypted details in these
const { User } = require('./models/index');
const bcrypt = require ('bcrypt');


const prepareAndStartServer = () => {
         
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true}));

        app.use('/api',apiRoutes);
     
        app.listen( PORT , async () => {
        console.log(` Server Started at port : ${PORT} `);
        const incomingpassword = '123456';




        // for comparison of password( hash password and user entered )
        // const user = await User.findByPk(2);
        // const response = bcrypt.compareSync(incomingpassword, user.password);
        // console.log(response);
    });
}

prepareAndStartServer();