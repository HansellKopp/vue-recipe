'use strict'

module.exports = function recipef(sequelize, DataTypes) {
  var recipe = sequelize.define('recipe', {
    // idCategory: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: DataTypes.INTEGER
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    difficulty: {
    	type: DataTypes.INTEGER,
    	defaultValue: 0
    },
    portion: {
    	type: DataTypes.INTEGER,
    	defaultValue: 0
    },
    preparation: {
    	type: DataTypes.TEXT
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  recipe.associate = function(models) {
    // associations can be defined here
    recipe.hasMany(models.recipeCategory, {as: 'categories', foreignKey: 'recipeId', sourceKey: 'id'}),
    recipe.hasMany(models.recipeIngredient,{as: 'ingredients', foreignKey: 'recipeId', sourceKey: 'id'})
    // recipe.hasMany(models.recipeIngredient)
    // recipe.hasMany(models.recipeIngredient, {as: 'ingredients', foreignKey: 'categoriId'}),)
    // measure.hasMany(models.ingredient, {as: 'ingredient', foreignKey: 'measureId'}) //, {as: 'ingredient', foreignKey: 'id'})
  }
  return recipe
}
