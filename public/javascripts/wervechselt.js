var index = 0;
var max = 22;
var steps = [
    {path: "/wervechselt/1 6315 Kopie.jpg", suggested: "heitere Fahne!", correct: "heitere Fahne!"},
    {path: "/wervechselt/2 7402 Kopie.jpg", suggested: "Hund mit Hut", correct: "cf"},
    {path: "/wervechselt/3 8143 Kopie.jpg", suggested: "Big Air", correct: "Big Air"},
    {path: "/wervechselt/4 7595 Kopie,jpg", suggested: "Plakatierer", correct: "trüber Teich und bunte Boje"},
    {path: "/wervechselt/5 7636 Kopie.jpg",suggested: "trüber Teich und bunte Boje", correct: "Plakatierer"},
    {path: "/wervechselt/6 6742 Kopie.jpg", suggested: "Wüterich und Feingeist", correct: "Wüterich und Feingeist"},
    {path: "/wervechselt/7 0932 Kopie.jpg", suggested: "Good Day Sunshine", correct: "La haine (d’après Vallotton)"},
    {path: "/wervechselt/8 7845 Kopie.jpg", suggested: "La baigneuse (d‘après Vallotton)", correct: "Globus"},
    {path: "/wervechselt/9 2554_bearbeitet-1 Kopie.jpg", suggested: "Wagnerianer (in voller Fahrt)", correct: "Wagnerianer (in voller Fahrt)"},
    {path: "/wervechselt/10 8077 Kopie.jpg", suggested: "ein alter Musiker tut engelhaft", correct: "verwüstetes Stillleben"},
    {path: "/wervechselt/11 7126_bearbeitet-1 Kopie.jpg", suggested: "Angstlust", correct: "Angstlust"},
    {path: "/wervechselt/12 7244 Kopie.jpg", suggested: "disfunktionales Paar", correct: "wenn das Viele fiele…"},
    {path: "/wervechselt/13 1811 Kopie.jpg", suggested: "wenn das Viele fiele…", correct: "disfunktionales Paar"},
    {path: "/wervechselt/14 7254 Kopie.jpg", suggested: "ship of fools", correct: "ship of fools"},
    {path: "/wervechselt/15 7016 Kopie.jpg", suggested: "amouröser Tumult", correct: "amouröser Tumult"},
    {path: "/wervechselt/16 5150 119 Kopie.jpg", suggested: "entweder oder entweder", correct: "Atelier Hansjürg Brunner"},
    {path: "/wervechselt/17 7610 Kopie.jpg", suggested: "Komposition mit Kobold", correct: "6 Bilder"},
    {path: "/wervechselt/18 8321 Kopie.jpg", suggested: "Zweiklang (Glencore - Apple)", correct: "Zweiklang (Glencore - Apple)"},
    {path: "/wervechselt/19 7983 Kopie.jpg", suggested: "Streit im Olymp", correct: "Hund mit Hut"},
    {path: "/wervechselt/20 2572_bearbeitet-1 Kopie.jpg", suggested: "Streit im Olymp", correct: "Streit im Olymp"},
    {path: "/wervechselt/21 4350_bearbeitet-1 Kopie.jpg", suggested: "Dreiklang mit halbem Picasso", correct: "Dreiklang mit halbem Picasso"},
    {path: "/wervechselt/22 7813 Kopie.jpg", suggested: "ein alter Musiker tut engelhaft", correct: "ein alter Musiker tut engelhaft"},
    {path: "/wervechselt/23 7249 Kopie.jpg", suggested: "Good Day Sunshine", correct: "Good Day Sunshine"}
];


var img = document.querySelector(".img");
var suggested = document.querySelector("#suggested");
var correct = document.querySelector("#correct");

var forward = document.querySelector("#forward");
var backward = document.querySelector("#backward");

var answers = document.querySelector('.answers');
var richtig = document.querySelector("#true");
var falsch = document.querySelector("#false");

load();

function load() {
    var step = steps[index];
    correct.innerText = "";
    suggested.innerText = "";
    suggested.style.opacity = 0;
    img.src = step.path;
    correct.style.backgroundColor = "white";
    correct.style.opacity = 0;
    answers.style.opacity = 0;
    setTimeout(function () {
        suggested.textContent = step.suggested;
        suggested.style.opacity = 1;
        answers.style.opacity = 1;
    }, 3000);
}

function add() {
    if (index == max) {
        index = 0;
    } else {
        index += 1;
    }
    load();
}
function subtract() {
    if (index == 0) {
        index = max;
    } else {
        index -= 1;
    }
    load();
}

function checkTrue() {
    var step = steps[index];
    setTimeout(function () {
        correct.style.opacity = 1;
        if (step.suggested == step.correct) {
            correct.innerText = 'Richtig!';
            correct.style.backgroundColor = "#66ffbf";
        } else {
            correct.innerText = step.correct;
            correct.style.backgroundColor = "#f29779";
        }
    }, 2000);
}

function checkFalse() {
    var step = steps[index];
    setTimeout(function () {
        correct.style.opacity = 1;
        if (step.suggested != step.correct) {
            correct.innerText = 'Richtig!';
            correct.style.backgroundColor = "#66ffbf";
        } else {
            correct.innerText = step.correct;
            correct.style.backgroundColor = "#f29779";
        }
    }, 2000);
}

forward.addEventListener("click", add);
backward.addEventListener("click", subtract);
richtig.addEventListener("click", checkTrue);
falsch.addEventListener("click", checkFalse);
