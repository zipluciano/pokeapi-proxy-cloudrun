# API de Pokémon com Bun.js e OOP

Esta é uma API REST e Orientada a Objetos, construída com **Bun.js** e **ElysiaJS**. Ela atua como um proxy para a PokéAPI, com Injeção de Dependência e Versionamento de API no ecossistema Bun.

## Contexto do Google Cloud Run

Este projeto foi criado principalmente para testar estratégias de deploy no **Google Cloud Run (GCR)**, que é uma plataforma serverless gerenciada para execução de contêineres stateless. Ele abstrai a infraestrutura e escala automaticamente conforme o tráfego.

**URL de Produção:** https://pokeapi-proxy-cloudrun-265860524559.europe-west1.run.app

## Arquitetura: Bun + OOP + DI

Além do deploy, este projeto serve como uma POC para construir aplicações escaláveis utilizando **Bun.js** com princípios de **OOP**.

Embora o ecossistema JavaScript/TypeScript frequentemente favoreça programação funcional ou padrões minimalistas (especialmente com runtimes novos como o Bun), este projeto implementa estritamente:
*   **Injeção de Dependência (DI):** Usando `InversifyJS` para gerenciar dependências, desacoplando a lógica de negócios da infraestrutura.
*   **Services e Controllers baseados em Classes:** Encapsulando lógica em classes testáveis e reutilizáveis, em vez de funções isoladas.
*   **Arquitetura em Camadas:** Separação clara entre Configuração, Controllers, Services e contêineres IOC.

## Começando

### Pré-requisitos
- [Bun.js](https://bun.sh/) (v1.0 ou superior)
- Docker (opcional, para testes de container)

### Configuração de Variáveis de Ambiente

Copie o arquivo de exemplo e ajuste conforme necessário:

```bash
cp .env.example .env
```

Variáveis disponíveis:
- `PORT`: Porta do servidor (Padrão: 3000)
- `NODE_ENV`: Ambiente (development, production, test)
- `LOG_LEVEL`: Nível de log (trace, debug, info, warn, error, fatal)
- `POKEMON_API_URL`: URL da API externa de Pokémon

### Instalação
Instale as dependências do projeto:
```bash
bun install
```

### Rodando a Aplicação

**Modo de Desenvolvimento:**
Roda com hot-reloading ativado.
```bash
bun run dev
```

**Modo de Produção:**
```bash
bun start
```

## Docker & Google Cloud Run

Para rodar a aplicação em um contêiner (simulando o ambiente do GCR):

1. **Construir a imagem:**
   ```bash
   docker build -t bun-pokemon-api .
   ```

2. **Rodar o contêiner:**
   Passando as variáveis de ambiente do seu arquivo `.env`:
   ```bash
   docker run --env-file .env -p 3000:3000 bun-pokemon-api
   ```

   Ou definindo variáveis manualmente (como o GCR faz com a PORT):
   ```bash
   docker run -e PORT=8080 -p 8080:8080 bun-pokemon-api
   ```

## Endpoints

O servidor ouve na porta `3000` por padrão.

- **Lista de Pokémons (V1):**
  ```
  GET /v1/pokemons?limit=20&offset=0
  ```
- **Documentação Swagger:**
  ```
  http://localhost:3000/swagger
  ```

## Tech Stack
- **Runtime:** Bun.js
- **Framework:** ElysiaJS
- **Container DI:** InversifyJS
- **Validação:** Zod
- **Logging:** Pino
