const cards = [
    {
        name: 'balina',
        img: 'img/balina.jpg'
    },
    {
        name: 'bulut',
        img: 'img/bulut.jpg'
    },
    {
        name: 'deniz aslanı',
        img: 'img/deniz aslanı.jpg'
    },
    {
        name: 'fare',
        img: 'img/fare.jpg'
    },
    {
        name: 'fil',
        img: 'img/fil.jpg'
    },
    {
        name: 'kaplan',
        img: 'img/kaplan.jpg'
    },
    {
        name: 'maymun',
        img: 'img/maymun.jpg'
    },
    {
        name: 'ördek',
        img: 'img/ördek.jpg'
    },
    {
        name: 'panda',
        img: 'img/panda.jpg'
    },
    {
        name: 'tilki',
        img: 'img/tilki.jpg'
    },
    {
        name: 'timsah',
        img: 'img/timsah.jpg'
    },
    {
        name: 'tren',
        img: 'img/tren.jpg'
    },
    {
        name: 'uçak',
        img: 'img/uçak.jpg'
    },
    {
        name: 'zürafa',
        img: 'img/zürafa.jpg'
    },
];

//kartlari cogaltip karistir
const cardArray = [...cards, ...cards].sort(() => Math.random() - 0.5);
// console.log(cardArray);


const gridDisplay = document.querySelector('#gridContainer');
let score = document.querySelector('#score');

let cardChosen = [];
let cardChosenId = [];
const cardWon = [];

let startTime;
let timerInterval;

//kartlar eklendi
function createCardElement() {
    document.getElementById('timer').innerText = '00:00';
    stopTimer();

    for (let i = 0; i < cardArray.length; i++) {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('card');
        const card = document.createElement('img');
        card.classList.add('cardImg');
        imgDiv.appendChild(card);
        card.setAttribute('src', cardArray[i].img); // Kartın resmini direkt olarak gösterir
        card.setAttribute('id', i); //id eklendi flip ve check için kullanılacak
        card.addEventListener('click', flipCard);
        gridDisplay.appendChild(imgDiv);
    }

    // 5 saniye sonra kartları geri kapatmak için bir setTimeout kullanımı
    setTimeout(function () {
        const cards = document.querySelectorAll('#gridContainer img');
        cards.forEach(card => {
            card.setAttribute('src', 'img/security_icon.jpg');
            card.addEventListener('click', flipCard);
    startTimer();

        });
    }, 5000); // 5000 ms = 5 saniye
}

createCardElement();

//tıklanılan kartın id'si alınıp çevirme işlemi gerçekleşir
function flipCard() {

    const cardId = this.getAttribute('id');
    cardChosen.push(cardArray[cardId].name);
    console.log(cardChosen);
    cardChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardChosen.length == 2) {
        setTimeout(checkMatch, 500)
    }
}

//
function checkMatch() {
    const cards = document.querySelectorAll('#gridContainer img')
    const optionOneId = cardChosenId[0] //seçilen ilk kart name
    const optionTwoId = cardChosenId[1] //seçilen ikinci kart name

    //kartlar aynı mı?
    if (cardChosen[0] === cardChosen[1]) {
        cards[optionOneId].setAttribute('src', 'img/star.jpg')
        cards[optionTwoId].setAttribute('src', 'img/star.jpg')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardWon.push(cardChosen) //eşlenen kartlar score eklendi

    } else {
        cards[optionOneId].setAttribute('src', 'img/security_icon.jpg')
        cards[optionTwoId].setAttribute('src', 'img/security_icon.jpg')

    }
    score.textContent = cardWon.length
    cardChosen = [];
    cardChosenId = [];

    //oyun bitti mi?
    if (cardWon.length == cardArray.length / 2) {
        score.innerHTML = 'Tebrikler Kazandınız..!'
        stopTimer(); //zamanı henüz durduramadım buraya bakılacak.
    }
}



//zaman fonksiyonları

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    document.getElementById('timer').innerText = getFormattedTime(elapsedTime);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function getFormattedTime(time = 0) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}