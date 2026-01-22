class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background-color: var(--bg-color);
          padding: 1rem 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
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
nav ul {
          display: flex;
          list-style: none;
          gap: 2rem;
        }
        nav a {
          font-family: 'Manrope', sans-serif;
          font-weight: 500;
          font-size: 1rem;
          color: var(--text-color);
          letter-spacing: 0.05em;
        }
        nav a:hover {
          color: var(--accent-color);
        }
        @media (max-width: 768px) {
          nav ul {
            display: none;
          }
        }
      </style>
      <div class="container">
        <div class="logo">
          <span>Тихая поддержка</span>
          <span class="specialist">Алексей Кирсанов | Психолог</span>
        </div>
<nav>
          <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="/tests.html">Тесты</a></li>
            <li><a href="/parents.html">Для родителей</a></li>
            <li><a href="/about.html">Обо мне</a></li>
            <li><a href="/contacts.html">Контакты</a></li>
</ul>
        </nav>
      </div>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);