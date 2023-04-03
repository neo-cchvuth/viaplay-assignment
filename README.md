# Viaplay Coding Assignment

## How to run

- create `.env` file from `.env.example` with your credentials

#### Option 1

- Install Docker

```
    > docker compose up
```

- API available at `localhost:3000`

#### Option 2

- Install Node.js 18

```
    > npm install
    > npm run start
```

- API available at `localhost:3000`

## API Doc

- visit `localhost:3000/swagger`

## App Structure

- **features**: domain driven api organisation, can be nested
- shared/**helpers**: utility functions
- shared/**middlewares**: app middlewares
- shared/**services**: app services
- shared/**types**: object types/interfaces
- **validators**: angular custom form validators

## Test

### Unit

Run `npm run test` to execute the unit tests.

### End-to-end

Run `npm run test:e2e` to execute the end-to-end tests.

### Coverage

Run `npm run test:cov` to execute the coverage tests.

## Further help

More help on [Nest](https://github.com/nestjs/nest) framework.
