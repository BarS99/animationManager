class AnimationManager {
    constructor() {}

    // -------------------- METHODS --------------------

    /**
     * Sets property values before the animation is executed. Returns the reference to this (AnimationManager).
     * @param {HTMLElement} _targets - Targets as a Node List.
     * @param {object} _rules - Rules to be applied as an Object.
     */
    from = (_targets, _rules) => {
        const targets = [..._targets];
        if (targets.length === 0) {
            console.warn('AnimationManager: Targets not found!');
            return;
        };

        targets.forEach((target) => {
            for (const key in _rules) {
                target.style[key] = _rules[key];
            }
        });

        return this;
    }

    /**
     * Sets property values after the animation is executed. Returns the reference to this (AnimationManager).
     * @param {HTMLElement} _targets - Targets as a Node List.
     * @param {object} _rules - Rules to be applied as an Object.
     * @param {object} _options - Options to be applied as an Object.
     * @param {number} _options.timeout - Time in miliseconds before the animation starts (100 by default).
     * @param {number} _options.delay - Time in miliseconds between the execution of the animation between targets (300 by default).
     * @param {number} _options.rootMargin - Read more about rootMargin in IntersectionObserver ("100px 0px 100px 0px" by default).
     * @param {number} _options.threshold - Read more about threshold in IntersectionObserver (0 by default).
     * @param {number} _options.ease - A css easing function for the animation (ease-in-out by default).
     * @param {number} _options.duration - Duration of the animation in miliseconds (600 by default).
     * @param {number} _options.executeForAll - Execute the animation for all elements after at least one element is intersecting (false by default).
     * @param {number} _options.classToAdd - Add a class after the animation has stared (null by default). Define a keyframe class in animationManager.css.
     */
    to = (_targets, _rules, _options) => {
        const targets = [..._targets];
        if (targets.length === 0) {
            console.warn('AnimationManager: Targets not found!');
            return;
        }

        let options = {
            timeout: 100,
            delay: 300,
            rootMargin: "100px 0px 100px 0px",
            threshold: 0,
            ease: 'ease-in-out',
            duration: 600,
            executeForAll: false,
            classToAdd: null,
        }

        options = {
            ...options,
            ..._options
        };

        const observer = new IntersectionObserver((_entries) => {
            _entries.forEach((_entry) => {
                if (!_entry.isIntersecting) return;

                if (options.executeForAll) {
                    this.setProperties(targets, _rules, options);
                    observer.disconnect();
                } else {
                    _entry.target.classList.add("isIntersecting");
                    setTimeout(() => {
                        const intersectingTargets = targets.filter((item) => {
                            return item.classList.contains('isIntersecting');
                        });

                        this.setProperties(intersectingTargets, _rules, options);

                        // set options.timeout to 0 after the animation is called for the first time so it's applicable just once
                        setTimeout(() => {
                            options.timeout = 0;
                        }, options.timeout)
                    }, 50);
                    observer.unobserve(_entry.target);
                }
            });
        }, options);

        targets.forEach((_target) => {
            observer.observe(_target);
        });

        return this;
    }

    // -------------------- UTILITIES --------------------

    setProperties(_targets, _rules, _options) {
        let start = null,
            numberOfTargets = _targets.length,
            numberOfTargetsAnimated = 0;
        const timeout = _options.timeout;

        const step = (_timestamp) => {
            if (start === null) start = _timestamp;
            const progress = _timestamp - start;

            if (progress > numberOfTargetsAnimated * _options.delay) {
                _targets[numberOfTargetsAnimated].style.transition = `all ${_options.duration}ms ${_options.ease} `;
                if (_options.classToAdd != null) {
                    _targets[numberOfTargetsAnimated].classList.add(_options.classToAdd);
                }

                for (const key in _rules) {
                    _targets[numberOfTargetsAnimated].style[key] = _rules[key];
                }

                _targets[numberOfTargetsAnimated].classList.remove('zeroOpacity');

                numberOfTargetsAnimated++;
            }

            if (numberOfTargetsAnimated < numberOfTargets) {
                requestAnimationFrame(step);

                _targets.forEach((target) => {
                    target.classList.remove('isIntersecting');
                });
            }
        }

        setTimeout(() => {
            requestAnimationFrame(step);
        }, timeout);
    }
}