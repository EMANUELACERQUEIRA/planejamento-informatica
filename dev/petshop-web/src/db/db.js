import Sequelize from 'sequelize';

const con = new Sequelize('database', process.env.USER, process.env.PASSWORD,{
  dialect: 'sqlite',
  storage: './petshop.sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

try {
  await con.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default con;