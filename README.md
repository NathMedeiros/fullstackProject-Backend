# Desafio-FullStack-backend

## 1 - Sobre

A API de Cadastro de Usuários e Contatos é um sistema que permite realizar operações de criação, consulta, atualização e exclusão de informações de clientes e seus respectivos contatos. Os clientes são registrados com dados como nome completo, e-mail, telefone e data de registro. Os contatos, por sua vez, estão associados aos clientes e possuem informações semelhantes, como nome completo, e-mail, telefone e data de registro. Além das operações básicas de CRUD, a API também oferece um recurso para geração de relatórios contendo os dados dos clientes e seus respectivos contatos. A documentação da API contém informações detalhadas sobre os endpoints disponíveis, as estruturas de dados utilizadas, exemplos de uso e instruções para configuração do ambiente. O objetivo dessa API é proporcionar uma solução simples e eficiente para o gerenciamento de clientes e contatos, garantindo a organização e segurança das informações.

---

## 2 - Tecnologias

Um pouco das tecnologias que foram utilizadas no projeto:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://zod.dev/?id=table-of-contents)
- [Bcryptjs](https://www.npmjs.com/package/bcrypt)

A URL base da aplicação (API LOCAL):
https://localhost:3000/

---

## 3 - Diagrama

Diagrama da API definindo as relações entre as tabelas do banco de dados.

---

## 4 - Instalação e uso

### Requisitos:

- [NodeJS](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com) ou [yarn](https://yarnpkg.com)
- Banco de dados [PostgreSQL](https://www.postgresql.org)

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn ou npm install
```

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
env.example -> .env
```

Configure as variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
ou
npx typeorm migration:run -c src/data-source.ts

```

Para rodar o servidor localmente:

```
yarn dev ou npm run dev
```

---

## 5 - Endpoints

## Documentação Swagger - http://localhost:3000/api-docs/

| Método | Rota        | Descrição                                      |
| ------ | ----------- | ---------------------------------------------- |
| POST   | /users      | Criação de um cliente.                         |
| PATCH  | /users/id   | Edita o cliente.                               |
| DELETE | /users/id   | Deleta o cliente.                              |
| POST   | /login      | Retorna o token.                               |
| POST   | /contact    | Cria um contato para o cliente.                |
| GET    | /contact    | Lista todos os contatos do clientecliente.     |
| GET    | /contact/id | Retorna o contato específico do cliente.       |
| PATCH  | /contact/id | Edita o contato específico do cliente.         |
| DELETE | /contact/id | Deleta o contato específico do cliente.        |
| GET    | /report     | pdf - relatorio de contatos do cliente logado. |
| GET    | /api-docs/  | documentação swagger                           |

---

#### As requisições podem ser testadas em programas como o [Insomnia](https://insomnia.rest/download), [Postman](https://www.postman.com), etc!

---

### CREATE CLIENT

### `/users`

#### Não é necessário autenticação

#### Todos os campos são obrigatórios

- name - STRING, LENGTH(45)
- email - STRING, EMAIL, LENGTH(45)
- password - STRING, LENGTH(20)
- phone - STRING, LENGTH(12)

### Retorno esperado

**STATUS 201**

```json
{
  "id": "39e60115-0aa2-4064-8083-b6c3ec8f9b2f",
  "name": "Nathalia",
  "email": "nathalia@gmail.com",
  "phone": "27925555574",
  "createdAt": "2023-06-01"
}
```

---

### LOGIN

### `/login`

### Não é necessário autenticação

### Todos os campos são obrigatórios

- email - STRING
- password - STRING

### Retorno esperado

**STATUS 200**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvdWdsYXNwYXRoQGdtYWlsLmNvbSIsImlhdCI6MTY4NDk4NDY1NiwiZXhwIjoxNjg1MDcxMDU2LCJzdWIiOiI4MTkyMTFhMy00NThjLTQ3NjktOTcxOS0xMmM2NTdhYTNkMzQifQ.VC4dYCkPL2b3Lxjvd-VK8gd9bcP7pUcdA113Ejmk_Kc"
}
```

---

### EDIT USER

### `/users/id`

### É necessário autenticação

### Campos opcionais

- name: STRING, LENGTH(45)
- email: STRING, LENGTH(45)
- password: STRING, LENGTH(20)
- phone - STRING, LENGTH(12)

### Retorno esperado

**STATUS 200**

```json
{
  "id": "997f51dda5a-42ab-aa4a-da6a6d2b4ad6",
  "name": "Nathalia Medeiros",
  "email": "nathalia@gmail.com",
  "phone": "27995555574",
  "createdAt": "2023-06-01"
}
```

---

### DELETE CLIENT

### `/users/id`

### É necessário autenticação

### Retorno esperado

**STATUS 204**

---

### CREATE CONTACT

### `/contact`

### É necessário autenticação

### Campos obrigatórios

- full_name - STRING, LENGTH(45)
- email - STRING, EMAIL, LENGTH(45)
- phone - STRING, LENGTH(12)

### Retorno esperado

**STATUS 201**

```json
{
	"id": "47d00323-2189-4c-a99e-df9659c6d192",
	"full_name": "teste de contato",
	"email": "contato@gmail.com",
	"phone": "12345678987",
	"createdAt": "2023-06-01"
	"client": {
		"id": "819211a3-8c-4769-9719-12c657aa3d34",
		"name": "Usuário",
		"email": "usuário@gmail.com",
		"phone": "27998555574",
		"createdAt": "2023-06-01"
   }
}
```

---

### LIST CONTACTS

### `/contact`

### É necessário autenticação

### Retorno esperado

**STATUS 200**

```json

	{
		"id": "9136da3e-2025-48c6-80e9-17c56fcda4a6",
		"full_name": "teste de contato",
		"email": "contato1@gmail.com",
		"phone": "12345678987",
		"createdAt": "2023-06-01"
	},
	{
		"id": "3e0b732d-12c5-4cde-a3bc-0f5f76504509",
		"full_name": "teste de contato",
		"email": "contato2@gmail.com",
		"phone": "12345678987",
		"createdAt": "2023-06-01"
	}
```

---

### LIST CONTACT PER ID

### `/contact/id`

### É necessário autenticação

Retorna um único contato do usuário passado na URL

### Retorno esperado

**STATUS 200**

```json
{
	"id": "47d00323-2189-4c-a99e-df9659c6d192",
	"full_name": "teste de contato",
	"email": "contato@gmail.com",
	"phone": "12345678987",
	"createdAt": "2023-06-01"
	"client": {
		"id": "819211a3-8c-4769-9719-12c657aa3d34",
		"name": "Usuário",
		"email": "usuário@gmail.com",
		"phone": "27998555574",
		"createdAt": "2023-05-25"
   }
}
```

---

### EDIT CONTACT PER ID

### `/contact/id`

### É necessário autenticação

Atualiza o contato passado na URL

### Campos opcionais

- name: STRING, LENGTH(45)
- email: STRING, LENGTH(45)
- phone - STRING, LENGTH(12)

### Retorno esperado

**STATUS 200**

```json
{
	"id": "47d00323-2189-4c-a99e-df9659c6d192",
	"full_name": "teste de contato",
	"email": "contato@gmail.com",
	"phone": "12345678987",
  	"createdAt": "2023-06-01"
	"client": {
		"id": "819211a3-8c-4769-9719-12c657aa3d34",
		"name": "Usuário",
		"email": "usuário@gmail.com",
		"phone": "27998555574",
		"createdAt": "2023-05-25"
   }
}
```

---

### DELETE CONTACT PER ID

### `/contact/id`

### É necessário autenticação

Deleta o contato passado na URL

### Retorno esperado

**STATUS 204**
