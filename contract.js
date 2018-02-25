module.exports = (sequelize, DataTypes) => {
    return sequelize.define('contracts', {
        contracttype: DataTypes.STRING,
        name: DataTypes.STRING,
        businessnumber: DataTypes.BIGINT,
        amountrequested: DataTypes.INTEGER,
        status: DataTypes.STRING,
        activationdate: DataTypes.DATE
    })
}