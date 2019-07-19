

document.getElementById('loginButton').addEventListener("click", ()=> {

    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    //check if user is in the data base or not
    checkParamsLogin(loginUsername,loginPassword);


})

function checkParamsLogin(username,password) {

    if(username && password) {

        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        }).then((response)=> {

            if(response.status==200) {
                console.log('Başardık arkadaşlar')
                window.location.href = '/home';

            } else {

            }

        });

    }


}

function wrongParamsLogin(message) {

    console.log(message)

}

function rightParamsLogin(message) {

    console.log(message)

}