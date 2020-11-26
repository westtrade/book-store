# Book store

Example backend project.

## Used stack

-   TypeScript
-   Express
-   GraphQL
-   TypeORM
-   typedi
-   type-graphql

## Scripts

**Testing**

```bash
yarn test
```

**TDD**

```bash
yarn tdd
```

**Developing**

```bash
yarn server:dev
```

**build**

```bash
yarn build
```

**start**

```bash
yarn build
yarn start
```

## Environment configuration variables

```env
SERVER_HTTP_PORT=4040
NODE_ENV=development
```

-   **SERVER_HTTP_PORT** - server port. (Default: 4040)
-   **NODE_ENV** - current environment. (Available values: production, development, test. Default: development)
