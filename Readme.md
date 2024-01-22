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

### Frontend decisions

- Divider into 3 layers
  - ui - for ui library (using shadcn) to handle basic components
  - design-system - match the styles and common operations by the system
  - components general - uses the design system components to build use cases
- Using react hook form to handle the booking form while making the general components invert the dependencies to the interface needed to operate with this library.

### Backend

- Availability resolver with filter of the already scheduled
- Booking resolver to receive booking data and inserting the database row