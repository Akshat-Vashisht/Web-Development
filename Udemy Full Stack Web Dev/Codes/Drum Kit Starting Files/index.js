// document.querySelector("button").addEventListener("click", handleClick)
// // The function is called without parenthesis, otherwise it would get triggered regardless of the click
// function handleClick() {
//     alert("I got clicked")
// }

// Event listener takes a function as the second argument, such functions which take other functions as input 
// are called HIGHER ORDER FUNCTIONS. Very useful for advanced DOM Manipulation


// This is how to use an anonymous function inside the event listener 

function makeSound(key) {
    switch (key) {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3")
            tom1.play()
            break;
        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3")
            tom2.play()
            break;
        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3")
            tom3.play()
            break;
        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3")
            tom4.play()
            break;
        case "j":
            var snare = new Audio("sounds/snare.mp3")
            snare.play()
            break;
        case "k":
            var crash = new Audio("sounds/crash.mp3")
            crash.play()
            break;
        case "l":
            var kick = new Audio("sounds/kick-bass.mp3")
            kick.play()
            break;

        default:
            console.log(element)
            break;
    }
}

function animateButton(key) {
    var activeButton = document.querySelector("." + key);
    activeButton.classList.add("pressed")

    setTimeout(function () {
        activeButton.classList.remove("pressed")
    }, 100);
}

document.querySelectorAll("button").forEach(element => {
    element.addEventListener("click", function () {
        var keyStroke = element.innerHTML;
        makeSound(keyStroke);
        animateButton(keyStroke)
    })
});

document.addEventListener("keydown", function (event) {
    var keyStroke = event.key;
    makeSound(keyStroke);
    animateButton(keyStroke);
});
