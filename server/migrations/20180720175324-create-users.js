module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      // autoIncrement: true,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    social_id: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    social_token: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    img_url: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
