import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import request from 'request';

const app = express();
const PORT = process.env.PORT || 5000;

// create call_api
function call_api(finishedAPI) {
var apiURL = 'https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_d6a5a5e42d344f83add115bc1e5f3a25';
request(apiURL, {json:true}, (err,res, body) => {
 if (err) { return console.log(err)}

 if (res.statusCode === 200) {
    finishedAPI(body)
 }
});
}

// Set hadlebars Middleware
const hbs = engine({});
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const otherstuff = "This is other stuff";
//Set handlebar route
app.get('/', (req, res) => {

    call_api( (doneAPI) => {
        res.render('home',  {
            stock: doneAPI
        });
    });
   
});

app.get('/about.html', (req, res) => {
    res.render('about',  {
        stuff: otherstuff
    });
});

//static content
const dirname = path.resolve();
app.use(express.static(path.join(dirname, 'public')));

app.listen(PORT, () => console.log("Server started on " + PORT));
