function Speck(container) {
    const module = {};

    module._container = container;
    module._yMax = null;
    module._yMin = 0;
    module._xMax = null;
    module._xMin = 0;
    module._particles = [];

    //appearance properties
    module.count = 40;
    module.minSize = 2;
    module.maxSize = 8;
    module.minOpacity = 0.5;
    module.maxOpacity = 0.8;
    module.color = '#f7f7f7';
    module.border = '0px solid #fff';

    //animation properties
    module.yChange = 6;
    module.xChange = 0;
    module.speed = 200;
    module.rightToLeft = 0.8;
    module.direction = 'up';
    module.yMaxThreshold = 100;
    module.yMinThreshold = -100;

    module._decorateParticle = function (div, i) {
        div.setAttribute('class', 'speck speck-no-' + i);
        div.style.backgroundColor = module.color;
        div.style.border = module.border;

        const min = module.minSize;
        const max = module.maxSize;
        const hw = Math.floor(Math.random() * (max - min) + min) + 'px';

        const minop = module.minOpacity;
        const maxop = module.maxOpacity;
        const opacity = (Math.random() * (maxop - minop) + minop);

        div.style.opacity = opacity;
        div.style.height = hw;
        div.style.width = hw;
        div.style.position = 'absolute';
        div.style.borderRadius = '50%';
        div.style.transition = "top " + module.speed + "ms linear, " + "left " + module.speed + "ms linear";
        div.style.WebkitTransition = "top " + module.speed + "ms linear, " + "left " + module.speed + "ms linear";
        div.style.MsTransition = "top " + module.speed + "ms linear, " + "left " + module.speed + "ms linear";

        const yMax = module._yMax;
        const yMin = module._yMin;
        const xMax = module._xMax;
        const xMin = module._xMin;
        const x = Math.floor(Math.random() * (xMax - xMin) + xMin);
        const y = Math.floor(Math.random() * (yMax - yMin) + yMin);
        div.style.top = y + 'px';
        div.style.left = x + 'px';
        div.pos = { x: x, y: y };

        module._animateParticles(div);
    }

    module._computeSpace = function () {
        const container = module._container;
        const dimensions = container.getBoundingClientRect();

        module._dimensions = dimensions;
        module._yMax = dimensions.height;
        module._xMax = dimensions.width;
    }

    module._animateParticles = function (div) {
        const interval = module.speed;
        window.setTimeout(function () {
            const coords = module._computeAnimation(div);
            module._applyAnimation(div, coords);
            module._animateParticles(div);
        }, interval);
    }

    module._computeAnimation = function (div) {
        const yMax = module._yMax;
        const xMax = module._xMax;
        const count = module.count;
        const yChange = module.yChange;
        const xChange = module.xChange;
        const direction = module.direction;
        const rightToLeft = module.rightToLeft;
        const yMaxThreshold = module.yMaxThreshold;
        const yMinThreshold = module.yMinThreshold;

        let newY = 0, newX;

        if (yChange != 0) {
            if (module.direction == "up") {
                newY = div.pos.y - yChange;
                newY = newY <= yMinThreshold ? yMax : newY;

                if (newY >= yMax) {
                    div.style.opacity = 0;
                    window.setTimeout(function () { div.style.opacity = 1; }, module.speed * 3)
                }
            }
            else if (module.direction == "down") {
                newY = div.pos.y + yChange;
                newY = newY >= yMax + yMaxThreshold ? 0 : newY;

                if (newY <= 0) {
                    div.style.opacity = 0;
                    window.setTimeout(function () { div.style.opacity = 1; }, module.speed * 3)
                }
            }

        }

        if (xChange != 0) {
            newX = Math.random() < rightToLeft ? xChange : (-1 * xChange);
            newX = div.pos.x - newX;
            newX = newX <= 0 ? xMax : newX;
            newX = newX >= xMax ? xMax : newX;
        }

        return { x: newX, y: newY }
    }

    module._applyAnimation = function (div, coords) {
        div.style.top = coords.y + "px";
        div.pos.y = coords.y;

        div.style.left = coords.x + "px";
        div.pos.x = coords.x;
    }

    module.render = function () {
        const count = module.count;

        module._computeSpace();

        for (let i = 0; i < count; i++) {
            const div = document.createElement('div');
            module._decorateParticle(div, i);
            module._particles.push(div);
            module._container.appendChild(div);
        }
    }

    return module;
}