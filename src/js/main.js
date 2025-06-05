//? StrictRegime
'use strict';


//* Preloader
document.addEventListener('DOMContentLoaded', function() {
  const preloader = document.getElementById('preloader');
  
  // Минимальное время показа прелоадера (5 секунд)
  setTimeout(function() {
    // Добавляем класс к body, чтобы показать контент
    document.body.classList.add('loaded');
    
    // Анимация исчезновения прелоадера
    preloader.style.animation = 'fadeOut 1.5s ease forwards';
    
    // Удаляем прелоадер после анимации
    setTimeout(function() {
      preloader.remove();
    }, 1500);
  }, 1000);
});

//! ButtonClick
document.addEventListener("DOMContentLoaded", () => {
    // Ищем тег <audio> по ID
    const clickSound = document.getElementById("button-click");
    if (!clickSound) return;

    // 🔓 Разрешаем браузеру заранее "разблокировать" звук
    const unlockAudio = () => {
        clickSound.play().then(() => {
            clickSound.pause();
            clickSound.currentTime = 0;
        }).catch(() => {
            // Ошибку игнорируем — может быть Safari/iOS
        });

        // Удаляем слушатели, чтобы не вызывались повторно
        document.removeEventListener("touchstart", unlockAudio);
        document.removeEventListener("click", unlockAudio);
    };

    // Первый тап или клик разблокирует звук
    document.addEventListener("touchstart", unlockAudio);
    document.addEventListener("click", unlockAudio);

    // Находим все кнопки на странице
    const buttons = document.querySelectorAll("button");

    // Назначаем каждому <button> обработчик клика со звуком
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {
                // Ошибки проглатываем — не мешают работе
            });
        });
    });
});

//! QrCode
// document.addEventListener("DOMContentLoaded", () => {
//     // Находим обёртку вокруг QR-кода
//     const qrWrapper = document.getElementById("qrWrapper");

//     // При клике по самому QR — увеличиваем или возвращаем обратно
//     qrWrapper.addEventListener("click", (e) => {
//         e.stopPropagation();
//         qrWrapper.classList.toggle("active");
//     });

//     // При клике вне QR — автоматически скрываем (убираем .active)
//     document.addEventListener("click", () => {
//         qrWrapper.classList.remove("active");
//     });
// });

//! MenuToggle
document.addEventListener('DOMContentLoaded', () => {
  // Элементы
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuLinks = document.querySelectorAll('.dropdown-menu a'); // ШАГ 3

  // Открытие/закрытие меню
  menuToggle.addEventListener('click', () => {
    const isOpening = !header.classList.contains('mobile-open');
    header.classList.toggle('mobile-open');
    
    if (isOpening) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Закрытие при клике по ссылке
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });
});

//! AudioBackground
document.addEventListener('DOMContentLoaded', () => {
  // Элементы
  const audioToggle = document.querySelector('.audio-toggle');
  const audio = document.getElementById('background-audio');
  const audioIcon = audioToggle.querySelector('.audio-icon');

  // Управление музыкой
  audioToggle.addEventListener('click', () => {
    const isMuted = audioToggle.dataset.audioState === 'muted';

    if (isMuted) {
      audio.play();
      audioToggle.dataset.audioState = 'playing';
      audioIcon.src = './src/img/svg/playing.svg';
    } else {
      audio.pause();
      audioToggle.dataset.audioState = 'muted';
      audioIcon.src = './src/img/svg/muted.svg';
    }
  });
});

//! DataPrice
document.addEventListener('DOMContentLoaded', () => {
  // Элементы
  const filterButtons = document.querySelectorAll('.filter-btn');
  const orderItems = document.querySelectorAll('.order-item');

  // Фильтрация по цене
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {

      // Удаляем active со всех
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const min = parseInt(button.dataset.min);
      const max = parseInt(button.dataset.max);

      orderItems.forEach(item => {
        const price = parseInt(item.dataset.price);
        if (price >= min && price <= max) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

//! MainImg
document.addEventListener('DOMContentLoaded', () => {
  // Элементы
  const thumbs = document.querySelectorAll('.thumb-item');
  const mainImages = document.querySelectorAll('.main-image');

  // Переключение галереи
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      // Сброс активных классов
      thumbs.forEach(t => t.classList.remove('active'));
      mainImages.forEach(img => img.classList.remove('active'));

      // Назначаем активные
      thumb.classList.add('active');
      mainImages[index].classList.add('active');
    });
  });
});

//! TrustBand
document.addEventListener('DOMContentLoaded', () => {
  const trustCount = document.querySelector('.trust-count');
  const trustProgress = document.querySelector('.trust-progress');

  // Функция: при добавлении нового отзыва
  function incrementTrustCount() {
    const current = parseInt(trustCount.textContent);
    const next = current + 1;
    trustCount.textContent = next;

    const percent = Math.min((next / 100) * 100, 100);
    trustProgress.style.width = `${percent}%`;
  }

  // Доступ к функции глобально
  window.incrementTrustCount = incrementTrustCount;
});

//! ReviewsAdd
document.addEventListener('DOMContentLoaded', () => {
  // === Элементы формы ===
  const form = document.querySelector('.review-form');

  const nameWrapper = form.querySelector('.name-wrapper');
  const nameInput = nameWrapper.querySelector('.review-name');
  const nameStatus = nameWrapper.querySelector('.name-status');

  const phoneWrapper = form.querySelector('.phone-wrapper');
  const phoneInput = phoneWrapper.querySelector('.review-phone');
  const phoneStatus = phoneWrapper.querySelector('.phone-status');

  const messageInput = form.querySelector('.review-message');
  const photoInput = form.querySelector('.review-photo');
  const photoLabel = form.querySelector('.photo-label'); // 🔽 Новый элемент

  const submitBtn = form.querySelector('.submit-review-btn');
  const errorBox = form.querySelector('.submit-error-message');
  const successBox = form.querySelector('.success-message');

  // === Ограничение текста отзыва ===
  messageInput.addEventListener('input', () => {
    const maxChars = 500;

    if (messageInput.value.length > maxChars) {
      messageInput.value = messageInput.value.slice(0, maxChars);
      messageInput.classList.add('overlimit');

      clearTimeout(messageInput._limitTimeout);
      messageInput._limitTimeout = setTimeout(() => {
        messageInput.classList.remove('overlimit');
      }, 300);
    }
  });

  // === Обработка загрузки файла ===
  photoInput.addEventListener('change', () => {
    if (photoInput.files.length > 0) {
      const fileName = photoInput.files[0].name;

      // 🔽 Укорачиваем имя, если слишком длинное
      const maxLength = 24;
      let displayName = fileName;
      if (fileName.length > maxLength) {
        const ext = fileName.split('.').pop();
        displayName = fileName.slice(0, maxLength - ext.length - 4) + '...' + ext;
      }

      photoInput.classList.add('uploaded');
      photoLabel.textContent = `📸 ${displayName}`;
      form.querySelector('.photo-wrapper')?.classList.add('uploaded');
    } else {
      photoInput.classList.remove('uploaded');
      photoLabel.textContent = '📸 Добавить фото';
      form.querySelector('.photo-wrapper')?.classList.remove('uploaded');
    }
  });

  // === Функция показа ошибки + прокрутка к полю ===
  function showFormError(message, focusElement = null) {
    errorBox.textContent = message;
    errorBox.classList.add('visible');
    submitBtn.classList.add('hidden');

    if (focusElement) {
      focusElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      focusElement.focus();
    }

    clearTimeout(errorBox._timeout);
    errorBox._timeout = setTimeout(() => {
      errorBox.classList.remove('visible');
      submitBtn.classList.remove('hidden');
    }, 3000);
  }

  // === Функция показа успешного отправления ===
  function showSuccessMessage(message) {
    successBox.textContent = message;
    successBox.classList.add('visible');
    submitBtn.classList.add('hidden');

    clearTimeout(successBox._timeout);
    successBox._timeout = setTimeout(() => {
      successBox.classList.remove('visible');
      submitBtn.classList.remove('hidden');
    }, 3000);
  }

  // === Валидация имени ===
  nameInput.addEventListener('input', () => {
    let value = nameInput.value;
    value = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
    const parts = value.trimStart().split(' ');
    value = parts.slice(0, 2).join(' ');

    if (value.length > 15) value = value.slice(0, 15);
    nameInput.value = value;

    const spaceCount = (value.match(/\s/g) || []).length;

    if (value.length >= 3 && value.length <= 15 && spaceCount <= 1) {
      nameStatus.textContent = '✔';
      nameStatus.classList.add('valid');
      nameStatus.classList.remove('error');
    } else {
      nameStatus.textContent = '✖';
      nameStatus.classList.add('error');
      nameStatus.classList.remove('valid');
    }
  });

  // === Валидация телефона ===
  phoneInput.addEventListener('focus', () => {
    if (!phoneInput.value.startsWith('+994')) {
      phoneInput.value = '+994';
    }
  });

  phoneInput.addEventListener('input', () => {
    let digits = phoneInput.value.replace(/\D/g, '');
    if (!digits.startsWith('994')) digits = '994';
    digits = digits.slice(0, 12);
    phoneInput.value = '+' + digits;

    if (digits.length === 12) {
      phoneStatus.textContent = '✔';
      phoneStatus.classList.add('valid');
      phoneStatus.classList.remove('error');
    } else {
      phoneStatus.textContent = '✖';
      phoneStatus.classList.add('error');
      phoneStatus.classList.remove('valid');
    }
  });

  // === Отправка отзыва ===
  submitBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();
    const photoFile = photoInput.files[0];
    const digits = phone.replace(/\D/g, '');
    const spaceCount = (name.match(/\s/g) || []).length;

    if (!name.replace(/\s/g, '')) {
      showFormError('Введите имя', nameInput);
      return;
    }
    if (name.length < 3 || name.length > 15 || spaceCount > 1) {
      showFormError('Введите имя корректно', nameInput);
      return;
    }
    if (digits.length !== 12 || !digits.startsWith('994')) {
      showFormError('Введите номер', phoneInput);
      return;
    }
    if (!message) {
      showFormError('Оставьте ваш отзыв', messageInput);
      return;
    }

    const newReview = document.createElement('div');
    newReview.classList.add('reviews-item');

    const safe = (text) => {
      const el = document.createElement('div');
      el.textContent = text;
      return el.innerHTML;
    };

    submitBtn.disabled = true;

    if (photoFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        insertReviewHTML(e.target.result);
        submitBtn.disabled = false;
      };
      reader.readAsDataURL(photoFile);
    } else {
      insertReviewHTML(null);
      submitBtn.disabled = false;
    }

    function insertReviewHTML(photoURL) {
      const now = new Date().toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });

      newReview.innerHTML = `
        <div class="review-block">
          <span class="review-date">${now}</span>
          <h3 class="reviews-item-title">Имя: <strong>${safe(name)}</strong></h3>
          <p class="reviews-item-phone">Номер: <strong>${safe(phone)}</strong></p>
          <p class="reviews-item-desc">Отзыв нашего покупателя: <strong>${safe(message)}</strong></p>
          ${photoURL ? `<img src="${photoURL}" alt="Фото отзыва" class="review-photo-thumb">` : ''}
        </div>
      `;

      form.after(newReview);

      // Сброс всех значений
      nameInput.value = '';
      phoneInput.value = '';
      messageInput.value = '';
      photoInput.value = '';
      nameStatus.textContent = '';
      phoneStatus.textContent = '';
      nameStatus.classList.remove('valid', 'error');
      phoneStatus.classList.remove('valid', 'error');
      photoLabel.textContent = '📸 Добавить фото';
      form.querySelector('.photo-wrapper')?.classList.remove('uploaded');

      if (typeof incrementTrustCount === 'function') {
        incrementTrustCount();
      }

      showSuccessMessage('Отзыв отправлен 🎉');
    }
  });
});


//! CartLogic
// Загружаем корзину из localStorage 
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
document.addEventListener('DOMContentLoaded', () => {
  // Элементы
  const cartToggle = document.querySelector('.cart-toggle');
  const cartCount = cartToggle.querySelector('.cart-count');
  const cartModal = document.querySelector('.cart-modal');
  const cartItemsList = document.querySelector('.cart-items-list');
  const cartClearBtn = document.querySelector('.cart-clear-btn');
  const cartSendBtn = document.querySelector('.cart-send-btn');
  const cartTotalDisplay = document.querySelector('.cart-total');
  const orderItems = document.querySelectorAll('.order-item');

  // Сохраняем корзину в localStorage
  function saveCartToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  // Обновление счётчика корзины
  function updateCartCount() {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
    cartToggle.dataset.cartCount = total;

    // Показываем/скрываем иконку корзины
    if (total > 0) {
        cartToggle.style.opacity = '1';
        cartToggle.style.pointerEvents = 'auto';
    } else {
        cartToggle.style.opacity = '0';
        cartToggle.style.pointerEvents = 'none';
    }
  }

  // Обновление общей суммы
  function updateCartTotal() {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalDisplay.textContent = `Итого: ${total} ₼`;
  }

  // Показ сообщения внутри корзины
  function showCartMessage(text) {
    cartItemsList.innerHTML = `<p class="cart-empty-text">${text}</p>`;
    cartTotalDisplay.textContent = `Итого: 0 ₼`;
  }

  // Рендер товаров в корзине
  function renderCartItems() {
    cartItemsList.innerHTML = '';

    if (cartItems.length === 0) {
      showCartMessage('Корзина успешно очищена');
      return;
    }

    cartItems.forEach((item, index) => {
      const html = `
        <div class="cart-item">
          <div class="cart-item-img" style="background-image: url('${item.image}')"></div>
          <div class="cart-item-info">
            <h3 class="cart-item-title">${item.title}</h3>
            <p class="cart-item-desc">${item.desc}</p>
            <p class="cart-item-price">${item.price} ₼</p>
            <div class="cart-item-quantity">
              <button class="quantity-decrease" data-index="${index}">–</button>
              <span>${item.quantity}</span>
              <button class="quantity-increase" data-index="${index}">+</button>
            </div>
          </div>
        </div>
      `;
      cartItemsList.insertAdjacentHTML('beforeend', html);
    });

    updateCartTotal();
    saveCartToStorage();
  }

  // Добавление товара в корзину
  orderItems.forEach(item => {
    const addBtn = item.querySelector('.order-item-btn');
    addBtn.addEventListener('click', () => {
      const title = item.querySelector('.order-item-title')?.textContent.trim();
      const desc = item.querySelector('.order-item-desc')?.textContent.trim();
      const price = parseInt(item.dataset.price);
      const image = item.querySelector('.order-item-img')?.style.backgroundImage
        ?.replace(/^url\(["']?/, '')
        ?.replace(/["']?\)$/, '');

      const existing = cartItems.find(el => el.title === title);
      if (existing) {
        existing.quantity += 1;
      } else {
        cartItems.push({ title, desc, price, image, quantity: 1 });
      }

      updateCartCount();
      renderCartItems();

      // Анимация полёта изображения в корзину
      const img = item.querySelector('.order-item-img');
      if (img) {
        const clone = img.cloneNode(true);
        const rect = img.getBoundingClientRect();
        const cartIcon = document.querySelector('.cart-toggle');

        clone.classList.add('fly-to-cart');
        document.body.appendChild(clone);

        clone.style.width = rect.width + 'px';
        clone.style.height = rect.height + 'px';
        clone.style.left = rect.left + 'px';
        clone.style.top = rect.top + 'px';

        const cartRect = cartIcon.getBoundingClientRect();
        const cartCenterX = cartRect.left + cartRect.width / 2;
        const cartCenterY = cartRect.top + cartRect.height / 2;
        const imgCenterX = rect.left + rect.width / 2;
        const imgCenterY = rect.top + rect.height / 2;
        const deltaX = cartCenterX - imgCenterX;
        const deltaY = cartCenterY - imgCenterY;

        requestAnimationFrame(() => {
            clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2) rotate(1turn)`;
            clone.style.opacity = '0';
        });

        setTimeout(() => {
            clone.remove();
        }, 800);
      }
    });
  });

// Клик по иконке корзины
  cartToggle.addEventListener('click', () => {
    // Проверяем: если уже открыта — закрываем, иначе открываем
    if (cartModal.classList.contains('visible')) {
        cartModal.classList.remove('visible');
    } else {
        cartModal.classList.add('visible');
    }
  });

  // Закрытие при клике по фону
  cartModal.addEventListener('click', e => {
    if (e.target === cartModal) {
        cartModal.classList.remove('visible');
    }
  });

  // Обработка +/- количества
  cartItemsList.addEventListener('click', e => {
    const index = parseInt(e.target.dataset.index);
    if (isNaN(index)) return;

    if (e.target.classList.contains('quantity-increase')) {
      cartItems[index].quantity += 1;
    }

    if (e.target.classList.contains('quantity-decrease')) {
      cartItems[index].quantity -= 1;
      if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1);
      }
    }

    updateCartCount();
    renderCartItems();
    saveCartToStorage();
  });

  // Очистка корзины
  cartClearBtn.addEventListener('click', () => {
    cartItems.length = 0;
    updateCartCount();
    renderCartItems();
    saveCartToStorage();
  });

  // Отправка заказа в WhatsApp
  cartSendBtn.addEventListener('click', () => {
    if (cartItems.length === 0) {
      showCartMessage('Ваша корзина пуста');
      return;
    }

    const message = cartItems.map(item =>
      `• ${item.title} — ${item.quantity} шт. (${item.price * item.quantity} ₼)`
    ).join('%0A');

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const fullMessage = `Здравствуйте! Я хочу заказать:%0A${message}%0A%0AОбщая сумма: ${total} ₼`;

    window.open(`https://wa.me/994709690901?text=${fullMessage}`, '_blank');
  });

  // Инициализация при старте
  updateCartCount();
  renderCartItems();
  
  // Закрытие корзины по клику вне её и иконки
  document.addEventListener('click', (e) => {
    const cart = document.querySelector('.cart-modal');
    const cartContent = document.querySelector('.cart-modal-content');
    const toggle = document.querySelector('.cart-toggle');

    const isCartOpen = cart.classList.contains('visible');
    const clickedInsideCart = cartContent.contains(e.target);
    const clickedToggle = toggle.contains(e.target);
    const isQuantityButton = e.target.classList.contains('quantity-decrease') || e.target.classList.contains('quantity-increase');

    if (isCartOpen && !clickedInsideCart && !clickedToggle && !isQuantityButton) {
      cart.classList.remove('visible');
    }
  });
});
