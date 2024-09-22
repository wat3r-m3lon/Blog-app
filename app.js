import express from 'express';
import bodyParser from 'body-parser';
import posts from './posts.js';

// Initialize the Express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { posts });
});

app.get('/new-post', (req, res) => {
    res.render('new-post');
});

app.post('/new-post', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.redirect('/');
});

app.get('/edit-post/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render('edit-post', { post });
    } else {
        res.redirect('/');
    }
});

app.post('/edit-post/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const updatedPost = posts.find(p => p.id === postId);
    if (updatedPost) {
        updatedPost.title = req.body.title;
        updatedPost.content = req.body.content;
    }
    res.redirect('/');
});

app.post('/delete-post/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);  // Mutate the array by removing the post
    }
    res.redirect('/');
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
