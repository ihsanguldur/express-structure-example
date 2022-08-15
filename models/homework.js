'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Homework extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Homework.init({
        subject: DataTypes.STRING,
        teacherID: DataTypes.INTEGER,
        studentID: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Homework',
    });
    return Homework;
};