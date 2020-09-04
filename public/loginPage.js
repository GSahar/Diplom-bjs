"use strict"
/*Класс стартовой страницы */
const userForm = new UserForm();
/*Вход пользователя в систему */
userForm.loginFormCallback = data => {
    ApiConnector.login(data, response => response.success ? location.reload() : userForm.setLoginErrorMessage(response.error));
};
/*Регистрация пользователя */
userForm.registerFormCallback = data => {
    ApiConnector.register(data, response => response.success ? location.reload() : userForm.setRegisterErrorMessage(response.error));
};