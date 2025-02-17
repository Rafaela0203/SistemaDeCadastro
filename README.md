# Sistema de Cadastro

## Descrição
Este é um sistema de cadastro de clientes que permite a visualização, criação, edição e exclusão de registros. O backend foi desenvolvido em Java com Spring Boot e banco de dados PostgreSQL, enquanto o frontend utiliza React com TypeScript e componentes da MUI.

## Tecnologias Utilizadas
### Backend:
- Java
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Hibernate

### Frontend:
- React
- TypeScript
- MUI (Material UI) para estilização
- Axios para consumo da API
- useState e useEffect para gerenciamento de estado

## Estrutura do Projeto
```
SistemaDeCadastro/
│── server/       # Backend (Spring Boot)
│── client/       # Frontend (React + TypeScript)
│── README.md     # Documentação do projeto
```

## Como Rodar o Projeto
### Backend:
1. Clone o repositório:
   ```sh
   git clone https://github.com/Rafaela0203/SistemaDeCadastro.git
   ```
2. Acesse o diretório do backend:
   ```sh
   cd SistemaDeCadastro/server
   ```
3. Configure o banco de dados no arquivo `application.properties`.
4. Execute o projeto:
   ```sh
   mvn spring-boot:run
   ```

### Frontend:
1. Acesse o diretório do frontend:
   ```sh
   cd SistemaDeCadastro/client
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o frontend:
   ```sh
   npm start
   ```

## Funcionalidades
- Cadastro de clientes
- Listagem de clientes cadastrados
- Atualização de informações de clientes
- Exclusão de clientes
