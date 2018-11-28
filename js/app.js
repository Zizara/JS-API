//variables
const userInterface = new UI();
const coctailsAPI = new API();
const contailsLocal = new LS();



//listener
listener();
function listener() {

    //submit
    const searchForm = document.querySelector('#search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', getCocktails)
    }

    //click
    const result = document.querySelector('#results')
    if (result) {
        result.addEventListener('click', getClickInfo)
    }


    //DOMContentLoaded
    document.addEventListener('DOMContentLoaded', documentReady)
}


//function
function getCocktails(e) {
    e.preventDefault();

    //проверка инпута 
    const search = document.querySelector('#search')
    if (search.value === '') {
        userInterface.printMessage('Пожалуйста, заполните поле', 'danger');
    } else {
        //предварительно очистить блок результата
        userInterface.clearResult()

        //проверка на какой странице находится 
        const type = document.querySelector('#type')



        let searchAPI;
        //перебрать API
        switch (type.value) {
            case 'name':
                searchAPI = coctailsAPI.getCoctailsName(search.value);
                break;
            case 'ingredient':
                searchAPI = coctailsAPI.getCoctailsIngredient(search.value);
                break;
            case 'category':
                searchAPI = coctailsAPI.getURLCategory(search.value);
                break;
            case 'alcohol':
                searchAPI = coctailsAPI.getURLAlcohol(search.value);
                break;
        }




        //показать API
        searchAPI.then(data => {
            //console.log(data)
            if (data.contails.drinks === null) {
                userInterface.printMessage('Данного напитка нет в базе данных', 'danger');
            } else {
                //проверка на какой странице находится 
                if (type.value === 'name') {
                    userInterface.displayByName(data.contails.drinks)
                } else {
                    userInterface.displayByIngredient(data.contails.drinks)
                }
            }
        })
    }
}

//click
function getClickInfo(e) {
    //для модального окна
    if (e.target.classList.contains('get-recipe')) {
        const coctailsID = e.target.getAttribute('data-id')
        coctailsAPI.getURLForModal(coctailsID).then(data => {
            userInterface.displayByIngredientForModal(data.recipeForModal.drinks[0])
        })
    }

    //favorite-btn clicked
    if (e.target.classList.contains('favorite-btn')) {
        //если есть класс is-favorite - удалить класс
        if (e.target.classList.contains('is-favorite')) {
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';
        } else {
            //добавить класс
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';
        }

        //собрать данные для сохранения в local storage
        const saveIntolocalStorage = {
            id: e.target.getAttribute('data-id'),
            name: e.target.parentElement.querySelector('.card-title').textContent,
            img: e.target.parentElement.querySelector('.card-img-top').src
        }

        //сохранить в local Storage
        contailsLocal.saveIntolocalStorage(saveIntolocalStorage);
    }
}


//document ready
function documentReady() {

    //Если есть в local Starage кнопка в синий цвет и знак на минуc
    userInterface.isFavorite();

    //загрузить список
    const searchCategory = document.querySelector('.search-category')
    if (searchCategory) {
        userInterface.displayListCategory()
    }

    //загрузить в корзину данные из local Storage
    const favorites = document.querySelector('#favorites')
    if (favorites) {
        userInterface.printLocalStorage()
        //clicked view and remove в favorites 
        const favoritesTable = document.querySelector('#favorites tbody');


        favoritesTable.addEventListener('click', (e) => {
            e.preventDefault();

            //clicked view
            if (e.target.classList.contains('get-recipe')) {
                const coctailsID = e.target.getAttribute('data-id')
                coctailsAPI.getURLForModal(coctailsID).then(data => {
                    userInterface.displayByIngredientForModal(data.recipeForModal.drinks[0])
                })
            }

            //clicked remove
            if (e.target.classList.contains('remove-recipe')) {
                //удалить из DOMa
                e.target.parentElement.parentElement.remove()
                //удалить из local Storage
                const coctailsID = e.target.getAttribute('data-id')
                contailsLocal.removeFromlocalStorage(coctailsID);
            }
        })
    }
}