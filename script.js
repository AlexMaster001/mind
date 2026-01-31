// Общие функции для всего сайта

document.addEventListener('DOMContentLoaded', function() {
    // Проверка авторизации на страницах, где это нужно
    const protectedPages = ['/profile.html', '/admin.html'];
    const currentPage = window.location.pathname;
    
    if (protectedPages.includes(currentPage)) {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn && currentPage === '/profile.html') {
            window.location.href = '/login.html';
        }
    }
    
    // Добавление текущего года в футер
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Сохранение прогресса тестов
    const testForms = document.querySelectorAll('.test-form');
    testForms.forEach(form => {
        const formId = form.id || 'testForm';
        
        // Восстанавливаем сохраненные ответы
        const savedAnswers = JSON.parse(localStorage.getItem(formId) || '{}');
        Object.keys(savedAnswers).forEach(name => {
            const input = form.querySelector(`input[name="${name}"][value="${savedAnswers[name]}"]`);
            if (input) input.checked = true;
        });
        
        // Сохраняем ответы при изменении
        form.addEventListener('change', function(e) {
            if (e.target.type === 'radio') {
                const answers = JSON.parse(localStorage.getItem(formId) || '{}');
                answers[e.target.name] = e.target.value;
                localStorage.setItem(formId, JSON.stringify(answers));
            }
        });
        
        // Очистка сохраненных ответов при отправке
        form.addEventListener('submit', function() {
            localStorage.removeItem(formId);
        });
    });
});

// Функция для проверки роли пользователя
function getUserRole() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role || 'guest';
}

// Функция для отображения/скрытия элементов по роли
function checkAccess(requiredRole) {
    const userRole = getUserRole();
    const rolesHierarchy = ['guest', 'user', 'parent', 'admin'];
    
    return rolesHierarchy.indexOf(userRole) >= rolesHierarchy.indexOf(requiredRole);
}

// Функция для форматирования даты
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}
