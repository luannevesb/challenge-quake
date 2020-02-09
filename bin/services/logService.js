var quakeService = require('./quakeService');
module.exports = {
    getAllGames: () => quakeService.getFile(),
}

