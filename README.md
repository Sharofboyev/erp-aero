# erp-aero
Test project for erp-aero

Clone this repository for using.

You should have MySQL Server for running this application.
If your MySQL server has version 8.0 or higher, please run: 
```SQL
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourRootPassword';
```

After cloning git repository, enter to the project. Create .env file. You can get information about which environment variables are required, in .default.env file.
```env
APP_PORT=2022
SECRET_KEY=erp_aero_key
REFRESH_TOKEN_SECRET_KEY=erp_aero_refresh_key
TOKEN_LIFE=3000
REFRESH_TOKEN_LIFE=86400
DB_HOST=localhost
DB_PORT=3306
DB_NAME=main
DB_USER=root
DB_PASSWORD=mypassword
```

After changing saving .env file, run
```bash
npm run build
```

This will compile typescript code to node js. Then run
```bash 
npm start
```