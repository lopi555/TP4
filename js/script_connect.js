if (document.cookie.indexOf('userId=') == -1) {
    setCookie('userId', '', 20);
}


function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

if (getCookie("userId") != "") {
    window.location.href = "http://127.0.0.1:5500/page/myaccount.html";
}
else {
    document.getElementById('login').addEventListener('click', function () {
        fetch('https://gigondas.iut-valence.fr:1112/sprietna/ihm/tp4/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mail: document.getElementById('mail').value,
                password: document.getElementById('password').value
            })
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw response;
                }
            })
            .then((userId) => {
                setCookie('userId',userId,20);
                window.location.href = "http://127.0.0.1:5500/page/myaccount.html";
            })
            .catch((error) => {
                console.log(error);
            });
    })
}

function setCookie(c_name, value, exdays) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    let c_value = value + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()) + "; path=/";
    document.cookie = c_name + "=" + c_value;
}