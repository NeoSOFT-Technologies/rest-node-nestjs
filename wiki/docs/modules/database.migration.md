# Database Migration

Database migration can be defined as the process of migrating data from one source database to anoither targeted database by using the data migration service.
In our boilerplate we are implementing this module so that the user cannot lose its data from the database even after there are some changes made in the relational schema of the database.

>> The concept of Database migration is executed only when the application is running in the production environment.
>> This method is recommended by TypeORM itself in order to avoid loss of data.

## Implementation
- We will be implementing Database Migration using the TypeORM migration. 
- Migrations are scripts that, when executed in sequence, bring the database into the same state as the application, so that the database schema matches the application’s data models. 
- Migrations are created and run after changing the applications data models; for example, after creating or changing Entities in NestJS.

## Prequisites
- [NestJs]('https://docs.nestjs.com/') should be installed.
- [TypeORM]('https://docs.nestjs.com/techniques/database') should be installed.

## Usage
1. First create a filename named `typeorm.config.ts` with the following configuration.
```
const config: ConnectionOptions = {
type: 'mysql',
host: process.env.DB_HOST,
port: +process.env.DB_PORT,
username: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_DATABASE,
entities: [User],
synchronize: false,
cli: {
    migrationsDir: 'src/db/migrations',
  },
};
export = config;
```
>> Remember to keep `synchronize:false`

Then we have to make changes in the `src/db/database.module.ts`
```
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('db.host'),
        port: config.get('db.port'),
        username: config.get('db.username'),
        password: config.get('db.password'),
        database: config.get('db.database'),
        entities: [User],
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get('app.env') === 'local' || 'dev' ? true : false,
        migrations: ['dist/db/migrations/*.js'],
        migrationsRun: true,
      }),
    }),
  ],
})
```
>> If you want the migrations not to run automatically then  you can set `migrationsRun: false`

Once this is completed then the setup is complete and the module is ready for execution.

## Changes in `package.json`
```
scripts :{
    ...,
    "typeorm": "ts-node --require tsconfig-paths/register ./node_modules/typeorm/cli.js --config src/db/typeorm.config.ts",
    "migration:generate": "npm run typeorm migration:generate -- -n migration"
}
```
>> If you do not set `--config` parameter typeorm seek a valid configuration file at the root of the project.

## Running the module.
1. Run the following command
```
`npm run migration:generate`
```

2. Check the migration queries which will be formed in the `migrations` folder in the `src/db/migrations` directory.

3. If everything went well, you have up to date entites and a `migrations` table listing applied migrations in the database. 

## References
[TypeORM Migrations]('https://github.com/typeorm/typeorm/blob/master/docs/migrations.md')