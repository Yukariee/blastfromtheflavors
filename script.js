// ========================================
// CONFIGURATION - Easy to edit
// ========================================

// The valid promo code
const PROMO_CODE = "BLAST2026";

// Maximum number of total redemptions allowed
const MAX_REDEMPTIONS = 500;

// Total number of winners allowed
const MAX_WINNERS = 5;

// ========================================
// DO NOT EDIT BELOW THIS LINE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Menu card interactions
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Promo redemption system
    initPromoSystem();
});

// ========================================
// Promo Redemption System
// ========================================

function initPromoSystem() {
    const redeemBtn = document.getElementById('redeemBtn');
    const promoInput = document.getElementById('promoInput');
    const messageArea = document.getElementById('messageArea');

    // Check if promo limit is reached on page load
    checkPromoLimit();

    // Redeem button click handler
    redeemBtn.addEventListener('click', handleRedemption);

    // Enter key to redeem
    promoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleRedemption();
        }
    });

    // Winner form submission
    const submitWinnerBtn = document.getElementById('submitWinnerBtn');
    submitWinnerBtn.addEventListener('click', handleWinnerSubmission);
}

function handleRedemption() {
    const promoInput = document.getElementById('promoInput');
    const messageArea = document.getElementById('messageArea');
    const enteredCode = promoInput.value.trim().toUpperCase();

    // Clear previous messages
    messageArea.textContent = '';
    messageArea.className = 'message-area';

    // Validate input
    if (!enteredCode) {
        showMessage('Please enter a promo code', 'error');
        return;
    }

    // Check if already redeemed by this user
    if (hasUserRedeemed()) {
        showMessage('You have already redeemed this promo code', 'error');
        return;
    }

    // Check if promo code is correct
    if (enteredCode !== PROMO_CODE) {
        showMessage('Invalid promo code', 'error');
        return;
    }

    // Check if total redemption limit reached
    const currentRedemptions = getTotalRedemptions();
    if (currentRedemptions >= MAX_REDEMPTIONS) {
        showMessage('Sorry, the promo redemption limit has been reached', 'error');
        disableRedemption();
        return;
    }

    // Promo code is valid - proceed with redemption
    redeemPromo();
}

function redeemPromo() {
    // Increment total redemptions
    incrementTotalRedemptions();
    
    // Mark this user as redeemed
    markUserAsRedeemed();

    // Determine if user wins
    const hasWon = checkIfWinner();

    if (hasWon) {
        // Show winner form
        showWinnerForm();
    } else {
        // Show thank you message
        showMessage('Thanks for joining! Better luck next time.', 'success');
        
        // Disable redemption form for this user
        disableRedemptionForUser();
    }

    // Check if limit reached after this redemption
    checkPromoLimit();
}

function checkIfWinner() {
    // Check how many winners we've had so far
    const currentWinners = getTotalWinners();
    
    // If we already have max winners, no one else can win
    if (currentWinners >= MAX_WINNERS) {
        return false;
    }
    
    // Calculate remaining redemptions and remaining winners
    const currentRedemptions = getTotalRedemptions();
    const remainingRedemptions = MAX_REDEMPTIONS - currentRedemptions;
    const remainingWinners = MAX_WINNERS - currentWinners;
    
    // Calculate probability: remaining winners / remaining redemptions
    const winProbability = remainingWinners / remainingRedemptions;
    
    // Generate random number between 0 and 1
    const random = Math.random();
    
    // User wins if random number is less than win probability
    return random < winProbability;
}

function showWinnerForm() {
    const redeemForm = document.getElementById('redeemForm');
    const winnerForm = document.getElementById('winnerForm');

    // Increment winner count
    incrementTotalWinners();

    // Hide redeem form
    redeemForm.style.display = 'none';
    
    // Show winner form
    winnerForm.style.display = 'block';
}

function handleWinnerSubmission() {
    const nameInput = document.getElementById('winnerName');
    const sectionInput = document.getElementById('winnerSection');
    
    const name = nameInput.value.trim();
    const section = sectionInput.value.trim();

    // Validate inputs
    if (!name || !section) {
        alert('Please fill in all fields');
        return;
    }

    // Generate unique winning ID
    const winningId = generateWinningId();

    // Show winner confirmation
    showWinnerConfirmation(name, section, winningId);
}

function showWinnerConfirmation(name, section, winningId) {
    const winnerForm = document.getElementById('winnerForm');
    const winnerConfirmation = document.getElementById('winnerConfirmation');
    
    const displayName = document.getElementById('displayName');
    const displaySection = document.getElementById('displaySection');
    const displayWinningId = document.getElementById('displayWinningId');

    // Set the values
    displayName.textContent = name;
    displaySection.textContent = section;
    displayWinningId.textContent = winningId;

    // Hide winner form
    winnerForm.style.display = 'none';
    
    // Show confirmation
    winnerConfirmation.style.display = 'block';
}

function generateWinningId() {
    // Generate unique ID with timestamp and random number
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `WIN-${timestamp}-${random}`;
}

// ========================================
// LocalStorage Functions
// ========================================

function getTotalRedemptions() {
    const count = localStorage.getItem('totalRedemptions');
    return count ? parseInt(count) : 0;
}

function incrementTotalRedemptions() {
    const current = getTotalRedemptions();
    localStorage.setItem('totalRedemptions', current + 1);
}

function getTotalWinners() {
    const count = localStorage.getItem('totalWinners');
    return count ? parseInt(count) : 0;
}

function incrementTotalWinners() {
    const current = getTotalWinners();
    localStorage.setItem('totalWinners', current + 1);
}

function hasUserRedeemed() {
    return localStorage.getItem('userRedeemed') === 'true';
}

function markUserAsRedeemed() {
    localStorage.setItem('userRedeemed', 'true');
}

function checkPromoLimit() {
    const currentRedemptions = getTotalRedemptions();
    
    if (currentRedemptions >= MAX_REDEMPTIONS) {
        disableRedemption();
        showMessage('Sorry, the promo redemption limit has been reached', 'error');
    }
}

function disableRedemption() {
    const redeemBtn = document.getElementById('redeemBtn');
    const promoInput = document.getElementById('promoInput');
    
    redeemBtn.disabled = true;
    promoInput.disabled = true;
}

function disableRedemptionForUser() {
    const redeemBtn = document.getElementById('redeemBtn');
    const promoInput = document.getElementById('promoInput');
    
    redeemBtn.disabled = true;
    promoInput.disabled = true;
    promoInput.value = '';
}

// ========================================
// Helper Functions
// ========================================

function showMessage(message, type) {
    const messageArea = document.getElementById('messageArea');
    messageArea.textContent = message;
    messageArea.className = `message-area ${type}`;
}