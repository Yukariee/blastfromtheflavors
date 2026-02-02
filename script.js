const PROMO_CODE = "BLAST2026";
const MAX_REDEMPTIONS = 1000;
const MAX_WINNERS = 5;

document.addEventListener("DOMContentLoaded", () => {
    initMenuEffects();
    initPromoSystem();
    initAdminPanel();
});

function initMenuEffects() {
    const menuCards = document.querySelectorAll(".menu-card");

    menuCards.forEach(card => {
        card.addEventListener("click", () => {
            card.style.transform = "scale(0.97)";
            setTimeout(() => {
                card.style.transform = "";
            }, 150);
        });
    });
}

// ========================================
// ADMIN PANEL
// ========================================

function initAdminPanel() {
    const logo = document.getElementById("logoTrigger");
    const panel = document.getElementById("adminPanel");
    const closeBtn = document.getElementById("closeAdmin");
    const refreshBtn = document.getElementById("refreshStats");
    const resetBtn = document.getElementById("resetAll");

    let clickCount = 0;
    let clickTimer = null;

    // Triple-click logo to show admin panel
    logo.addEventListener("click", () => {
        clickCount++;
        
        if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 500);
        }
        
        if (clickCount === 3) {
            clearTimeout(clickTimer);
            clickCount = 0;
            toggleAdminPanel();
        }
    });

    closeBtn.addEventListener("click", () => {
        panel.style.display = "none";
    });

    refreshBtn.addEventListener("click", updateAdminStats);

    resetBtn.addEventListener("click", () => {
        if (confirm("⚠️ Are you sure you want to reset ALL data? This cannot be undone!")) {
            if (confirm("Really sure? This will delete all redemptions and winners!")) {
                resetAllData();
                updateAdminStats();
                alert("✅ All data has been reset!");
            }
        }
    });

    // Update stats when panel is shown
    updateAdminStats();
}

function toggleAdminPanel() {
    const panel = document.getElementById("adminPanel");
    if (panel.style.display === "none") {
        panel.style.display = "block";
        updateAdminStats();
    } else {
        panel.style.display = "none";
    }
}

function updateAdminStats() {
    const totalRedemptions = getTotalRedemptions();
    const totalWinners = getTotalWinners();
    const remainingRedemptions = MAX_REDEMPTIONS - totalRedemptions;
    const remainingWinners = MAX_WINNERS - totalWinners;

    document.getElementById("adminTotalRedemptions").textContent = 
        `${totalRedemptions} / ${MAX_REDEMPTIONS}`;
    document.getElementById("adminRemainingRedemptions").textContent = 
        remainingRedemptions;
    document.getElementById("adminTotalWinners").textContent = 
        `${totalWinners} / ${MAX_WINNERS}`;
    document.getElementById("adminRemainingWinners").textContent = 
        remainingWinners;
}

function resetAllData() {
    localStorage.removeItem("totalRedemptions");
    localStorage.removeItem("totalWinners");
    localStorage.removeItem("userRedeemed");
    localStorage.removeItem("winners");
    
    // Re-enable form
    document.getElementById("redeemBtn").disabled = false;
    document.getElementById("promoInput").disabled = false;
}

// ========================================
// PROMO SYSTEM
// ========================================

function initPromoSystem() {
    const redeemBtn = document.getElementById("redeemBtn");
    const promoInput = document.getElementById("promoInput");

    redeemBtn.addEventListener("click", handleRedemption);

    promoInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleRedemption();
    });

    checkPromoLimit();
}

// ========================================
// REDEMPTION LOGIC
// ========================================

function handleRedemption() {
    const promoInput = document.getElementById("promoInput");
    const enteredCode = promoInput.value.trim().toUpperCase();

    clearMessage();

    if (!enteredCode) {
        showMessage("Please enter a promo code", "error");
        return;
    }

    if (hasUserRedeemed()) {
        showMessage("You have already redeemed this promo code", "error");
        return;
    }

    if (enteredCode !== PROMO_CODE) {
        showMessage("Invalid promo code", "error");
        return;
    }

    if (getTotalRedemptions() >= MAX_REDEMPTIONS) {
        showMessage("Promo limit has been reached", "error");
        disableRedemption();
        return;
    }

    redeemPromo();
}

function redeemPromo() {
    incrementTotalRedemptions();
    markUserAsRedeemed();

    if (checkIfWinner()) {
        showWinnerForm();
    } else {
        showMessage("Thanks for joining! Better luck next time.", "success");
        disableRedemptionForUser();
    }

    checkPromoLimit();
    updateAdminStats(); // Update admin panel if it's open
}

// ========================================
// WINNER LOGIC
// ========================================

function checkIfWinner() {
    const winners = getTotalWinners();
    if (winners >= MAX_WINNERS) return false;

    const remainingRedemptions = MAX_REDEMPTIONS - getTotalRedemptions();
    const remainingWinners = MAX_WINNERS - winners;

    const chance = remainingWinners / remainingRedemptions;
    return Math.random() < chance;
}

function showWinnerForm() {
    incrementTotalWinners();

    document.getElementById("redeemForm").style.display = "none";
    document.getElementById("winnerForm").style.display = "block";

    document
        .getElementById("submitWinnerBtn")
        .addEventListener("click", handleWinnerSubmission);
}

function handleWinnerSubmission() {
    const name = document.getElementById("winnerName").value.trim();
    const section = document.getElementById("winnerSection").value.trim();

    if (!name || !section) {
        alert("Please fill in all fields");
        return;
    }

    const winningId = generateWinningId();
    
    // Save winner data
    saveWinnerData(name, section, winningId);
    
    showWinnerConfirmation(name, section, winningId);
    updateAdminStats(); // Update admin panel
}

function showWinnerConfirmation(name, section, id) {
    document.getElementById("winnerForm").style.display = "none";
    document.getElementById("winnerConfirmation").style.display = "block";

    document.getElementById("displayName").textContent = name;
    document.getElementById("displaySection").textContent = section;
    document.getElementById("displayWinningId").textContent = id;
}

function generateWinningId() {
    return `WIN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function saveWinnerData(name, section, winningId) {
    const winners = getWinners();
    winners.push({
        name: name,
        section: section,
        winningId: winningId,
        timestamp: new Date().toISOString(),
        redemptionNumber: getTotalRedemptions()
    });
    localStorage.setItem("winners", JSON.stringify(winners));
}

function getWinners() {
    const data = localStorage.getItem("winners");
    return data ? JSON.parse(data) : [];
}

// ========================================
// LOCAL STORAGE HELPERS
// ========================================

function getTotalRedemptions() {
    return parseInt(localStorage.getItem("totalRedemptions")) || 0;
}

function incrementTotalRedemptions() {
    localStorage.setItem("totalRedemptions", getTotalRedemptions() + 1);
}

function getTotalWinners() {
    return parseInt(localStorage.getItem("totalWinners")) || 0;
}

function incrementTotalWinners() {
    localStorage.setItem("totalWinners", getTotalWinners() + 1);
}

function hasUserRedeemed() {
    return localStorage.getItem("userRedeemed") === "true";
}

function markUserAsRedeemed() {
    localStorage.setItem("userRedeemed", "true");
}

// ========================================
// UI HELPERS
// ========================================

function checkPromoLimit() {
    if (getTotalRedemptions() >= MAX_REDEMPTIONS) {
        disableRedemption();
    }
}

function disableRedemption() {
    document.getElementById("redeemBtn").disabled = true;
    document.getElementById("promoInput").disabled = true;
}

function disableRedemptionForUser() {
    const btn = document.getElementById("redeemBtn");
    const input = document.getElementById("promoInput");

    btn.disabled = true;
    input.disabled = true;
    input.value = "";
}

function showMessage(text, type) {
    const area = document.getElementById("messageArea");
    area.textContent = text;
    area.className = `message-area ${type}`;
}

function clearMessage() {
    const area = document.getElementById("messageArea");
    area.textContent = "";
    area.className = "message-area";
}
