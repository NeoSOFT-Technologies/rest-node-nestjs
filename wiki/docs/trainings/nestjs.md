# Nest JS Training 

## Prerequisites
- Node JS  
- Express JS 
- Typescript 

## Topics

### 1. Getting Started  
 - Introduction to Nest JS 
    - Rest API 
    - Microservices 
    - Web Sockets 
    - Graphql 
- Installing the NestJS CLI (command-line interface) 
    - Installing Node.js
    - Install NestJS CLI -globally 
    - Generating  Nest JS Application 
- What’s inside a Nest JS Application 

### 2. Creating a REST API application  
- Prerequisite: Install Insomnia/Postman 
- Creating a Basic Controller 
    - nest generate controller 
- Use Route Parameters 
- Handling Request Body / Payload 
- Response Status Codes 
- Handling Update and Delete Requests 
- Implement Pagination with Query Parameters 
- Creating a Basic Service 
    - nest generate service {name} 
- Send User-Friendly Error Messages 
- Encompass Business-Domain in Modules
    - controllers - Which you can think of as our API Routes, that we want this module to instantiate. 
    - exports - Here we can list providers within this current module that should be made available anywhere this module is imported 
    - imports - Just as we saw in the AppModule, the imports Array gives us the ability to list OTHER modules that THIS module requires. Any exported providers of these imported modules are now fully available here as well. 
    - providers - Here we’re going to list our services that need to be instantiated by the Nest injector.  Any providers here will be available only within “THIS” module itself, unless added to the exports array we saw above. 
- Introduction to Data Transfer Objects 
    - Generate a DTO class with the Nest CLI   
        - nest g class coffees/dto/create-coffee.dto --no-spec 
    - Validate Input Data with Data Transfer Objects 
        - ValidationPipe  
            - Install needed dependencies - npm i class-validator class-transformer  
        - Handling Malicious Request Data 
        - Auto-transform Payloads to DTO instances 

### 3. Add PostgreSQL with Type ORM 
- Prerequisite: Install Docker 
- Running PostgreSQL 
    - How to visualize your Postgres Database (GUI) 
        - https://www.pgadmin.org/ 
- Introducing the Type ORM Module 
- Creating a Type ORM Entity 
- Using Repository to Access Database 
- Create a Relation between two Entities 
    - Relations 
        - One-to-one 
        - One-to-many or Many-to-one relations 
        - Many-to-many relations 
- Retrieve Entities with their Relations 
- Using Cascading Inserts and Updates 
- Adding Pagination 
- Use Transactions 
- Adding Indexes to Entities 
- Setting up Migrations 

### 4. Dependency Injection 
- Understand Dependency Injection 
    - Injector 
    - Container 
    - Controller 
    - Service 
- Control Nest JS Module Encapsulation 
- Diving Into Custom Providers 
    - Strategy Pattern  
- Value based Providers 
- Non-class-based Provider Tokens 
- Class Providers 
- Factory Providers 
- Leverage Async Providers 
- Create a Dynamic Module 
- Control Providers Scope 
- Diving Deeper Into Request-Scoped Providers 

### 5. Application Configuration 

- Introducing the Config Module 
- Custom Environment File Paths 
- Schema Validation 
- Using the Config Service 
- Custom Configuration Files 
- Configuration Namespaces and Partial Registration 
- Asynchronously Configure Dynamic Modules 

### 6. Other Building Blocks by Example 
- Introducing More Building Blocks 
- Understanding Binding Techniques 
- Catch Exceptions with Filters 
- Protect Routes with Guards 
- Using Metadata to Build Generic Guards or Interceptors 
- Add Pointcuts with Interceptors 
- Handling Timeouts with Interceptors 
- Creating Custom Pipes 
- Add Request Logging with Middleware 
- Create Custom Param Decorators 

### 7. Generating Open API Specification 
- Introducing the Swagger Module 
- Enabling CLI Plugin 
- Decorating Model Properties 
- Adding Example Responses 
- Using Tags to Group Resources 

### 8. Testing 
- Introduction to Jest 
- Getting Started with Test Suites 
- Adding Unit Tests 
- Diving Into e2e Tests 
- Creating our First e2e Test 
- Implementing e2e Test Logic 

### 9. Add MongoDB with Mongoose  
- Running MongoDB 
- Introducing the Mongoose Module 
- Creating a Mongoose Model 
- Using a Mongoose Model to Access MongoDB 
- Adding Pagination 
- Use Transactions 
- Adding Indexes to Schemas

## References

- [Who is using Nest in production?](https://github.com/nestjs/nest/issues/1006)
- [https://learn.nestjs.com/p/fundamentals](https://learn.nestjs.com/p/fundamentals )
- [https://github.com/juliandavidmr/awesome-nestjs](https://github.com/juliandavidmr/awesome-nestjs)