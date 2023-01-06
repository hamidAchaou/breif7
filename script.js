"use strict";
// =========================== déclaration document html =============================
let cards = document.querySelector("#meal-cards");
let nameMeal = document.querySelector("#nameMeal");
let img = document.querySelector("img");
let data;
/*
================================== Fetch ======================
*/
// function Bring data over the API
async function getRandoumMeals() {
  for (let i = 0; i < 6; i++) {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    data = await response.json();
    showData(0);
  }
}
getRandoumMeals();

// function show data in Cards
function showData(i) {
  let card = "";
  card += `
  <div class="col-4 bg-white">
  <img src="${data.meals[i].strMealThumb}" class="card-img-top px-0">
  <div class="card-body text-center">
    <h3 class="card-title"  id="nameMeal">
        ${data.meals[i].strMeal}
    </h3>
    <button class="btn btn-primary" onclick="getInfo(${data.meals[i].idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal">Go somewhere</button>
  </div>`;
  cards.innerHTML += card;
}

/*
========================== show Data in Modale ===================
*/
async function getInfo(id) {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const dataModal = await response.json();
  console.log(dataModal);
  console.log(response);

  showDataModal();

  function showDataModal() {
    let arrIngredient = "";
    let arrMeasure = "";
    let strIngredient = "";
    let strMeasure = "";

    for (let i = 1; i <= 20; i++) {
      // const element = array[i];
      if (
        dataModal.meals[0]["strIngredient" + i] !== "" &&
        dataModal.meals[0]["strIngredient" + i].length > 0 &&
        dataModal.meals[0]["strIngredient" + i] !== "null"
      ) {
        // console.log('khawya')
        console.log(dataModal.meals[0]["strIngredient" + i]);
        arrIngredient += `<li>${dataModal.meals[0]["strIngredient" + i]}</li>`;
        // dataModal.meals[0]["strIngredient" + i] = myArray
      } else {
        // console.log('tanya')
      }
      if (
        dataModal.meals[0]["strMeasure" + i] !== "" &&
        dataModal.meals[0]["strMeasure" + i] !== " " &&
        dataModal.meals[0]["strMeasure" + i].length > 0 &&
        dataModal.meals[0]["strMeasure" + i] !== "null"
      ) {
        console.log(dataModal.meals[0]["strMeasure" + i]);
        arrMeasure += `<li>${dataModal.meals[0]["strMeasure" + i]}</li>`;
      } else {
        // console.log('tanya')
      }
    }

    let modal = document.querySelector("#modal");
    modal.innerHTML = `
  <h2>${dataModal.meals[0].strMeal}</h2>
  <div class="d-flex justify-content-between">
    <div id="img-vid-modal">
    <img src="${
    dataModal.meals[0].strMealThumb
  }" class="card-img-top w-100 h-15" alt="...">
  <iframe width="100%" height="390" src="${dataModal.meals[0].strYoutube.replace(
      "https://www.youtube.com/watch?v=",
      "https://www.youtube.com/embed/"
    )}" title="Fetching API data and displaying API data inside table." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
  <div style="width: 45%;">
    <div class="d-flex" >
      <div>
        <h3>${dataModal.meals[0].strCategory}</h3>
        <ul>${arrIngredient} </ul>
      </div>
      <div>
        <h3>${dataModal.meals[0].strArea}</h3><br>
        <ul>${arrMeasure}</ul>
      </div>
    </div>
    <p>${dataModal.meals[0].strInstructions}</p>
  </div>
  
  </div>
  `;
  }
}

/*
========================== Serch by Name  ===================
*/

document.getElementById("inputvalue").addEventListener("keyup", function (e) {
  // ========= function Fetch data via API =========
  async function getAllData(e) {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + e.target.value
    );
    const data = await response.json();
    // console.log(data.meals);
    // console.log('grg')
    showDataInserch(e);

// ======== function show Data whght Serch ===============
    function showDataInserch(ele) {
      cards.innerHTML = "";
      if (ele.target.value.length > 0) {
        for (let i = 0; i < data.meals.length; i++) {
          // console.log(i);
          // showData(J);
          let card = "";
          card += `
          <div class="col-4 bg-white">
          <img src="${data.meals[i].strMealThumb}" class="card-img-top px-0">
          <div class="card-body text-center">
            <h3 class="card-title"  id="nameMeal">
                ${data.meals[i].strMeal}
            </h3>
            <button class="btn btn-primary" onclick="getInfo(${data.meals[i].idMeal})" class="btn">Go somewhere</button>
          </div>`;
          cards.innerHTML += card;
        }
      } else {
        getRandoumMeals();
      }
  
  }
}
  getAllData(e);
});

