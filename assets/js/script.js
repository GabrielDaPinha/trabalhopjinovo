/* ===================================================
   SEÇÃO EVOLUÇÃO DOS DRAGÕES
=================================================== */

// Seleciona a seção inteira
const evolutionSection =
document.querySelector(".evolution");

// Linha que atravessa a seção
const line =
document.querySelector(".progress-line");

// Cada estágio da evolução
const egg =
document.querySelector(".egg");

const baby =
document.querySelector(".baby");

const adult =
document.querySelector(".adult");


/*
    Observer monitora quando a seção
    entra na tela.
*/
const evolutionObserver =
new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        /*
            Quando pelo menos 40%
            da seção estiver visível
        */
        if(entry.isIntersecting){

            // Ovo aparece imediatamente
            egg.classList.add("show");

            // Linha começa a crescer
            line.classList.add("animate");

            /*
                Depois de 1.2s
                aparece o filhote
            */
            setTimeout(() => {

                baby.classList.add("show");

            }, 1200);

            /*
                Depois de 2.5s
                aparece o dragão adulto
            */
            setTimeout(() => {

                adult.classList.add("show");

            }, 2500);

            /*
                Para de observar.
                A animação roda apenas uma vez.
            */
            evolutionObserver.unobserve(
                evolutionSection
            );

        }

    });

},{
    threshold: 0.4
});

// Começa a observar a seção
evolutionObserver.observe(
    evolutionSection
);



/* ===================================================
   SEÇÃO DE CONTADORES
=================================================== */

// Seleciona todos os elementos
// com classe counter
const counters =
document.querySelectorAll(".counter");

// Seleciona a seção stats
const statsSection =
document.querySelector(".stats");

// Impede que a animação execute
// mais de uma vez
let countersStarted = false;


/*
    Função responsável por animar
    um contador individual
*/
function animateCounter(counter){

    /*
        Lê o valor do atributo
        data-target
    */

    const target =
    Number(counter.dataset.target);

    /*
        Duração da animação
        em milissegundos
    */

    const duration = 2000;

    /*
        Marca o momento
        em que a animação começou
    */

    const startTime =
    performance.now();


    function update(currentTime){

        /*
            Tempo já passado
        */

        const elapsed =
        currentTime - startTime;

        /*
            Valor entre 0 e 1
            representando o progresso
        */

        const progress =
        Math.min(elapsed / duration, 1);

        /*
            Calcula o número atual
        */

        const currentValue =
        Math.floor(
            progress * target
        );

        /*
            Atualiza o texto
        */

        counter.textContent =
        currentValue + "%";

        /*
            Continua animando
            até chegar em 100%
            do progresso
        */

        if(progress < 1){

            requestAnimationFrame(
                update
            );

        } else {

            /*
                Garante o valor final exato
            */

            counter.textContent =
            target + "%";

        }

    }

    /*
        Inicia a animação
    */

    requestAnimationFrame(
        update
    );

}


/*
    Observer da seção stats
*/
const statsObserver =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        /*
            Quando a seção
            aparecer na tela
        */

        if(
            entry.isIntersecting &&
            !countersStarted
        ){

            countersStarted = true;

            /*
                Executa a animação
                para cada contador
            */

            counters.forEach(counter => {

                animateCounter(counter);

            });

            /*
                Para de observar
            */

            statsObserver.unobserve(
                statsSection
            );

        }

    });

},{
    threshold: 0.4
});

// Observa a seção
statsObserver.observe(
    statsSection
);


/* ===================================================
   MENU FIXO
=================================================== */

function initFixedMenu() {
    const navbar = document.querySelector(".sticky-menu");
    
    if (!navbar) return;

    // Aplica estilos de menu fixo dinamicamente
    navbar.style.position = "fixed";
    navbar.style.top = "0";
    navbar.style.left = "0";
    navbar.style.right = "0";
    navbar.style.zIndex = "7000";
    navbar.style.width = "100%";
    navbar.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.22)";

    // Adiciona padding no body para compensar menu fixo
    document.body.style.paddingTop = "70px";
}

function initNavMenuAutoClose() {
    const navbarCollapse = document.getElementById("navbarNav");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const toggler = document.querySelector(".navbar-toggler");

    if (!navbarCollapse || !navLinks.length) return;

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            const linkUrl = new URL(href, location.href);

            if (navbarCollapse.classList.contains("show")) {
                navbarCollapse.classList.remove("show");
                navbarCollapse.classList.add("collapsing");
                setTimeout(() => {
                    navbarCollapse.classList.remove("collapsing");
                }, 300);
                if (toggler) {
                    toggler.classList.add("collapsed");
                    toggler.setAttribute("aria-expanded", "false");
                }
            }

            if (linkUrl.pathname === location.pathname && linkUrl.hash) {
                const target = document.querySelector(linkUrl.hash);
                if (target) {
                    event.preventDefault();
                    setTimeout(() => {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 150);
                }
            }
        });
    });
}

// Aguarda o DOM estar carregado
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        initFixedMenu();
        initNavMenuAutoClose();
    });
} else {
    initFixedMenu();
    initNavMenuAutoClose();
}