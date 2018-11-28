class LS {

    //получить данные из Local Storage
    getitemFromLS() {
        let drinksls;

        if (localStorage.getItem('drinks') === null) {
            drinksls = []
        } else {
            drinksls = JSON.parse(localStorage.getItem('drinks'))
        }
        return drinksls;
    }

    //сохранить в Local Storage
    saveIntolocalStorage(elem) {
        const drinks = this.getitemFromLS();
        drinks.push(elem)
        localStorage.setItem('drinks', JSON.stringify(drinks))
    }

    //удалить из local Storage
    removeFromlocalStorage(id) {
        const drinks = this.getitemFromLS();
        drinks.forEach((elem, index) => {
            if (id === elem.id) {
                drinks.splice(index, 1)
            }
            localStorage.setItem('drinks', JSON.stringify(drinks))
        })
    }
}