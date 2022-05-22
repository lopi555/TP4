let depart;
let arriver;
let date;
let time;
let duration;
let departid;
let arriverid;

async function addstations(type) {
    let req = await (await fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/stations`)).json();
    document.querySelectorAll(`#gare`).innerHTML = '';
    for (let i = 0; i < req.length; i++) {
        document.querySelector(`#gare`).innerHTML += `<option value="${req[i].name}"></option>`;
    }
}

async function gettravels() {
    // recuperation des données
    depart = document.getElementById("Recherchedepart").value;
    arriver =document.getElementById("Recherchearriver").value;
    date = document.getElementById("Recherchedate").value;
    time = document.getElementById("Recherchetime").value;
    //recuperation les id
    let req = await (await fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/stations`)).json();
    for (let i = 0; i < req.length; i++) {
        if (req[i].name == depart) {
            departid = req[i].id;
        }
    }
    for (let i = 0; i < req.length; i++) {
        if (req[i].name == arriver) {
            arriverid = req[i].id;
        }
    }
    // vérifier si les champs sont remplis
    if (depart != "" && arriver != "") {
        fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/schedules?cityFrom=${departid}&cityTo=${arriverid}&date=${date}&timeTo=${time}`).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        }).then(schedules => {
            document.querySelector(`#Nothing`).innerHTML = '';
            for (let i = 0; i < schedules.length; i++) {
                document.querySelector(`#Nothing`).innerHTML += `<Section class="Trajets">
                <Section class="HoraireTrajet">
                    <section class="common">
                        <img src="../img/train.png" alt="image train">
                        <p>${schedules[i].travel.type}</p>
                    </section>
                    <section>
                        <p>${depart}-${arriver}</p>
                    </section>
                    <section>
                        <p class="temps">${schedules[i].travel.duration}</p>
                    </section>
                    <section>
                        <p>${schedules[i].date}</p>
                    </section>
                    <section>
                        <p>${schedules[i].departureTime}</p>
                    </section>
                </Section>
                <Section class="RéserverPrix">
                    <section>
                        <button class="réservation">Réserver</button>
                    </section>
                    <section>
                        <p>${schedules[i].price}€</p>
                    </section>    
                </Section>
            </section>`;
            }
        }).catch(error => {
            console.log(error)
        });
    }
}

async function addstations(type) {
    let req = await (await fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/stations`)).json();
    document.querySelectorAll(`#gare`).innerHTML = '';
    for (let i = 0; i < req.length; i++) {
        document.querySelector(`#gare`).innerHTML += `<option value="${req[i].name}"></option>`;
    }
}


