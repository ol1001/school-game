window.onload = function () {
    makeCardsList(numbers);
    moveCards();
    checkAction();
}

function getDecFraction() {
    return Math.round((Math.random()*0.998 + 0.001) * 1000) / 1000;
}

function getNumbersArray() {
    var numbers = [],
        arrayLength = 14;
    for (arrayLength; arrayLength > 0; arrayLength--) {
        numbers.push(getDecFraction());
    }
    return numbers;
}

var numbers = getNumbersArray();

function makeCardsList(numbersArray) {

    var cardArea = document.getElementById("cardArea"),
        length = numbersArray.length;

    for (var i = 0; i < length; i++) {
        var card = document.createElement('div');
        card.textContent = numbersArray[i];
        card.className = "draggable";
        card.setAttribute("draggable", "true");
        card.setAttribute("ondragstart", "event.dataTransfer.setData('text/plain',null)")
        cardArea.appendChild(card);
    }
}

function moveCards() {
    var dragged;

    /* events fired on the draggable target */
    document.addEventListener("drag", function( event ) {

    }, false);

    document.addEventListener("dragstart", function( event ) {
        // store a ref. on the dragged elem
        dragged = event.target;
        // make it half transparent
        event.target.style.opacity = .5;
    }, false);

    document.addEventListener("dragend", function( event ) {
        // reset the transparency
        event.target.style.opacity = "";
    }, false);

    /* events fired on the drop targets */
    document.addEventListener("dragover", function( event ) {
        // prevent default to allow drop
        event.preventDefault();
    }, false);

    document.addEventListener("dragenter", function( event ) {
        // highlight potential drop target when the draggable element enters it
        if ( event.target.className == "droppable" ) {
            event.target.style.background = "#08DEE4";
        }

    }, false);

    document.addEventListener("dragleave", function( event ) {
        // reset background of potential drop target when the draggable element leaves it
        if ( event.target.className == "droppable" ) {
            event.target.style.background = "";
        }

    }, false);

    document.addEventListener("drop", function( event ) {
        // prevent default action (open as link for some elements)
        event.preventDefault();
        // move dragged elem to the selected drop target
        if ( event.target.className == "droppable" ) {
            event.target.style.background = "";
            dragged.parentNode.removeChild( dragged );
            event.target.appendChild( dragged );
        }

    }, false);
}
function checkAction() {
    var checkAction = document.getElementById('checkResult');
    checkAction.addEventListener('click', getUserData);
}

function getUserData() {
    var tdArray = $('td div.draggable');
    var userArray = [];

  if (tdArray.length == 14) {
        for (var i = 0; i < 14; i++) {
            var userNumber = parseFloat(tdArray[i].innerHTML);
            userArray.push(userNumber);
        }
        checkResult(userArray);
    } else {
      alert("Ще залишились картки");
  }
}
function checkResult(userArray) {
    var userData =  userArray.toString();
    var sortedArray = userArray.sort(function (a, b) {
        return a - b
    });
    var sortedData = sortedArray.toString();

    if (userData == sortedData) {
        var is_same = true;
    } else {
        alert('Спробуй ще раз');
        location.reload();
    }
    if (is_same) {
        makeCongratulations();
    }
}
function makeCongratulations() {
    var areaCongrat = document.getElementById('congratArea'),
        elementsToHide = document.getElementById('controlElements'),
        headerElements = document.getElementById('header'),
        refresh = document.getElementById('refreshPage'),
        h3Congrat = document.createElement('h3'),
        pCongrat = document.createElement('p'),
        imgCongrat = document.createElement('img'),
        btnRefresh = document.createElement('button'),
        randomValue = getRandomInt(0,3),
        congratulation = [
        {
            "word": "секвойядендрон",
            "image": "dev/img/tree.jpg",
            "description": "Єдиний сущий вид роду Секвоядендрон (Sequoiadendron), також відомий як «гігантська секвойя», «велінгтонія» та «мамонтове дерево». Є одним із найдовговічніших і найбільших дерев на Землі. Це однодомна вічнозелена рослина. Дорослі дерева досягають висоти до 100 метрів при діаметрі стовбура 10-12 м. Найстаріша, в цей час, Гігантська секвойя має вік 3200 років, встановлений за річними кільцями."
        },
        {
            "word": "північнийолень",
            "image": "dev/img/animal.jpg",
            "description": "Північний олень, Карібу (Rangifer tarandus) — єдиний представник роду північних оленів (Rangifer), парнокопитний ссавець родини оленевих (Cervidae) ряду китопарнокопитних (Cetartiodactyla). Живе в північній частині Євразії і Північної Америки (де має назву «карібу»). Всеїдна тварина — харчується травою, лишайником, інколи дрібними ссавцями і птахами. У Євразії північний олень одомашнений і є важливим джерелом прожитку і матеріалів для багатьох полярних народів."
        },
        {
            "word": "пахіцефалозавр",
            "image": "dev/img/dino.jpg",
            "description": "Пересувався на двох задніх кінцівках; його передні кінцівки були неабияк коротше. Найцікавішою частиною скелета, безсумнівно, був череп. Товщиною він був близько 23 см, а в довжину досягав 60 см. Коли самець завдавав удару головою нападаючому хижакові або супернику в битві за самку, він нахиляв голову вперед так, що тіло займало горизонтальне положення. Завдяки цьому сила удару була поглинута товстими кістками шиї, плечей і спини. Одночасно пахіцефалозавр вкладав в удар всю масу свого тіла."
        }
    ];

    elementsToHide.className = 'hide';
    headerElements.className = 'hide';
    areaCongrat.className = null;
    refresh.className = null;

    makeCardsWithWord(congratulation[randomValue].word);

    imgCongrat.src = congratulation[randomValue].image;
    areaCongrat.appendChild(imgCongrat);

    pCongrat.textContent = congratulation[randomValue].description;
    areaCongrat.appendChild(pCongrat);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function makeCardsWithWord(word) {
    var wordArray = word.split('');
    var table = document.getElementById('word');
    table.deleteRow(0);
    var newRow = table.insertRow(-1);
    newRow.id = 'wordRow';

    for (var i = 0; i < wordArray.length; i++) {
        var newCell = newRow.insertCell(i);
        var text = document.createTextNode(wordArray[i]);
        newCell.appendChild(text);
    }
}



