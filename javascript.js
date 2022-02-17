round = 1;
answer = 0;

// Spieler Markierung
$("#ground" + round).css("background-color", "red");

function next() {
    // speicherung Spielstand
    localStorage.setItem("runde", round);
    localStorage.setItem("answer", answer);
    console.log(localStorage.getItem("runde"));
    console.log(localStorage.getItem("answer"));

    // nächste runde 
    round += 1;
    if (round == 10) {
        alert("Gewonnen!")
        location.reload();
    }
    $("#ground" + round).css("background-color", "red");
    $("#ground" + (round - 1)).css("background-color", "white");
    $("#ground" + (round - 1)).text(localStorage.getItem("answer"))
    $("#ground" + (round - 1)).animate({
        opacity: '0.5',
    });
    $("#ground" + (round - 1)).css("color", "green");
}

function randomNumber(startNumber, endNumber) {

    number = Math.floor(Math.random() * endNumber) + startNumber;

    return number;
}

function weiter() {
    // Vorgaben random nummern
    switch (round) {
        case 1:
            startNumber = 1;
            endNumber = 50;
            startNumber2 = 1;
            endNumber2 = 50;
            break;
        case 2:
            startNumber = 51;
            endNumber = 100;
            startNumber2 = 1;
            endNumber2 = 50;
            break;
        case 3:
            startNumber = 2;
            endNumber = 10;
            startNumber2 = 10;
            endNumber2 = 20;
            break;
        case 4:
            startNumber = 10;
            endNumber = 30;
            startNumber2 = 2;
            endNumber2 = 4;
            break;
        case 5:
            startNumber = 1;
            endNumber = 15;
            startNumber2 = 2;
            endNumber2 = 10;
            startNumber3 = 5;
            endNumber3 = 20;
            break;
        case 6:
            startNumber = 1;
            endNumber = 20;
            startNumber2 = 5;
            endNumber2 = 50;
            startNumber3 = 8;
            endNumber3 = 30;
            break;
        case 7:
            startNumber = 50;
            endNumber = 200;
            startNumber2 = 10;
            endNumber2 = 30;
            startNumber3 = 20;
            endNumber3 = 30;
            break;
        case 8:
            startNumber = 10;
            endNumber = 20;
            break;
        case 9:
            startNumber = 20;
            endNumber = 50;
            break;
    }

    //Berechnung randomA
    numberA = randomNumber(startNumber, endNumber);

    // Zuschaltung von randomB und randomC + Einschränkungen
    if (round < 4) {
        numberB = randomNumber(startNumber2, endNumber2);
    } else if (round == 4) {
        while (numberA % 2 != 0) {
            numberA = randomNumber(startNumber, endNumber);
        }
        while (numberB % 2 != 0 & numberB != numberA) {
            numberB = randomNumber(startNumber, endNumber);
        }
    } else if (round >= 5 && round <= 7) {
        numberC = randomNumber(startNumber3, endNumber3);
    } else if (round >= 8 && round <= 9) {
        while (numberA % 2 != 0) {
            numberA = randomNumber(startNumber, endNumber);
        }
    }

    // Berechnung result
    switch (round) {
        case 1:
            operator = "+";
            result = parseInt(numberA) + parseInt(numberB);
            break;
        case 2:
            operator = "-";
            result = parseInt(numberA) - parseInt(numberB);
            break;
        case 3:
            operator = "*";
            result = parseInt(numberA) * parseInt(numberB);
            break;
        case 4:
            operator = "/";
            result = parseInt(numberA) / parseInt(numberB);
            result = result.toFixed(2);
            break;
        case 5:
            operator = "+", operator2 = "*";
            result = parseInt(numberA) + (parseInt(numberB) * parseInt(numberC));
            break;
        case 6:
            result = parseInt(numberA) + (parseInt(numberB) * parseInt(numberC));
            break;
        case 7:
            result = parseInt(numberA) + (parseInt(numberB) * parseInt(numberC));
            break;
        case 8:
            result = parseInt(Math.sqrt(numberA));
            break;
        case 9:
            result = parseInt(Math.log(numberA));
            break;
    }

    // ausgabe
    console.log(operator);
    console.log(result);
    
    if (round < 5) {
        answer = prompt(numberA + operator + numberB + " = ?");
    } else if (round >= 5 && round <= 7) {
        answer = prompt(numberA + operator + numberB + operator2 + numberC + " = ?");
    } else if (round == 8) {
        answer = prompt("Quadratwurzel aus " + numberA + " = ?");
    } else if (round == 9) {
        answer = prompt("Logarithmus eines Werts aus " + numberA + " = ?");
    }

    // Prüfung der Antwort
    if (answer == result) {
        next();
    } else {
        alert("falsche antwort!!!")
    }
}

function neu() {
    location.reload();
}