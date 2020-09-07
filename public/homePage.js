"use strict"

/*Класс завершения сеанса */
const logoutButton = new LogoutButton();
/*Класс с денежными операциями */
const moneyManager = new MoneyManager();

logoutButton.action = () => {
    ApiConnector.logout(response => response.success ? location.reload() : moneyManager.setMessage(response.success, response.error));
};

/*Получение данных вошедшего пользователя */
ApiConnector.current(response => response.success ? ProfileWidget.showProfile(response.data) : moneyManager.setMessage(response.success, response.error));

/*Класскурса валют */
const ratesBoard = new RatesBoard();
/*Вывод курса валют */
function getCours() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}
getCours();
setInterval(() => getCours(), 60000);


/*Добавление денег */
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Счет успешно пополнен!");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};
/*Конвертирование денег */
moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Сумма успешно конвертирована!");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};
/*Перевод денег */
moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Сумма успешно переведена!");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

/*Класс адресной книги */
const favoritesWidget = new FavoritesWidget();
/*Запрос на заполнение списка издаранного */
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    } else {
        favoritesWidget.setMessage(response.error);
    }
});
/*Добавление пользователя */
favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь успешно добавлен!");
        } else {
            favoritesWidget.setMessage(response.success, response.error)
        }
    })
};
/*Удаление пользователя */
favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь успешно удален!");
        } else {
            favoritesWidget.setMessage(response.success, response.error)
        }
    })
};