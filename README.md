# challenge-quake

# Quake Log Parser

O projeto constitui em ser um analisador (parser) construido em NodeJS, Pug e Boostratp.

O parser é capaz de ler o arquivo, agrupar os dados de cada jogo, e em cada jogo deve coletar as informações de morte, e dos players.

Ao aplicar o parser sobre o arquivo de log, resultará em um json para cada jogo, como apresentado abaixo:

game_1: {
    total_kills: 45;
    players: ["Dono da bola", "Isgalamido", "Zeh"]
    kills: {
      "Dono da bola": 5,
      "Isgalamido": 18,
      "Zeh": 20
    }
  }

#### Executando o projeto

Para a execução do projeto localmente, siga os comandos abaixo no terminal:

    $ git clone https://github.com/luannevesb/challenge-quake.git
    $ cd challenge-quake
    $ npm install
    $ npm start

###### Observações

- O servidor estará rodando em http://localhost:3000/