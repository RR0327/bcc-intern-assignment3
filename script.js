let container = document.querySelector(".container");
let country_input = document.querySelector(".countryinput");
let button = document.querySelector(".btn");

async function food(country){
    container.innerHTML = "<p class='text-center text-gray-600'>Loading...</p>";
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
    let object = await response.json();
    let meals = object.meals;

    container.innerHTML= "";

    if (!meals) {
        container.innerHTML="<p class='text-center text-sky-500 text-lg'>No meals found for this country</p>";
        return;
    }
    
    for(let meal of meals){
        let div = document.createElement("div");
        div.className = "card bg-white";

        let img = document.createElement("img");
        img.src= meal.strMealThumb;
        img.className = "image mb-3";
        img.alt = meal.strMeal;

        let h2 = document.createElement("h2");
        h2.textContent = meal.strMeal;
        h2.className = "font-semibold text-blue-700";

        div.appendChild(img);
        div.appendChild(h2);
        container.appendChild(div);
    }
}

button.addEventListener("click", ()=>{
    let country = country_input.value.trim();
    if (country) {
        food(country);
    } else {
        container.innerHTML = "<p class='text-center text-sky-500'>Please enter a country name</p>";
    }
});

country_input.addEventListener("keypress", (e)=>{
    let country = country_input.value.trim();
    if (e.key === "Enter" && country){
        food(country);
    }
});