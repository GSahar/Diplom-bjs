"use strict"
/*Класс завершения сеанса */
const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => response.success ? location.reload() : alert(response.error));
};

/*Получение данных вошедшего пользователя */
ApiConnector.current(response => response.success ? ProfileWidget.showProfile(response.data) : alert(response.error));

/*Класскурса валют */
const ratesBoard = new RatesBoard();
/*Вывод курса валют */
function getCours() {
    ApiConnector.getStocks(response => response.success ? (ratesBoard.clearTable(), ratesBoard.fillTable(response.data)) : alert(response.error));
}
getCours();
setInterval(() => getCours(), 60000);

/*Класс с денежными операциями */
const moneyManager = new MoneyManager();
/*Добавление денег */
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => response.success ? (ProfileWidget.showProfile(response.data), moneyManager.setMessage(response.success, "Счет успешно пополнен!")) : moneyManager.setMessage(response.success, response.error));
};
/*Конвертирование денег */
moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => response.success ? (ProfileWidget.showProfile(response.data), moneyManager.setMessage(response.success, "Сумма успешно конвертирована!")) : moneyManager.setMessage(response.success, response.error));
};
/*Перевод денег */
moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => response.success ? (ProfileWidget.showProfile(response.data), moneyManager.setMessage(response.success, "Сумма успешно переведена!")) : moneyManager.setMessage(response.success, response.error));
};

/*Класс адресной книги */
const favoritesWidget = new FavoritesWidget();
/*Запрос на заполнение списка издаранного */
ApiConnector.getFavorites(response => response.success ? (favoritesWidget.clearTable(), favoritesWidget.fillTable(response.data), moneyManager.updateUsersList(response.data)) : favoritesWidget.setMessage(response.error));
/*Добавление пользователя */
favoritesWidget.addUserCallback = data => { ApiConnector.addUserToFavorites(data, response => response.success ? (favoritesWidget.clearTable(), favoritesWidget.fillTable(response.data), moneyManager.updateUsersList(response.data), favoritesWidget.setMessage(response.success, "Пользователь успешно добавлен!")) : favoritesWidget.setMessage(response.success, response.error)) };
/*Удаление пользователя */
favoritesWidget.removeUserCallback = data => { ApiConnector.removeUserFromFavorites(data, response => response.success ? (favoritesWidget.clearTable(), favoritesWidget.fillTable(response.data), moneyManager.updateUsersList(response.data), favoritesWidget.setMessage(response.success, "Пользователь успешно удален!")) : favoritesWidget.setMessage(response.success, response.error)) };