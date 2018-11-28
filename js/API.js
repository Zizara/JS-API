class API {


    //Search Cocktails by Name
    async getCoctailsName(name) {
        //получить url
        const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        //получить JSON
        const contails = await url.json();
        //возратить оббект 
        return {
            contails
        }
    }

    //Search Cocktails by Ingredient
    async getCoctailsIngredient(name) {
        //получить url
        const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);
        //получить JSON
        const contails = await url.json();
        //возратить оббект 
        return {
            contails
        }
    }

    //Модальное окно
    async getURLForModal(id) {
         //получить url
         const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
         //получить JSON
         const recipeForModal = await url.json();
         //возратить оббект 
         return {
            recipeForModal
         }
    }

    //Search Cocktails by Category (list)
    async getURLCategoryList() {
         //получить url
         const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);
         //получить JSON
         const listCategory = await url.json();
         //возратить оббект 
         return {
            listCategory
         }
    }

    //Search Cocktails by Category
    async getURLCategory(name) {
         //получить url
         const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`);
         //получить JSON
         const contails = await url.json();
         //возратить оббект 
         return {
            contails
         }
    }

    //Search Cocktails by Alcohol / Non Alcohol
    async getURLAlcohol(name) {
         //получить url
         const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${name}`);
         //получить JSON
         const contails = await url.json();
         //возратить оббект 
         return {
            contails
         }
    }
}