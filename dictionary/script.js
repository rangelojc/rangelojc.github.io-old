function get(search) {
    const input = search.value;
    send(input);
}
function send(query) {
    const url = 'https://owlbot.info/api/v2/dictionary/';
    $.ajax({
        method: "get",
        url: url + query + "?format=json",
        crossDomain: true,
        dataType: 'jsonp',
        complete: function (r) {
            render(r.responseText, query);
        },
    });
}
function render(response, title) {
    const items = JSON.parse(response);

    results.innerHTML = "";
    if (items.length == 0) {
        results.innerHTML = "No Results";
    }
    else {
        const resultwrapper_1 = document.createElement('div');
        resultwrapper_1.classList.add('result-panel');

        const resulttitle = document.createElement('div');
        resulttitle.classList.add('result-title');
        resulttitle.textContent = title;

        resultwrapper_1.appendChild(resulttitle);
        items.forEach(function (r) {
            var item = renderItems(r);
            resultwrapper_1.appendChild(item);
        });
        results.appendChild(resultwrapper_1);
    }
}
function renderItems(item) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('result-item');

    const type = document.createElement('div');
    type.classList.add('item-type');
    type.textContent = item.type;

    const definition = document.createElement('div');
    definition.classList.add('item-definition');
    definition.textContent = item.definition;

    const example = document.createElement('div');
    example.classList.add('item-example');
    example.textContent = item.example;
    wrapper.appendChild(type);
    wrapper.appendChild(definition);

    return wrapper;
}

searchbtn.onclick = function () { get(search); }
