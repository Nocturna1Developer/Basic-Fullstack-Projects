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


// Transpose the 2D reels array to convert it from a column-based format to a row-based format.
const transpose = (reels) => {
    // Define an empty array to hold the rows
    const rows = [];
    // Loop over each slot (row) in the current reel
    for (let i = 0; i < ROWS; i++) {
        // Initialize a new row as an empty array
        rows.push([]);
        // Loop over each reel (column)
        for (let j = 0; j < COLS; j++) {
            // Push the symbol from the jth reel and ith slot to the ith row
            rows[i].push(reels[j][i])
        }
    }
}

// Print the rows of symbols, with "|" between each symbol for visual separation
const printRows = (rows) => {
    // Loop over each row
    for (const row of rows) {
        // Initialize an empty string to hold the symbols in this row
        let rowString = " ";
        // Loop over each symbol in this row, along with its index
        for (const [i, symbol] of row.entries()) {
            // Add the current symbol to the row string
            rowString += symbol
            // If we're not at the last symbol, add a " | " for visual separation
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        // Print the row string
        console.log(rowString);
    }
}

// Calculate the winnings based on the bet amount, number of lines, and the symbols in the rows
const getWinnings = (rows, bet, lines) => {
    // Initialize winnings as 0
    let winnings = 0
    // Only consider the number of lines that the player bet on
    for (let row = 0; row < lines; row++) {
        // Get the symbols in the current row
        const symbols = rows[row];
        // Initialize a boolean flag as true, to indicate if all symbols in this row are the same
        let allSame = true;
        // Loop over each symbol in this row
        for (const symbol of symbols) {
            // If the current symbol is different from the first symbol, set the flag to false and break the loop
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        // If all symbols in this row are the same, increase winnings by the bet amount times the value of the symbol
        if (allSame) {
            winnings += bet * SYMBOLS_MULTIPLIER[symbols[0]]
        }
        // Return the winnings for this game
        return winnings;
    }
}
