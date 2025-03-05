var typed = new Typed('#h1TitleHomePage', {
    strings: ['Hello i\'m <span class="important">Infuseting</span>. ^1000', 'This is my <span class="important">Portfolio</span>. Enjoy ! ^1000'],
    typeSpeed: 150,
    loop: true,
    showCursor: false,

});

const cards = document.querySelectorAll(".card");
for(let i=0; i<cards.length; i++){
    cards[i].addEventListener('mousemove', rotate);
    cards[i].addEventListener('mouseleave', clearRotate);
}

function rotate(e){
    const cardItem = this.querySelector(".card-item");
    const force = 5;
    const offsetY = -(e.offsetY - cardItem.offsetHeight/2)/force;
    const offsetX = (e.offsetX - cardItem.offsetWidth/2)/force;
    cardItem.style.transform = 'rotateX(' + offsetY + 'deg) rotateY(' + offsetX + 'deg)';
}

function clearRotate(e){
    if(e.target.classList.contains("card")){
        const cardItem = this.querySelector(".card-item");
        cardItem.style.transform = 'rotateX(0) rotateY(0)';
    }
}

const scrollAreas = document.querySelectorAll('.auto-scroll-area > *');


scrollAreas.forEach(area => {
    const direction = area.classList.contains('left') ? 'left' : 'right';
    setTimeout(() => infiniteScroll(area, direction), 1000);
});

async function infiniteScroll(element, direction) {
    let scrollAmount = 0;
    const step = 1  ; // Adjust the scroll speed here
    const width = Math.random() * (element.scrollWidth - window.innerWidth);
    scrollAmount = width;
    element.scrollLeft = width;

    async function scroll() {
        element.scrollLeft += direction === 'left' ? -step : step;
        scrollAmount += step;
        if (scrollAmount < 0) {
            scrollAmount = element.scrollWidth - window.innerWidth;
        }
        if (scrollAmount >= element.scrollWidth - window.innerWidth) {
            const firstChild = element.firstElementChild;
            if (firstChild) {
                element.appendChild(firstChild);
                scrollAmount -= firstChild.scrollWidth;
                element.scrollLeft -= firstChild.scrollWidth;
            }
        }

        setTimeout(() => scroll(), 20);
    }
    scroll();
}