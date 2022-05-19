let depart;
let arriver;
let date;
let time;

async function addstations(type) {
    let req = await (await fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/stations`)).json();
    document.querySelectorAll(`#gare`).innerHTML = '';
    for (let i = 0; i < req.length; i++) {
        document.querySelector(`#gare`).innerHTML += `<option value="${req[i].name}"></option>`;
    }
}

function gettravels() {
    // recuperation des données
    depart = document.getElementById("Recherchedepart").value;
    arriver =document.getElementById("Recherchearriver").value;
    date = document.getElementById("Recherchedate").value;
    time = document.getElementById("Recherchetime").value;
    //recuperation les id
    let req = await (await fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/stations`)).json();
    for (let i = 0; i < req.length; i++) {
        if (req[i].name == depart) {
            depart = req[i].id;
        }
    }
    for (let i = 0; i < req.length; i++) {
        if (req[i].name == arriver) {
            arriver = req[i].id;
        }
    }
    console.log(`http://gigondas:1111/sprietna/ihm/tp4/schedules?cityFrom=${depart}&cityTo=${arriver}&date=${date}&timeTo=${time}`);
    // vérifier si les champs sont remplis
    if (depart != "" && arriver != "") {
        fetch(`http://gigondas:1111/sprietna/ihm/tp4/schedules?cityFrom=${depart}&cityTo=${arriver}&date=${date}&timeTo=${time}`).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        }).then(schedules => {
            console.log(schedules)
        }).catch(error => {
            error.text().then(errorMessage => {
                console.log('Request failed : ' + errorMessage);
            });
        });
    }
}

//window.history.pushState({}, "", "http://gigondas:1111/sprietna/ihm/tp4/schedules?cityFrom=1&cityTo=2&date=2022-06-12&timeTo=17:00");

async function addstations(type) {
    let req = await (await fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/stations`)).json();
    document.querySelectorAll(`#gare`).innerHTML = '';
    for (let i = 0; i < req.length; i++) {
        document.querySelector(`#gare`).innerHTML += `<option value="${req[i].name}"></option>`;
    }
}


