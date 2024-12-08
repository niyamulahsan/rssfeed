## Sequelize ORM some command

**Step 1:**
```
npx sequelize-cli init
```

**Step 2: creates migration with models**
```
npx sequelize-cli model:generate --name migration-name --attributes name:string
```

**Step 3: do the migrations now (creating tables in database)**
```
npx sequelize-cli db:migrate --debug
```

**step 4 (Optional): drop all tables**
```
npx sequelize-cli db:migrate:undo:all --debug
```

**step 5 (Optional): drop single table**
```
npx sequelize-cli db:migrate:undo --name migration_file_name.js
```

**step 6 (Optional): migrate single table**
```
npx sequelize-cli db:migrate --name migration_file_name.js
```

**step 7: create seeders (initial data for database tables)**
```
npx sequelize-cli seed:generate --name seeder-name
```

**step 8: push seeders data to database**
```
npx sequelize-cli db:seed:all --debug
```

**step 9 (Optional): drop all seeders data**
```
npx sequelize-cli db:seed:undo:all --debug
```