'use strict'; // Строгий режим включён

document.addEventListener('DOMContentLoaded', () => {
    // 1. Бургер-меню
    const menuButton = document.querySelector('.menu-toggle');
    menuButton.addEventListener('click', () => {
        console.log('Меню кликнуто!');
        menuButton.classList.toggle('active');
    });

    // 2. Аудиоплеер
    const audioButton = document.querySelector('.audio-toggle');
    const audio = document.getElementById('background-audio');
    const audioIcon = audioButton.querySelector('.audio-icon');
    // ❗ При загрузке страницы: выключаем звук и ставим иконку "выключено"
    audio.pause();
    audioIcon.src = './src/img/svg/muted-audio.svg';
    audioButton.setAttribute('data-audio-state', 'muted');
    // Обработка клика
    audioButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            audioIcon.src = './src/img/svg/playing-audio.svg';
            audioButton.setAttribute('data-audio-state', 'playing');
        } else {
            audio.pause();
            audioIcon.src = './src/img/svg/muted-audio.svg';
            audioButton.setAttribute('data-audio-state', 'muted');
        }
    });
});









// // document.addEventListener('DOMContentLoaded', function() {
// //     // Элементы
// //     const trustProgress = document.querySelector('.trust-progress');
// //     const trustCount = document.querySelector('.trust-count');
// //     const addReviewBtn = document.querySelector('.add-review');
    
// //     // Загрузка сохраненных данных
// //     let happyClients = parseInt(localStorage.getItem('happyClients')) || 0;
// //     updateTrustBand();
    
// //     // Обработчик добавления отзыва
// //     addReviewBtn.addEventListener('click', function() {
// //         // Увеличиваем счетчик
// //         happyClients++;
// //         localStorage.setItem('happyClients', happyClients);
// //         updateTrustBand();
        
// //         // Показываем сообщение
// //         alert('Спасибо за ваш отзыв! Ваше доверие очень важно для нас.');
// //     });
    
// //     // Обновление ленты доверия
// //     function updateTrustBand() {
// //         const maxClients = 100;
// //         const percentage = Math.min((happyClients / maxClients) * 100, 100);
        
// //         trustProgress.style.width = percentage + '%';
// //         trustCount.textContent = happyClients;
        
// //         // Анимация при достижении 100%
// //         if (happyClients >= maxClients) {
// //             trustProgress.style.background = 'linear-gradient(90deg, #d4af37, #ff0000)';
// //         }
// //     }
// // });