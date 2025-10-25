// Booking functionality
const rideForm = document.getElementById('rideForm');
const confirmation = document.getElementById('confirmation');

rideForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const pickup = document.getElementById('pickup').value;
    const destination = document.getElementById('destination').value;

    if (pickup && destination) {
        confirmation.style.display = 'block';
        confirmation.textContent = `Ride booked from ${pickup} to ${destination}!`;
        rideForm.reset();
    }
});

// Star rating functionality
const stars = document.querySelectorAll('#starContainer span');
const ratingValue = document.getElementById('ratingValue');

stars.forEach(star => {
    star.addEventListener('click', () => {
        let value = star.getAttribute('data-value');
        stars.forEach(s => s.classList.remove('selected'));
        for(let i = 0; i < value; i++) {
            stars[i].classList.add('selected');
        }
        ratingValue.textContent = `You rated us ${value} star(s)!`;
    });
});