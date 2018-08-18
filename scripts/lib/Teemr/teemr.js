const Teemr = {
    //internal
    _ver: 'v0.1',
    _keyword: 'teemr',
    _nodes: null,
    _query: function(){
        if(this._nodes) return;
        this._nodes = this._nodes = document.querySelectorAll('[' + this._keyword + ']');

        const nodes = this._nodes;
        const keyword = this._keyword;
        for (let i = 0, len = nodes.length; i < len; i++) {
            nodes[i][keyword] = nodes[i].getAttribute(keyword);
            nodes[i].removeAttribute(keyword);
        }
    },

    //external props
    themes: {},
    theme: null,
	active: null,

    //external methods
	instantiate: function(){
		return Object.assign({}, this);
    },
    use: function(value){
        this.active = value;
        this.apply();
    },
    apply: function () {
        this._query();
        this.theme = this.themes[this.active];
		
        const nodes = this._nodes;
        const keyword = this._keyword;
        const targetTheme = this.theme;
    
        for (let i = 0, len = nodes.length; i < len; i++) {
            const names = nodes[i][keyword].split(",");

            for (let j = 0; j < names.length; j++) {
                for (t in targetTheme) {
                    if (names[j] == t) {
                        nodes[i].style[targetTheme[t].type] = targetTheme[t].value;
                    }
                }
            }
        }
    },

}