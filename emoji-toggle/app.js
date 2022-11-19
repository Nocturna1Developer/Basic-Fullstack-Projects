// Simply toggles different emojis


// Shift + 1 auto imports everything from index
// Shift + alt + down to paste the same line again

// gets the 'closed' from index.html
const happyFace = document.querySelector('#happy-face');
const cryFace = document.querySelector('#cry-face');

// event listener. click, function (arrow function is used here)
happyFace.addEventListener('click', () => {
    if (cryFace.classList.contains('open')) { // <div class="emoji open" id = "cry-face">😭</div>
        // triggers .active in the styles.css (adds active class in html line)
        cryFace.classList.add('active');
        happyFace.classList.remove('active');
    }
})

cryFace.addEventListener('click', () => {
    if (happyFace.classList.contains('closed')) {
        happyFace.classList.add('active');
        cryFace.classList.remove('active');
    }
})