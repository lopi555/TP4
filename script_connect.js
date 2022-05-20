if (document.cookie.indexOf('userId=') == -1) {
    document.cookie='userId=';
}

function setCookie(name,value) {
    var expires = "";
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

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

let cookie = document.cookie;
let redirection = getCookie("userId");
if (redirection != "") {
    window.location.href = "http://127.0.0.1:5500/myaccount.html";
}
else {
    document.getElementById('login').addEventListener('click', function () {
        fetch('http://gigondas:1111/sprietna/ihm/tp4/login', {
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
                setCookie("userId", userId);
                window.location.href = "http://127.0.0.1:5500/myaccount.html";
            })
            .catch((error) => {
                console.log(error);
            });
    })
}