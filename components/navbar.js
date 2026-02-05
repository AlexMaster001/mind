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
        .logo::before { content: "🧠"; font-size: 1.8rem; }
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
          text-decoration: none;
        }
        nav a:hover { color: var(--accent-color); }
        .auth-section {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-left: 1rem;
        }
        .auth-link {
          font-size: 0.9rem;
          padding: 0.5rem 0.8rem;
          border-radius: 6px;
          text-decoration: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
        }
        .auth-link.register {
          background-color: var(--accent-color);
          color: white;
        }
        .auth-link.login {
          color: var(--accent-color);
          border: 1px solid var(--accent-color);
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

    // Инициализация Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyDdaP1VyoidAjXmFERSKqldbSMsFIEXxSk",
      authDomain: "minde-31a83.firebaseapp.com",
      projectId: "minde-31a83",
      storageBucket: "minde-31a83.appspot.com",
      messagingSenderId: "1003108983817",
      appId: "1:1003108983817:web:494ede688023c73667c4d8"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.checkAuth();
  }

  checkAuth() {
    const authSection = this.shadowRoot.getElementById('authSection');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.firestore().collection('users').doc(user.uid).get().then(doc => {
          const data = doc.exists ? doc.data() : { name: user.email.split('@')[0], role: 'client' };
          this.renderUserMenu({ ...data, uid: user.uid });
        });
      } else {
        this.renderGuestMenu();
      }
    });
  }

  renderGuestMenu() {
    const authSection = this.shadowRoot.getElementById('authSection');
    authSection.innerHTML = `
      <a href="/login.html" class="auth-link login">Вход</a>
      <a href="/register.html" class="auth-link register">Регистрация</a>
    `;
  }

  renderUserMenu(user) {
    const authSection = this.shadowRoot.getElementById('authSection');
    const initials = user.name ? user.name[0].toUpperCase() : '??';
    let menuHTML = `
      <div class="user-menu">
        <div class="user-avatar">${initials}</div>
        <a href="/profile.html" class="auth-link">Профиль</a>
        <button class="auth-link logout" id="logoutBtn">Выйти</button>
      </div>
    `;
    authSection.innerHTML = menuHTML;

    authSection.querySelector('#logoutBtn').addEventListener('click', () => {
      firebase.auth().signOut().then(() => {
        window.location.reload();
      });
    });
  }
}

customElements.define('custom-navbar', CustomNavbar);
