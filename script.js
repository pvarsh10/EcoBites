// Replace 'YOUR_APP_ID' and 'YOUR_APP_KEY' with your Edamam API credentials
const appId = '331b243d';
const appKey = 'b9ec33ea5d4b833c36082a2aa10bd273';
let recipes = [];

function generateRecipes() {
    const ingredientsInput = document.getElementById('ingredientsInput');
    const recipeListContainer = document.getElementById('recipe');
    const ingredients = ingredientsInput.value;

    // Make a GET request to the Edamam Recipe API
    fetch(`https://api.edamam.com/search?q=${ingredients}&app_id=${appId}&app_key=${appKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.hits && data.hits.length > 0) {
                const recipes = data.hits.map(hit => hit.recipe);

                // Clear previous recipes
                recipeListContainer.innerHTML = '';

                // Display each recipe title as a link
                recipes.forEach((recipe, index) => {
                    const recipeItem = document.createElement('li');
                    const recipeLink = document.createElement('a');
                    const recipeImage = document.createElement('img');
                    recipeLink.href = "#";
                    recipeLink.textContent = recipe.label;
                    recipeLink.onclick = () => viewRecipeDetails(recipe);
                    recipeImage.src = recipe.image;
                    recipeImage.alt = recipe.label;
                    recipeItem.appendChild(recipeImage);
                    recipeItem.appendChild(recipeLink);
                    recipeListContainer.appendChild(recipeItem);
                });

                // Create the white space div
                const whitespaceDiv = document.createElement('div');
                whitespaceDiv.style.height = '100px'; // Adjust the height as needed
                recipeListContainer.appendChild(whitespaceDiv);
            } else {
                recipeListContainer.innerHTML = '<p>No recipes found with these ingredients.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            recipeListContainer.innerHTML = '<p>An error occurred while fetching the recipes.</p>';
        });
}

function viewRecipeDetails(recipe) {
    const recipeListContainer = document.getElementById('recipe');
    recipeListContainer.innerHTML = `
        <h2>${recipe.label}</h2>
        <img src="${recipe.image}" alt="${recipe.label}">
        <h3>Ingredients:</h3>
        <ul>
            ${recipe.ingredients.map(ingredient => `<li>${ingredient.text}</li>`).join('')}
        </ul>
        <h3>Procedure:</h3>
        <ol>
            ${recipe.url
        ? `<li><a href="${recipe.url}" target="_blank">Link to the Recipe :${recipe.source}</a></li>`
        : '<li>No procedure available for this recipe.</li>'
        }
        </ol>

        <h3>Cuisine Type:</h3>
        <p>${recipe.cuisineType || 'Not specified'}</p>
        <h3>Meal Type:</h3>
        <p>${recipe.mealType || 'Not specified'}</p>
        <h3>Calories:</h3>
        <p>${recipe.calories || 'Not specified'}</p>
        <h3>Diet Labels:</h3>
        <p>${recipe.dietLabels && recipe.dietLabels.length > 0 ? recipe.dietLabels.join(', ') : 'Not specified'}</p>
        <h3>Health Labels:</h3>
        <p>${recipe.healthLabels && recipe.healthLabels.length > 0 ? recipe.healthLabels.join(', ') : 'Not specified'}</p>
        <button onclick="goBack()">Back to Recipes</button>
    `;
}

function goBack() {
    generateRecipes();
}

