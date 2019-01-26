function TypeAnimation(element, property) {
    const private = {};
    const public = {};

    private.string = element[property];
    element[property] = "";

    private.indicator = function () {
        return {
            interval: null,
            indicator: null,
            create: function (parent) {             
                const span = document.createElement('span');
                span.innerHTML = "_";
                span.id = "type_indicator";
                parent.appendChild(span);

                this.blink();
            },
            blink: function(){
                clearInterval(this.interval);

                let shown = false;
                const parent = public.element;
                const child = parent.querySelector('#type_indicator');

                this.interval = setInterval(function(){
                    if(shown){
                        child.style.opacity = "0";
                        shown = false;
                    }
                    else{
                        child.style.opacity = "1";
                        shown = true;
                    }
                }, 500);
            },
            animate: function () {
                const parent = public.element;
                const child = parent.querySelector('#type_indicator');

                if (child) {
                    parent.removeChild(child);
                    this.create(parent);
                }
            },
            remove: function(){

                const child = public.element.querySelector('#type_indicator');
                public.element.removeChild(child);
            }
        }
    }();

    private.animate = function () {
        const text = private.string.split("");
        const speed = public.speed;
        const i = 0;

        public.element[public.property] = "";
        private.iterate(speed, text, i);

        private.indicator.create(public.element);
    }

    private.iterate = function (speed, text, i) {
        const pauses = public.pauses;
        const oSpeed = public.speed;

        window.setTimeout(function () {
            public.element[public.property] += text[i];
            i++;
            speed = pauses[i] ? pauses[i] : oSpeed;

            private.indicator.animate();

            if (!text[i]) {
                window.setTimeout(
                    function () { public.after(); private.indicator.remove();
                }, speed);
                return;
            }
            else private.iterate(speed, text, i);

        }, speed);
    }

    //

    public.element = element;
    public.property = property ? property : "textContent";
    public.speed = 70;
    public.pauses = {};

    public.start = function () {
        public.before();
        private.animate();
    }

    public.before = function () { }

    public.after = function () { }

    return public;
}