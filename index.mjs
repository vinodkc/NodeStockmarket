import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import request from 'request';
import bodyparser from 'body-parser';



// create call_api
function call_api(finishedAPI, errorHandler, stock_ticker) {
    console.log(stock_ticker)
var apiURL = 'https://cloud.iexapis.com/stable/stock/' + stock_ticker + '/quote?token=pk_d6a5a5e42d344f83add115bc1e5f3a25';
request(apiURL, {json:true}, (err,res, body) => {
 if (err) { return console.log(err)}

 if (res.statusCode === 200) {
     //call back
    finishedAPI(body);
 } else {
    errorHandler();
 }
});
}

const app = express();
const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
// Set handlebars Middleware
const hbs = engine({});
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Set handlebar index GET route
app.get('/', (req, res) => {

    res.render('welcome', {});
   
});

//Set handlebar index POST route
app.post('/', (req, res) => {

    var stock_ticker = req.body.stock_ticker
    //call stock API and pass call back function
    call_api( (doneAPI) => { // success

        res.render('home',  {
            stock: doneAPI
        });
    }, () => {  //error handler
        res.render('error', {
            stock_ticker: stock_ticker
        });
    }, 
    stock_ticker);
   
});

app.get('/about.html', (req, res) => {
    res.render('about',  {
        stuff: "About Page"
    });
});

//static content
const dirname = path.resolve();
app.use(express.static(path.join(dirname, 'public')));

app.listen(PORT, () => console.log("Server started on " + PORT));
