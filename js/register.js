document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Регистрация успешна! Проверьте вашу почту для подтверждения.');
            window.location.href = '/login.html';
        });
    }
});