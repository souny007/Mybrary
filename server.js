if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))



const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log('connected to MongoDB secessfully');
});

// setting folder
app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(methodOverride('_method'))

//setting router
const indexRouter = require('./routes/index');// ເອີ້ນໃຊ້ routes page
const authorRouter = require('./routes/authors');// ເອີ້ນໃຊ້ routes page
const bookRouter = require('./routes/books')
// set url
app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3000);





