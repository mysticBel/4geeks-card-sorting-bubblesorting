const suits = ["♦", "♥", "♠", "♣"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
let cardArray = [];
let sortLog = [];

document.getElementById("drawBtn").addEventListener("click", drawCards);
document.getElementById("sortBtn").addEventListener("click", sortCards);

function getRandomCard() {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  const color = Math.random() > 0.5 ? "red" : "black"; // color aleatorio
  return { suit, value, color };
}

function drawCards() {
  const cardCount = parseInt(document.getElementById("cardCount").value);
  cardArray = [];
  for (let i = 0; i < cardCount; i++) {
    cardArray.push(getRandomCard());
  }
  renderCards();
}

function renderCards() {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";
  cardArray.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `
      <div class="top-suit" style="color: ${card.color}">${card.suit}</div>
      <div class="value" style="color: ${card.color}">${card.value}</div>
      <div class="bottom-suit" style="color: ${card.color}">${card.suit}</div>
    `;
    cardContainer.appendChild(cardDiv);
  });
}

function compareCards(card1, card2) {
  const value1 = values.indexOf(card1.value);
  const value2 = values.indexOf(card2.value);
  return value1 - value2;
}

function sortCards() {
  sortLog = [];
  let sortedArray = [...cardArray];
  for (let i = 0; i < sortedArray.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < sortedArray.length; j++) {
      if (compareCards(sortedArray[j], sortedArray[minIndex]) < 0) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [sortedArray[i], sortedArray[minIndex]] = [
        sortedArray[minIndex],
        sortedArray[i],
      ];
      sortLog.push([...sortedArray]);
    }
  }
  cardArray = sortedArray;
  renderCards();
  renderSortLog();
}

function renderSortLog() {
  const sortLogContainer = document.getElementById("sortLog");
  sortLogContainer.innerHTML = "";
  sortLog.forEach((step, index) => {
    const logItem = document.createElement("li");
    logItem.classList.add("list-group-item");

    const lineNumber = document.createElement("span");
    lineNumber.textContent = `${index}: `;
    lineNumber.style.fontWeight = "bold";
    lineNumber.style.marginRight = "10px";
    logItem.appendChild(lineNumber);

    const stepCardsContainer = document.createElement("div");
    stepCardsContainer.classList.add(
      "d-flex",
      "justify-content-center",
      "flex-wrap"
    );

    step.forEach((card) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card", "m-2");
      cardDiv.innerHTML = `
        <div class="top-suit" style="color: ${card.color}">${card.suit}</div>
        <div class="value" style="color: ${card.color}">${card.value}</div>
        <div class="bottom-suit" style="color: ${card.color}">${card.suit}</div>
      `;
      stepCardsContainer.appendChild(cardDiv);
    });

    logItem.appendChild(stepCardsContainer);
    sortLogContainer.appendChild(logItem);
  });
}
