// document.querySelector("button").addEventListener("click", handleClick)
// // The function is called without parenthesis, otherwise it would get triggered regardless of the click
// function handleClick() {
//     alert("I got clicked")
// }

// Event listener takes a function as the second argument, such functions which take other functions as input 
// are called HIGHER ORDER FUNCTIONS. Very useful for advanced DOM Manipulation


// This is how to use an anonymous function inside the event listener 
document.querySelectorAll("button").forEach(element => {
    element.addEventListener("click", function () {
        this.style.color = "white";
    })
});

// var audio = new Audio("sounds/tom-1.mp3")
// audio.play()