class UI {

    //показать всплывающие сообщение 
    printMessage(message, className) {
        const div = document.createElement('div')

        div.innerHTML = `
        <div class="alert alert-dismissible alert-${className}">
             <button type="button" class="close" data-dismiss="alert">x</button>
             ${message}
        </div>
   `;
        const jumbotron = document.querySelector('.jumbotron')
        jumbotron.insertBefore(div, document.querySelector('.jumbotron h1'))

        setTimeout(() => {
            div.remove();
        }, 3000)
    }


    //Cocktails by Name
    displayByName(drinks) {

        //показать div для результата
        const result = document.querySelector('.results-wrapper');
        result.style.display = 'block'

        //загрузить API
        let nameDrink = drinks;
        nameDrink.forEach((elem) => {

            const resultsDiv = document.querySelector('#results');

            resultsDiv.innerHTML += `
                    <div class="col-md-6">
                         <div class="card my-3">
                              <button type="button" data-id="${elem.idDrink}" class="favorite-btn btn btn-outline-info">
                              +
                              </button>
                              <img class="card-img-top" src="${elem.strDrinkThumb}" alt="${elem.strDrink}">

                              <div class="card-body">
                                   <h2 class="card-title text-center">${elem.strDrink}</h2>
                                   <p class="card-text font-weight-bold">Instructions: </p>
                                   <p class="card-text">
                                         ${elem.strInstructions}
                                   </p>
                                   <p class="card-text">
                                        <ul class="list-group">
                                             <li class="list-group-item alert alert-danger">Ingredients</li>
                                             ${this.displayIngredients(elem)}
                                        </ul>
                                   </p>
                                   <p class="card-text font-weight-bold">Extra Information:</p>
                                   <p class="card-text">
                                        <span class="badge badge-pill badge-success">
                                             ${elem.strAlcoholic}
                                        </span>
                                        <span class="badge badge-pill badge-warning">
                                             Category: ${elem.strCategory}
                                        </span>
                                   </p>
                              </div>
                         </div>
                    </div>
               `;
        });
        this.isFavorite();
    }
    //список ингридиентов
    displayIngredients(elem) {

        let Ingredients = [];
        //console.log(elem)
        //создать обьект strIngredient и strMeasure, если strIngredient не пустой -  запушить в массив Ingredients
        for (let i = 1; i < 16; i++) {
            let listdrink = {};
            if (elem[`strIngredient${i}`] !== '') {
                listdrink.strIngredient = elem[`strIngredient${i}`]
                listdrink.strMeasure = elem[`strMeasure${i}`]
                Ingredients.push(listdrink)
            }

        }

        //массив Ingredients перебрать и показать на странице
        let listdrink = ''
        Ingredients.forEach(elem => {
            listdrink += `
            <li class="list-group-item">${elem.strIngredient} - ${elem.strMeasure}</li>
       `;
        })
        //console.log(listdrink)
        return listdrink
    }

    //очистить блок результатат 
    clearResult() {
        const result = document.querySelector('#results')
        result.innerHTML = ''
    }

    //Search Cocktails by Ingredient
    displayByIngredient(name) {

        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';


        const resultsDiv = document.querySelector('#results');


        name.forEach(elem => {
            resultsDiv.innerHTML += `
                  <div class="col-md-4">
                       <div class="card my-3">
                            <button type="button" data-id="${elem.idDrink}" class="favorite-btn btn btn-outline-info">
                            +
                            </button>
                            <img class="card-img-top" src="${elem.strDrinkThumb}" alt="${elem.strDrink}">
                            <div class="card-body">
                                 <h2 class="card-title text-center">${elem.strDrink}</h2>
                                 <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${elem.idDrink}">Get Recipe</a>
                            </div>
                       </div>
                  </div>
             `;
        });
        this.isFavorite()
    }

    //модальное окно
    displayByIngredientForModal(name) {
        const modalTitle = document.querySelector('.modal-title');
        const descriptionText = document.querySelector('.modal-body .description-text ');
        const listGroup = document.querySelector('.modal-body .ingredient-list .list-group');
        //console.log(name)
        modalTitle.innerHTML = name.strDrink;
        descriptionText.innerHTML = name.strInstructions;

        listGroup.innerHTML = this.displayIngredients(name)
    }

    //category list
    displayListCategory() {
        const listAPI = coctailsAPI.getURLCategoryList()
            .then(data => {
                const firstOption = document.createElement('option')
                firstOption.value = '';
                firstOption.innerHTML = `-Select-`
                document.querySelector('#search').appendChild(firstOption)

                let listOption = data.listCategory.drinks
                listOption.forEach(elem => {
                    //console.log(elem.strCategory)
                    const option = document.createElement('option')
                    option.value = elem.strCategory.split(' ').join('_')
                    option.innerHTML = elem.strCategory;
                    document.querySelector('#search').appendChild(option)
                })
            })
    }

    //вкладка favorites
    printLocalStorage() {
        const printLocalStorage = contailsLocal.getitemFromLS()
        const favoritesTable = document.querySelector('#favorites tbody');
        printLocalStorage.forEach(elem => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                 <td>
                      <img src="${elem.img}" alt="${elem.name}" width=100>
                 </td>
                 <td>${elem.name}</td>
                 <td>
                      <a href="#" data-toggle="modal" data-target="#recipe" data-id="${elem.id}" class="btn btn-success get-recipe" >
                           View
                      </a>
                 </td>
                 <td>
                      <a href="#" data-id="${elem.id}" class="btn btn-danger remove-recipe" >
                           Remove
                      </a>
                 </td>
            `;

            favoritesTable.appendChild(tr);
        })
    }

    isFavorite() {
        const itemFromLs = contailsLocal.getitemFromLS()
        itemFromLs.forEach(elem => {
            let dateID = document.querySelector(`[data-id="${elem.id}"]`)
     
            if (dateID) {
               dateID.classList.add('is-favorite');
               dateID.textContent = '-';
            }
        })
    }
}