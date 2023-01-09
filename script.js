"use strict";
// =========================== déclaration document html =============================
let cards = document.querySelector("#meal-cards");
let nameMeal = document.querySelector("#nameMeal");
let img = document.querySelector("img");
let modal = document.querySelector("#modal");
let allCategoryNames = document.querySelector("#all-category");
let allRegionNames = document.querySelector("#all-Region");
let btnSearch = document.getElementById("search");
let region = document.getElementById("all-Region");
let categoryvalue = document.getElementById("all-category");
let selectRegion = document.getElementById("all-Region");
let selectCtegory = document.getElementById("all-category");
let foundedarr = [];
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
    // console.log(data.meals);
    showData(data.meals);
  }
}
getRandoumMeals();

// function show data in Cards
function showData(array) {
  // console.log(array);
  let card = "";
  for (let i = 0; i < array.length; i++) {
    card = `
    <div class="col-4 bg-white mr-3">
    <img src="${array[i].strMealThumb}" class="card-img-top px-0">
    <div class="card-body text-center">
      <h3 class="card-title"  id="nameMeal">
          ${array[i].strMeal}
      </h3>
      <button class="btn btn-primary" onclick="getInfo(${array[i].idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal">Go somewhere</button>
    </div></div>`;
    cards.innerHTML += card;
  }
}

/*
========================== show Data in Modale ===================
*/
async function getInfo(id) {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const dataModal = await response.json();
  // console.log(dataModal);
  // console.log(response);

  showDataModal();

  // The function of displaying data about the meal in the modal
  function showDataModal() {
    let arrIngredient = "";
    let arrMeasure = "";
    let strIngredient = "";
    let strMeasure = "";

    for (let i = 1; i <= 20; i++) {
      //lop in meals for get gredient ana Measure
      //condition for gredient
      if (
        dataModal.meals[0]["strIngredient" + i] !== "" &&
        dataModal.meals[0]["strIngredient" + i].length > 0 &&
        dataModal.meals[0]["strIngredient" + i] !== "null"
      ) {
        arrIngredient += `<li>${dataModal.meals[0]["strIngredient" + i]}</li>`;
      } else {
      }
      //condition for  Measure
      if (
        dataModal.meals[0]["strMeasure" + i] !== "" &&
        dataModal.meals[0]["strMeasure" + i] !== " " &&
        dataModal.meals[0]["strMeasure" + i].length > 0 &&
        dataModal.meals[0]["strMeasure" + i] !== "null"
      ) {
        arrMeasure += `<li>${dataModal.meals[0]["strMeasure" + i]}</li>`;
      } else {
      }
    }

    // show data in modal
    modal.innerHTML = `
  <h2>${dataModal.meals[0].strMeal}</h2>
  <h3>${dataModal.meals[0].strArea}</h3>
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
========================== Serch by Name (keyup)  ===================
*/
document.getElementById("inputvalue").addEventListener("keyup", function (e) {
  // function get data (fetch)
  async function getAllData(e) {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + e.target.value
    );
    const data = await response.json();

    showDataInserch(e);

    // ======== function show Data whght Serch ===============
    function showDataInserch(ele) {
      cards.innerHTML = "";
      if (ele.target.value.length > 0) {
        showData(data.meals);
      } else {
        getRandoumMeals();
      }
    }
  }
  getAllData(e);
});

// get data of category
let arrAllCateg = [];
async function getAllCategory() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
  );
  const allCategory = await response.json();
  console.log(allCategory);
  arrAllCateg.push(allCategory);

  // loop in array (all category)  for get name all  category
  allCategory.meals.map(function (category) {
    allCategoryNames.innerHTML += `
          <option>${category.strCategory}</option>
    `;
  });
}
// console.log(arrAllCateg);

getAllCategory();

// get data of Region
let arrAllAria = [];
async function getAllRegion() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  const allRegion = await response.json();
  console.log(arrAllAria);
  arrAllAria.push(allRegion);

  // loop in array (all category)  for get name all Region
  // if ((Region.strArea = "Moroccan")) {
  //   selectRegion.value.setAttribute("selected", "true");
  //   console.log(selectRegion);
  // }
  allRegion.meals.map(function (Region) {
    allRegionNames.innerHTML += `
          <option value="${Region.strArea}" >${Region.strArea}</option>
    `;
  });
}

getAllRegion();

/*
==========================   ===================
*/
async function serByCateg(e) {
  // console.log(region.value);
  const resPonse = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + region.value
  );
  const data = await resPonse.json();
  // ============---------------------------
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=" +
      categoryvalue.value
  );
  const category = await response.json();

  foundedarr.length = 0;
  cards.innerHTML = "";
  // Loop fetching elements that have the same id and stored in a variable
  for (let h = 0; h < category.meals.length; h++) {
    for (let k = 0; k < data.meals.length; k++) {
      if (data.meals[k].idMeal == category.meals[h].idMeal) {
        foundedarr.push(data.meals[k]);
        // showData(k);
      }
    }
  }

  showData(foundedarr);
}
// =================== function get regio ================================
async function getvalueofregion(e) {
  cards.innerHTML = "";
  const resPonse = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + e
  );
  const data = await resPonse.json();

  showData(data.meals);
}
// =================== function get regio ================================
async function getvalueofcategory(e) {
  cards.innerHTML = "";
  const resPonse = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + e
  );
  const data = await resPonse.json();
  showData(data.meals);
}

// function all category
function allCateg() {
  console.log(arrAllCateg);
  console.log(arrAllAria);

  
}
allCateg();
