# Front-end Chat Application

Este é um projeto de front-end desenvolvido com React, TypeScript e Vite. A aplicação permite interação com um chatbot e visualização do histórico de conversas.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface do usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de build rápida para desenvolvimento moderno.
- **Tailwind CSS**: Framework CSS utilitário para estilização.
- **Axios**: Biblioteca para fazer requisições HTTP.

## Estrutura do Projeto

- `src/App.tsx`: Componente principal da aplicação.
- `src/pages/Home/Home.tsx`: Página inicial que exibe o histórico de conversas.
- `src/components/Chat.tsx`: Componente do chatbot flutuante.
- `src/BaseUrl/url.ts`: Configuração da API base.

## Páginas e Funcionalidades

### Página Home
A página inicial (`Home.tsx`) é o ponto de entrada da aplicação. Ela possui:
- Um botão "Abrir mensagens" que abre um modal exibindo o histórico de conversas.
- O modal mostra conversas anteriores, diferenciando mensagens do usuário e do agente/bot.
- Integração com a API para buscar mensagens existentes.

### Componente Chat
O componente `Chat.tsx` é um chatbot flutuante localizado no canto inferior direito da tela. Suas funcionalidades incluem:
- Botão para abrir/fechar o chat.
- Campo de entrada para digitar mensagens.
- Envio de mensagens para o backend e exibição de respostas do bot.
- Indicador de "Bot digitando..." durante o processamento.
- Cada conversa tem um ID único gerado automaticamente.

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra o navegador em `http://localhost:5173` (porta padrão do Vite).

## API

A aplicação se comunica com um backend localizado em `http://localhost:3000`. As rotas utilizadas são:
- `GET /messages`: Busca o histórico de conversas.
- `POST /messages`: Envia uma nova mensagem e recebe a resposta do bot.

Certifique-se de que o backend esteja rodando antes de usar a aplicação.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run lint`: Executa o linter para verificar o código.
- `npm run preview`: Visualiza a build de produção localmente.
