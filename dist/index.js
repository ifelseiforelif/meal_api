import MealApi from "./types/MealApi.js";
const form = document.getElementById("find-form");
displayCategories();
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
function displayCategories() {
    const mealApi = new MealApi();
    mealApi.getCategories().then((categories) => {
        const container = document.getElementById("categories-container");
        categories.forEach((category) => {
            const col = document.createElement("div");
            col.classList.add("col-md-3");
            const img = document.createElement("img");
            img.src = category.strCategoryThumb;
            img.alt = category.strCategory;
            img.style.width = "100%";
            img.style.borderRadius = "8px";
            img.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            img.style.transition = "transform 0.3s ease";
            img.addEventListener("mouseover", () => {
                img.style.transform = "scale(1.05)";
            });
            col.appendChild(img);
            container.appendChild(col);
            const button = document.createElement("button");
            button.classList.add("btn", "btn-outline-primary", "w-100");
            button.setAttribute("data-category", JSON.stringify(category));
            button.setAttribute("data-bs-toggle", "modal");
            button.setAttribute("data-bs-target", "#mealModal");
            button.textContent = category.strCategory;
            col.appendChild(button);
            container.appendChild(col);
            button.addEventListener("click", () => {
                const category = JSON.parse(button.getAttribute("data-category"));
                const modal = document.getElementById("mealModal");
                if (modal !== null) {
                    modal.querySelector(".modal-title").textContent =
                        category.strCategory;
                    const modalBody = modal.querySelector(".modal-body");
                    modalBody.innerHTML = `
          <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="img-fluid mb-3" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <p>${category.strCategoryDescription}</p>
        `;
                }
            });
        });
    });
}
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const mealApi = new MealApi();
        mealApi.getMealsByName(data.search).then((meals) => {
            displayMeals(meals);
        });
    });
}
