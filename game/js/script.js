const words = [
    "random", "puzzle", "difficult", "elephant", "umbrella", "mystery",
    "football", "butterfly", "adventure", "knowledge", "javascript",
    "university", "challenge", "mountain", "telephone", "breakfast",
    "television", "waterfall", "celebration", "motivation", "playground",
    "backstage", "transform", "volunteer", "chocolate", "blueprint"
]; // Ensure this contains 3000+ words in the final version
let selectedWord, displayWord, attempts, difficulty;
let hollywoodLetters = document.querySelectorAll("#hollywoodDisplay span");

function setDifficulty(level) {
    difficulty = level;
    document.getElementById("difficultySelection").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    initializeGame();
}

function getFilteredWord() {
    let filteredWords;
    if (difficulty === 'easy') {
        filteredWords = words.filter(word => word.length >= 5 && word.length <= 6);
    } else if (difficulty === 'moderate') {
        filteredWords = words.filter(word => word.length >= 7 && word.length <= 8);
    } else {
        filteredWords = words.filter(word => word.length >= 9 && word.length <= 15);
    }
    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

function initializeGame() {
    selectedWord = getFilteredWord();
    displayWord = "_".repeat(selectedWord.length).split(""); // Show dashes instead of letters
    attempts = 9;
    hollywoodLetters.forEach(letter => letter.classList.remove("strike"));
    document.getElementById("wordDisplay").innerText = displayWord.join(" ");
    document.getElementById("message").innerText = "";
}

function updateHollywood() {
    let strikeIndex = 9 - attempts;
    if (strikeIndex < hollywoodLetters.length) {
        hollywoodLetters[strikeIndex].classList.add("strike");
    }
}

function showPopup(text, isWin) {
    const popup = document.getElementById("popup");
    popup.innerText = text;
    popup.style.display = "block";
    popup.style.backgroundColor = isWin ? "green" : "red";

    setTimeout(() => {
        popup.style.display = "none";
        initializeGame();
    }, 2000);
}

function checkGuess() {
    let guess = document.getElementById("guessInput").value.toLowerCase();
    document.getElementById("guessInput").value = "";
    let found = false;

    if (guess.length === 1 && /^[a-z]$/.test(guess)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guess && displayWord[i] === "_") {
                displayWord[i] = guess;
                found = true;
            }
        }
        
        if (!found) {
            attempts--;
            document.getElementById("message").innerText = `Wrong guess! Attempts left: ${attempts}`;
            updateHollywood();
        }
        
        document.getElementById("wordDisplay").innerText = displayWord.join(" ");
    }

    if (!displayWord.includes("_")) {
        showPopup("🎉 Congratulations! You Won! 🎉", true);
    } else if (attempts === 0) {
        showPopup(`😢 Better luck next time! The word was "${selectedWord}"`, false);
    }
}

document.getElementById("guessButton").addEventListener("click", checkGuess);
