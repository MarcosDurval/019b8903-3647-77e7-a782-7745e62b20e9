# Node.js + Docker + Nginx + MySQL

Aplicação Dockerizada usando Node.js, Nginx como reverse proxy e MySQL como banco de dados.

## Início Rápido

### Pré-requisitos

- Docker 20.10+
- Docker Compose 2.0+

### Executar a Aplicação

```bash
# Subir todos os containers
docker compose up --build -d

# Acessar aplicação
curl http://localhost:8080
```

### Parar a Aplicação

```bash
docker compose down

```
## Stack Tecnológico

| Componente | Versão | Imagem Base |
|------------|--------|-------------|
| **Node.js** | 22.21.1 | `node:22.21.1-alpine3.23` |
| **MySQL** | 8.0 | `mysql:8.0` |
| **Nginx** | latest | `nginx:alpine` |
| **Express** | 5.2.1 | - |
| **mysql2** | 3.11.5 | - |

## Estrutura do Projeto

```
node-docker/
├── docker-compose.yaml       # Orquestração dos containers
├── nodeapp/
│   ├── Dockerfile            # Build da aplicação Node.js
│   ├── package.json          # Dependências npm
│   └── index.js              # Aplicação Express
├── nginx/
│   ├── Dockerfile            # Build do Nginx
│   └── nginx.config          # Configuração do reverse proxy
└── mysql/                    # Volume persistente (auto-criado)
```

### Ordem de Inicialização

```
MySQL (db)
    ↓ (espera healthy)
Node.js (node_app)
    ↓ (espera healthy)
Nginx
```
