import '../styles/main.scss';
import Footer from '../scripts/components/footer.js';
import Main from '../scripts/components/main.js';

const App = {
    Main,
    Footer
};

window.onload = function () {
    App.Footer.init();
    App.Main.init();
};
