window.addEventListener('load', () => {
    const animationManager = new AnimationManager();

    const header = document.querySelectorAll('.header');
    animationManager.from(header, {
        transform: "translateX(-100%)",
    }).to(header, {
        transform: "translateX(0)",
    }, {
        duration: 400,
    })

    const mainPhoto = document.querySelectorAll('.main-photo');
    animationManager.from(mainPhoto, {
        opacity: 0,
    }).to(mainPhoto, {
        opacity: 1,
    }, {
        timeout: 400,
        duration: 800,
    })

    const asideBoxes = document.querySelectorAll('.aside-box');
    animationManager.from(asideBoxes, {
        opacity: 0,
        transform: "scale(0) translate(-80%, -40%)",
    }).to(asideBoxes, {
        opacity: 1,
        transform: "scale(1) translate(0, 0)",
    }, {
        delay: 400,
        timeout: 600,
    });

    const layoutContent = document.querySelectorAll('.layout__content');
    animationManager.from(layoutContent, {}).to(layoutContent, {}, {
        timeout: 800,
        classToAdd: 'zoomIn'
    });
})