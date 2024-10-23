// Movie Data
const movies = [
    {
        title: 'Avengers: Endgame',
        genre: 'Action, Adventure, Drama',
        duration: '3h 2m',
        rating: 4.5,
        image: ' https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg'
    },
    {
        title: 'Inception',
        genre: 'Sci-Fi, Thriller',
        duration: '2h 28m',
        rating: 4.8,
        image: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg'
    },
    { 
        title: 'The Dark Knight',
        genre: 'Action, Crime, Drama',
        duration: '2h 32m',
        rating: 4.9,
        image: 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg'
    }
];
  
// Insert Movie Cards in Carousel
let carouselMovies = document.getElementById('carousel-movies');
movies.forEach((movie, index) => {
    let activeClass = index === 0 ? 'active' : ''; // Make first slide active
    carouselMovies.innerHTML += `
        <div class="carousel-item ${activeClass}">
            <img src="${movie.image}" class="d-block w-100" alt="${movie.title}">
            <div class="carousel-caption d-none d-md-block">
                <h5>${movie.title}</h5>
                <p>${movie.genre} · ${movie.duration}</p>
            </div>
        </div>
    `;
});

// Insert Movie List Cards
let movieList = document.getElementById('movie-list');
movies.forEach(movie => {
    movieList.innerHTML += `
        <div class="col-md-4 mb-4">
            <div class="movie-card" onclick="selectMovie('${movie.title}')">
                <img src="${movie.image}" alt="${movie.title}">
                <div class="p-3">
                    <h5 class="card-title">${movie.title}</h5>
                    <p>${movie.genre} · ${movie.duration}</p>
                    <div class="rating">${getStars(movie.rating)}</div>
                </div>
            </div>
        </div>
    `;
});

// Generate Star Rating
function getStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<i class="fas fa-star ${i <= rating ? 'filled' : ''}"></i>`;
    }
    return stars;
}

// Seat Booking Logic
let seatContainer = document.getElementById('seat-layout');
let selectedSeats = [];
let seatPrice = 10.00;

// Generate Seat Layout
for (let i = 1; i <= 50; i++) {
    let seatElement = document.createElement('div');
    seatElement.classList.add('seat');
    seatElement.textContent = `S${i}`;
    seatElement.addEventListener('click', () => selectSeat(seatElement));
    seatContainer.appendChild(seatElement);
}

// Seat Selection Logic
function selectSeat(seatElement) {
    if (seatElement.classList.contains('occupied')) return;

    if (seatElement.classList.contains('selected')) {
        seatElement.classList.remove('selected');
        selectedSeats = selectedSeats.filter(seat => seat !== seatElement.textContent);
    } else {
        seatElement.classList.add('selected');
        selectedSeats.push(seatElement.textContent);
    }
    updateBookingSummary();
}

// Select Movie Functionality
function selectMovie(movieTitle) {
    document.getElementById('selected-movie').textContent = movieTitle;
    updateBookingSummary();
}

// Update Booking Summary
function updateBookingSummary() {
    document.getElementById('selected-seats').textContent = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None';
    document.getElementById('total-price').textContent = (selectedSeats.length * seatPrice).toFixed(2);
}

// Process Payment
function processPayment() {
    alert('Payment successful! Enjoy your movie.');
}
// Confirm Payment Functionality
async function confirmPayment() {
    const bookingData = {
        movieTitle: selectedMovie.textContent,
        seats: selectedSeats,
        totalPrice: selectedSeats.length * seatPrice,
        paymentMethod: document.getElementById('payment-method').value
    };

    try {
        const response = await fetch('http://localhost/path/to/your/booking.php', { // Update with your path
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Display success message
            resetBooking(); // Reset selections after booking
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Booking failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error processing your booking. Please try again.');
    }
}

// Function to reset selections after booking
function resetBooking() {
    selectedSeats = [];
    selectedSeatsElem.textContent = 'None';
    totalPriceElem.textContent = `$0`;

    // Clear the seat selections visually
    document.querySelectorAll('.seat.selected').forEach(seat => {
        seat.classList.remove('selected');
    });

    // Close the payment modal
    const paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
    paymentModal.hide();
}
