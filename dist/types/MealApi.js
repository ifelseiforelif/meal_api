class MealApi {
    _URL_SEARCH = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    _URL_CATEGORIES = "https://www.themealdb.com/api/json/v1/1/categories.php";
    async getCategories() {
        const response = await fetch(this._URL_CATEGORIES);
        const data = await response.json();
        return data.categories;
    }
    async getMealsByName(name) {
        const response = await fetch(`${this._URL_SEARCH}${name}`);
        const data = await response.json();
        return data.meals;
    }
}
export default MealApi;
