# 📦 Gestão de Pedidos - Frontend (Next.js + TypeScript)

Uma aplicação moderna para gestão de pedidos, desenvolvida com Next.js, TypeScript e SWR, integrando-se a uma API backend em ASP.NET Core.

## 🚀 Funcionalidades

- 📝 Cadastro de novos pedidos
- 📋 Listagem de pedidos existentes
- 🔎 Visualização detalhada de cada pedido
- ❌ Mensagens de erro amigáveis para o usuário
- 🔄 Atualização automática da lista após ações
- 📱 Layout responsivo

## 🛠️ Tecnologias Utilizadas

- **Next.js** - Framework React para SSR/SSG
- **TypeScript** - Tipagem estática para maior segurança
- **SWR** - Data fetching e cache
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Tailwind CSS** (opcional) - Estilização moderna e responsiva

## 📦 Estrutura do Projeto

```
frontend-gestao-de-pedidos/
├── components/
│   └── orders/
│       ├── create-order-form.tsx   # Formulário de criação de pedidos
│       ├── order-list.tsx         # Lista de pedidos
│       └── order-details.tsx      # Detalhes do pedido
├── lib/
│   └── api/
│       └── orders.ts              # Funções de integração com a API
├── pages/
│   ├── index.tsx                  # Página inicial
│   └── ...
└── ...
```

## 💻 Como Executar

### 🐳 Execução com Docker

1. **Crie o arquivo `.env.local`** (se desejar customizar a URL da API):
   ```env
   NEXT_PUBLIC_API_URL=http://api:5158
   ```
   > Use `http://api:5158` se for rodar backend e frontend juntos via Docker Compose.

2. **Build e execute o container do frontend:**
   ```bash
   docker build -t frontend-gestaopedidos .
   docker run -p 3000:3000 --env-file .env.local frontend-gestaopedidos
   ```
   - O app estará disponível em [http://localhost:3000](http://localhost:3000)

3. **Integração com Docker Compose**
   - Adicione o serviço `frontend` ao seu `docker-compose.yml`:
   ```yaml
   frontend:
     build:
       context: ./frontend-gestao-de-pedidos
       dockerfile: Dockerfile
     environment:
       - NEXT_PUBLIC_API_URL=http://api:5158
     ports:
       - "3000:3000"
     depends_on:
       - api
   ```
   - Assim, frontend e backend funcionam juntos, cada um em seu container.

---

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd frontend-gestao-de-pedidos
   ```

2. **Instale as dependências**
   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - Crie um arquivo `.env.local` na raiz do projeto com:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:5158
     ```
   - Certifique-se de que o backend está rodando na porta correta.

4. **Execute o projeto**
   ```bash
   yarn dev
   # ou
   npm run dev
   ```

5. **Acesse no navegador**
   - Abra [http://localhost:3000](http://localhost:3000)

## 🎯 Principais Características

### Integração com Backend
- Consome API RESTful para criar e listar pedidos
- Validação de dados antes do envio
- Mensagens de erro claras em caso de falha

### Componentização
- Componentes reutilizáveis para formulários, listas e detalhes
- Separação clara de responsabilidades

### Estado e UX
- Utilização de SWR para atualização automática dos dados
- Feedback visual para ações do usuário

### Tipos
```typescript
type Order = {
  id: string;
  cliente: string;
  descricao: string;
  valor: number;
  status: string;
  dataCriacao: string;
};
```

### Estilização
- Interface moderna e responsiva
- Uso opcional de Tailwind CSS para estilização rápida

## 🔍 Funcionalidades Detalhadas

### Cadastro de Pedidos
- Formulário validado com React Hook Form + Zod
- Feedback imediato em caso de erro

### Listagem e Detalhes
- Atualização automática após criação de pedidos
- Visualização detalhada ao selecionar um pedido

### Erros e Feedback
- Exibição de mensagens amigáveis para o usuário em caso de falha na API

---

Desenvolvido para demonstrar integração frontend-backend, boas práticas de UX e validação de dados.
