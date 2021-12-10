console.log('Script exclusif à la page présentation');

// Change the size of our presentation
document.querySelector( '.reveal' ).style.height = '91%';

// Make reveal.js aware of the size change
Reveal.layout();
