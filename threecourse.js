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
            const allRecipes = [this.currentStarter, this.currentDinner, this.currentDessert];
            const allIngredients = allRecipes.flatMap(recipe => recipe ? recipe.recipe : []);

            const uniqueIngredientsMap = new Map();
            allIngredients.forEach(ingredient => {
                if (!uniqueIngredientsMap.has(ingredient.i_id)) {
                    uniqueIngredientsMap.set(ingredient.i_id, { ...ingredient });
                }
            });

            const uniqueIngredients = Array.from(uniqueIngredientsMap.values());

            return uniqueIngredients;
        }
    },
    methods: {
        prev(type) {
            this.currentIndex[type] = (this.currentIndex[type] - 1 + this.threeCourse[type].length) % this.threeCourse[type].length;
        },
        next(type) {
            this.currentIndex[type] = (this.currentIndex[type] + 1) % this.threeCourse[type].length;
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