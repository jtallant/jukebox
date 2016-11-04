const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const glob = require('glob');

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use('/albums', express.static('albums'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

glob('albums/**/*.mp3', function (er, files) {
    let songs = files.map(function(path) {
        var title = path.split('/').reverse()[0].replace('.mp3', '');
        return {
            title: title,
            filePath: path,
            cover: path.replace(title + '.mp3', 'cover.jpg')
        };
    });

    app.get('/', (req, res) => {
        res.render('index.mustache', {
            songs: songs.sort(function(a, b) {
                if (a.title > b.title) {
                    return 1;
                }

                if (a.title < b.title) {
                    return -1;
                }

                return 0;
            })
        });
    });
});

app.listen(3000);
