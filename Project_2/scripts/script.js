/* 
*   @author Roman Machala (xmacha86)
*   @date 25.4.2024
*
*
*   Prohlasuji, ze veskery kod, ktery se nachazi v tomto dokuemntu a v dokumentech prilozenych je mym autorskym dilem.
*   Pokud u nejake casti bylo treba "inspirovat se" (ne vsak opsat kod), mysleno, nastudovat danou technologii, je k tomu prideleno okdud bylo cerpano.
*   
*   Nejvice je tato cast ohledne studie danych technologii popsana v /styles/style.css 
*/


/* 
*   Umoznuje nataceni elementu v sekci Projects 
*
*   pro tuto cast jsem studoval 3D animace za pomoci JS: https://medium.com/@chengdai/create-3d-animation-for-your-website-by-using-javascript-7619f8bbde9
*   ve vysledku se ani tak nejedna o 3D animaci, spise jen o nakloneni elementu, 3D na tom tvori ::before element (vice v /styles/style.css)
*
*/
document.addEventListener('mousemove', (event) => {
    // ziska aktualni pozici myse
    const { clientX, clientY } = event;

    //stred osy je ve stredu obrazovky
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // vypocitame vzdalenost od stredu obrazovky
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // prevedeme rozdily na uhly v stupnich (max je 5 stupnu natoceni)
    const rotateX = -deltaY / centerY * 10; // otoceni kolem X
    // musi byt zaporne (zjistil jsem zpusobem "try out and find out :D")
    const rotateY = deltaX / centerX * 10;  // otoceni kolem Y

    //nalezneme elementy, ktere chceme transformovat
    const projects = document.querySelectorAll('#projects-content #projects-wrapper .project');

    // pro kazdy z nich nastavime transformaci
    projects.forEach(project => {
        project.style.transform = `perspective(5000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });
});

/*
*   Efekt scroll reveal, lazy loading 
*   Aplikuje animaci zobrazeni elementu az pri jeho "viditelnosti" ve viewportu
*
*  
*   Studoval jsem nasledujici video: https://www.youtube.com/watch?v=rENxM-2Ek9E&ab_channel=CodeWellTech
*   + jsem se dival na scrollrevealjs.org a revealjs.com
*
*   Zkontroluje, jestli se dany element nachazi ve viewportu a pokud ano (s nejakym odstupem pro lepsi viditelnost animace)
*   prida danemu elemntu odpovidajici tridu (visible nebo hidden)
*
*/
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.hidden'); // vybereme vsechny elementy se tridou hidden (tedy ty, ktere maji byt animovany)

    const revealOnScroll = () => {
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementBottom = el.getBoundingClientRect().bottom;
            const viewportHeight = window.innerHeight;

            // Zkontroluejeme, zdali je element viditelny ve viewportu
            if (elementTop < viewportHeight - 150 && elementBottom > 200) { //posuneme trosku jejich animaci o 150 a 200 pixelu, aby byla dostatecne viditelna
                el.classList.add('visible'); // pridame classu visible
                el.classList.remove('hidden'); //oddelame classu hidden
            } else { //pokud jiz neni element viditelny
                el.classList.add('hidden'); //pridame classu hiden
                el.classList.remove('visible'); //oddelame classu visible
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll); // pridame listener pri scrollovani
    revealOnScroll(); // zavolame funkci 
});
