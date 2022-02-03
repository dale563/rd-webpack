const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin( ['src/assets/images/*.{jpg,png}'], {
    destination: 'src/assets/images/webp',
    plugins: [
        imageminWebp( { quality: 60 } )
    ]
} )
