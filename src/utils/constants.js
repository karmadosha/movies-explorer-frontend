export const MAIN_URL = 'https://api.karmamovies.nomoredomainsicu.ru';
/*export const MAIN_URL = 'http://localhost:4000';*/
export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const MOVIES_URL_IMG = 'https://api.nomoreparties.co';

export const SHORT_MOVIE = 40;

export const DESKTOP = 1080;
export const TABLET = 768;
export const MOBILE = 450;

export const DESKTOP_MOVIES_COUNT = 12;
export const TABLET_MOVIES_COUNT = 8;
export const MOBILE_MOVIES_COUNT = 5;
export const DESKTOP_MOVIES_ADD = 3;
export const MOBILE_MOVIES_ADD = 2;

export const errorMessages = {
  sameEmail: 'Пользователь с таким email уже существует',
  registryError: 'При регистрации произошла ошибка. Попробуйте еще раз.',
  authError: 'Вход не выполнен. Попробуйте еще раз.',
  wrongNamePassword: 'Неверный логин или пароль',
  profileEditFailed: 'Не удалось обновить, проверьте введенные данные',
  sameValuesError: 'Вы не изменили данные',
  emailInputError: 'Неверный формат почты',
  nameInputError: 'Имя может содержать от 2 до 30 русских или латинских букв, пробел и дефис',
  searchError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
  notFound: 'Ничего не найдено',
  keyWord: 'Введите ключевое слово'
}

export const infoMessages = {
  register: 'Успешная регистрация!',
  login: 'Вход в аккаунт выполнен',
  profileEdit: 'Информация успешно обновлена!',
  signout: 'Вы вышли из аккаунта',
  saveMovie: 'Фильм сохранен в избранные',
  alreadySaved: 'Фильм уже добавлен в избранные',
  deleteMovie: 'Фильм удален из избранных'
}