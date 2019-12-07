# Rodando o app

### banco de dados Redis

Redis is used for caching requests.

```bash
docker run --name redisbarber -p 6379:6379 -d -t redis:alpine
```

# Running tests
If running test on windows, please change the "test" object from "Scripts" at the package.json file, with the following, "test": "set NODE_ENV=test jest".

## Running tests
```bash
yarn test or npm test
```

# DEPLOY

## Installing PM2

### Running on server
```bash
npm install -g pm2
```

```bash
yarn build
```

```bash
pm2 start ./dist/index.js
```

### Make it run automatically
```
pm2 startup systemd
```

Copy the command below to the system's path.
```bash
sudo env PATH=$PATH........
```

### List running app
```bash
pm2 save
```

### Libraries (brief):

express-rate-limit: Prevents Brute Force Attack.<br/>
express-brute: Prevent brute force on sessions.<br/>
helmet: Protects app setting various HTTP headers.<br/>
jsonwebtoken: Middleware JWT, garantee user is authenticated.<br/>
