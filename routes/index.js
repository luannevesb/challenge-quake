var express = require('express');
var router = express.Router();
var log_controller = require('../bin/controllers/logController');

//Faz o upload do arquivo e salva para processamento
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, 'game.log')
  }
})

var upload = multer({ storage: storage })

// INDEX GROUP

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index')
}),


// LOG GROUP

/* POST log. */
router.post('/', upload.single('imageupload'),function(req, res) {
    res.redirect('/log');
});

/* GET log. */
router.get('/log', log_controller.getAllGames);

module.exports = router;