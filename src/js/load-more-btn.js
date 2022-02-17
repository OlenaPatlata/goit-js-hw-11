class LoadMoreBtn {
    constructor({ selektor, hidden = false }) {
        this.refs = this.getRefs(selektor);

        hidden && this.hide();
    }

    getRefs(selektor) {
        const refs = {};
        refs.button = document.querySelector(selektor);
        refs.label = refs.button.querySelector('.label');
        return refs;
    }

    disabled() {
        this.refs.button.disabled = true;
        this.refs.label.textContent = 'Loading...';
    }

    enable() {
        this.refs.button.disabled = false;
        this.refs.label.textContent = 'Load more';
    }

    show() {
        this.refs.button.classList.remove('is-hidden');
    }

    hide() {
        this.refs.button.classList.add('is-hidden');
    }
}

export { LoadMoreBtn };