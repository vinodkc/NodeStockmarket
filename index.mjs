import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;


// Set hadlebars Middleware
const hbs = engine({});
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const otherstuff = "This is other stuff";
//Set handlebar route
app.get('/', (req, res) => {
    res.render('home',  {
        stuff: otherstuff
    });
});

//static content
const dirname = path.resolve();
app.use(express.static(path.join(dirname, 'public')));

app.listen(PORT, () => console.log("Server started on " + PORT));
