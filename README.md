# ChatFlow - Aplicativo de Chat em Tempo Real

ChatFlow é uma aplicação de chat em tempo real construída com Node.js, WebSocket, React e Vite.

## Características

- Design moderno e responsivo com Tailwind CSS
- Landing page atraente para divulgação do produto
- Autenticação de usuários com tela de login
- Comunicação em tempo real usando WebSocket
- Interface de usuário intuitiva e amigável
- Suporte para múltiplos usuários simultâneos
- Notificações de entrada e saída de usuários
- Possibilidade de alterar nome de usuário
- Reconexão automática em caso de perda de conexão

## Requisitos

- Node.js 16.x ou superior
- npm ou yarn

## Instalação

1. Clone o repositório ou baixe os arquivos
2. Instale as dependências:

```bash
npm install
```

## Executando o aplicativo

### Desenvolvimento

1. Construa o frontend (necessário apenas na primeira vez ou após mudanças no frontend):

```bash
npm run build
```

2. Inicie o servidor:

```bash
npm run server
```

3. Acesse o aplicativo em `http://localhost:3000`

### Produção

1. Construa o frontend para produção (necessário apenas na primeira vez ou após mudanças no frontend):

```bash
npm run build
```

2. Inicie o servidor:

```bash
npm run server
```

O servidor estará disponível na porta 3000 ou na porta definida pela variável de ambiente `PORT`.

## Credenciais de Teste

Para testar o aplicativo, você pode usar as seguintes credenciais:

- Email: usuario@exemplo.com / Senha: 123456
- Email: teste@teste.com / Senha: teste123

## Estrutura do Projeto

- `server.js` - Servidor WebSocket e HTTP
- `src/App.tsx` - Componente principal do React com roteamento
- `src/pages/` - Páginas da aplicação (Landing, Chat)
- `src/components/` - Componentes reutilizáveis
- `src/utils/` - Utilitários e funções auxiliares

## Como funciona

### Landing Page

A landing page apresenta:

- Design moderno e atraente
- Seções informativas sobre recursos
- Demonstração visual do funcionamento
- Chamadas para ação direcionando ao aplicativo
- FAQ com perguntas comuns
- Rodapé com informações de contato

### Autenticação

O sistema de autenticação implementa:

- Tela de login com validação de credenciais
- Proteção do acesso ao chat apenas para usuários autenticados
- Logout com limpeza de sessão
- Definição automática do nome de usuário baseado no email

### Servidor WebSocket

O servidor WebSocket gerencia as conexões dos clientes e lida com diferentes tipos de mensagens:

- **Conexão**: Quando um cliente se conecta, ele recebe um ID único e é adicionado à lista de clientes.
- **Mensagens de chat**: Quando um cliente envia uma mensagem, ela é transmitida para todos os clientes conectados.
- **Mudança de nome**: Os clientes podem alterar seus nomes de usuário.
- **Desconexão**: Quando um cliente se desconecta, os outros clientes são notificados.

### Cliente React

O cliente React se conecta ao servidor WebSocket e:

- Exibe mensagens recebidas com design moderno
- Permite enviar novas mensagens
- Mostra notificações de sistema (entrada/saída de usuários)
- Permite alterar o nome de usuário
- Tenta reconectar automaticamente em caso de perda de conexão

## Escalabilidade

Para escalar o aplicativo para muitos usuários:

1. **Balanceamento de carga**: Use um balanceador de carga para distribuir conexões entre várias instâncias do servidor.
2. **Persistência de mensagens**: Adicione um banco de dados para armazenar mensagens e histórico.
3. **Salas de chat**: Implemente salas de chat para segmentar usuários e reduzir o número de mensagens transmitidas.
4. **Otimização de conexões**: Use técnicas como heartbeat para manter conexões ativas e detectar desconexões.
5. **Limitação de taxa**: Implemente limitação de taxa para evitar sobrecarga do servidor.

## Licença

MIT
