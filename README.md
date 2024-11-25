# Tickets Manager

Este é um projeto para gerenciar tickets de suporte.

## Funcionalidades

- Criação de tickets
- Atualização de tickets
- Exclusão de tickets
- Visualização de tickets

## Tecnologias Utilizadas

- Nextjs 14
- Typescript
- React
- Mysql

## Como Executar

1. Clone o repositório:

  ```bash
  git clone https://github.com/CaioGitDev/tickets-manager.git
  ```

2. Navegue até o diretório do projeto:

  ```bash
  cd tickets-manager
  ```

3. Instale as dependências:

  ```bash
  npm install
  ```

- Configurar .env file

```bash
  NODE_ENV='development'
  DB_HOST='127.0.0.1'
  DB_PORT=3306
  DB_USER=''
  DB_PASSWORD=''
  DB_NAME='tickets-manager'
```

- Inicie o container do docker (o docker deve estar a ser executado e ter uma instancia do MYSQL)

```bash
  npm run start:db
```

- Na base de dados criar os sps
  - create_all_tables
  - delete_all_tables

- Executar todos os scripts de criação de sp, views, functions, triggers

- executar a aplicação

```bash
  npm run dev
```

- Em app\api\seeddb\ticket\route.ts, definir o tamanho de seed atual apenas para testes

dentro deste ficheiro copiar os ids dos users que devem ficar com os tickers associados

```typescript
          user_id: fakerPT_PT.helpers.arrayElement([
            '61cce333-ab13-11ef-8660-0242ac120002',
            '61cee4c9-ab13-11ef-8660-0242ac120002',
            '61d0e1b4-ab13-11ef-8660-0242ac120002',
            '61d2c0fc-ab13-11ef-8660-0242ac120002',
          ]),

```

- aceder ao url /api/seeddb/ticket

- por fim executar o sp, para atribuir os tickets aos tecnicos

```sql
  CALL `tickets-manager`.`sp_cursor_assign_multiple_tickets`(2, 500);
```



## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature:

  ```bash
  git checkout -b minha-feature
  ```

3. Commit suas mudanças:

  ```bash
  git commit -m 'Adiciona minha feature'
  ```

4. Envie para o repositório remoto:

  ```bash
  git push origin minha-feature
  ```

5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
