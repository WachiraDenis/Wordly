
// 1. Declaring the API URL
const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// 2. Connecting JavaScript to HTML
const heading = document.getElementById("heading");
const dictionary = document.getElementById("dictionary");
const wordInput = document.getElementById("wordInput");
const Results = document.getElementById("Results");
const audioPlayer = document.getElementById("audioPlayer");

// 3. Listening for form submission
dictionary.addEventListener("submit", function(event) {

    event.preventDefault();

    // 4. Getting the word entered by the user
    const searchWord = wordInput.value.trim();

    if (!searchWord) {
        Results.innerHTML = "Please enter a word.";
        return;
    }

    // 5. Fetching data from the API
    fetch(API_URL + encodeURIComponent(searchWord))

        .then(response => {
            if (!response.ok) {
                throw new Error("Word not found!");
            }

            return response.json();
        })

        .then(data => {

            // 6. Displaying the meaning
            Results.innerHTML =
                data[0].meanings[0].definitions[0].definition;

            // 7. Finding available pronunciation audio
            const audioData = data[0].phonetics.find(item =>
                item.audio && item.audio.trim() !== ""
            );

            // 8. Playing pronunciation audio
            if (audioData) {

                audioPlayer.src = audioData.audio;
                audioPlayer.style.display = "block";
                audioPlayer.controls = true;
                audioPlayer.load();

            } else {

                audioPlayer.style.display = "none";

                Results.innerHTML +=
                    "<p>Pronunciation audio is unavailable.</p>";
            }

        })

        // 9. Handling errors
        .catch(error => {

            Results.innerHTML = error.message;

            audioPlayer.removeAttribute("src");
            audioPlayer.load();

        });

});
