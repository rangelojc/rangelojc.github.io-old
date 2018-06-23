const Workr = {
    _initialize: function (create) {
        if (Worker) {
            create();
            return true;
        }
        else {
            console.error("Web worker is not supported by your browser!");
            return false;
        }
    },

    basic: function (data) {
        const component = {};
        component._description = "Basic Workr";

        component._worker = null;
        component._template = data;

        component._create = function () {
            const temp = component._template;

            component._worker = new Worker(temp.url);
            component._worker.onmessage = function (response) {
                temp.success(response);
            }
            component._worker.onerror = function (response) {
                temp.error(response);
            }
            component._worker.postMessage(temp.data);

            if (temp.beforeCreate) temp.beforeCreate();
        }

        component.terminate = function () {
            const temp = component._template;

            if (temp.beforeTerminate) temp.beforeTerminate();
            component._worker.terminate();
        }

        Workr._initialize(component._create);

        return component;
    },

    multi: function (data) {
        const component = {};
        component._description = "Multiple Workr";

        component._templates = data;
        component._workers = [];

        component._create = function () {
            const temps = component._templates;

            for (let i = 0; i < temps.length; i++) {
                component._workers.push(Workr.basic(temps[i]));
            }
        }

        Workr._initialize(component._create);

        return component._workers;
    },

    prepared: function (data) {
        const component = {};
        component._description = "Prepared Workr";

        component._worker = null;
        component._template = data;

        component._create = function () {
            component.run = function (params) { component._run(params); }
        }

        component._run = function (params) {
            const temp = component._template;

            component._worker = new Worker(temp.url);
            component._worker.onmessage = function (response) {
                temp.success(response);
            }
            component._worker.onerror = function (response) {
                temp.error(response);
            }
            component._worker.postMessage(params);

            if (temp.beforeCreate) temp.beforeCreate();
        }

        component.terminate = function () {
            const temp = component._template;

            if (temp.beforeTerminate) temp.beforeTerminate();
            component._worker.terminate();
        }

        Workr._initialize(component._create);

        return component;

    },

    multiprepd: function (data) {
        const component = {};
        component._description = "Multiple Prepared Workr";

        component._templates = data;
        component._workers = [];

        component._create = function () {
            const temps = component._templates;

            for (let i = 0; i < temps.length; i++) {
                component._workers.push(Workr.prepared(temps[i]));
            }
        }

        Workr._initialize(component._create);

        return component._workers;
    },

    _embedded_base: function (data) {
        const component = {};
        component._description = "Embedded Workr";

        component._js = 'workr-thread.js';
        component._templates = data;

        component._threads = [];

        component._create = null;

        component._run = function (thread, params) {
            const temp = thread._template;

            const js = component._js;
            const postmsg = {
                method: temp.method.toString(),
                param: params
            };

            const worker = new Worker(js);
            worker.onmessage = function (response) {
                temp.success(response);
            }
            worker.onerror = function (response) {
                temp.error(response);
            }
            worker.postMessage(postmsg);

            if (temp.beforeCreate) temp.beforeCreate();

            thread._worker = worker;

            thread.terminate = function () {
                if (temp.beforeTerminate) temp.beforeTerminate();
                thread._worker.terminate();
            }
        }


        return component;
    },

    embedded: function (data) {
        const component = this._embedded_base(data);

        component._create = function () {
            const temps = component._templates;

            for (let i = 0; i < temps.length; i++) {
                component._threads[i] = {};
                component._threads[i]._template = temps[i];
                component._threads[i]._worker = null;
                component._threads[i].terminate = null;

                component._run(component._threads[i], temps[i].data);
            }
        }

        Workr._initialize(component._create);

        return component._threads;
    },

    embeddedprepd: function (data) {
        const component = this._embedded_base(data);

        component._create = function () {
            const temps = component._templates;

            for (let i = 0; i < temps.length; i++) {
                component._threads[i] = {};
                component._threads[i]._template = temps[i];
                component._threads[i]._worker = null;
                component._threads[i].terminate = null;
                component._threads[i].run = function (params) { component._run(this, params); }
            }
        }


        Workr._initialize(component._create);

        return component._threads;

    },

    util: {
        combine: function (workers) {
            const arry = [];

            return arry;
        },

        label: function (workers, names) {
            const json = {};

            if (names.length != workers.length) {
                console.error('Given labels and workers do not have matching length!')
                return;
            }

            for (let i = 0, len = names.length; i < len; i++) {
                json[names[i]] = workers[i];
            }

            return json;
        },
    }
}


/*
--------------------------
Basic Workr Template:
    const myworker = Workr.basic({
        url: 'my-worker.js',
        data: null,
        success: function () { },
        error: function () { },
        beforeCreate: function () { },
        beforeTerminate: function () { }
    });

    const myworkers = Workr.multi([
        {},
        {}
    ]);
--------------------------
*/

/*
--------------------------
Prepared Workr Template:
    const myworker = Workr.prepared({
        url: 'my-worker.js',
        success: function () { },
        error: function () { },
        beforeCreate: function () { },
        beforeTerminate: function () { }
    });

    myworker.run(params);

    const myworkers = Workr.multiprepd([
        {
        url: 'my-worker.js',
        success: function () { },
        error: function () { },
        beforeCreate: function () { },
        beforeTerminate: function () { }
        },
        {}
    ]);

    myworkers[0].run(params);

--------------------------
*/

/*
-------------------------
Embedded Workr Template:
    const myworkers = Workr.embedded([
        {
            method: myFunction,
            data: [1, 2, 3],
            success: function () { },
            error: function () { },
            beforeCreate: function () { },
            beforeTerminate: function () { }
        },
        {}
    ]);
-----------------------
*/

/*
-------------------------
Prepared Embedded Workr Template:
    const myworkers = Workr.embeddedprepd([
        {
            method: myFunction,
            success: function () { },
            error: function () { },
            beforeCreate: function () { },
            beforeTerminate: function () { }
        },
        {}
    ]);

    myworkers[0].run(params);
-----------------------
*/