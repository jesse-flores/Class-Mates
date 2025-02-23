// Access the button and clock container
const startButton = document.getElementById('startBtn');
const clockContainer = document.getElementById('clockContainer');
const clock = document.getElementById('clock');

// Function to start the clock animation
function startClockAnimation() {
    // Trigger the clock animation by adding the 'growClock' animation class
    clock.style.animation = "growClock 5s forwards";
}

// Event listener for the button click
startButton.addEventListener('click', () => {
    // Trigger the clock growth animation when the button is clicked
    startClockAnimation();
});
