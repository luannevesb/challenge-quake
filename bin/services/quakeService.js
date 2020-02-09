module.exports = {
    /*
        Pega o arquivo e da parse
    */
    getFile: () => {
        return new Promise((resolve, reject) => {
            readFile('public/uploads/game.log').then(response => {
                let file = parsedFile(response);
                return resolve(file);
            }).catch(err => {
                return reject(err);
            });
        });
    },

    /*
        Pega o início do game
    */
    getInitGame: (root, rounds) => {
        return getInitGame(root, rounds);
    },

    /*
        Pega informações das kills
    */
    getKill: (round, line) => {
        return kill(round, line);
    },

    /*
        Pega informações dos jogares
    */
    getPlayer: (round, line) => {
        return instancePlayers(round, line);
    },

    /*
        Lê o arquivo de log
    */
    readFile: (filename) => {
        return readFile(filename);
    }
}
/*
    Lê o arquivo de games.log
*/
function readFile(filename) {
    return new Promise((resolve, reject) => {
        var fs = require('fs');
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(data.trim().split('\n'));
        });
    })
}

/*
    Processa os dados do arquivo
*/
function parsedFile(lines) {
    let rounds = 0;
    let players = [];
    let root = {};

    lines.forEach((line) => {
        if (line.indexOf('InitGame') !== -1) {
            rounds = getInitGame(root, rounds);
        }

        if (line.indexOf('killed') !== -1) {
            kill(root[`game_${rounds}`], line);
        }

        if (line.indexOf('ClientUserinfoChanged') !== -1) {
            instancePlayers(root[`game_${rounds}`], line);
        }
    });
    return root;
}

/*
    Pega o inicio do game
*/
function getInitGame(root, rounds) {
    root[`game_${++rounds}`] = {
        total_kills: 0,
        players: [],
        kills: {}
    }
    return rounds;
}

function kill(round, line) {
    round.total_kills++;
    getKills(round.kills, line);
}

/*
    Pegas as informações das mortes
*/
function getKills(kills, line) {

    // Verifica se foi <world>
    if (line.indexOf('<world>') !== -1) {
        let killed = line.split('killed')[1].split('by')[0].trim();
        instanceKills(kills, killed);
        kills[killed]--;
    }
    else {
        let killer = line.split('killed')[0].split(':')[3].trim();
        let killed = line.split('killed')[1].split('by')[0].trim();
        let weapon = line.split('killed')[1].split('by')[1].trim();

        instanceKills(kills, killed);
        instanceKills(kills, killer);

        if (killer != killed)
            kills[killer]++;
    }
}

function instanceKills(kills, playername) {
    if (kills[playername] == null) {
        kills[playername] = 0;
    }
}

/*
    Procura jogadores dentro do arquivo
*/
function instancePlayers(round, line) {
    let playername = line.split('n\\')[1].split('\\t')[0];
    getPlayers(round.players, playername);
    instanceKills(round.kills, playername);
}

/*
    Procura jogadores dentro do arquivo
*/
function getPlayers(players, playername) {
    if ((players.indexOf(playername) === -1)) {
        players.push(playername);
    }
}

/*
    Lê o arquivo game.log
*/
function readFile(filename) {
    return new Promise((resolve, reject) => {
        var fs = require('fs');
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(data.trim().split('\n'));
        });
    })
}