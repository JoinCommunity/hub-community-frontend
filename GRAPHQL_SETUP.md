# Configuração do GraphQL

## Problema Atual

As queries GraphQL não estão funcionando porque:

1. **Servidor GraphQL não está rodando**: O cliente Apollo está tentando conectar em `http://localhost:4000/graphql` mas não há servidor nessa porta.

2. **Falta de dados reais**: As queries estão tentando buscar dados de um servidor que não existe.

## Solução Implementada

### 1. Fallback para Dados Mock

Implementei um sistema de fallback que:

- Tenta fazer a query GraphQL normalmente
- Se falhar, automaticamente usa dados mock
- Mostra um aviso visual quando está usando dados mock

### 2. Hooks Personalizados

Criei hooks que gerenciam automaticamente o fallback:

- `useCommunities()` - para buscar comunidades
- `useEvents()` - para buscar eventos

### 3. Melhor Tratamento de Erro

- Logs detalhados no console
- Avisos visuais para o usuário
- Dados sempre disponíveis (mock ou reais)

## Como Configurar o Servidor GraphQL

### Opção 1: Usar um servidor GraphQL existente

1. Configure a variável de ambiente:

```bash
# .env.local
NEXT_PUBLIC_GRAPHQL_URL=http://seu-servidor-graphql.com/graphql
```

2. Certifique-se de que o servidor GraphQL tenha os resolvers:

```graphql
type Query {
  communities: [Community!]!
  events: [Event!]!
}

type Community {
  id: ID!
  name: String!
  description: String!
  location: String!
  members: Int!
  nextEvent: String
  technologies: [String!]!
  image: String
}

type Event {
  id: ID!
  title: String!
  description: String!
  date: String!
  time: String!
  location: String!
  attendees: Int!
  maxAttendees: Int!
  community: String!
  technologies: [String!]!
  backgroundImage: String
  type: String!
}
```

### Opção 2: Criar um servidor GraphQL simples

1. Instale as dependências:

```bash
npm install apollo-server graphql
```

2. Crie um servidor básico:

```javascript
// server.js
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    communities: [Community!]!
    events: [Event!]!
  }

  type Community {
    id: ID!
    name: String!
    description: String!
    location: String!
    members: Int!
    nextEvent: String
    technologies: [String!]!
    image: String
  }

  type Event {
    id: ID!
    title: String!
    description: String!
    date: String!
    time: String!
    location: String!
    attendees: Int!
    maxAttendees: Int!
    community: String!
    technologies: [String!]!
    backgroundImage: String
    type: String!
  }
`;

const resolvers = {
  Query: {
    communities: () => [
      // Seus dados reais aqui
    ],
    events: () => [
      // Seus dados reais aqui
    ],
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

3. Execute o servidor:

```bash
node server.js
```

## Status Atual

✅ **Funcionando**: A aplicação agora funciona com dados mock
✅ **Fallback**: Sistema automático de fallback implementado
✅ **UX**: Avisos visuais quando usando dados mock
⚠️ **Pendente**: Configuração do servidor GraphQL real

## Próximos Passos

1. Configure um servidor GraphQL real
2. Atualize a URL no arquivo `.env.local`
3. Teste as queries com dados reais
4. Remova os dados mock quando o servidor estiver pronto
