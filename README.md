<p align="center">
  <img src=".github/logo.svg" height="80px" alt="Upcast">
</p>
<br>
<br>

# Upcast
Este repositório faz parte do projeto Upcast, uma plataforma fictícia de podcasts, semelhante ao Spotify e que será utilizada pelo aplicativo web **Upcast**.

## Visão geral
O objetivo principal da API é dar o poder ao usuário de consumir podcasts em forma de áudio, seguir programas, consultar categorias e criar sua lista de reprodução pessoal. Além disso, o usuário poderá personalizar perfis e programas com miniaturas.

## Recursos
- Criar conta de usuário;
- Adicionar miniatura de usuário;
- Gerar autorização com JWT;
- Recuperação de conta com e-mail automático;
- Criar programas de podcasts;
- Adicionar miniatura de programa;
- Criar episódios;
- Enviar arquivos de áudio para episódios;
- Criar playlists e adicionar episódios a ela;
- Pesquisar usuários, programas, categorias, episódios e playlists;
- Encontrar categorias;
- Filtrar programas por categoria;
- Seguir programas;
- HATEOAS "_links".

## Diagrama ER - MySQL
![Diagrama ER](.github/model.png)

## Instalação
### Pré-requisitos
Para o projeto ser executado, é necessário ter o NodeJS 10+ e MySQL Community 8+ instalados em sua máquina. E para usar o banco de dados, é necessário ter uma conta local.

### Início
**Baixando o repositório**
```
$ git clone https://github.com/willaug/upcast-api.git

$ cd upcast-api
```

**Instalação de dependências**
```
$ npm i
```

### Variáveis de ambiente
Informações sensíveis de banco de dados, e-mails, endereços, chave secreta JWT, período de expiração de autorização, caracteres aceitos em NanoID e porta são configuráveis e estão no arquivo **.env** na pasta raiz.

### Criação do banco de dados
Através do Sequelize ORM é possível executar a criação de banco de dados, migrations e seed através de comandos no terminal. Para criar todo o ambiente necessário e adicionar o usuário principal:

```
$ npx sequelize db:create

$ npx sequelize db:migrate

$ npx sequelize db:seed:all
```

### Executando o servidor
**Para desenvolvimento (Com Nodemon):**
```
$ npm run dev
```

**Para produção:**
```
$ npm run start
```

## Rotas
Para ter maior compatibilidade com diversos aplicativos, todas as respostas possuem **códigos de status HTTP** e **respostas no formato JSON**.

URL base padrão:

### Pesquisa
- **Obter pesquisa:**
  - Endpoint: `/search`
  - Query: `query` (Obrigatório) e `type` (Opcional)
  - Método: `GET`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": {
        "users": [
          {
            "uid": "UXfLYYE5BYsH2GwCY392",
            "username": "Upcast Official",
            "url_photo": "/images/users/default.svg"
          }
        ],
        "categories": [],
        "shows": [],
        "episodes": [],
        "playlists": []
      },
      "_links": [
        {
          "href": "http://127.0.0.1:3000/search?query=up&type=all",
          "rel": "search_all",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/search?query=up&type=users",
          "rel": "search_users",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/search?query=up&type=categories",
          "rel": "search_categories",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/search?query=up&type=shows",
          "rel": "search_shows",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/search?query=up&type=episodes",
          "rel": "search_episodes",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/search?query=up&type=playlists",
          "rel": "search_playlists",
          "method": "GET"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      "É necessário digitar algo para buscar."
      ```

      ou

      ```json
      "Tipo de busca inválido."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

### Usuário
- **Obter todos os usuários:**
  - Endpoint: `/users`
  - Método: `GET`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
      {
        "response": [
          {
            "uid": "S3G9QEqkiTKEdOj0p2ry",
            "username": "Autor anônimo",
            "url_photo": "/images/users/default.svg"
          },
          {
            "uid": "UXfLYYE5BYsH2GwCY392",
            "username": "Upcast Official",
            "url_photo": "/images/users/default.svg"
          }
        ],
        "_links": [
          {
            "href": "http://127.0.0.1:3000/users",
            "rel": "post_create_user",
            "method": "POST"
          }
        ]
      }
    ```
  - Erro:
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

- **Criar usuário:**
  - Endpoint: `/users`
  - Método: `POST`
  - Campos: `username, email, password`
  - Sucesso:
    - Status: `201`;
    - Resposta:
    ```json
    {
      "response": "Seja bem-vindo(a) Lorem Ipsum",
      "_links": [
        {
          "href": "http://127.0.0.1:3000/users/GdizGlbWamHjTYRdbbOf",
          "rel": "get_user",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/users/GdizGlbWamHjTYRdbbOf/playlists",
          "rel": "get_user_playlists",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/users/GdizGlbWamHjTYRdbbOf/shows",
          "rel": "get_user_shows",
          "method": "GET"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      [
        "É necessário possuir um nome de usuário",
        "É necessário possuir um e-mail válido",
        "Adicione uma senha de pelo menos 8 caracteres"
      ]
      ```

      ou

      ```json
      "E-mail já existente!"
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

- **Obter usuário específico:**
  - Endpoint: `/users/:uid`
  - Parâmetro: `uid`
  - Método: `GET`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": {
        "uid": "UXfLYYE5BYsH2GwCY392",
        "username": "Upcast Official",
        "url_photo": "/images/users/default.svg",
        "createdAt": "2021-04-22T15:44:09.000Z"
      },
      "_links": [
        {
          "href": "http://127.0.0.1:3000/users",
          "rel": "get_all_users",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/users/UXfLYYE5BYsH2GwCY392/playlists",
          "rel": "get_user_playlists",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/users/UXfLYYE5BYsH2GwCY392/shows",
          "rel": "get_user_shows",
          "method": "GET"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      "Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?"
      ```
    - Status: `404`;
      - Resposta:
      ```json
      "Usuário não encontrado."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

- **Obter programas de um usuário específico:**
  - Endpoint: `/users/:uid/shows`
  - Parâmetro: `uid`
  - Método: `GET`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": [
        {
          "uid": "UhPETxPfk1MYAMV80am6",
          "title": "MyCAST",
          "description": null,
          "url_photo": "/images/shows/default.svg"
        }
      ],
      "_links": [
        {
          "href": "http://127.0.0.1:3000/users",
          "rel": "get_all_users",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/users/UXfLYYE5BYsH2GwCY392",
          "rel": "get_user",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/users/UXfLYYE5BYsH2GwCY392/playlists",
          "rel": "get_user_playlists",
          "method": "GET"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      "Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?"
      ```
    - Status: `404`;
      - Resposta:
      ```json
      "Usuário não encontrado."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

- **Obter playlists de um usuário específico:**
  - Endpoint: `/users/:uid/playlists`
  - Parâmetro: `uid`
  - Método: `GET`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": [
        {
          "uid": "iRvHq06vbYkNXOA4gbTy",
          "title": "Ouvir enquanto trabalho"
        }
      ],
      "_links": [
        {
          "href": "http://127.0.0.1:3000/users",
          "rel": "get_all_users",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/users/UXfLYYE5BYsH2GwCY392",
          "rel": "get_user",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/users/UXfLYYE5BYsH2GwCY392/shows",
          "rel": "get_user_shows",
          "method": "GET"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      "Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?"
      ```
    - Status: `404`;
      - Resposta:
      ```json
      "Usuário não encontrado."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

### Conta do usuário
- **Autenticação:**
  - Endpoint: `/authenticate`
  - Campos: `email, password`
  - Método: `POST`
  - Sucesso:
    - Status: `200`;
    - Resposta: (Token de JWT)
    ```json
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJVWGZMWVlFNUJZc0gyR3dDWTM5MiIsImlhdCI6MTYxOTExOTE5NSwiZXhwIjoxNjE5MTM3MTk1fQ.CEnLitkav_hUCkshDDnAtqR0RtQNDNI_1slYEGghapw"
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      [
        "É necessário inserir um e-mail válido",
        "É necessário inserir uma senha de pelo menos 8 caracteres"
      ]
      ```
    - Status: `401`;
      - Resposta:
      ```json
      "Usuário não encontrado. Que tal tentar novamente?"
      ```

      ou

      ```json
      "Senha inválida"
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

- **Obter informações da conta:**
  - Endpoint: `/account`
  - Método: `GET`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": {
        "uid": "UXfLYYE5BYsH2GwCY392",
        "username": "Upcast Official",
        "url_photo": "/images/users/default.svg",
        "email": "contact@upcast.com",
        "createdAt": "2021-04-22T15:44:09.000Z",
        "updatedAt": "2021-04-22T19:28:11.000Z"
      },
      "_links": [
        {
          "href": "http://127.0.0.1:3000/account",
          "rel": "patch_update_account",
          "method": "PATCH"
        },
        {
          "href": "http://127.0.0.1:3000/account",
          "rel": "delete_account",
          "method": "DELETE"
        }
      ]
    }
    ```
  - Erro:
    - Status: `401`;
      - Resposta:
      ```json
      "É necessário estar autenticado para continuar."
      ```
    - Status: `403`;
      - Resposta:
      ```json
      "Sua autorização expirou, autentique-se novamente."
      ```

      ou

      ```json
      "Sua autorização é inválida, autentique-se."
      ```

      ou

      ```json
      "Sua autorização não pertence a nenhum usuário, autentique-se novamente."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

      ou

      ```json
      "Ocorreu um erro na verificação de token. Tente novamente mais tarde."
      ```

- **Alterar informações da conta:**
  - Endpoint: `/account`
  - Campos: `username, email, photo (Upload), action, newPassword, confirmPassword, currentPassword` (Opcionais)
  - Método: `PATCH`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": "Alterações concluídas com sucesso",
      "_links": [
        {
          "href": "http://127.0.0.1:3000/account",
          "rel": "get_account",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/account",
          "rel": "delete_account",
          "method": "DELETE"
        }
      ]
    }
    ```

    ou

    ```json
    {
      "response": "Imagem adicionada com sucesso",
      "_links": [
        {
          "href": "http://127.0.0.1:3000/account",
          "rel": "get_account",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/account",
          "rel": "delete_account",
          "method": "DELETE"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      [
        "Redefina um nome de usuário com pelo menos 10 caracteres",
        "Para alterar o email, é necessário o novo ser um e-mail válido",
        "A nova senha deve ser de pelo menos 8 caracteres",
        "Para adicionar uma senha, é necessário confirmar a atual"
      ]
      ```
    - Status: `401`;
      - Resposta:
      ```json
      "A senha atual informada está incorreta"
      ```
    - Status: `403`;
      - Resposta:
      ```json
      "Sua autorização expirou, autentique-se novamente."
      ```

      ou

      ```json
      "Sua autorização é inválida, autentique-se."
      ```

      ou

      ```json
      "Sua autorização não pertence a nenhum usuário, autentique-se novamente."
      ```
    - Status: `413`;
      - Resposta:
      ```json
      "Envie uma imagem com até 2 MB"
      ```
    - Status: `415`;
      - Resposta:
      ```json
      "Apenas imagens em png, jpeg e jpg são suportadas"
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

      ou

      ```json
      "Ocorreu um erro na verificação de token. Tente novamente mais tarde."
      ```

- **Deletar conta:**
  - Endpoint: `/account`
  - Método: `DELETE`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": "Sua conta foi deletada e não poderá ser recuperada. Até breve, Upcast Official!",
      "_links": [
        {
          "href": "http://127.0.0.1:3000/account",
          "rel": "get_account",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/account",
          "rel": "delete_account",
          "method": "DELETE"
        }
      ]
    }
    ```
  - Erro:
    - Status: `403`;
      - Resposta:
      ```json
      "Sua autorização expirou, autentique-se novamente."
      ```

      ou

      ```json
      "Sua autorização é inválida, autentique-se."
      ```

      ou

      ```json
      "Sua autorização não pertence a nenhum usuário, autentique-se novamente."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

      ou

      ```json
      "Ocorreu um erro na verificação de token. Tente novamente mais tarde."
      ```

### Categoria
- **Obter todas as categorias:**
  - Endpoint: `/categories`
  - Método: `GET`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": [
        {
          "id": 1,
          "name": "Bate-papo e entrevista",
          "slug": "bate-papo-e-entrevista"
        },
        {
          "id": 2,
          "name": "Conteúdo adulto",
          "slug": "conteudo-adulto"
        },
        {
          "id": 3,
          "name": "Convívio e espiritualidade",
          "slug": "convivio-e-espiritualidade"
        },
        {
          "id": 4,
          "name": "Educação e formação",
          "slug": "educacao-e-formacao"
        },
        {
          "id": 5,
          "name": "Geral",
          "slug": "geral"
        },
        {
          "id": 6,
          "name": "Infantil",
          "slug": "infantil"
        },
        {
          "id": 7,
          "name": "Notícia e informação",
          "slug": "noticia-e-informacao"
        },
        {
          "id": 8,
          "name": "Saúde e bem-estar",
          "slug": "saude-e-bem-estar"
        },
        {
          "id": 9,
          "name": "Storytelling",
          "slug": "storytelling"
        }
      ]
    }
    ```
  - Erro:
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

- **Obter categoria específica:**
  - Endpoint: `/categories/:slug`
  - Parâmetros: `slug`
  - Método: `GET`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": {
        "id": 1,
        "name": "Bate-papo e entrevista",
        "slug": "bate-papo-e-entrevista"
      },
      "_links": [
        {
          "href": "http://127.0.0.1:3000/categories",
          "rel": "get_all_categories",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/categories/bate-papo-e-entrevista/shows",
          "rel": "get_category_shows",
          "method": "GET"
        }
      ]
    }
    ```
  - Erro:
    - Status: `404`;
      - Resposta:
      ```json
      "Categoria não encontrada."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

- **Programas de categoria específica:**
  - Endpoint: `/categories/:slug/shows`
  - Parâmetros: `slug`
  - Método: `GET`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": [
        {
          "uid": "exFgjX9wZNcR06FjswCk",
          "title": "MyCAST",
          "url_photo": "/images/shows/default.svg",
          "author": {
            "uid": "DBIJkgb9mWGLEQayAgI7",
            "url_photo": "/images/users/default.svg",
            "username": "Lorem Ipsum"
          }
        }
      ],
      "_links": [
        {
          "href": "http://127.0.0.1:3000/categories",
          "rel": "get_all_categories",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/categories/bate-papo-e-entrevista",
          "rel": "get_category",
          "method": "GET"
        }
      ]
    }
    ```
  - Erro:
    - Status: `404`;
      - Resposta:
      ```json
      "Categoria não encontrada."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

### Recuperação de senha
- **Enviar pedido de recuperação:**
  - Endpoint: `/password-reset`
  - Campos: `email`
  - Método: `POST`
  - Sucesso:
    - Status: `201`,
    - Resposta:
    ```json
    "Pedido de recuperação criado com sucesso, verifique seu e-mail."
    ```
  - Erro:
    - Status: `400`
      - Resposta:
      ```json
      [
        "É necessário possuir um e-mail válido"
      ]
      ```
    - Status: `403`
      - Resposta:
      ```json
      "O e-mail informado não pertence a uma conta."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

- **Verificar pedido de recuperação:**
  - Endpoint: `/password-reset/:uid`
  - Parâmetros: `uid`
  - Método: `GET`
  - Sucesso:
    - Status: `204`,
    - Resposta: `Sem resposta`
  - Erro:
    - Status: `400`
      - Resposta:
      ```json
      "Token de recuperação de senha não encontrado."
      ```
    - Status: `403`
      - Resposta:
      ```json
      "Token de recuperação de senha já utilizado."
      ```

      ou

      ```json
      "Token de recuperação de senha expirado."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

- **Adicionar nova senha:**
  - Endpoint: `/password-reset/:uid`
  - Parâmetros: `uid`
  - Campos: `password, confirmPassword`
  - Método: `PATCH`
  - Sucesso:
    - Status: `200`,
    - Resposta:
    ```json
    "Senha alterada com sucesso."
    ```
  - Erro:
    - Status: `400`
      - Resposta:
      ```json
      "Token de recuperação de senha não encontrado."
      ```

      ou

      ```json
      [
        "Defina uma nova senha com pelo menos 8 caracteres",
        "A confirmação de senha deve ser igual a definição de nova senha"
      ]
      ```
    - Status: `403`
      - Resposta:
      ```json
      "Token de recuperação de senha já utilizado."
      ```

      ou

      ```json
      "Token de recuperação de senha expirado."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

### Programa
- **Obter todos os programas:**
  - Endpoint: `/shows`
  - Método: `GET`
  - Sucesso:
    - Status: `200`,
    - Resposta:
    ```json
    {
      "response": [
        {
          "uid": "exFgjX9wZNcR06FjswCk",
          "title": "MyCAST",
          "url_photo": "/images/shows/default.svg",
          "author": {
            "uid": "DBIJkgb9mWGLEQayAgI7",
            "username": "Lorem Ipsum"
          },
          "category": {
            "name": "Bate-papo e entrevista",
            "slug": "bate-papo-e-entrevista"
          }
        },
        {
          "uid": "Mkyew76RmodMBJ3a3dlD",
          "title": "Desenvolvimento de APIs",
          "url_photo": "/images/shows/default.svg",
          "author": {
            "uid": "DBIJkgb9mWGLEQayAgI7",
            "username": "Lorem Ipsum"
          },
          "category": {
            "name": "Educação e formação",
            "slug": "educacao-e-formacao"
          }
        }
      ],
      "_links": [
        {
          "href": "http://127.0.0.1:3000/shows",
          "rel": "post_create_show",
          "method": "POST"
        }
      ]
    }
    ```
  - Erro:
      - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

- **Criar programa:**
  - Endpoint: `/shows`
  - Método: `POST`
  - Campos: `title, category, description (Opcional)`
  - Sucesso:
    - Status: `201`;
    - Resposta:
    ```json
    {
      "response": "Programa criado com sucesso.",
      "_links": [
        {
          "href": "http://127.0.0.1:3000/shows/LuGGHvnMQhb5C0FbN2pC",
          "rel": "get_show",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/shows/LuGGHvnMQhb5C0FbN2pC",
          "rel": "patch_update_show",
          "method": "PATCH"
        },
        {
          "href": "http://127.0.0.1:3000/shows/LuGGHvnMQhb5C0FbN2pC",
          "rel": "delete_show",
          "method": "DELETE"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      [
        "Adicione um título de, pelo menos, 3 caracteres",
        "É necessário adicionar uma categoria válida"
      ]
      ```

      ou

      ```json
      "Categoria inexistente!"
      ```
    - Status: `403`;
      - Resposta:
      ```json
      "Sua autorização expirou, autentique-se novamente."
      ```

      ou

      ```json
      "Sua autorização é inválida, autentique-se."
      ```

      ou

      ```json
      "Sua autorização não pertence a nenhum usuário, autentique-se novamente."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

- **Obter programa específico:**
  - Endpoint: `/shows/:uid`
  - Parâmetro: `uid`
  - Método: `GET`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": {
        "uid": "exFgjX9wZNcR06FjswCk",
        "title": "MyCAST",
        "url_photo": "/images/shows/default.svg",
        "description": null,
        "createdAt": "2021-04-24T03:39:27.000Z",
        "author": {
          "uid": "DBIJkgb9mWGLEQayAgI7",
          "username": "Lorem Ipsum",
          "url_photo": "/images/users/default.svg"
        },
        "category": {
          "name": "Bate-papo e entrevista",
          "slug": "bate-papo-e-entrevista"
        },
        "episodes": []
      },
      "_links": [
        {
          "href": "http://127.0.0.1:3000/shows/exFgjX9wZNcR06FjswCk",
          "rel": "patch_update_show",
          "method": "PATCH"
        },
        {
          "href": "http://127.0.0.1:3000/shows/exFgjX9wZNcR06FjswCk",
          "rel": "delete_show",
          "method": "DELETE"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      "Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?"
      ```
    - Status: `404`;
      - Resposta:
      ```json
      "Programa não encontrado."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

- **Alterar informações de um programa:**
  - Endpoint: `/shows/:uid`
  - Parâmetro: `uid`
  - Campos: `title, description, photo (Upload), category` (Opcionais)
  - Método: `PATCH`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": "Alterações concluídas com sucesso",
      "_links": [
        {
          "href": "http://127.0.0.1:3000/shows/exFgjX9wZNcR06FjswCk",
          "rel": "get_show",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/shows/exFgjX9wZNcR06FjswCk",
          "rel": "delete_show",
          "method": "DELETE"
        }
      ]
    }
    ```

    ou

    ```json
    {
      "response": "Imagem adicionada com sucesso",
      "_links": [
        {
          "href": "http://127.0.0.1:3000/shows/exFgjX9wZNcR06FjswCk",
          "rel": "get_show",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/shows/exFgjX9wZNcR06FjswCk",
          "rel": "delete_show",
          "method": "DELETE"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      "Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?"
      ```

      ou

      ```json
      [
        "Ao redefinir um título deve-se ter, pelo menos, 3 caracteres",
        "É necessário redefinir uma categoria válida"
      ]
      ```

      ou

      ```json
      "A categoria escolhida não existe."
      ```

      ou

      ```json
      "Programa não encontrado."
      ```

    - Status: `403`;
      - Resposta:
      ```json
      "Você não tem permissão para alterar este programa."
      ```

      ou

      ```json
      "Sua autorização é inválida, autentique-se."
      ```

      ou

      ```json
      "Sua autorização não pertence a nenhum usuário, autentique-se novamente."
      ```
    - Status: `406`;
      - Resposta:
      ```json
      "O programa não possui uma imagem definida"
      ```
    - Status: `413`;
      - Resposta:
      ```json
      "Envie uma imagem com até 2 MB"
      ```
    - Status: `415`;
      - Resposta:
      ```json
      "Apenas imagens em png, jpeg e jpg são suportadas"
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

      ou

      ```json
      "Ocorreu um erro na verificação de token. Tente novamente mais tarde."
      ```

- **Deletar um programa:**
  - Endpoint: `/shows/:uid`
  - Parâmetro: `uid`
  - Método: `DELETE`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": "O programa e seus episódios foram deletados e não poderão ser recuperados.",
      "_links": [
        {
          "href": "http://127.0.0.1:3000/shows/exFgjX9wZNcR06FjswCk",
          "rel": "get_show",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/shows/exFgjX9wZNcR06FjswCk",
          "rel": "patch_update_show",
          "method": "PATCH"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      "Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?"
      ```

      ou
      
      ```json
      "Programa não encontrado."
      ```

    - Status: `403`;
      - Resposta:
      ```json
      "Você não tem permissão para alterar este programa."
      ```

      ou

      ```json
      "Sua autorização é inválida, autentique-se."
      ```

      ou

      ```json
      "Sua autorização não pertence a nenhum usuário, autentique-se novamente."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

      ou

      ```json
      "Ocorreu um erro na verificação de token. Tente novamente mais tarde."
      ```

- **Estou seguindo o programa?:**
- Endpoint: `/shows/:uid/following`
  - Parâmetro: `uid`
  - Método: `GET`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": false,
      "_links": [
        {
          "href": "http://127.0.0.1:3000/shows/LuGGHvnMQhb5C0FbN2pC/follow",
          "rel": "post_follow_show",
          "method": "POST"
        },
        {
          "href": "http://127.0.0.1:3000/shows/LuGGHvnMQhb5C0FbN2pC/followers",
          "rel": "get_follower_count_show",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/shows/LuGGHvnMQhb5C0FbN2pC/follow",
          "rel": "delete_follow_show",
          "method": "DELETE"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      "Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?"
      ```

      ou
      
      ```json
      "O programa não existe."
      ```

    - Status: `403`;
      - Resposta:
      ```json
      "Sua autorização é inválida, autentique-se."
      ```

      ou

      ```json
      "Sua autorização não pertence a nenhum usuário, autentique-se novamente."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

      ou

      ```json
      "Ocorreu um erro na verificação de token. Tente novamente mais tarde."
      ```

- **Quantos seguidores o programa possui?:**
- Endpoint: `/shows/:uid/followers`
  - Parâmetro: `uid`
  - Método: `GET`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": 0,
      "_links": [
        {
          "href": "http://127.0.0.1:3000/shows/LuGGHvnMQhb5C0FbN2pC/follow",
          "rel": "post_follow_show",
          "method": "POST"
        },
        {
          "href": "http://127.0.0.1:3000/shows/LuGGHvnMQhb5C0FbN2pC/following",
          "rel": "get_following_show",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/shows/LuGGHvnMQhb5C0FbN2pC/follow",
          "rel": "delete_follow_show",
          "method": "DELETE"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      "Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?"
      ```

      ou
      
      ```json
      "O programa não existe."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

- **Seguir programa:**
- Endpoint: `/shows/:uid/follow`
  - Parâmetro: `uid`
  - Método: `POST`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": "Você começou a seguir este programa.",
      "_links": [
        {
          "href": "http://127.0.0.1:3000/shows/LuGGHvnMQhb5C0FbN2pC/follow",
          "rel": "delete_follow_show",
          "method": "DELETE"
        },
        {
          "href": "http://127.0.0.1:3000/shows/LuGGHvnMQhb5C0FbN2pC/following",
          "rel": "get_following_show",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/shows/LuGGHvnMQhb5C0FbN2pC/followers",
          "rel": "get_follower_count_show",
          "method": "GET"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      "Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?"
      ```

      ou
      
      ```json
      "O programa que você quer seguir não existe."
      ```

    - Status: `403`;
      - Resposta:
      ```json
      "Sua autorização é inválida, autentique-se."
      ```

      ou

      ```json
      "Sua autorização não pertence a nenhum usuário, autentique-se novamente."
      ```
    - Status: `406`;
      - Resposta:
      ```json
      "Você já segue este programa."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

      ou

      ```json
      "Ocorreu um erro na verificação de token. Tente novamente mais tarde."
      ```

- **Deixar de seguir programa:**
- Endpoint: `/shows/:uid/follow`
  - Parâmetro: `uid`
  - Método: `DELETE`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": "Você deixou de seguir este programa.",
      "_links": [
        {
          "href": "http://127.0.0.1:3000/shows/LuGGHvnMQhb5C0FbN2pC/follow",
          "rel": "post_follow_show",
          "method": "POST"
        },
        {
          "href": "http://127.0.0.1:3000/shows/LuGGHvnMQhb5C0FbN2pC/following",
          "rel": "get_following_show",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/shows/LuGGHvnMQhb5C0FbN2pC/followers",
          "rel": "get_follower_count_show",
          "method": "GET"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      "Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?"
      ```

      ou
      
      ```json
      "O programa que você quer deixar de seguir não existe."
      ```

    - Status: `403`;
      - Resposta:
      ```json
      "Sua autorização é inválida, autentique-se."
      ```

      ou

      ```json
      "Sua autorização não pertence a nenhum usuário, autentique-se novamente."
      ```
    - Status: `406`;
      - Resposta:
      ```json
      "Você já segue este programa."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

      ou

      ```json
      "Ocorreu um erro na verificação de token. Tente novamente mais tarde."
      ```

### Episódio
- **Obter todos os episódios:**
- Endpoint: `/episodes`
- Método: `GET`
- Sucesso:
  - Status: `200`;
  - Resposta:
  ```json
  {
    "response": [
      {
        "uid": "kjCSQ0qXdcDkuSX7EK6V",
        "title": "Episódio 2",
        "duration": "00:00:00",
        "show": {
          "uid": "LuGGHvnMQhb5C0FbN2pC",
          "title": "Conversa com desenvolvedores"
        }
      },
      {
        "uid": "rgg0D1Hysal0LWtkzMDD",
        "title": "Episódio 1",
        "duration": "00:00:00",
        "show": {
          "uid": "LuGGHvnMQhb5C0FbN2pC",
          "title": "Conversa com desenvolvedores"
        }
      }
    ],
    "_links": [
      {
        "href": "http://127.0.0.1:3000/episodes",
        "rel": "post_create_episode",
        "method": "POST"
      }
    ]
  }
  ```
  - Erro:
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

- **Criar episódio:**
  - Endpoint: `/episodes`
  - Método: `POST`
  - Campos: `show, title, description`
  - Sucesso:
    - Status: `201`;
    - Resposta:
    ```json
    {
      "response": "Episódio criado.",
      "_links": [
        {
          "href": "http://127.0.0.1:3000/episodes",
          "rel": "get_all_episodes",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/episodes/kjCSQ0qXdcDkuSX7EK6V",
          "rel": "get_episode",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/episodes/kjCSQ0qXdcDkuSX7EK6V",
          "rel": "update_episode",
          "method": "PATCH"
        },
        {
          "href": "http://127.0.0.1:3000/episodes/kjCSQ0qXdcDkuSX7EK6V",
          "rel": "delete_episode",
          "method": "DELETE"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      [
        "É necessário adicionar um programa válido",
        "Adicione um título de, pelo menos, 5 caracteres"
      ]
      ```

      ou
      
      ```json
      "Programa não encontrado."
      ```

    - Status: `403`;
      - Resposta:
      ```json
      "Você não tem permissão para alterar este programa."
      ```

      ou

      ```json
      "Sua autorização é inválida, autentique-se."
      ```

      ou

      ```json
      "Sua autorização não pertence a nenhum usuário, autentique-se novamente."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

      ou

      ```json
      "Ocorreu um erro na verificação de token. Tente novamente mais tarde."
      ```

- **Obter episódio específico:**
  - Endpoint: `/episodes/:uid`
  - Parâmetro: `uid`
  - Método: `GET`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": {
        "uid": "kjCSQ0qXdcDkuSX7EK6V",
        "title": "Episódio 2",
        "description": null,
        "url_audio": "/audios/8KWBuMAKbiwfeUV1ve16.mp3",
        "duration": "00:04:26",
        "createdAt": "2021-04-24T14:06:48.000Z",
        "show": {
          "uid": "LuGGHvnMQhb5C0FbN2pC",
          "title": "Conversa com desenvolvedores",
          "url_photo": "/images/shows/default.svg"
        }
      },
      "_links": [
        {
          "href": "http://127.0.0.1:3000/episodes/kjCSQ0qXdcDkuSX7EK6V",
          "rel": "patch_update_episode",
          "method": "PATCH"
        },
        {
          "href": "http://127.0.0.1:3000/episodes/kjCSQ0qXdcDkuSX7EK6V",
          "rel": "delete_episode",
          "method": "DELETE"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      "Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?"
      ```
    - Status: `404`;
      - Resposta:
      ```json
      "Episódio não encontrado."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

- **Alterar informações de um episódio:**
  - Endpoint: `/episodes/:uid`
  - Parâmetro: `uid`
  - Campos: `title, description, audio (Upload)` (Opcionais)
  - Método: `PATCH`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": "Aúdio adicionado com sucesso.",
      "_links": [
        {
          "href": "http://127.0.0.1:3000/episodes/kjCSQ0qXdcDkuSX7EK6V",
          "rel": "get_episode",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/episodes/kjCSQ0qXdcDkuSX7EK6V",
          "rel": "delete_episode",
          "method": "DELETE"
        }
      ]
    }
    ```

    ou

    ```json
    {
      "response": "Alterações concluídas.",
      "_links": [
        {
          "href": "http://127.0.0.1:3000/episodes/kjCSQ0qXdcDkuSX7EK6V",
          "rel": "get_episode",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/episodes/kjCSQ0qXdcDkuSX7EK6V",
          "rel": "delete_episode",
          "method": "DELETE"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      "Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?"
      ```

      ou

      ```json
      [
        "É necessário adicionar um programa válido",
        "Adicione um título de, pelo menos, 5 caracteres"
      ]
      ```

      ou

      ```json
      "O programa escolhido não existe."
      ```

      ou

      ```json
      "Episódio não encontrado."
      ```

    - Status: `403`;
      - Resposta:
      ```json
      "Você não tem permissão para alterar este episódio."
      ```

      ou

      ```json
      "Sua autorização é inválida, autentique-se."
      ```

      ou

      ```json
      "Sua autorização não pertence a nenhum usuário, autentique-se novamente."
      ```
    - Status: `415`;
      - Resposta:
      ```json
      "Apenas alguns tipos de aúdio são suportados, são eles: mp3 (mpeg), mp4, ogg, flac e wav"
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

      ou

      ```json
      "Ocorreu um erro na verificação de token. Tente novamente mais tarde."
      ```

- **Deletar um episódio:**
  - Endpoint: `/episodes/:uid`
  - Parâmetro: `uid`
  - Método: `DELETE`
  - Sucesso:
    - Status: `200`;
    - Resposta:
    ```json
    {
      "response": "Episódio removido.",
      "_links": [
        {
          "href": "http://127.0.0.1:3000/episodes/kjCSQ0qXdcDkuSX7EK6V",
          "rel": "get_episode",
          "method": "GET"
        },
        {
          "href": "http://127.0.0.1:3000/episodes/kjCSQ0qXdcDkuSX7EK6V",
          "rel": "patch_update_episode",
          "method": "PATCH"
        }
      ]
    }
    ```
  - Erro:
    - Status: `400`;
      - Resposta:
      ```json
      "Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?"
      ```

      ou

      ```json
      "Episódio não encontrado."
      ```

    - Status: `403`;
      - Resposta:
      ```json
      "Você não tem permissão para alterar este episódio."
      ```

      ou

      ```json
      "Sua autorização é inválida, autentique-se."
      ```

      ou

      ```json
      "Sua autorização não pertence a nenhum usuário, autentique-se novamente."
      ```
    - Status: `500`;
      - Resposta:
      ```json
      "Desculpe, mas algum erro ocorreu. Que tal tentar novamente?"
      ```

      ou

      ```json
      "Ocorreu um erro na verificação de token. Tente novamente mais tarde."
      ```