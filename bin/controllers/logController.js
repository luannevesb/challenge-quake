var serviceQuake = require('../services/logService');
   exports.getAllGames = function (req, res) {
        serviceQuake.getAllGames().then(response => res.status(200).render('list', {log: response}))

        .catch(err => res.status(err.statusCode || 500)
        .send(err))
    };