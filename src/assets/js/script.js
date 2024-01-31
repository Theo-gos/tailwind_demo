const slideStage = document.querySelector('.App_highlights-content .App_stage');
const nextBtn = document.querySelector('.App_highlights-content .App_navNext');
const prevBtn = document.querySelector('.App_highlights-content .App_navPrev');
const dots = document.querySelector('.App_highlights-content .App_dots');
const stageItemList = slideStage.querySelectorAll('.App_stageItem');
const initialOffset = 17;

let stageItemWidth;
let stageItemMargin;
let firstOffset;

function reCalculateWidthAndMargin() {
    stageItemWidth = stageItemList[0].getBoundingClientRect().width;
    stageItemMargin = Number(getComputedStyle(stageItemList[0]).marginLeft.slice(0, getComputedStyle(stageItemList[0]).marginLeft.indexOf('px')));
    firstOffset = 0 - (initialOffset + (stageItemWidth + stageItemMargin) * 3);
}

reCalculateWidthAndMargin();
slideStage.style.transform = `translate3d(${firstOffset}px, 0px, 0px)`;

nextBtn.addEventListener('click', e => {
    const firstIndex = slideStage.style.transform.indexOf('(') + 1;
    const secondIndex = slideStage.style.transform.indexOf('p');
    const distanceToMove = stageItemWidth + stageItemMargin;
    const currentOffset = Number(slideStage.style.transform.slice(firstIndex, secondIndex));

    if (currentOffset - distanceToMove < firstOffset - distanceToMove * 3) {
        slideStage.style.transform = `translate3d(${firstOffset}px, 0px, 0px)`;
    } else {
        slideStage.style.transform = `translate3d(${currentOffset - distanceToMove}px, 0px, 0px)`;
    }
})

prevBtn.addEventListener('click', e => {
    const firstIndex = slideStage.style.transform.indexOf('(') + 1;
    const secondIndex = slideStage.style.transform.indexOf('p');
    const distanceToMove = stageItemWidth + stageItemMargin;
    const currentOffset = Number(slideStage.style.transform.slice(firstIndex, secondIndex));

    if (currentOffset + distanceToMove > firstOffset + distanceToMove * 3) {
        slideStage.style.transform = `translate3d(${firstOffset}px, 0px, 0px)`;
    } else {
        slideStage.style.transform = `translate3d(${currentOffset + distanceToMove}px, 0px, 0px)`;
    }

    console.log(slideStage.style.transform.slice(firstIndex, secondIndex));
})

dots.addEventListener('click', e => {
    reCalculateWidthAndMargin();
    const currentDot = e.target.closest('.App_dot');
    const actDot = dots.querySelector('.App_dot.active');
    const dotsList = Array.from(dots.querySelectorAll('.App_dot'));

    actDot.classList.remove('active');
    currentDot.classList.add('active');

    const index = dotsList.indexOf(dotsList.find(dot => dot.classList === currentDot.classList));

    slideStage.style.transform = `translate3d(${firstOffset - (stageItemWidth + stageItemMargin - 10) * index}px, 0px, 0px)`;
})

addEventListener('resize', e => {
    const firstIndex = slideStage.style.transform.indexOf('(') + 1;
    const secondIndex = slideStage.style.transform.indexOf('p');
    const currentOffset = Number(slideStage.style.transform.slice(firstIndex, secondIndex));    
    const currentSlide = ((0 - currentOffset - initialOffset) / (stageItemWidth + stageItemMargin)).toFixed(0);
    reCalculateWidthAndMargin();
    if (window.innerWidth <= 430) {
        const dot1 = document.createElement('button');
        dot1.role = 'button';
        dot1.classList.add('App_dot');
        dot1.appendChild(document.createElement('span'));
        
        const dot2 = document.createElement('button');
        dot2.role = 'button';
        dot2.classList.add('App_dot');
        dot2.appendChild(document.createElement('span'));
        
        dots.appendChild(dot1);
        dots.appendChild(dot2);

        slideStage.style.transform = `translate3d(${firstOffset}px, 0px, 0px)`;
        const activeDot = dots.querySelector('.App_dot.active');
        activeDot.classList.remove('active');
        dots.querySelector('.App_dot').classList.add('active');
    } else {
        const dotNumber = dots.querySelectorAll('.App_dot:not(.active)');
        if (dotNumber.length > 2) {
            dots.removeChild(dotNumber[0]);
            dots.removeChild(dotNumber[1]);
        }
        const offset = 0 - (initialOffset + (stageItemWidth + stageItemMargin) * currentSlide);
        slideStage.style.transform = `translate3d(${offset}px, 0px, 0px)`;
    }
});