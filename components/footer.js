class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background-color: white;
          padding: 3rem 0;
          margin-top: auto;
          border-top: 1px solid #eee;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .footer-content {
          text-align: center;
          font-size: 0.9375rem;
          color: #5a5a5a;
          line-height: 1.7;
        }
        
        .footer-content p {
          margin-bottom: 1rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 2rem 0;
          flex-wrap: wrap;
        }
        
        .footer-links a {
          color: var(--accent-color);
          text-decoration: none;
          font-weight: 500;
        }
        
        .footer-links a:hover {
          text-decoration: underline;
        }
        
        .copyright {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #eee;
          font-size: 0.875rem;
          color: #777;
        }
      </style>
      
      <div class="container">
        <div class="footer-content">
          <p>© ${new Date().getFullYear()} Тихая поддержка. Все права защищены.</p>
          <p>Вы можете быть уверены: ваши ответы только между вами и мной.</p>
          <p>Этот сайт создан, чтобы помочь, а не заменить живую консультацию. Все тесты носят информационный характер.</p>
          <p>Я следую принципам психологической этики: конфиденциальность, добровольность и уважение к вашим границам.</p>
          
          <div class="footer-links">
            <a href="/">Главная</a>
            <a href="/tests/tests.html">Тесты</a>
            <a href="/parents.html">Для родителей</a>
            <a href="/about.html">Обо мне</a>
            <a href="/contacts.html">Контакты</a>
            <a href="/privacy.html">Политика конфиденциальности</a>
          </div>
          
          <div class="copyright">
            <p>Материалы подготовлены Кирсановым Алексеем, психологом с многолетним опытом работы с подростками и семьями.</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);
