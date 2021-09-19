window.addEventListener('load', () => {
    const animationManager = new AnimationManager();

    const mainPhoto = document.querySelectorAll('.main-photo');
    animationManager.from(mainPhoto, {
        opacity: 0,
    }).to(mainPhoto, {
        opacity: 1,
    }, {
        duration: 1000,
    })

    const asideBoxes = document.querySelectorAll('.aside-box');
    animationManager.from(asideBoxes, {
        opacity: 0,
        transform: "scale(0) translate(-80%, -40%)",
    }).to(asideBoxes, {
        opacity: 1,
        transform: "scale(1) translate(0, 0)",
    }, {
        delay: 300,
        timeout: 400,
        classToAdd: "Animated!"
    });
})