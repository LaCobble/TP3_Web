async function getCountry() {
    const url = await fetch("https://restcountries.com/v3.1/all");
    const res = await url.json();

    var listCountry = document.getElementById("list-country");
    listCountry.innerHTML = "";

    res.forEach(element => {
        showCountry(element);
    });

    var elt = document.querySelector('select');
    elt.disabled = false;
}

async function getCountryByRegion(country) {
    const url = await fetch("https://restcountries.com/v3.1/region/" + country);
    const res = await url.json();

    var listCountry = document.getElementById("list-country");
    listCountry.innerHTML = "";

    res.forEach(element => {
        showCountry(element);
    });
}

async function searchCountry() {
    var search = document.getElementById("search").value;
    document.getElementById("search").value = "";

    console.log(search);
    const url = await fetch("https://restcountries.com/v3.1/name/" + search);
    const res = await url.json();

    var listCountry = document.getElementById("list-country");
    listCountry.innerHTML = "";


    res.forEach(element => {
        showCountry(element);
    });
}

function showCountry(element) {
    var listCountry = document.getElementById("list-country");

    var country = document.createElement("div");
    country.setAttribute("class", "country");

    var countryName = document.createElement("h4");
    countryName.setAttribute("class", "country-title");
    countryName.innerHTML = element.name.common;

    var countryDiv = document.createElement("div");
    countryDiv.setAttribute("class", "country-flag");

    var countryFlag = document.createElement("img");
    countryFlag.setAttribute("src", element.flags.png);
    countryFlag.setAttribute("alt", element.name);

    countryDiv.appendChild(countryFlag);

    var countryPopulation = document.createElement("p");
    countryPopulation.setAttribute("class", "sub-title");
    countryPopulation.innerHTML = "Population: " + element.population;

    var countryRegion = document.createElement("p");
    countryRegion.setAttribute("class", "sub-title");
    countryRegion.innerHTML = "Region: " + element.region;

    var countryCapital = document.createElement("p");
    countryCapital.setAttribute("class", "sub-title");
    countryCapital.innerHTML = "Capital: " + element.capital;

    country.appendChild(countryName);
    country.appendChild(countryDiv);
    country.appendChild(countryPopulation);
    country.appendChild(countryRegion);
    country.appendChild(countryCapital);

    listCountry.appendChild(country);
}

async function toggleLightMode() {
    var body = document.querySelector('body');
    var lightModeBtn = document.querySelector('#light-mode-btn');
    var input = document.querySelector('input');
    var select = document.querySelector('#select');
    var selectOptions = document.querySelectorAll('#select option');
    var countries = document.querySelectorAll('.country');
    var h1 = document.querySelector('h1');

    if (lightModeBtn.innerHTML === 'Light Mode') {
        lightModeBtn.innerHTML = 'Dark Mode';
    } else {
        lightModeBtn.innerHTML = 'Light Mode';
    }

    body.classList.toggle('light-mode');
    lightModeBtn.classList.toggle('light-mode');
    input.classList.toggle('light-mode');
    select.classList.toggle('light-mode');
    h1.classList.toggle('light-mode');

    for (var i = 0; i < selectOptions.length; i++) {
        selectOptions[i].classList.toggle('light-mode');
    }

    for (var i = 0; i < countries.length; i++) {
        countries[i].classList.toggle('light-mode');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var elt = document.querySelector('select');
    elt.disabled = true;

    getCountry();

    var searchInput = document.querySelector("#search");
    searchInput.addEventListener("input", function(event) {
        var searchQuery = event.target.value.toLowerCase();
        var countries = document.querySelectorAll('.country');

        for (var i = 0; i < countries.length; i++) {
            var title = countries[i].querySelector('.country-title').textContent.toLowerCase();
            var subTitle = countries[i].querySelector('.sub-title').textContent.toLowerCase();

            if (title.includes(searchQuery) || subTitle.includes(searchQuery)) {
                countries[i].style.display = "block";
            } else {
                countries[i].style.display = "none";
            }
        }
    });

    var select = document.querySelector('#select');
    select.addEventListener('change', function(event) {
        if (event.target.value === '') {
            getCountry();
        } else {
            getCountryByRegion(event.target.value);
        }
    });
});

var elt = document.querySelector('select');
elt.selectedIndex = 0;
elt.disabled = true;
getCountry("Americas");

elt.addEventListener('change', function () {
    if(this.value == 0) {
        getCountry();
    } else {
        getCountryByRegion(this.value);
    }
})
