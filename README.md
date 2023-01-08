# Architecture

The following technologies and services are used to develope the application:
* Express
* Postgres
* TypeScript
* Jest
* GraphQL
* TypeGraphQL
* Prisma

## APIs

The server application is designed based on clean architecture. It comprises of GraphQL APIs that provide the business logic to the client applications. These APIs support the business processes and provides domain model services. Therefore.

### Object Models

Process endpoint uses domain service endpoints as business actions to implement the workflow and perform a task. Process endpoint only knows about entity models.

### Running Tests
* Create .env.development and .env.test files (You can see variables in .env.example).
* Run migrate:postgres script.
* Run test:dev for watching test or test script.