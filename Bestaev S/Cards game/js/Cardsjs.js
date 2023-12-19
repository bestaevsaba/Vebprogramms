const emojiArray = ["😀", "😎", "😍", "🚀", "🌈"];
const shuffledEmoji = [...emojiArray, ...emojiArray].sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;

function flipCard(index) {

    const card = document.getElementById(`card${index}`);
    card.textContent = shuffledEmoji[index];
    if (card.classList.contains('matched')) {
        return; 
    }

    if (!firstCard) {
        firstCard = { index, emoji: shuffledEmoji[index] };
    } else if (!secondCard) {
        secondCard = { index, emoji: shuffledEmoji[index] };
        setTimeout(checkMatch, 100);
    }
}

function checkMatch() {
    if (firstCard && secondCard && firstCard.emoji === secondCard.emoji && firstCard.index !== secondCard.index) {
        markAsMatched(firstCard.index, secondCard.index);
    } else {
        closeCards(firstCard.index, secondCard.index);
    }

    firstCard = null;
    secondCard = null;

    if (document.querySelectorAll('.matched').length === shuffledEmoji.length) {
        setTimeout(() => {
            alert("Поздравляем! Вы победили!");
            location.reload(); 
        }, 500);
    }
}

function markAsMatched(index1, index2) {
    document.getElementById(`card${index1}`).className = "matched";
    document.getElementById(`card${index2}`).className = "matched";
}

function closeCards(index1, index2) {
    document.getElementById(`card${index1}`).textContent = "";
    document.getElementById(`card${index2}`).textContent = "";
}

function createGameTable() {
    const container = document.createElement("div");
    container.style.position = "relative";
    container.className = "container";

    const table = document.createElement("table");

    for (let i = 0; i < shuffledEmoji.length; i++) {
        if (i % 5 === 0) {
            const row = table.insertRow();
            for (let j = 0; j < 5; j++) {
                const cell = row.insertCell();
                cell.id = `card${i + j}`;
                cell.addEventListener("click", () => flipCard(i + j));
            }
        }
    }

    const restartButton = document.createElement("button");
    restartButton.textContent = "Начать заново";
    restartButton.addEventListener("click", restartGame);
    
    container.appendChild(table);
    container.appendChild(restartButton);

    document.body.appendChild(container);
}


function restartGame() {
    location.reload();
}

createGameTable();