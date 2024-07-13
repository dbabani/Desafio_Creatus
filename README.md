<h1 align="center">Projteto CRUD com rotina de login usando o JWT com o Fastify</h1>


![Badge](https://img.shields.io/badge/Version-1.0.0-yellow?style=for-the-badge&logo=ghost)
![Badge](https://img.shields.io/badge/Typescript-^4.9.5-blue?style=for-the-badge&logo=ghost)
![Badge](https://img.shields.io/badge/Prisma-4.11.0-blue?style=for-the-badge&logo=ghost)
![Badge](https://img.shields.io/badge/Prisma_Client-^4.11.0-blue?style=for-the-badge&logo=ghost)
![Badge](https://img.shields.io/badge/Fastify-^4.14.1-lightgrey?style=for-the-badge&logo=ghost)
![Badge](https://img.shields.io/badge/JWT-^9.0.0-ff69b4?style=for-the-badge&logo=ghost)
![Badge](https://img.shields.io/badge/Status-finished-brightgreen?style=for-the-badge&logo=ghost)

<p align="center">O projeto tem o objetivo de implementar de um sistema CRUD de usuários usando as respectivas tecnologias: <b>Fastify</b>, <b>Prisma</b>,<b>JWT</b> e <b>Vitest</b></p>

## Instalação de dependências

- Typescript

        npm i -D typescript
    
    - Iniciar ts.config

        ```
        npx tsc --init
        ```

- Ts Node Dev

        npm i -D ts-node-dev

- Fastify

        npm i fastify

- Prisma

        npm install prisma --save-dev

- Prisma Client

        npm install @prisma/client

- JWT

        npm i --save jsonwebtoken
  
- Vitest
  ```
     npm install -D vitest
  ```


*Iniciar prisma*

- Podemos iniciar o prisma sem determinar um banco de dados, de forma que virá por padão o definido na CLI
    
    npx prisma init

- Podemos iniciar o prisma com um banco de dados de nossa preferencia

    - Neste caso, estou utilizando MongoDB

        ```
        npx prisma init --datasource-provider mongodb
        ```

# Rotas da aplicação

**Autenticação**

- POST /users/login/
    - Realiza o login, retornando o token `JWT` para uso nas autenticações
        - Obrigatório o envio dos dados `email` e `password` pelo body da aplicação

      
**Usuários**

- POST /users
    - Criação de usuário
        - Obrigatório o envio dos dados `email` e `password` pelo body da aplicação
        
- GET /users
    - Listagem de Usuários
       - Não precisa passar nada pelo body da aplicação

- GET /users/report
    - Gera um relatorio em PDF de todos os usúario que estão na base de dados do Sistema
       - Essa rota deve estar autenticada com o JWT token, que deve ser passado no Bearer Auth da aplicação
          - Um requisito funcional é que o usuário deve ser de nível maior ou igual a 4 
  

        
- UPDATE /users/:idUser
    - Altera os dados do usuário
        - Obrigatório o envio de todos os dados de um Usuário  pelo body da aplicação
            - Caso não seja passado nenhum dos dados, retorna um erro

- DELETE /users/:idUser
    - Exclui o usuário informado nos parametros da rota
        - Deve ser informado no parametro da rota o `id` do usuário que deve ser excluído
        
- GET /users/:idUser
    - Obtém o usuário informado nos parametros da rota
      -  Deve ser informado no parametro da rota o `id` do usuário que deve ser obtido
     


## Features

**Usuários**

- [x] Deve ser possível criar um usuário

- [x] Deve ser possível realizar o Login do usuário e gerar o token JWT

- [x] Deve ser possível alterar os dados do usuário

- [x] Deve ser possível excluir um usuário

- [x] Deve ser possível listar os usuários
  
- [x] Deve ser possível listar um usuário unico  

- [x] Deve ser possivel gerar um PDF, onde contém todos os dados de todos os usuários

- [x] Implementação de Hash de senha
 
