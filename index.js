//Declaring the API-URL
const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"

// console.log("JS is connected!")
const heading = document.getElementById("heading");
const dictionary = document.getElementById("dictionary");
const wordInput = document.getElementById("wordInput");
const word = document.getElementById("word");
const Results = document.getElementById("Results");

// Listening for form submission
dictionary.addEventListener("submit", function(event) {

    event.preventDefault();
}
)
fetch(API_URL) 