let input = document.querySelector(".input");
let text = document.querySelector(".textToType");
let beforeStart = document.querySelector(".beforeStart");
let timer = document.querySelector(".timer");
let ru = document.querySelector(".ru");
let eng = document.querySelector(".eng");
let result = document.querySelector(".result");
let results = document.querySelector(".results");
let body = document.querySelector("body");
let timeChoose = document.querySelectorAll(".timeChoose");
let light = document.querySelector(".light");
let dark = document.querySelector(".dark");
let currentLangText;
let enteredText = [];
let spaces = 0;
let sliceTo = 5;
let sliceFrom = 0;
const _sliceTo = 5;
let sortedText;
let typingTime = localStorage.getItem("time") || 15;
let typingMs = parseInt(typingTime + "000");
changeTimes();
let lang = localStorage.getItem("lang") || "ru";
let theme = localStorage.getItem("theme") || "light";

theme == "light"
    ? ((body.classList = "lightTheme"),
      (light.classList = "selectedTheme light"),
      (dark.classList = "dark"))
    : ((body.classList = "darkTheme"),
      (dark.classList = "selectedTheme dark"),
      (light.classList = "light"));

lang == "ru"
    ? ((ru.classList = "ru selectedLang"), (eng.classList = "eng"))
    : ((eng.classList = "eng selectedLang"), (ru.classList = "ru"));

const ruLangText =
    "Кто такой Владимир Братишкин и его биография Владимир родился и живет в Москве О личной жизни не любит много говорить поэтому в сети большое количество противоречивых данных Например в большинстве источников говорится что Братишкин его настоящая фамилия однако в одном из роликов на Ютуб канале стример рассказывал что он использовал ее чтобы скрыть свои личные данные так как в то время работал в сфере и там это не приветствовалось Выбирая имя он взял понравившееся слово с картинки для мема а затем так и оставил и даже использовал впоследствии для своего ника присоединив окончание офф так и получился всем теперь знакомый Братишкинофф Владимир Братишкин в детстве Владимир в школьные годы В школьные годы Вове не нравилось учиться так как ему не подходила система образования в которой всех детей подгоняют под одни стандарты не учитывая их особенности и интересы У него возникали конфликты с руководством из за того что в старших классах он часто пропускал учебу Даже поднимался вопрос о повторном обучении в одном классе но его уладили В лет Владимир пришел в сферу где смог заработать свои первые деньги Кроме того здесь он познакомился с интересными людьми которые оказали большое влияние на его становление как стримера в дальнейшем Из стримов и блогов подписчикам удалось собрать немного цифр рассказывающих об их кумире"
        .toLowerCase()
        .split(" ");

const engLangText =
    "Over time interest in extreme sports waned, and his friend eventually moved away, leaving him without a cameraman to film any of his tricks. While searching for a new outlet for his creative energies, he decided to turn his casual love for gaming into a career,embarking on a quest to become a professional League of Legends player. Through League,  discovered Twitch and was immediately impressed by the entertaining personalities of popular streamers such as Tyler. Though his League of Legends skills were not at the professional level decided to follow in these streamers footsteps and become a Twitch personality In everything changed when  discovered Overwatch. He soon found that he was perfectly attuned to the game, regularly making high-level plays that were far more impressive than anything he had accomplished in League of Legends. Soon enough,  Overwatch skills began attracting attention from people in high places. In the summer of, he began his professional gaming career in earnest by joining DatZit Gaming, an esports team based in Montreal In August of that year, he lifted an Overwatch trophy for the first time, winning the Overwatch tournament at DreamHack Montreal alongside his teammates in DatZit With his reputation as a top Overwatch player secured, was soon picked up by Denial eSports in October Though this team didn’t make waves in the competitive Overwatch scene, marched forward in his quest to become an Overwatch pro, participating in the first iteration of Overwatch Contenders and several other tournaments as a member of a number of other teams. In October his dream was realized when he joined the Dallas Fuel."
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .toLowerCase()
        .split(" ");

input.disabled = 1;

function changeTimes() {
    if (typingTime == 15) {
        for (let i of timeChoose) {
            i.classList.remove("selectedLang");
        }
        timeChoose[0].classList.add("selectedLang");
    } else if (typingTime == 30) {
        for (let i of timeChoose) {
            i.classList.remove("selectedLang");
        }
        timeChoose[1].classList.add("selectedLang");
    } else if (typingTime == 60) {
        for (let i of timeChoose) {
            i.classList.remove("selectedLang");
        }
        timeChoose[2].classList.add("selectedLang");
    }
}

function startTimeOut(enteredText, sortedText) {
    localStorage.getItem("time");
    typingMs = parseInt(typingTime + "000");
    timer.textContent = typingTime;
    let _typingTime = typingTime - 1;
    setInterval(() => {
        if (_typingTime == 0) return;
        timer.textContent = _typingTime;
        _typingTime -= 1;
    }, 1000);
    setTimeout(() => {
        input.disabled = 1;
        stop(enteredText, sortedText);
        timer.textContent = "";
    }, typingMs);
}

function stop(enteredText, sortedText) {
    compareText(enteredText, sortedText);
    text.textContent = "";
    results.style.display = "block";
}

function compareText(entered, fullText) {
    let toCompare = fullText.slice(0, entered.length);
    let rightWords = [];
    toCompare.forEach((word, i) => {
        if (word == entered[i]) {
            rightWords.push(word);
        }
    });

    displayResult(rightWords);
    input.value = "";
}

function displayResult(wordsArr) {
    result.textContent = Math.round(
        wordsArr.join(" ").length * (60 / typingTime / 5)
    );
    input.blur();
}

function checkSliseLength(sortedText) {
    let k = 0;
    let index = 0;
    sum = 0;
    while (k < 30) {
        index += 1;
        k += sortedText[index].length + 1;
        sum += sortedText[index].length + 1;
    }
    return index;
}

function start() {
    enteredText = [];
    spaces = 0;
    sliceFrom = 0;
    sliceTo = 5;

    if (lang == "ru") {
        currentLangText = ruLangText;
    } else {
        currentLangText = engLangText;
    }

    sortedText = currentLangText.sort(() => Math.random() - 0.5);
    beforeStart.style.display = "none";
    enteredText = [];
    startTimeOut(enteredText, sortedText);
    results.style.display = "none";
    text.textContent = sortedText.slice(sliceFrom, sliceTo).join(" ");
    input.disabled = 0;
}

function bebra(e) {
    if (e.keyCode != 32 || e.target != input) return;
    enteredText.push((input.value = input.value.trim()));
    spaces += 1;
    input.value = "";

    if (spaces == sliceTo) {
        sliceFrom += _sliceTo;
        sliceTo += _sliceTo;
        text.textContent = sortedText.slice(sliceFrom, sliceTo).join(" ");
    }
}

function onStart(e) {
    if (e.keyCode == 13 && e.target != input) {
        start(e);
        input.focus();
    } else {
        bebra(e);
    }
}

document.addEventListener("keydown", onStart);

ru.addEventListener("click", (e) => {
    lang = "ru";
    eng.classList.remove("selectedLang");
    ru.classList.add("selectedLang");
    localStorage.setItem("lang", "ru");
});

eng.addEventListener("click", (e) => {
    lang = "eng";
    ru.classList.remove("selectedLang");
    eng.classList.add("selectedLang");
    localStorage.setItem("lang", "eng");
});

timeChoose.forEach((i) => {
    i.addEventListener("click", (e) => {
        typingTime = i.dataset.time;
        for (let i of timeChoose) {
            i.classList.remove("selectedLang");
        }
        i.classList.add("selectedLang");
        localStorage.setItem("time", typingTime);
    });
});

light.addEventListener("click", (e) => {
    theme = "light";
    body.classList = "lightTheme";
    light.classList = "selectedTheme light";
    dark.classList = "dark";
    localStorage.setItem("theme", "light");
});

dark.addEventListener("click", (e) => {
    theme = "dark";
    body.classList = "darkTheme";
    dark.classList = "selectedTheme dark";
    light.classList = "light";
    localStorage.setItem("theme", "dark");
});
