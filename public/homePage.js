'use strict'

//const { response } = require("express");

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
    } else {
        newMoneyManager.setMessage(false, response['error']);
    }
}

newMoneyManager.conversionMoneyCallback = function askForConversion(data) {
    ApiConnector.convertMoney(data, convertMoneyCallback);
}

function convertMoneyCallback(response) {
    if (response['success'] == true){
        ProfileWidget.showProfile(response['data'])
    } else {
        newMoneyManager.setMessage(false, response['error'])
    }
}

newMoneyManager.sendMoneyCallback = function shareSomeMoney(data) {
    ApiConnector.transferMoney(data,shareSomeMoneyCallback);
}

function shareSomeMoneyCallback(response) {
    if (response['success'] == true){
        ProfileWidget.showProfile(response['data'])
    } else {
        newMoneyManager.setMessage(false, response['error'])
    }
}

let newFavoritesList = new FavoritesWidget();

ApiConnector.getFavorites(fillFavoritesList);

function fillFavoritesList(response) {
    if (response['success'] == true) {
        newFavoritesList.clearTable();
        newFavoritesList.fillTable(response['data']);
        newMoneyManager.updateUsersList(response['data'])
    }
}

newFavoritesList.addUserCallback = function addNewPal(data) {
    ApiConnector.addUserToFavorites(data, addNewPalCallback)
}

function addNewPalCallback(response) {
    if (response['success'] == true) {
        newFavoritesList.clearTable();
        newFavoritesList.fillTable(response['data']);
        newMoneyManager.updateUsersList(response['data']);
    } else {
        newFavoritesList.setMessage(false, response['error']);
    }
}

newFavoritesList.removeUserCallback = function deleteOldPal(data) {
    //console.log(data);
    ApiConnector.removeUserFromFavorites(data, deleteOldPalCallback)
}

function deleteOldPalCallback (response) {
    if (response['success'] == true) {
        newFavoritesList.clearTable();
        newFavoritesList.fillTable(response['data']);
        newMoneyManager.updateUsersList(response['data']);
    }
}


