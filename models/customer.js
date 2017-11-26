module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    customer: {
      type: DataTypes.STRING,
      //customer should have a name
      allowNull: false
    }
  });
  return Customer;
};
