const app = Vue.createApp({
    data() {
        return {
            threeCourse: {
                starter: [],
                dinner: [],
                dessert: []
            },
            currentIndex: {
                starter: 0,
                dinner: 0,
                dessert: 0
            },
            selectedRecipes: {
                starter: null,
                dinner: null,
                dessert: null,
                shoppingList: null
            },
            ingredients: []
        };
    },
    computed: {
        currentStarter() {
            return this.threeCourse.starter[this.currentIndex.starter];
        },
        currentDinner() {
            return this.threeCourse.dinner[this.currentIndex.dinner];
        },
        currentDessert() {
            return this.threeCourse.dessert[this.currentIndex.dessert];
        },
        currentShoppingList() {
            const allRecipes = [this.selectedRecipes.starter, this.selectedRecipes.dinner, this.selectedRecipes.dessert];
            const allIngredients = allRecipes.flatMap(recipe => recipe ? recipe.recipe : []);

            const ingredientQuantities = new Map();
            allIngredients.forEach(ingredient => {
                if (ingredientQuantities.has(ingredient.i_id)) {
                    ingredientQuantities.set(ingredient.i_id, ingredientQuantities.get(ingredient.i_id) + ingredient.quantity);
                } else {
                    ingredientQuantities.set(ingredient.i_id, ingredient.quantity);
                }
            });

            const uniqueIngredients = Array.from(ingredientQuantities.entries()).map(([i_id, quantity]) => {
                const ingredient = allIngredients.find(ing => ing.i_id === i_id);
                return { ...ingredient, quantity };
            });

            return uniqueIngredients;
        }
    },
    methods: {
        changeCourse(type, index) {
            this.currentIndex[type] = index;
        },
        recipesbtn() {
            this.selectedRecipes = {
                starter: this.currentStarter,
                dinner: this.currentDinner,
                dessert: this.currentDessert,
                shoppingList: this.currentShoppingList
            };
        },
        getIngredients(id) {
            for (let i = 0; i < this.ingredients.length; i++) {
                if (this.ingredients[i].id === id) {
                    return this.ingredients[i];
                }
            }
        }
    },
    mounted() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                this.threeCourse.starter = data.starter;
                this.threeCourse.dinner = data.dinner;
                this.threeCourse.dessert = data.dessert;
                this.ingredients = data.ingredients;
            });
    }
});

app.mount('#app');