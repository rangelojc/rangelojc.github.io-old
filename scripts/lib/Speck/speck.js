"use strict";

function Speck(container) {
    const module = {};

    module._container = container;
    module._dimensions = container.getBoundingClientRect();
    module._yMax = null;
    module._yMin = 0;
    module._xMax = null;
    module._xMin = 0;
    module._particles = [];
    module._particleGroups = {};

    //properties
    module.specs = {
        count: 30,
        minSize: 4,
        maxSize: 12,
        minOpacity: 1,
        maxOpacity: 1,
        color: '#f7f7f7',
        border: '0px solid #fff',
        blur: '1px',

        yChange: 30,
        xChange: 0,
        yMaxThreshold: 10,
        yMinThreshold: -60,
        xMaxThreshold: 10,
        xMinThreshold: -60,

        speed: 1000,
        rightToLeft: 1,
        direction: 'down',
        simulateDistance: true,
    };

    //controls
    module.engine = null;

    module._setStyles = function (div, i) {
        const specs = module.specs;

        div.setAttribute('class', 'speck speck-no-' + i);
        div.style.backgroundColor = specs.color;
        div.style.border = specs.border;

        const min = specs.minSize;
        const max = specs.maxSize;
        const hw = Math.floor(Math.random() * ((max + 1) - min) + min) + 'px';
        div.size = hw;

        module._setGroups(hw, div);

        const minop = specs.minOpacity;
        const maxop = specs.maxOpacity;
        const opacity = (Math.random() * (maxop - minop) + minop);

        div.style.opacity = opacity;
        div.opacity = opacity;
        div.style.height = hw;
        div.style.width = hw;
        div.style.boxShadow = specs.boxShadow;
        div.style.position = 'absolute';
        div.style.borderRadius = '50%';
        div.style.zIndex = "99999999999999999";
        div.style.transition = "top " + specs.speed + "ms linear, " + "left " + specs.speed + "ms linear";
        div.style.WebkitTransition = "top " + specs.speed + "ms linear, " + "left " + specs.speed + "ms linear";
        div.style.MsTransition = "top " + specs.speed + "ms linear, " + "left " + specs.speed + "ms linear";

        const blur = "blur(" + (parseInt(hw) / 3) / parseInt(specs.blur) + "px)";
        div.style.filter = blur;
        div.style.MSFilter = blur;
        div.style.MozFilter = blur;
        div.style.WebkitFilter = blur;
        div.style.OFilter = blur;

        const x = Math.floor(Math.random() * (module._xMax -  module._xMin) +  module._xMin);
        const y = Math.floor(Math.random() * (module._yMax -  module._yMin) +  module._yMin);
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
        module._yMax = module._dimensions.height;
        module._xMax = module._dimensions.width;
    }

    module._animateParticles = function (div) {
        const interval = module.specs.speed;
        const multiplier = module.simulateDistance ? module._adjustDistance(parseInt(div.size), module.specs.speed) : null;

        module.engine = window.setTimeout(function () {
            const coords = module._computeAnimation(div, multiplier);
            module._applyAnimation(div, coords);
            module._animateParticles(div);
        }, interval);
    }

    module._adjustDistance = function (size, speed) {
        const adjustment = size / module.specs.maxSize;

        return module.specs.speed * (adjustment / module.specs.speed);
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

        const specs = module.specs;
        const yChange = !distanceMultiplier ? specs.yChange : specs.yChange * distanceMultiplier;
        const xChange = !distanceMultiplier ? specs.xChange : specs.xChange * distanceMultiplier;

        const yMaxThreshold = specs.yMaxThreshold;
        const yMinThreshold = specs.yMinThreshold;
        const xMaxThreshold = specs.xMaxThreshold;
        const xMinThreshold = specs.xMinThreshold;

        let newY = 0, newX;

        if (yChange != 0) {
            if (specs.direction == "up") {
                newY = div.pos.y - yChange;
                newY = newY <= yMinThreshold ? yMax + yMaxThreshold : newY;

                if (newY >= yMax) {
                    div.style.opacity = 0;
                    window.setTimeout(function () { div.style.opacity = div.opacity; }, specs.speed * 3)
                }
            }
            else if (specs.direction == "down") {
                newY = div.pos.y + yChange;
                newY = newY >= yMax + yMaxThreshold ? yMinThreshold : newY;

                if (newY <= 0) {
                    div.style.opacity = 0;
                    window.setTimeout(function () { div.style.opacity = div.opacity; }, specs.speed * 3)
                }
            }

        }

        if (xChange != 0) {
            newX = Math.random() < specs.rightToLeft ? xChange : (-1 * xChange);
            newX = div.pos.x - newX;

            if (newX >= xMax + xMaxThreshold) {
                newX = xMinThreshold;
                div.style.opacity = 0;
                window.setTimeout(function () { div.style.opacity = div.opacity; }, specs.speed * 3)
            }
            if (newX <= xMinThreshold) {
                newX = xMax + xMaxThreshold;
                div.style.opacity = 0;
                window.setTimeout(function () { div.style.opacity = div.opacity; }, specs.speed * 3)
            }
        }

        return { x: newX, y: newY }
    }

    module.render = function () {
        const count = module.specs.count;

        module._computeSpace();

        for (let i = 0; i < count; i++) {
            const div = document.createElement('div');
            module._setStyles(div, i);
            module._particles.push(div);
            module._container.appendChild(div);
        }
    }

    module.control = function(action){
        
    }

    return module;
}