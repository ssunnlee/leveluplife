export const getEdamamData = async (dietParams, calories) => {
  const app_key = "72e6bd9b5b1aea4ede7eefefc7c7a623";
  const app_id = "b1e4fb06";

  const API_URL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&${dietParams}mealType=Breakfast&mealType=Dinner&mealType=Lunch&dishType=Main%20course&calories=${calories}&imageSize=THUMBNAIL&random=true&nutrients%5BCHOLE%5D=0-100&field=label&field=ingredients&field=image&field=source&field=url&field=calories&field=totalNutrients&field=yield`;
  fetch(API_URL)
    .then(function (resp) {
      return resp.json();
    }) // Convert data to json
    .then(function (data) {
      //console.log(data);
      //   console.log(data.hits[0].recipe.calories);
      //   console.log(data.hits[0].recipe.yield);
      //   console.log(data.hits[0].recipe.image);
      //   console.log(data.hits[0].recipe.url);

      //console.log(data.hits[0].recipe.ingredients.text);

      var sortedData = data.hits;
      sortedData.sort(function (a, b) {
        return (
          a.recipe.calories / a.recipe.yield -
          b.recipe.calories / b.recipe.yield
        );
      });

      object3 = [];

      for (let i = 0; i < 3; i++) {
        //console.log("INDEX_-------------------", i);
        var ingredients = "";

        for (let j = 0; j < sortedData[i].recipe.ingredients.length; j++) {
          ingredients += `${j + 1}. ${sortedData[i].recipe.ingredients[j].text
            }\n`;
        }

        var obj = {};

        obj["label"] = sortedData[i].recipe.label;
        obj["ingredientString"] = ingredients;
        obj["image"] = sortedData[i].recipe.image;
        obj["url"] = sortedData[i].recipe.url;

        object3.push(obj);
      }

      // Returns a list of 3 dictionaries
      // keys: {label, ingredientString, image, url}
      // Label is recipe name, ingredientString = Numbered List string, image = image of food , url = link to recipe
      //   for (let i = 0; i < 3; i++) {
      //     console.log("----------------------------------------------------");
      //     console.log("----------------------------------------------------");
      //     console.log("----------------------------------------------------");
      //     console.log(object3[i].label);
      //   }
      //console.log("returning object3", object3);
      console.log("returning");
      return object3;
    })
    .catch(function (error) {
      // catch any errors
      console.log(error.code, error.message);
      Alert.alert('Recipe Error', 'An error occured while getting your recipe', [
        { text: 'OK' },
      ]);
    });
  console.log("finishing");
};
