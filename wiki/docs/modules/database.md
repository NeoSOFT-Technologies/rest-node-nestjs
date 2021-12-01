# Database

Boiler plate has already included mysql and mongodb database configuration within the core modules. To leverage the functionality, we need to define the database connection in database.module.ts which is in db folder inside src. Update the database configuration as per your setting.

### Installation
For integrating with SQL and NoSQL databases, Nest provides the [@nestjs/typeorm](https://github.com/nestjs/typeorm) package. Nest uses [TypeORM](https://github.com/nestjs/typeorm) because it's the most mature Object Relational Mapper (ORM) available for TypeScript. Since it's written in TypeScript, it integrates well with the Nest framework.TypeORM provides support for many relational databases, such as PostgreSQL, Oracle, Microsoft SQL Server, SQLite, and even NoSQL databases like MongoDB.

```
$ npm install --save @nestjs/typeorm typeorm
```
Now proceed to install the associated client API libraries for selected database. 
For MySQL install [mysql](https://www.npmjs.com/package/mysql2)
```
$ npm install --save mysql2
```
For MongoDB install [MongoDB NodeJS Driver](https://www.npmjs.com/package/mongodb).We install older version as typeorm does not [support mongodb driver for v4](https://github.com/typeorm/typeorm/issues/7907)
```
$ npm install --save mongodb@3.7.0
```
> **Note:** It is a best practice to import database information from application configuration.

### Configuration
```ts
# database.module.ts

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'mysql_connection',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('db.host'),
        port: config.get('db.port1'),
        username: config.get('db.username'),
        password: config.get('db.password'),
        database: config.get('db.database'),
        entities: [User],
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get('app.env') === 'local' || 'dev' ? true : false,
      }
      ),
    }),
    TypeOrmModule.forRootAsync({
      name: 'mongoDB_connection',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mongodb',
        host: config.get('db.host'),
        port: config.get('db.port2'),
        username: config.get('db.username'),
        password: config.get('db.password'),
        database: config.get('db.database'),
        useUnifiedTopology: true,
        authSource: 'admin',
        entities: [User],
        synchronize: config.get('app.env') === 'local' || 'dev' ? true : false,
      }),
    }),
  ],
})
```

`type:  ` Database type. Must specify which database engine to use.
`host:  ` Database host.
`port:  ` Database host port. Default mysql port is 3306 & default mongodb port is 27017.
`username:  ` Database username.
`password:  ` Database password.
`database:  ` Database name.
`useUnifiedTopology:  ` Determines whether or not to use the new Server Discovery and Monitoring engine.
`authSource:  ` If the Database authentication is dependent on another databaseName
`entities:  ` Entities that maps with database table. It is shown below
```ts
# users.entity.ts

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
```
`synchronize:  ` Synchronize the entities with databases. Should not be enabled for production.

> Using the `forFeature()` method repositories are registered in the current scope.
```ts
# users.module.ts

    @Module({
    imports: [TypeOrmModule.forFeature([UserDbRepository],'mongoDB_connection')],
    providers: [UsersService],
    controllers: [UsersController],
    })
```

> Inject UserDbRepository using `@InjectRepository` decorator
```ts
# users.service.ts

constructor(
    @InjectRepository(UserDbRepository,'mongoDB_connection')
    private readonly usersRepository: UserRepository
  ) {}
```
### Using other database apart from MySQL and MongoDb. 

The existing boiler plate comes with by default support for MySQL. This doesn't mean that you cannot use any other database like  PostgreSQL, Oracle, Microsoft SQL Server etc. Install the respective package of the database and update the config.ts as per required database configuration.

<hr>

## NoSQL injections

A NoSQL injection vulnerability is an error in a web application that uses a NoSQL database. This web application security issue lets a malicious party bypass authentication, extract data, modify data, or even gain complete control over the application. NoSQL injection attacks are the result of a lack of data sanitization. 
 
NoSQL injections are just one of many injection attacks, similar to traditional SQL Injections. They are engineered to exploit modern databases that do not use SQL. While NoSQL database engines have a different structure and do not support SQL statements and SQL queries, they still let users perform queries. They do not support one standardized language and therefore the query language is dependent on the implementation: database (e.g. MongoDB), language, and framework (e.g. Node.js, Angular). However, NoSQL queries are most often based on JSON and they can include user input. If this input is not sanitized, they are vulnerable to injections. 

![NoSQL Injection](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/nosql_support/wiki/images/nosql-query-injection.png?raw=true)


### Types Of Injection Attacks 

1) **In-band Injections** : In-band Injection is the most common and easy-to-exploit of Injection attacks. In-band Injection occurs when an attacker is able to use the same communication channel to both launch the attack and gather results. As an example, an attacker may use the HTTP communication deploy the attack to a backend and get the results on the same channel  

2) **Inferential Injection (Blind Injection)**: In an inferential attack, no data is actually transferred via the web application and the attacker would not be able to see the result of an attack in-band. Instead, an attacker is able to reconstruct the database structure by sending payloads, observing the web application’s response and the resulting behavior of the database server. 
Blind injection is nearly identical to normal injection, the only difference being the way the data is retrieved from the database. When the database does not output data to the web page, an attacker is forced to steal data by asking the database a series of true or false questions. This makes exploiting the Injection vulnerability more difficult, but not impossible. 

3) **Out-of-band Injections**: This not very common type of injection, mostly because it depends on features being enabled on the database server being used by the web application. Out-of-band Injection occurs when an attacker is unable to use the same channel to launch the attack and gather results. 

### How to prevent injection attacks 

- Try to avoid building queries from strings, use safe APIs and prepared statements. 
- Validate input to detect malicious values, also verify the types of input data i.e. string, number, Boolean, object etc. We can use joi or any other tool for this. 
- To minimize the potential damage of a successful injection attack, do not assign DBA or admin type access rights to your application accounts, we can create new roles with specific/limited access. 
- Sanitize the data, we can use express-mongo-sanitize to sanitize incoming data for express mongoDB. 
## Database Vulnerabilty against injection

| Connection type  | With ORM   | Without ORM   |
| ------------ | ---------- | -------------- |
| Security   | Risk is low <br/><br/>Data sanitization not required<br/><br/>Generates "parameterized statements" | Risk is high <br/><br/>Data sanitization required<br/><br/>"parameterized statements" needs to written manually  |

TypeORM provide many ways to construct a database query, but they also give you the option to execute 'raw' queries as a string.Also they allow to write some part of a generated query as a raw string. This should to be avoided, as it defeats the purpose of using an ORM.

In that scenario, simply injecting user input variables into a string query (instead of using the ORM's core API / query builder functions) puts data security at a higher risk.

### Data sanitization for MongoDB

We can use [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize) for this purpose,if required.This module searches for any keys in objects that begin with a `$` sign or contain a `.`, from req.body, req.query or req.params. It can then either:

- completely remove these keys and associated data from the object, or
- replace the prohibited characters with another allowed character.

Object keys starting with a $ or containing a . are reserved for use by MongoDB as operators. Without this sanitization, malicious users could send an object containing a $ operator, or including a ., which could change the context of a database operation. Most notorious is the $where operator, which can execute arbitrary JavaScript on the database.The best way to prevent this is to sanitize the received data, and remove any offending keys, or replace the characters with a 'safe' one.
> Simple add the the middleware after installing the library as shown below
```ts
# bootsrap.ts
...
import * as mongoSanitize  from 'express-mongo-sanitize';

...
app.use(mongoSanitize());
...
```