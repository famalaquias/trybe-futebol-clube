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





