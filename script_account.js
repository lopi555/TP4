function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name+'=;';
    window.location.href = "http://127.0.0.1:5500/connexion.html"; 
}

let idcustomer = getCookie("userId");

async function account_presentation() {
    fetch(`https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/users`).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response
        }
    }).then(schedules => {
        for (let i = 0; i < schedules.length; i++) {
            if (schedules[i].id == idcustomer) {
                document.querySelector(`#name`).innerHTML = `<p>${schedules[i].firstname} ${schedules[i].surname}</p>`
            }

        }
    })
}

account_presentation();

