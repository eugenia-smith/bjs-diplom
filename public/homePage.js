'use strict'

let newLogoutButton = new LogoutButton();

newLogoutButton.action = function terminateSession() {
    ApiConnector.logout(endSessionCallback)
}

function endSessionCallback(response) {
    if (response['success'] == true) {
        location.reload();
    }
}

ApiConnector.current(getProfileCallback);

function getProfileCallback(response) {
    if (response['success'] == true) {
        ProfileWidget.showProfile(response['data']);
    }
}

let newRatesBoard = new RatesBoard();

function modifyRatesTable() {
    ApiConnector.getStocks(stocksDataCallback);
}

function stocksDataCallback(response) {
    if(response['success'] == true) {
        newRatesBoard.clearTable();
        newRatesBoard.fillTable(response['data']);
    }
}

modifyRatesTable();
setInterval(modifyRatesTable, 60000);

let newMoneyManager = new MoneyManager();

newMoneyManager.addMoneyCallback = function askForMoney(data) {
    ApiConnector.addMoney(data, addMoneyCallback);
}

function addMoneyCallback(response) {
    if (response['success'] == true) {
        ProfileWidget.showProfile(response['data']);
        console.log(response)
    } else {
        newMoneyManager.setMessage(false, response['error']);
    }
}