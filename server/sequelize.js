import { Sequelize } from "sequelize";


const sequelize = new Sequelize("Dungeon", "postgres", "admin", {
    host:"localhost", 
    dialect:"postgres",
    logging: false
})
export default sequelize
