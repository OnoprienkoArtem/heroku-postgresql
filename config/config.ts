const config = {
  development: {
    username: "",
    password: "",
    database: "",
    host: "",
      dialect: 'postgres',
      dialectOptions: {
          ssl: {
              require: true,
              rejectUnauthorized: false
          }
      }
  }
}

export default config.development;


