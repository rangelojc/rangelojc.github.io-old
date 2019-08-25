function TypeAnimation(element, property) {
    const obj = {};

    obj.string = element[property];
    element[property] = "";

    obj.indicator = {
        interval: null,
        indicator: null,
        create: function (parent) {
            const span = document.createElement('span');
            span.innerHTML = "_";
            span.id = "type_indicator";
            parent.appendChild(span);

            this.blink();
        },
        blink: function () {
            clearInterval(this.interval);

            let shown = false;
            const parent = obj.element;
            const child = parent.querySelector('#type_indicator');

            this.interval = setInterval(function () {
                if (shown) {
                    child.style.opacity = "0";
                    shown = false;
                }
                else {
                    child.style.opacity = "1";
                    shown = true;
                }
            }, 500);
        },
        animate: function () {
            const parent = obj.element;
            const child = parent.querySelector('#type_indicator');

            if (child) {
                parent.removeChild(child);
                this.create(parent);
            }
        },
        remove: function () {
            const child = obj.element.querySelector('#type_indicator');
            if (child) obj.element.removeChild(child);
        }
    }

    obj.animate = function () {
        const text = obj.string.split("");
        const speed = obj.speed;
        const i = 0;

        obj.element[obj.property] = "";
        obj.iterate(speed, text, i);

        obj.indicator.create(obj.element);
    }

    obj.iterate = function (speed, text, i) {
        const pauses = obj.pauses;
        const oSpeed = obj.speed;

        window.setTimeout(function () {
            obj.element[obj.property] += text[i];
            i++;
            speed = pauses[i] || oSpeed;

            obj.indicator.animate();

            if (!text[i]) {
                window.setTimeout(
                    function () {
                        obj.after(); obj.indicator.remove();
                    }, speed);
                return;
            }
            else obj.iterate(speed, text, i);

        }, speed);
    }

    //

    obj.element = element;
    obj.property = property ? property : "textContent";
    obj.speed = 70;
    obj.pauses = {};

    obj.start = function () {
        obj.before();
        obj.animate();
    }

    obj.before = function () { }

    obj.after = function () { }

    return obj;
}