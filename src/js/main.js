//? StrictRegime
'use strict';

//? Скролл к началу страницы при перезагрузке
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

//?FontsLoading
document.fonts.ready.then(() => {
  document.body.classList.remove('fonts-loading');
});

// //* Preloader
document.addEventListener('DOMContentLoaded', () => {
  const loadingTextSpan = document.querySelector('.loading-text');
  const dots = document.querySelectorAll('.dot');
  // Анимация слова "loading"
  const loadingText = loadingTextSpan.getAttribute('data-text');
  loadingTextSpan.innerHTML = '';
  [...loadingText].forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = char;
    span.style.opacity = '0';
    loadingTextSpan.appendChild(span);
    setTimeout(() => {
      requestAnimationFrame(() => {
        span.style.opacity = '1';
        span.classList.add('letter-animated');
      });
    }, 2000 + i * 150);
  });
  // Анимация точек
  dots.forEach((dot, i) => {
    dot.style.opacity = '0';
    setTimeout(() => {
      requestAnimationFrame(() => {
        dot.style.opacity = '1';
        dot.classList.add('dot-animated');
      });
    }, 3200 + i * 200);
  });
  // Скрытие прелодера и запуск видео после него
  setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    const heroVideo = document.querySelector('.hero-video');
    // Плавно скрываем прелоадер
    preloader.style.transition = 'opacity 2s ease';
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
      // Дожидаемся полной загрузки видео, чтобы не было розового фона
      if (heroVideo) {
        heroVideo.currentTime = 0;
        // ⏳ Только когда данные загружены — запускаем
        heroVideo.play().catch(() => {});
        heroVideo.classList.add('visible');
      }
    }, 2000); // конец исчезновения прелоадера
  }, 5000); // длительность прелоадера
});

// * Активация staggered-анимаций
document.addEventListener('DOMContentLoaded', () => {
  // Анимация header и hero
  document.querySelector('header')?.classList.add('animate');
  document.querySelector('.hero-section')?.classList.add('animate');
  // Анимация UI-элементов
  document.querySelectorAll('.cart-toggle, .audio-toggle, .touchpad-toggle')
    .forEach(el => el.classList.add('animate'));
  // Анимация .staggered по скроллу
  const staggeredElements = document.querySelectorAll('.staggered');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  staggeredElements.forEach(el => observer.observe(el));
});


//! HeaderLogo
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const footer = document.querySelector('#footer');
  const logoImg = document.querySelector('.logo-switch-img');
  const logoText = document.querySelector('.logo-switch-text');
  const hero = document.querySelector('#hero');
  // Переключение цвета хедера (на светлых секциях, например, футере)
  if (header && footer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          header.classList.add('on-light');
        } else {
          header.classList.remove('on-light');
        }
      });
    }, { threshold: 0.2 });
    observer.observe(footer);
  }
  // Управление логотипом и отображением бургер-меню
  if (logoImg && logoText && hero && header) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const isHero = entry.isIntersecting;
        const menuIsOpen = header.classList.contains('mobile-open');
        // Всегда: показываем логотип-картинку в hero
        if (isHero || menuIsOpen) {
          logoImg.classList.add('logo-visible');
          logoText.classList.remove('logo-visible');
        } else {
          logoImg.classList.remove('logo-visible');
          logoText.classList.add('logo-visible');
        }
        // Управление first-section (для скрытия меню-гамбургера на десктопе)
        if (window.innerWidth > 768) {
          if (isHero) {
            header.classList.add('first-section');
          } else {
            header.classList.remove('first-section');
          }
        } else {
          // На мобилке гамбургер должен быть всегда
          header.classList.remove('first-section');
        }
      });
    }, { threshold: 0.6 });
    observer.observe(hero);
  }
});

//! MenuToggle
document.addEventListener('DOMContentLoaded', () => {
  // Получаем элементы
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuLinks = document.querySelectorAll('.dropdown-menu a');
  const logoImg = document.querySelector('.logo-switch-img');
  const logoText = document.querySelector('.logo-switch-text');
  const hero = document.querySelector('#hero');
  // Обработка клика по гамбургеру
  menuToggle.addEventListener('click', () => {
    const isOpening = !header.classList.contains('mobile-open');
    // Переключаем класс открытия меню
    header.classList.toggle('mobile-open');
    // Удаляем first-section, чтобы меню-гамбургер был всегда видно
    header.classList.remove('first-section');
    // Блокировка прокрутки при открытом меню
    document.body.style.overflow = isOpening ? 'hidden' : '';
    // Обновление логотипа вручную
    const menuIsOpen = header.classList.contains('mobile-open');
    if (menuIsOpen) {
      // Когда меню открыто — всегда показываем логотип-картинку
      logoImg.classList.add('logo-visible');
      logoText.classList.remove('logo-visible');
    } else {
      // Когда меню закрыто — проверяем, видно ли hero-секцию
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const isHeroVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isHeroVisible) {
          logoImg.classList.add('logo-visible');
          logoText.classList.remove('logo-visible');
        } else {
          logoImg.classList.remove('logo-visible');
          logoText.classList.add('logo-visible');
        }
      }
    }
  });
  // При клике по пункту меню — закрываем меню и возвращаем прокрутку
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('mobile-open');
      document.body.style.overflow = '';
      // После закрытия меню — восстанавливаем логотип по hero-секции
      if (logoImg && logoText && hero) {
        const rect = hero.getBoundingClientRect();
        const isHeroVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isHeroVisible) {
          logoImg.classList.add('logo-visible');
          logoText.classList.remove('logo-visible');
        } else {
          logoImg.classList.remove('logo-visible');
          logoText.classList.add('logo-visible');
        }
      }
    });
  });
});

//! HeroVideo
document.addEventListener('DOMContentLoaded', () => {
  const heroVideo = document.querySelector('.hero-video');
  const heroSection = document.getElementById('hero');
  if (heroVideo && heroSection) {
    const source = heroVideo.querySelector('source');
    // Определяем: мобилка или десктоп
    const isMobile = window.innerWidth <= 768;
    // Подставляем нужный src
    const mobileSrc = 'src/video/ava-hero-mobile.mp4';
    const desktopSrc = 'src/video/ava-hero.mp4';
    source.src = isMobile ? mobileSrc : desktopSrc;
    // Обновляем video
    heroVideo.load();
    let hasPlayed = false;
    // Остановка на последнем кадре
    heroVideo.addEventListener('ended', () => {
      heroVideo.pause();
      heroVideo.currentTime = heroVideo.duration;
      hasPlayed = true;
    });
    // Перезапуск при повторном попадании hero в зону видимости
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && hasPlayed) {
            heroVideo.currentTime = 0;
            heroVideo.play().catch(() => {});
            hasPlayed = false;
          }
        });
      },
      {
        threshold: 0.6
      }
    );
    observer.observe(heroSection);
    // Автовоспроизведение при возврате на вкладку
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && !heroVideo.paused && !heroVideo.ended) {
        heroVideo.play().catch(() => {});
      }
    });
    // Проверка зависания видео (например, при сворачивании окна)
    let lastTime = 0;
    function checkVideoStuck() {
      if (!heroVideo.paused && !heroVideo.ended) {
        const currentTime = heroVideo.currentTime;
        if (Math.abs(currentTime - lastTime) < 0.01) {
          heroVideo.play().catch(() => {});
        }
        lastTime = currentTime;
      }
      requestAnimationFrame(checkVideoStuck);
    }
    requestAnimationFrame(checkVideoStuck);
  }
});


//! AudioBackground
document.addEventListener('DOMContentLoaded', () => {
  // Элементы
  const audioToggle = document.querySelector('.audio-toggle');
  const audio = document.getElementById('background-audio');
  const audioIcon = audioToggle.querySelector('.audio-icon');
  // Управление музыкой
  audioToggle.addEventListener('click', () => {
    //Если data-audio-state="muted", значит звук выключен, и мы его включим
    const isMuted = audioToggle.dataset.audioState === 'muted';
    // Блок «включения звука»
    if (isMuted) {
      audio.play(); // Воспроизводим фоновую музыку
      audioToggle.dataset.audioState = 'playing'; // Обновляем атрибут
      audioIcon.src = './src/img/svg/playing.svg'; // Меняем иконку
      // Блок «отключения звука»:
    } else {
      audio.pause(); // Останавливаем музыку
      audioToggle.dataset.audioState = 'muted'; // Обновляем атрибут
      audioIcon.src = './src/img/svg/muted.svg'; // Меняем иконку
    }
  });
});

//! DataFiltrPrice
document.addEventListener('DOMContentLoaded', () => {
  // Элементы фильтра и карточек
  const filterButtons = document.querySelectorAll('.filter-btn');
  const orderItems = document.querySelectorAll('.order-item');
  let currentFilter = null; // текущая активная кнопка
  let animationTimeouts = []; // массив для хранения всех таймеров
  // Навешиваем обработчик на каждую кнопку фильтра
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Если кнопка уже выбрана — ничего не делаем
      if (button === currentFilter) return;
      // Обновляем активную кнопку
      currentFilter = button;
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      // Прокручиваем список товаров в начало
      const scrollContainer = document.querySelector('.order-scroll-container');
      if (scrollContainer) {
      }
      // Получаем границы фильтра из data-атрибутов
      const min = parseInt(button.dataset.min);
      const max = parseInt(button.dataset.max);
      const delay = 500; // задержка между карточками (волна)
      // Перед запуском новой анимации — очищаем ВСЕ старые таймеры
      animationTimeouts.forEach(t => clearTimeout(t));
      animationTimeouts = [];
      // Скрываем все неподходящие карточки (сразу)
      orderItems.forEach(item => {
        const price = parseInt(item.dataset.price);
        if (price < min || price > max) {
          item.classList.remove('animating'); // сбрасываем анимацию
          item.classList.add('hidden'); // скрываем
        }
      });
      // Сразу сбрасываем скролл перед показом новых карточек
      if (scrollContainer) {
        requestAnimationFrame(() => {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        });
      }
      // Показываем подходящие карточки с эффектом волны
      let visibleIndex = 0; // счётчик задержек
      orderItems.forEach(item => {
        const price = parseInt(item.dataset.price);
        if (price >= min && price <= max) {
          item.classList.remove('hidden'); // сразу показываем
          // Устанавливаем таймер анимации
          const timeoutId = setTimeout(() => {
            item.classList.remove('animating');
            void item.offsetWidth;
            item.classList.add('animating');
          }, visibleIndex * delay);
          animationTimeouts.push(timeoutId); // сохраняем ID
          visibleIndex++;
        }
      });
    });
  });
  // При загрузке страницы: автоматически нажимаем на первую кнопку (S)
  const defaultBtn = document.querySelector('.filter-btn[data-min="0"]');
  if (defaultBtn) defaultBtn.click();
});

//! TrustBand
document.addEventListener('DOMContentLoaded', () => {
  // Получаем элементы
  const trustCount = document.querySelector('.trust-count');
  const trustProgress = document.querySelector('.trust-progress');
  // Функция: при добавлении нового отзыва
  function incrementTrustCount() {
    // Получаем текущее число, увеличиваем на 1, обновляем текст в DOM
    const current = parseInt(trustCount.textContent);
    const next = current + 1;
    trustCount.textContent = next;
    // Считаем процент для прогресс-бара
    const percent = Math.min((next / 100) * 100, 100);
    trustProgress.style.width = `${percent}%`;
  }
  // Доступ к функции глобально
  window.incrementTrustCount = incrementTrustCount;
});

//! ReviewsAdd
document.addEventListener('DOMContentLoaded', () => {
  // Получаем элементы
  const form = document.querySelector('.review-form');
  const nameWrapper = form.querySelector('.name-wrapper');
  const nameInput = nameWrapper.querySelector('.review-name');
  const nameStatus = nameWrapper.querySelector('.name-status');
  const phoneWrapper = form.querySelector('.phone-wrapper');
  const phoneInput = phoneWrapper.querySelector('.review-phone');
  const phoneStatus = phoneWrapper.querySelector('.phone-status');
  const messageInput = form.querySelector('.review-message');
  const photoInput = form.querySelector('.review-photo');
  const photoLabel = form.querySelector('.photo-label');
  const submitBtn = form.querySelector('.submit-review-btn');
  const errorBox = form.querySelector('.submit-error-message');
  const successBox = form.querySelector('.success-message');
  // Ограничение длины текста отзыва
  messageInput.addEventListener('input', () => {
    const maxChars = 500;
    // Если введено больше — обрезаем лишнее и визуально подсвечиваем
    if (messageInput.value.length > maxChars) {
      messageInput.value = messageInput.value.slice(0, maxChars);
      messageInput.classList.add('overlimit'); // Добавляем класс
      // Сброс предыдущего таймера
      clearTimeout(messageInput._limitTimeout);
      messageInput._limitTimeout = setTimeout(() => {
        messageInput.classList.remove('overlimit'); // Удаляем класс через 300 мс
      }, 300);
    }
  });
  // Обработка загрузки фото
  photoInput.addEventListener('change', () => {
    // Реагируем на выбор изображения пользователем
    if (photoInput.files.length > 0) {
      const fileName = photoInput.files[0].name; // Получаем имя выбранного файла
      // Максимальная длина, которую мы хотим отобразить
      const maxLength = 24;
      let displayName = fileName;
      // Если имя слишком длинное — сокращаем и добавляем
      if (fileName.length > maxLength) {
        const ext = fileName.split('.').pop(); // Получаем расширение файла
        displayName = fileName.slice(0, maxLength - ext.length - 4) + '...' + ext;
      }
      // Визуально помечаем, что файл добавлен
      photoInput.classList.add('uploaded'); // Показываем имя файла
      photoLabel.textContent = `📸 ${displayName}`; // Добавляем класс на обёртку
      form.querySelector('.photo-wrapper')?.classList.add('uploaded');
    } else {
      // Если файл снят — очищаем всё
      photoInput.classList.remove('uploaded');
      photoLabel.textContent = 'Добавить фото';
      form.querySelector('.photo-wrapper')?.classList.remove('uploaded');
    }
  });
  // Функция показа ошибки
  function showFormError(message, focusElement = null) {
    errorBox.textContent = message;
    errorBox.classList.add('visible');
    submitBtn.classList.add('hidden');
    // Прокрутка к полю с ошибкой и установка фокуса
    if (focusElement) {
      focusElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      focusElement.focus();
    }
    // Таймер скрытия ошибки через 3 секунды
    clearTimeout(errorBox._timeout);
    errorBox._timeout = setTimeout(() => {
      errorBox.classList.remove('visible');
      submitBtn.classList.remove('hidden');
    }, 3000);
  }
  // Функция показа успешного сообщения
  function showSuccessMessage(message) {
    successBox.textContent = message;
    successBox.classList.add('visible');
    submitBtn.classList.add('hidden');
    // Скрываем через 3 секунды
    clearTimeout(successBox._timeout);
    successBox._timeout = setTimeout(() => {
      successBox.classList.remove('visible');
      submitBtn.classList.remove('hidden');
    }, 3000);
  }
  // Валидация имени
  nameInput.addEventListener('input', () => {
    let value = nameInput.value;
    value = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, ''); // Удаляем все символы, кроме букв и пробелов
    const parts = value.trimStart().split(' '); // Удаляем пробелы в начале, разбиваем по пробелам
    value = parts.slice(0, 2).join(' '); // Оставляем только первые два слова
    // Обрезаем по длине
    if (value.length > 15) value = value.slice(0, 15);
    nameInput.value = value;
    const spaceCount = (value.match(/\s/g) || []).length;
    // Условия корректности имени: 3–15 символов, не более одного пробела
    if (value.length >= 3 && value.length <= 15 && spaceCount <= 1) {
      nameStatus.textContent = '+'; // Успешно
      nameStatus.classList.add('valid');
      nameStatus.classList.remove('error');
    } else {
      nameStatus.textContent = '-'; // Ошибка
      nameStatus.classList.add('error');
      nameStatus.classList.remove('valid');
    }
  });
  // Валидация телефона
  phoneInput.addEventListener('focus', () => {
    if (!phoneInput.value.startsWith('+994')) {
      phoneInput.value = '+994'; // Автозаполнение при фокусе
    }
  });
  // Оставляем только цифры, начало с +994, обрезаем до 12 цифр
  phoneInput.addEventListener('input', () => {
    let digits = phoneInput.value.replace(/\D/g, '');
    if (!digits.startsWith('994')) digits = '994';
    digits = digits.slice(0, 12);
    phoneInput.value = '+' + digits;
    // Визуальная валидация
    if (digits.length === 12) {
      phoneStatus.textContent = '+';
      phoneStatus.classList.add('valid');
      phoneStatus.classList.remove('error');
    } else {
      phoneStatus.textContent = '-';
      phoneStatus.classList.add('error');
      phoneStatus.classList.remove('valid');
    }
  });
  // Отправка отзыва
  submitBtn.addEventListener('click', () => {
    // Получаем элементы
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();
    const photoFile = photoInput.files[0];
    const digits = phone.replace(/\D/g, '');
    const spaceCount = (name.match(/\s/g) || []).length;
    // Проверяем каждое поле
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
    // Создаём HTML нового отзыва
    const newReview = document.createElement('div');
    newReview.classList.add('reviews-item');
    // Функция безопасного текста
    const safe = (text) => {
      const el = document.createElement('div');
      el.textContent = text;
      return el.innerHTML; // Экранируем символы — защита от XSS
    };
    // Отключаем кнопку
    submitBtn.disabled = true;
    // Загружаем фото 
    if (photoFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        insertReviewHTML(e.target.result); // Получаем base64 URL
        submitBtn.disabled = false;
      };
      reader.readAsDataURL(photoFile);
    } else {
      insertReviewHTML(null); // Без фото
      submitBtn.disabled = false;
    }
    // Вставка отзыва в DOM
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
          <p class="reviews-item-desc">Отзыв: <strong>${safe(message)}</strong></p>
          ${photoURL ? `<img src="${photoURL}" alt="Фото отзыва" class="review-photo-thumb">` : ''}
        </div>
      `;
      // Добавляем отзыв сразу после формы
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
      photoLabel.textContent = 'Добавить фото';
      form.querySelector('.photo-wrapper')?.classList.remove('uploaded');
      // Увеличение счётчика и сообщение об успехе
      if (typeof incrementTrustCount === 'function') {
        incrementTrustCount(); // Увеличиваем trust-band
      }
      // Сообщение об успехе
      showSuccessMessage('Отзыв отправлен 🎉');
    }
  });
});

//! FooterFormValidation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.footer-form');
  const nameInput = form.querySelector('.name-wrapper input');
  const nameStatus = form.querySelector('.name-wrapper .footer-status');
  const phoneInput = form.querySelector('.phone-wrapper input');
  const phoneStatus = form.querySelector('.phone-wrapper .footer-status');
  const messageInput = form.querySelector('textarea');
  const checkbox = form.querySelector('input[type="checkbox"]');
  const submitBtn = form.querySelector('.footer-submit-btn');
  const errorBox = form.querySelector('.footer-error-message');
  const successBox = form.querySelector('.footer-success-message');
  // === Показываем ошибку ===
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
  // === Показываем успешное сообщение ===
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
  // === Ограничение длины комментария ===
  messageInput.addEventListener('input', () => {
    const max = 500;
    if (messageInput.value.length > max) {
      messageInput.value = messageInput.value.slice(0, max);
      messageInput.classList.add('overlimit');
      clearTimeout(messageInput._limitTimeout);
      messageInput._limitTimeout = setTimeout(() => {
        messageInput.classList.remove('overlimit');
      }, 300);
    }
  });
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
      nameStatus.textContent = '+';
      nameStatus.classList.add('valid');
      nameStatus.classList.remove('error');
    } else {
      nameStatus.textContent = '–';
      nameStatus.classList.add('error');
      nameStatus.classList.remove('valid');
    }
  });
  // === Телефон: автоформат и валидация ===
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
      phoneStatus.textContent = '+';
      phoneStatus.classList.add('valid');
      phoneStatus.classList.remove('error');
    } else {
      phoneStatus.textContent = '–';
      phoneStatus.classList.add('error');
      phoneStatus.classList.remove('valid');
    }
  });
  // === Отправка ===
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();
    const digits = phone.replace(/\D/g, '');
    const spaceCount = (name.match(/\s/g) || []).length;
    if (!name || name.length < 3 || name.length > 15 || spaceCount > 1) {
      showFormError('Введите имя корректно', nameInput);
      return;
    }
    if (digits.length !== 12 || !digits.startsWith('994')) {
      showFormError('Введите номер телефона', phoneInput);
      return;
    }
    if (!message) {
      showFormError('Добавьте комментарий', messageInput);
      return;
    }
    if (!checkbox.checked) {
      showFormError('Подтвердите согласие с условиями', checkbox);
      return;
    }
    // === Успешно 🎉 ===
    form.reset();
    nameStatus.textContent = '';
    phoneStatus.textContent = '';
    nameStatus.classList.remove('valid', 'error');
    phoneStatus.classList.remove('valid', 'error');
    showSuccessMessage('Принятно 🎉');
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
  // Функции работы с localStorage
  function saveCartToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  // Счётчик товаров
  function updateCartCount() {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
    cartToggle.dataset.cartCount = total;
    // 👇 Если корзина пустая — скрываем счётчик
    if (total === 0) {
      cartToggle.classList.add('empty');
    } else {
      cartToggle.classList.remove('empty');
    }
  }
  // Сумма заказа
  function updateCartTotal() {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalDisplay.textContent = `Итого: ${total} ₼`;
  }
  // Сообщение, если корзина пуста
  function showCartMessage(text) {
    cartItemsList.innerHTML = `<p class="cart-empty-text">${text}</p>`;
    cartTotalDisplay.textContent = `Итого: 0 ₼`;
  }
  // Рендер товаров в корзине
  function renderCartItems() {
    cartItemsList.innerHTML = ''; 
    if (cartItems.length === 0) {
      showCartMessage('Ваша корзина пуста');
      return;
    }
    // Проверяем: если пусто — показываем сообщение и не продолжаем
    cartItems.forEach((item, index) => {
      // Для каждого товара — генерируем блок
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
      // Используешь data-index, чтобы потом изменять количество
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
      const image = item.querySelector('.order-item-img img')?.getAttribute('src');
      // Получаем тип (S, M, L, XL)
      const typeMatch = title.match(/Композиция\s([A-Z]+)/i);
      const type = typeMatch ? typeMatch[1] : 'UNK';
      // Получаем все карточки этого же типа
      const allSameType = [...document.querySelectorAll('.order-item')]
        .filter(el => el.querySelector('.order-item-title')?.textContent.includes(`Композиция ${type}`));
      // Индекс карточки в группе (от 1 до N)
      const index = allSameType.indexOf(item) + 1;
      // Поиск существующего товара по типу и номеру
      const existing = cartItems.find(el => el.title === title && el.index === index);
      if (existing) {
        existing.quantity += 1;
      } else {
        cartItems.push({
          title,
          desc,
          price,
          image,
          type,
          index,
          quantity: 1
        });
      }
      updateCartCount();
      renderCartItems();
      // ✨ Анимация полёта (оставляем как есть)
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
  // Функция плавной прокрутки к элементу внутри контейнера
  function smoothScrollToElement(container, target, duration = 1500) {
    const start = container.scrollTop;
    const end = target.offsetTop;
    const distance = end - start;
    const startTime = performance.now();
    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollTop = start + distance * easeInOutCubic(progress);
      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }
    // Функция сглаживания: ускорение → замедление
    function easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    requestAnimationFrame(scrollStep);
  }
  // Поведение модалки корзины
  cartToggle.addEventListener('click', () => {
    if (cartModal.classList.contains('visible')) {
      cartModal.classList.add('hiding');
      setTimeout(() => {
        cartModal.classList.remove('visible', 'hiding');
      }, 400);
    } else {
      cartModal.classList.add('visible');
      // Scroll!
      const footer = document.querySelector('.cart-modal-footer');
      const container = document.querySelector('.cart-modal-content');
      if (container && footer) {
        let stopScroll = false; // флаг остановки
        // Слушатели: колесо мыши или касание — прерывают скролл
        const cancelScroll = () => { stopScroll = true; };
        container.addEventListener('wheel', cancelScroll, { once: true, passive: true });
        container.addEventListener('touchstart', cancelScroll, { once: true, passive: true });
        // Начальные параметры
        const start = container.scrollTop;
        const end = footer.offsetTop;
        const distance = end - start;
        const duration = 3000;
        const startTime = performance.now();
        // Кадровая функция прокрутки
        function scrollStep(currentTime) {
          if (stopScroll) return;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          container.scrollTop = start + distance * easeInOutCubic(progress);
          // Повторяем пока не дойдём до конца
          if (progress < 1) requestAnimationFrame(scrollStep);
        }
        // Функция сглаживания — ускорение → замедление
        function easeInOutCubic(t) {
          return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        requestAnimationFrame(scrollStep);
      }
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
    const cartItemsEls = cartItemsList.querySelectorAll('.cart-item');
    if (!cartItemsEls.length) return;
    cartItemsEls.forEach((item, i) => {
      // Случайные значения смещения и поворота
      const x = (Math.random() - 0.5) * 400 + 'px';
      const y = (Math.random() - 0.5) * 400 + 'px';
      const rot = (Math.random() - 0.5) * 180 + 'deg';
      item.style.setProperty('--x', x);
      item.style.setProperty('--y', y);
      item.style.setProperty('--rot', rot);
      item.classList.add('animate-out');
    });
    // Ждём окончания анимации и очищаем всё
    setTimeout(() => {
      cartItems.length = 0;
      updateCartCount();
      renderCartItems();
      saveCartToStorage();
    }, 700); // должно совпадать с длительностью анимации
  });
  // Отправка заказа в WhatsApp
  cartSendBtn.addEventListener('click', () => {
    if (cartItems.length === 0) {
      showCartMessage('Ваша корзина пуста');
      return;
    }
    // Собираем текст
    const message = cartItems.map(item => {
      const titleWithId = `${item.title} [${item.index}]`;
      return `• ${titleWithId} — ${item.quantity} шт. (${item.price * item.quantity} ₼)`;
    }).join('%0A');
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

//! CartToggleHideOnFooter
document.addEventListener('DOMContentLoaded', () => {
  const cartToggle = document.querySelector('.cart-toggle');
  const footer = document.querySelector('.footer-section');
  if (cartToggle && footer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cartToggle.classList.add('hidden-in-footer');
        } else {
          cartToggle.classList.remove('hidden-in-footer');
        }
      });
    }, { threshold: 0.1 });
    observer.observe(footer);
  }
});