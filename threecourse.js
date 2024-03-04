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
                dessert: null
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
        }
    },
    methods: {
        prev(type) {
            this.currentIndex[type] = (this.currentIndex[type] - 1 + this.threeCourse[type].length) % this.threeCourse[type].length;
        },
        next(type) {
            this.currentIndex[type] = (this.currentIndex[type] + 1) % this.threeCourse[type].length;
        },
        recipesbtn(){
            this.selectedRecipes = {
                starter: this.currentStarter,
                dinner: this.currentDinner,
                dessert: this.currentDessert
            };
            this.getIngredients();
        },
        getIngredients() {
            this.ingredients = [];
            if (this.selectedRecipes.starter) {
                this.selectedRecipes.starter.ingredients.forEach(ingredient => {
                    const ingredientInfo = this.findIngredientById(ingredient.id);
                    this.ingredients.push({
                        name: ingredientInfo.name,
                        quantity: ingredient.quantity
                    });
                });
            }
            if (this.selectedRecipes.dinner) {
                this.selectedRecipes.dinner.ingredients.forEach(ingredient => {
                    const ingredientInfo = this.findIngredientById(ingredient.id);
                    this.ingredients.push({
                        name: ingredientInfo.name,
                        quantity: ingredient.quantity
                    });
                });
            }
            if (this.selectedRecipes.dessert) {
                this.selectedRecipes.dessert.ingredients.forEach(ingredient => {
                    const ingredientInfo = this.findIngredientById(ingredient.id);
                    console.log("Ingredient ID:", ingredient.id);
                    console.log("Ingredient info:", ingredientInfo);
                    this.ingredients.push({
                        name: ingredientInfo.name,
                        quantity: ingredient.quantity
                    });
                });
            }
        },
        findIngredientById(ingredientid) {
            const ingredient = this.ingredients.find(item => item.id === ingredientid);
            return ingredient ? ingredient.name : 'Unknown Ingredient';
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