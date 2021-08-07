var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('express-jwt');

const mongoose = require('./config/mongoose');
const { jwt_key, port } = require('./config/vars');
const { routes } = require('./config/routes');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var categoryRouter = require('./routes/agri_product_category');
var productRouter = require('./routes/agri_products');
var storeRouter = require('./routes/store');
var machineryRouter = require('./routes/machinery');

var errorHandler = require('./middlewares/error');

var app = express();

const expressSwagger = require('express-swagger-generator')(app);

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a simple express boilerplate',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: `localhost:${port}`,
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https'],
		securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/*.js'] //Path to the API handle folder
};

expressSwagger(options)

// open mongoose connection
mongoose.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api-docs-v2', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use(jwt({ secret: jwt_key, algorithms: ['HS256']})
.unless({path: routes.public})); // Auth


// login information state
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/category', categoryRouter);
app.use(errorHandler);
app.use('/products', productRouter);
app.use(errorHandler);
app.use('/store', storeRouter);
app.use('/machinery', machineryRouter);

module.exports = app;
