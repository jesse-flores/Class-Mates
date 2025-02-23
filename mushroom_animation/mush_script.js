// Access the button and container
const startButton = document.getElementById('startBtn');
const mushroomContainer = document.getElementById('mushroomContainer');

// Function to create mushrooms
function createMushroom() {
    const mushroom = document.createElement('div');
    mushroom.classList.add('mushroom');

    // Randomize the initial position
    mushroom.style.left = `${Math.random() * window.innerWidth}px`;
    mushroom.style.top = `${Math.random() * window.innerHeight}px`;

    mushroomContainer.appendChild(mushroom);

    // After 5 seconds, remove the mushroom (the time should match the animation duration)
    setTimeout(() => {
        mushroom.remove();
    }, 5000); // Remove after the animation completes (5 seconds)
}

// Event listener for the button click
startButton.addEventListener('click', () => {
    let counter = 0;
    const totalMushrooms = 50; // Total mushrooms to create (you can adjust this number)

    const intervalId = setInterval(() => {
        if (counter >= totalMushrooms) { // Stop after creating the specified number of mushrooms
            clearInterval(intervalId);
        } else {
            createMushroom();
            counter++;
        }
    }, 50); // Create mushrooms every 50ms 
});