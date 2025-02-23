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
    setInterval(createMushroom, 100); // Create mushrooms every 300ms
});