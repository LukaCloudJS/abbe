const botao = document.getElementById('button');
let page = 0
let user = ''
let other = ''
let count = 0
botao.addEventListener('click', (e) => {
    count++
    // Criamos o elemento de texto
    const home = document.getElementById('home');
    const span = document.createElement('span');
    span.className = 'feedback-texto';
    span.innerText = `${user} abraçou ${other} ${count} vezes! ❤️`; // O texto que você quiser

    home.appendChild(span);

    // Remove o span assim que a animação acabar (1.5s)
    setTimeout(() => {
        span.remove();
    }, 1500);
    const quantidade = 10;

    for (let i = 0; i < quantidade; i++) {
        const coracao = document.createElement('div');
        const hearts = ['💖', '❤️', '💗']
        coracao.innerHTML = hearts[Math.floor(Math.random() * hearts.length)]
        coracao.className = 'confete-coracao';

        coracao.style.left = `${e.clientX}px`;
        coracao.style.top = `${e.clientY}px`;

        const angulo = Math.random() * Math.PI * 2;
        const velocidade = 50 + Math.random() * 200;

        const x = Math.cos(angulo) * velocidade + 'px';
        const y = Math.sin(angulo) * velocidade + 'px';
        const r = (Math.random() * 360) + 'deg';

        coracao.style.setProperty('--x', x);
        coracao.style.setProperty('--y', y);
        coracao.style.setProperty('--r', r);

        document.body.appendChild(coracao);

        coracao.addEventListener('animationend', () => coracao.remove());
    }
});

function sendClick() {
    const screen = document.getElementById('name')
    const final = document.getElementById('final')
    const screenother = document.getElementById('home')
    const question = document.getElementById('question')
    const text = document.getElementById('textarea')

    if (text.value.length === 0) return
    if (page === 0) {
        question.textContent = 'Quem você quer abraçar?'
        user = text.value
    }
    if (page === 1) {
        screen.classList.add('fade')
        other = text.value
        setTimeout(() => {
            screen.style.display = 'none'
            screenother.style.display = 'flex'
            screenother.classList.add('unfade')
            final.textContent = `Clique para abraçar ${other}`
        }, 500)
    }
    const time = setInterval(() => {
        if (text.value.length === 0) clearInterval(time)
        text.value = text.value.slice(0, text.value.length - 1)
    }, 90)
    page++
}

const textInput = document.getElementById('textarea');

textInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendClick();
    }
});