// Import the "prompt-sync" library, which lets us synchronously get user input
const prompt = require("prompt-sync")();

// Define some universal variables for our game. These represent the number of rows and columns on the slot machine
const ROWS = 3;
const COLS = 3;

// An object that represents the count of each symbol on the slot machine
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

// An object that represents the value of each symbol on the slot machine
const SYMBOLS_MULTIPLIER = {
    A: 5,
    B: 3,
    C: 6,
    D: 2
}

// Function to handle the player depositing money into the slot machine
const deposit = () => {
    // Keep asking for input until we get a valid deposit amount
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ")
        const numberDepositAmount = parseFloat(depositAmount);

        // If the input is not a positive number, tell the player and ask again
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, please enter a positive number.")
        }
        else {
            // If the input is valid, return it as the deposit amount
            return numberDepositAmount;
        }
    }
}

// The player's current balance is the amount they deposited
let balance = deposit();

// Function to handle the player choosing how many lines to bet on
const getNumberLines = () => {
    // Keep asking for input until we get a valid number of lines
    while (true) {
        const numberOfLines = prompt("How many lines do you want to bet on? (1-3)")
        const numberOfLinesBetOn = parseFloat(numberOfLines);

        // If the input is not a positive number or is greater than 3, tell the player and ask again
        if (isNaN(numberOfLinesBetOn) || numberOfLinesBetOn <= 0 || numberOfLinesBetOn > 3) {
            console.log("Invalid line amount, please choose 1, 2, or 3 lines.")
        }
        else {
            // If the input is valid, return it as the number of lines
            return numberOfLinesBetOn;
        }
    }
}
const numberOfLines = getNumberLines();

// Function to handle the player choosing how much to bet
const getBetAmount = (balance, lines) => {
    // Keep asking for input until we get a valid bet amount
    while (true) {
        const bet = prompt("How much do you want to bet?")
        const betAmount = parseFloat(bet);

        // If the input is not a positive number or is more than the player can afford, tell the player and ask again
        if (isNaN(betAmount) || betAmount <= 0 || betAmount > (balance / lines)) {
            console.log("Invalid bet amount, please enter a positive number that you can afford.")
        }
        else {
            // If the input is valid, return it as the bet amount
            return betAmount;
        }
    }
}
const betAmount = getBetAmount(balance, numberOfLines);

// Function to simulate spinning the slot machine
const spin = () => {
    const symbols = [];

    // Add each symbol to the array based on how many there should be of each
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    // Create a 2D array to represent the reels of the slot machine. Each sub-array will contain the symbols for one reel.
    const reels = [[], [], []];

    // Loop over each reel (column)
    for (let i = 0; i < COLS; i++) {
        // Copy all the symbols into a new array. We're going to draw symbols from this array, and we don't want to affect the original symbols array.
        const reelSymbols = [...symbols];

        // Loop over each slot (row) in the current reel
        for (let j = 0; j < ROWS; j++) {
            // Generate a random index to pick a symbol from reelSymbols. Math.random() generates a number between 0 (inclusive) and 1 (exclusive), 
            // so we multiply it by the length of the array to get a number between 0 and the last index of the array.
            // We use Math.floor() to round down to the nearest whole number, because array indices have to be whole numbers.
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);

            // Use the random index to pick a symbol from the reelSymbols array
            const selectedSymbol = reelSymbols[randomIndex];

            // Add the chosen symbol to the current reel
            reels[i].push(selectedSymbol);

            // Remove the chosen symbol from reelSymbols so we can't pick it again this spin.
            // splice() changes the original array, removing elements starting from the provided index. 
            // The second argument indicates how many elements to remove. In this case, we're removing one element: the symbol we just added to the reel.
            reelSymbols.splice(randomIndex, 1);
        }
    }
}


const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }
}
const rows = transpose(reels);

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = " ";
        for (const [i, symbol] of rows.entires()) {
            rowString += symbol
            if (i != rows.length - 1) {
                roewString += " | "
            }
        }
        console.log(rowString);
    }
}
printRows(rows);

// Spin the slot machine
const reels = spin();
