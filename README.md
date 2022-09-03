# erp-aero
Test project for erp-aero

Clone this repository for using.

You should have MySQL Server for running this application.
If your MySQL server has version 8.0 or higher, please run: 
```{ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourRootPassword';}```

After cloning git repository, enter to the project. Create .env file. You can get information about which environment variables are required, in .default.env file.

After changing saving .env file, run
```{bash} {npm run build}```

This will compile typescript code to node js. Then run
```{bash} {npm start}```