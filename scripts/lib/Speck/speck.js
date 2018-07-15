function Speck(container) {
    const module = {};

    module._container = container;
    module._yMax = null;
    module._yMin = 0;
    module._xMax = null;
    module._xMin = 0;
    module._particles = [];
    module._particleGroups = {};

    //appearance properties
    module.count = 50;
    module.minSize = 2;
    module.maxSize = 10;
    module.minOpacity = 1;
    module.maxOpacity = 1;
    module.color = '#f7f7f7';
    module.border = '0px solid #fff';
    module.blur = "1px";

    //animation properties
    module.yChange = 20;
    module.xChange = 6;
    module.yMaxThreshold = 20;
    module.yMinThreshold = -20;
    module.xMaxThreshold = 20;
    module.xMinThreshold = -20;

    module.speed = 500;
    module.rightToLeft = 0.9;
    module.direction = 'down';
    module.simulateDistance = true;

    module._setStyles = function (div, i) {
        div.setAttribute('class', 'speck speck-no-' + i);
        div.style.backgroundColor = module.color;
        div.style.border = module.border;

        const min = module.minSize;
        const max = module.maxSize;
        const hw = Math.floor(Math.random() * ((max + 1) - min) + min) + 'px';
        div.size = hw;

        module._setGroups(hw, div);

        const minop = module.minOpacity;
        const maxop = module.maxOpacity;
        const opacity = (Math.random() * (maxop - minop) + minop);

        div.style.opacity = opacity;
        div.opacity = opacity;
        div.style.height = hw;
        div.style.width = hw;
        div.style.boxShadow = module.boxShadow;
        div.style.position = 'absolute';
        div.style.borderRadius = '50%';
        div.style.zIndex = "99999999999999999";
        div.style.transition = "top " + module.speed + "ms linear, " + "left " + module.speed + "ms linear";
        div.style.WebkitTransition = "top " + module.speed + "ms linear, " + "left " + module.speed + "ms linear";
        div.style.MsTransition = "top " + module.speed + "ms linear, " + "left " + module.speed + "ms linear";

        const blur = "blur(" + (parseInt(hw) / 3) / parseInt(module.blur) + "px)";
        div.style.filter = blur;
        div.style.MSFilter = blur;
        div.style.MozFilter = blur;
        div.style.WebkitFilter = blur;
        div.style.OFilter = blur;

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

    module._setGroups = function (hw, div) {
        if (!module._particleGroups[hw]) module._particleGroups[hw] = [];
        module._particleGroups[hw].push(div);
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

        if (!module.simulateDistance) {
            window.setTimeout(function () {
                const coords = module._computeAnimation(div);
                module._applyAnimation(div, coords);
                module._animateParticles(div);
            }, interval);
        }
        else {
            const adj = module._adjustDistance(parseInt(div.size), module.speed);

            window.setTimeout(function () {
                const coords = module._computeAnimation(div, adj);
                module._applyAnimation(div, coords);
                module._animateParticles(div);
            }, interval);
        }
    }

    module._adjustDistance = function (size, speed) {
        const adjustment = size / module.maxSize;

        return module.speed * (adjustment / module.speed);
    }

    module._applyAnimation = function (div, coords) {
        div.style.top = coords.y + "px";
        div.pos.y = coords.y;

        div.style.left = coords.x + "px";
        div.pos.x = coords.x;
    }

    module._computeAnimation = function (div, distanceMultiplier) {
        const yMax = module._yMax;
        const xMax = module._xMax;
        const count = module.count;
        const yChange = !distanceMultiplier ? module.yChange : module.yChange * distanceMultiplier;
        const xChange = !distanceMultiplier ? module.xChange : module.xChange * distanceMultiplier;
        const direction = module.direction;
        const rightToLeft = module.rightToLeft;
        const yMaxThreshold = module.yMaxThreshold;
        const yMinThreshold = module.yMinThreshold;
        const xMaxThreshold = module.xMaxThreshold;
        const xMinThreshold = module.xMinThreshold;

        let newY = 0, newX;

        if (yChange != 0) {
            if (module.direction == "up") {
                newY = div.pos.y - yChange;
                newY = newY <= yMinThreshold ? yMax + yMaxThreshold : newY;

                if (newY >= yMax) {
                    div.style.opacity = 0;
                    window.setTimeout(function () { div.style.opacity = div.opacity; }, module.speed * 3)
                }
            }
            else if (module.direction == "down") {
                newY = div.pos.y + yChange;
                newY = newY >= yMax + yMaxThreshold ? yMinThreshold : newY;

                if (newY <= 0) {
                    div.style.opacity = 0;
                    window.setTimeout(function () { div.style.opacity = div.opacity; }, module.speed * 3)
                }
            }

        }

        if (xChange != 0) {
            newX = Math.random() < rightToLeft ? xChange : (-1 * xChange);
            newX = div.pos.x - newX;

            if (newX >= xMax + xMaxThreshold) {
                newX = xMinThreshold;
                div.style.opacity = 0;
                window.setTimeout(function () { div.style.opacity = div.opacity; }, module.speed * 3)
            }
            if (newX <= xMinThreshold) {
                newX = xMax + xMaxThreshold;
                div.style.opacity = 0;
                window.setTimeout(function () { div.style.opacity = div.opacity; }, module.speed * 3)
            }
        }

        return { x: newX, y: newY }
    }

    module.render = function () {
        const count = module.count;

        module._computeSpace();

        for (let i = 0; i < count; i++) {
            const div = document.createElement('div');
            module._setStyles(div, i);
            module._particles.push(div);
            module._container.appendChild(div);
        }
    }

    return module;
}