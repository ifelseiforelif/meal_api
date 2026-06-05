const form = document.getElementById("find-form");
const _URL_SEARCH = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
async function getMealsByName(name) {
    const response = await fetch(`${_URL_SEARCH}${name}`);
    const data = await response.json();
    return data.meals;
}
function displayMeals(meals) {
    const container = document.querySelector(".container");
    if (meals.length === 0) {
        container.innerHTML = "<p>Нічого не знайдено</p>";
        return;
    }
    if (meals[0]) {
        const section = document.getElementById("search-results");
        const container = document.getElementById("search-results-container");
        container.innerHTML = "";
        section.style.display = "block";
        const img = document.createElement("img");
        img.src = meals[0].strMealThumb;
        img.alt = meals[0].strMeal;
        img.style.maxWidth = "300px";
        img.style.borderRadius = "8px";
        img.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        img.style.transition = "transform 0.3s ease";
        img.addEventListener("mouseover", () => {
            img.style.transform = "scale(1.05)";
        });
        img.classList.add("img-fluid", "mb-3");
        container.appendChild(img);
        const title = document.createElement("h3");
        title.textContent = meals[0].strMeal;
        container.appendChild(title);
    }
}
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        getMealsByName(data.search).then((meals) => {
            displayMeals(meals);
        });
    });
}
export {};
