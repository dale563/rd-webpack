import '../styles/presentation.scss';
import Reveal from 'reveal.js/dist/reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';


Reveal.initialize({
    controls: true,
    progress: true,
    center: true,
    hash: true,
    embedded: false,
    plugins: [ Markdown, Highlight ]
});

document.querySelector( '.reveal' ).style.height = '91%';

Reveal.layout();
