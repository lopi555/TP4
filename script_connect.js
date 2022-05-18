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
            console.log(userId);
        })
        .catch((error) => {
            error.text().then((errorMessage) => {
                console.log('Request Failed : ' + errorMessage);
            });
        });
})