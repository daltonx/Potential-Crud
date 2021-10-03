# Potential CRUD
Teste de CRUD
#### Requisitos
* Node.js
	* express
	* mocha
	* supertest
	* moment
	* mysql2
	* sequelize
	* sequelize-cli
* Mysql

#### Preparo **[DOCKER]**

##### Build e inicializacao
```console
docker compose up
```
Na raiz do projeto, o script `docker_migrations.sh` cuida de executar as migracoes de dados apos a inicializacao do mysql(**as cegas**) e antes da inicializacao do app. O script aguarda 30 segundos antes de executar os comandos de migracao do sequelize, para garantir que o mysql ja esteja configurado e em execucao. O **ideal** em um caso como esse eh a execucao de um script que consiga verificar o estado do mysql.

#### Preparo **[MANUAL]**
**Instalando as dependencias:**
```console
npm i
```

##### Banco de Dados
O arquivo `data/config/config.js` abriga as definicoes da conexao com o DB:
```js
module.exports = {
    username: 'root',
    password: 'root',
    database: 'crud_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
}
```

**Criando o banco de dados:**
```console
npx sequelize db:create
```

**Executando as migracoes:**
```console
npx sequelize db:migrate
```

**Executando testes unitarios**
```console
mocha ./tests/tests.js
```

**Iniciando o server**
```console
node app
```

## Modelo
A aplicacao trabalha com um unico modelo, **Desenvolvedor**, que apresenta a estrutura:

| attribute      | type    |
|----------------|---------|
| nome           | varchar |
| sexo           | char    |
| idade          | integer |
| hobby          | varchar |
| datanascimento | date    |

---
Os objetos recebidos e enviados pela API sao padronizados e passam por validacao.


# Rotas

## [GET] /developers?{q}
Lista todos os desenvolvedores ou uma parcela filtrada

*Query String:*

| Field          | Value
|----------------|---------------------------------
| nome        	 | Filtra por nome exato
| sexo           | Filtra por sexo
| idade          | Filtra por idade
| page           | Paginacao

*Resposta:*
```json
[
    {
        "id": 48,
        "nome": "Dalton",
        "sexo": "M",
        "idade": 99,
        "datanascimento": "10/10/9999",
        "hobby": "Hobby"
    }
]
```

## [GET] /developers/{id}
Obtem os dados de um desenvolvedor

*Resposta:*
```json
{
    "id": 4,
    "nome": "Dalton",
    "sexo": "M",
    "idade": 99,
    "datanascimento": "10/10/9999",
    "hobby": "Hobby"
}
```

## [POST] /developers
## [PUT] /developers/{id}
Cria ou atualiza um desenvolvedor

*JSON Body:*
```json
{
    "nome": "Dalton",
    "sexo": "M",
    "idade": 99,
    "datanascimento": "10/10/9999",
    "hobby": "Hobby"
}
```


## [DELETE] /developers/{id}
Exclui o registro de um desenvolvedor por id

# Arquivos
Estrutura definida apenas para demonstracao de arquitetura e metodos, nem todos os elementos possuem muita importancia no funcionamento dessa aplicacao.

### /router.js
Definicao das rotas

### /controllers/developers.js **[DeveloperController]**
Definicao de todas as interacoes da aplicacao com a tabela de desenvolvedores no banco de dados

### /util/dto.js **[DTO]**
Padronizacao e tratamento dos objetos compartilhados entre aplicacao e cliente, utiliza as classes **Validators** e **Casting** para tratar os tipos de dados.

### /util/validators.js **[Validators]**
Fornece os metodos necessarios para validar os tipos em um **DTO**


### /util/casting.js **[Casting]**
Conversao de dados, utilizada aqui para alterar de `dd/mm/yyyy` para `yyyy-mm-dd` o formato das datas e garantir a tipagem correta ao armazenar objetos no DB.