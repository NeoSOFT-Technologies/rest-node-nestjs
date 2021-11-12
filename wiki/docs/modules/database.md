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
For MongoDB install [MongoDB NodeJS Driver](https://www.npmjs.com/package/mongodb).We install older version as typeorm does not support mongodb driver for v4
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