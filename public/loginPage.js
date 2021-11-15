'use strict'

let newUserForm = new UserForm();


newUserForm.loginFormCallback = function getLoginData(data) {
    ApiConnector.login(data, checkResponse)
};


function checkResponse(response) {
    if (response['success'] == true) {
        location.reload();
    } else {
        newUserForm.setLoginErrorMessage(response['error'])
    }
}

newUserForm.registerFormCallback = function getRegisterData(data) {
    ApiConnector.register(data, checkRegisterData)
    //console.log(data);
};


function checkRegisterData(response) {
    if (response['success'] == true) {
        location.reload();
    } else {
        newUserForm.setLoginErrorMessage(response['error'])
    }
}

