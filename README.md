# ⚽️🏆 Trybe Futebol Clube ⚽️🏆

![TFC](https://user-images.githubusercontent.com/98343640/196181570-4e4ccab0-6ca3-4e9f-97df-ca244e0f5d18.png)

## :page_with_curl: Sobre

O projeto TFC - Trybe Futebol Clube é um informativo sobre classificação e partidas de futebol. 
Nesse projeto foi desenvolvido uma API onde é possível obeter dados sobre os usuários, os times, as partidas e os placares. Foi construído um back-end dockerizado utilizando modelagem de dados através do Sequelize. Seu desenvolvimento deve respeitar regras de negócio de um front-end já estruturado.

## :man_technologist: Habilidades Desenvolvidas

* Construído com Node.js, Express, MySQL, Docker, TypeScript e Sequelize
* Utilizando a Linguagem de Programação Orientada a Objetos - POO e os Princípios SOLID
* Teste de integração com Mocha, Chai e Sinon
* Aplicação da Arquitetura de Software - Camada MSC - Modelo, Serviço e de Controladores
* Criando uma API RESTful


## :hammer_and_wrench: Ferramentas Utilizadas

* Docker
* Node.js
* Express.js
* MySQL
* React
* TypeScript
* Programação Orientada a Objetos (OOP)
* SOLID
* Sequelize
* Chai
*Sinon

## :female_detective: Instruções de Instalação e Execução
Para rodar a aplicação é necessário ter o Git, o Docker, o Node e o Docker Compose instalados na sua máquina. O Docker Compose precisa estar na versão 1.29.2 ou superior e o Node na versão 16.14.0.

### 1 - Clone o repositório e entre na pasta do projeto:

```sh
git clone git@github.com:famalaquias/trybe-futebol-clube.git && cd trybe-futebol-clube
```

### 2 - Execute o Docker container:

```sh
npm run compose:up
```

### 3 - Acesse a aplicação:
A aplicação do Back-End está na porta 3001, a aplicação do Front-End está na porta 3000 e o banco de dados MySQL na porta 3002.

### 4 - Cobertura de Testes de Integração:
Para rodar os testes de integração execute o comando abaixo no terminal do projeto.

```sh
cd ./app/backend && npm run test:coverage
```

## :gear: Endpoints

![classificação](https://user-images.githubusercontent.com/98343640/196237359-1126f295-4d09-4c5f-9dc5-7c8c1bb498c2.png)

#### Login

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Realiza login do usuário e retorna um token para autenticação | http://localhost:3001/login |
| `GET` | Avalia se o usuário é o administrador e recebe um header com parâmetro authorization | http://localhost:3001/login/validate |

Na requisição ` POST`, é necessário informar o seguinte JSON:

```
{
  "email": "admin@admin.com",
  "password": "secret_admin"
}
```


#### Times
| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna todos os times do campeonato que foram cadastrados | http://localhost:3001/teams |
| `GET` | Retorna um time específico com base em seu ID | http://localhost:3001/teams/:id |


#### Partidas
| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna todas as partidas do campeonato cadastradas | http://localhost:3001/matches |
| `POST` | Criação de uma nova partida | http://localhost:3001/matches |
| `PATCH` | Atualiza uma partida em andamento baseada em seu ID | http://localhost:3001/matches/:id |
| `PATCH` | Finaliza uma partida em andamento baseada em seu ID | http://localhost:3001/matches/:id/finish |

Na requisição `GET` é possível filtrar as partidas em andamento e partidas finalizadas da seguinte maneira:

```
http://localhost:3001/matches?inProgress=true
http://localhost:3001/matches?inProgress=false
```
###

Na requisção `POST` é necessaŕio informar um JSON no seguinte formato:

```
{
  "homeTeam": 16, // O valor deve ser o ID do time
  "awayTeam": 8, // O valor deve ser o ID do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}
```

###

Na requisição `PATCH` é necessário informar um JSON no seguinte formato:

```
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```


#### Placar/Classificação
| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna a classificação geral com base nas partidas jogadas | http://localhost:3001/leaderboard |
| `GET` | Retorna a classificação dos times mandantes | http://localhost:3001/leaderboard/home |
| `GET` | Retorna a classificação dos times visitantes | http://localhost:3001/leaderboard/away |






