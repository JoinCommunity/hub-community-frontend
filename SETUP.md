# Configuração do Servidor GraphQL

## Problema Atual

O erro indica que o servidor GraphQL BFF não está conseguindo conectar com a API principal:

```
Error fetching events: Error on try GET in https://hubcommunity-manager.8020digital.com.br/api/events
```

## Soluções Possíveis

### 1. Verificar se o BFF está rodando

O BFF GraphQL deve estar rodando na porta 4000 (padrão) ou na URL configurada.

**Para verificar:**

```bash
# Teste se o servidor está respondendo
curl http://localhost:4000/graphql
```

### 2. Configurar a URL correta

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# .env.local
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

### 3. Iniciar o servidor BFF

Se o BFF não estiver rodando, você precisa iniciá-lo:

```bash
# Navegue para o diretório do BFF
cd ../hub-community-bff

# Instale as dependências
npm install

# Inicie o servidor
npm start
```

### 4. Verificar conectividade com a API principal

O BFF precisa conseguir acessar a API principal em:
`https://hubcommunity-manager.8020digital.com.br/api`

**Para testar:**

```bash
curl https://hubcommunity-manager.8020digital.com.br/api/events
```

### 5. Configuração de CORS

Se houver problemas de CORS, o BFF pode precisar de configuração adicional.

## Status da Aplicação

✅ **Frontend**: Configurado e funcionando
✅ **GraphQL Queries**: Corrigidas e validadas
⚠️ **BFF Server**: Precisa estar rodando
⚠️ **API Principal**: Precisa estar acessível

## Próximos Passos

1. Verifique se o BFF está rodando
2. Configure a URL correta no `.env.local`
3. Teste a conectividade com a API principal
4. Reinicie a aplicação frontend se necessário
