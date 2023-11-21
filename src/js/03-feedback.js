import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const localStorageKey = 'feedback-form-state';

// Отслеживаем событие input на форме
form.addEventListener('input', throttle(handleFormInput, 500));

// При загрузке страницы проверяем состояние хранилища
window.addEventListener('load', () => {
  const savedState = JSON.parse(localStorage.getItem(localStorageKey)) || {};

  // Заполняем поля формы сохраненными значениями
  emailInput.value = savedState.email || '';
  messageTextarea.value = savedState.message || '';
});

// При сабмите формы очищаем хранилище и выводим данные в консоль
form.addEventListener('submit', handleSubmit);

function handleFormInput() {
  // Сохраняем текущие значения полей в локальное хранилище
  const currentState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(currentState));
}

function handleSubmit(event) {
  event.preventDefault();

  // Получаем данные из хранилища и выводим в консоль
  const savedState = JSON.parse(localStorage.getItem(localStorageKey)) || {};
  console.log('Form submitted with data:', {
    email: savedState.email,
    message: savedState.message,
  });

  // Очищаем хранилище и поля формы
  localStorage.removeItem(localStorageKey);
  emailInput.value = '';
  messageTextarea.value = '';
}
