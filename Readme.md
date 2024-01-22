### Requirements
- docker
- docker-compose
- node >= 18.17
- npx

### Steps

- Start docker
```
docker-compose -f infra/docker-compose.yml up -d
```

- install node packages and common
```
cd backend && npm i
cd frontend && npm i
```

- run the database migrations
```
cd backend && npx prisma migrate
```

- start frontend and backend servers
```
cd backend && npm run start:dev
...
cd frontend && npm run dev --turbo
```
