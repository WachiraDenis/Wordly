
// Declaring the API URL
const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// Connecting JavaScript to HTML
const heading = document.getElementById("heading");
const dictionary = document.getElementById("dictionary");
const wordInput = document.getElementById("wordInput");
const Results = document.getElementById("Results");
const audioPlayer = document.getElementById("audioPlayer");

// Listening for form submission
dictionary.addEventListener("submit", function(event) {

    event.preventDefault();

    // Getting the word entered by the user
    const searchWord = wordInput.value.trim();

    // Fetching data from the API
    fetch(API_URL + searchWord)

        .then(response => {
            if (!response.ok) {
                throw new Error("Word not found!");
            }
            return response.json();
        })

        .then(data => {

            // Displaying the meaning
            Results.innerHTML = data[0].meanings[0].definitions[0].definition;

            // Getting pronunciation audio
            const audio = data[0].phonetics.find(item => item.audio);

if (audio) {
    audioPlayer.src = audio.audio;
    audioPlayer.style.display = "block";

    audioPlayer.play();

            } else {
                audioPlayer.style.display = "none";
                Results.innerHTML += "<p>Audio pronunciation is unavailable.</p>";
            }

        })

            // Find an available pronunciation audio URL
            const audioData = data[0].phonetics.find(item =>
                item.audio && item.audio.trim() !== ""
            );


        .catch(error => {
            Results.innerHTML = error.message;
            audioPlayer.removeAttribute("src");
        });

});
