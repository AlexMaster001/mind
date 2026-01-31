class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background-color: var(--bg-color);
          padding: 0.8rem 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          color: var(--text-color);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .logo::before {
          content: "🧠";
          font-size: 1.8rem;
        }
        
        .specialist {
          display: none;
          font-size: 0.9rem;
          color: var(--accent-color);
          font-weight: 500;
        }
        
        nav {
          display: flex;
          align-items: center;
        }
        
        nav ul {
          display: flex;
          list-style: none;
          gap: 1.5rem;
          margin: 0;
          padding: 0;
        }
        
        nav a {
          font-family: 'Manrope', sans-serif;
          font-weight: 500;
          font-size: 1rem;
          color: var(--text-color);
          letter-spacing: 0.05em;
          padding: 0.5rem 0;
          position: relative;
          white-space: nowrap;
        }
        
        nav a:hover {
          color: var(--accent-color);
        }
        
        nav a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--accent-color);
          transition: width 0.3s ease;
        }
        
        nav a:hover::after {
          width: 100%;
        }
        
        /* Стили для блока авторизации */
        .auth-section {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-left: 1rem;
        }
        
        .auth-link {
          font-size: 0.9rem;
          color: var(--text-color);
          padding: 0.5rem 0.8rem;
          border-radius: 6px;
          transition: all 0.2s ease;
          white-space: nowrap;
          text-decoration: none;
          border: none;
          background: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          display: inline-flex;
          align-items: center;
        }
        
        .auth-link:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        
        .auth-link.register {
          background-color: var(--accent-color);
          color: white;
          padding: 0.5rem 1rem;
        }
        
        .auth-link.login {
          background-color: transparent;
          color: var(--accent-color);
        }
        
        .user-menu {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--secondary-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 0.9rem;
          flex-shrink: 0;
        }
        
        .user-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        
        .user-name {
          font-weight: 600;
          font-size: 0.85rem;
        }
        
        .user-role {
          font-size: 0.75rem;
          color: #666;
        }
        
        .user-menu .auth-link {
          font-size: 0.85rem;
          padding: 0.4rem 0.8rem;
        }
        
        @media (min-width: 1024px) {
          .specialist {
            display: inline;
            margin-left: 1rem;
            position: relative;
            padding-left: 1rem;
          }
          .specialist::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 1rem;
            width: 1px;
            background: #ddd;
          }
        }
        
        @media (max-width: 1100px) {
          nav ul {
            gap: 1rem;
          }
          
          .auth-section {
            gap: 0.5rem;
          }
          
          .auth-link span {
            display: none;
          }
          
          .auth-link {
            padding: 0.5rem;
            min-width: 40px;
            text-align: center;
            justify-content: center;
          }
          
          .auth-link::before {
            content: "👤";
            font-size: 1.2rem;
          }
          
          .auth-link.register::before {
            content: "📝";
          }
          
          .auth-link.logout::before {
            content: "🚪";
          }
          
          .user-menu {
            gap: 0.5rem;
          }
          
          .user-info {
            display: none;
          }
        }
        
        @media (max-width: 768px) {
          .container {
            flex-wrap: wrap;
            padding: 0 15px;
          }
          
          nav {
            order: 3;
            width: 100%;
            margin-top: 0.5rem;
            justify-content: center;
          }
          
          nav ul {
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
          }
          
          nav a {
            font-size: 0.9rem;
          }
          
          .auth-section {
            margin-left: auto;
            order: 2;
          }
          
          .logo {
            order: 1;
          }
        }
        
        @media (max-width: 480px) {
          nav ul {
            gap: 0.8rem;
          }
          
          nav a {
            font-size: 0.85rem;
          }
          
          .auth-section {
            gap: 0.3rem;
          }
          
          .auth-link {
            padding: 0.4rem;
            min-width: 36px;
          }
        }
      </style>
      
      <div class="container">
        <div class="logo">
          <span>Тихая поддержка</span>
          <span class="specialist">Алексей Кирсанов | Психолог</span>
        </div>
        
        <div class="auth-section" id="authSection"></div>
        
        <nav>
          <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="/tests/tests.html">Тесты</a></li>
            <li><a href="/parents.html">Для родителей</a></li>
            <li><a href="/about.html">Обо мне</a></li>
            <li><a href="/contacts.html">Контакты</a></li>
          </ul>
        </nav>
      </div>
    `;
    
    this.checkAuth();
  }
  
  checkAuth() {
    const authSection = this.shadowRoot.getElementById('authSection');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (isLoggedIn && user.name) {
      // Пользователь авторизован
      this.renderUserMenu(user);
    } else {
      // Гость
      this.renderGuestMenu();
    }
  }
  
  renderGuestMenu() {
    const authSection = this.shadowRoot.getElementById('authSection');
    authSection.innerHTML = `
      <a href="/login.html" class="auth-link login">
        <span>Вход</span>
      </a>
      <a href="/register.html" class="auth-link register">
        <span>Регистрация</span>
      </a>
    `;
  }
  
  renderUserMenu(user) {
    const authSection = this.shadowRoot.getElementById('authSection');
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    
    let menuHTML = `
      <div class="user-menu">
        <div class="user-avatar">${initials}</div>
        <div class="user-info">
          <div class="user-name">${user.name.split(' ')[0]}</div>
          <div class="user-role">${user.role === 'admin' ? 'Админ' : 'Пользователь'}</div>
        </div>
        <a href="/profile.html" class="auth-link">
          <span>Профиль</span>
        </a>
    `;
    
    if (user.role === 'admin') {
      menuHTML += `
        <a href="/admin.html" class="auth-link">
          <span>Админ</span>
        </a>
      `;
    }
    
    menuHTML += `
        <button class="auth-link logout" id="logoutBtn">
          <span>Выйти</span>
        </button>
      </div>
    `;
    
    authSection.innerHTML = menuHTML;
    
    // Добавляем обработчик для кнопки выхода
    const logoutBtn = authSection.querySelector('#logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        window.location.href = '/';
      });
    }
  }
}

customElements.define('custom-navbar', CustomNavbar);
