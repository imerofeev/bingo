var messages = [
  "Это интересный вопрос",
  "Эээээ",
  "Я не знаю",
  "*звук клавиатуры*",
  "*тяжелый вздох*",
  "*звук детей или животных*",
  "Ты меня слышишь?",
  "Минуточку...",
  "Следующий вопрос",
  "Ты на мьюте",
  "Простите, прослушал",
  "Напомните, какая моя роль",
  "Привет"
];

var bingo = document.getElementById("bingo");
var cells = document.getElementById("cells");
var welcome = document.getElementById("welcome");

function play(CELL_COUNT) {
  welcome.classList.add("hidden");
  cells.className = "";
  cells.classList.add("items-" + CELL_COUNT);

  function checkIfBingo() {
    var checkedItems = Array.from(document.getElementsByClassName("selected"));

    if (checkedItems.length === CELL_COUNT) {
      bingo.classList.add("visible");
    }
  }

  function createCell(text) {
    var cellN = document.createElement("div");
    cellN.classList.add("cell");
    var contentN = document.createElement("div");
    contentN.classList.add("content");
    var textN = document.createElement("div");
    textN.classList.add("text");
    var textContentN = document.createTextNode(text);
    textN.appendChild(textContentN);
    contentN.appendChild(textN);
    cellN.appendChild(contentN);
    cells.appendChild(cellN);
    return cellN;
  }

  function selectItems(items) {
    return Array.apply(null, {
      length: CELL_COUNT
    })
      .map(Number.call, Number)
      .reduce(function (selected) {
        var item;

        do {
          item = items[Math.floor(Math.random() * items.length)];
        } while (selected.includes(item));

        return selected.concat([item]);
      }, []);
  }

  Array.from(document.getElementsByClassName("cell")).forEach(function (n) {
    return n.parentNode.removeChild(n);
  });
  bingo.classList.remove("visible");
  selectItems(messages)
    .map(createCell)
    .map(function (cell) {
      cell.addEventListener("click", function () {
        this.classList.toggle("selected");
        checkIfBingo();
      });
      return cell;
    });
}

document.getElementById("retry").addEventListener("click", reset);
Array.from(document.getElementsByClassName("button")).forEach(function (
  button
) {
  button.addEventListener("click", function () {
    play(parseInt(button.dataset["cells"]));
  });
});

function reset() {
  welcome.classList.remove("hidden");
}
