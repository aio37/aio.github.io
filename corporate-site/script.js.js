/**
 * 中小企業向けコーポレートサイト共通JavaScript
 * 
 * 機能：
 * 1. ナビゲーションのスクロール対応
 * 2. フォームバリデーション
 * 3. スムーズスクロール
 * 4. アニメーション制御
 */

// DOM読み込み完了後実行
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. ナビゲーションのスクロール対応
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
    
    // アクティブなナビゲーションリンクの更新
    updateActiveNavLink();
  });
  
  // 2. スムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // #から始まる内部リンクのみ処理
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // 3. お問い合わせフォームバリデーション（contact.html用）
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateContactForm()) {
        // 実際のアプリケーションではここでフォーム送信処理を実装
        showSuccessMessage();
        
        // フォームリセット
        contactForm.reset();
      }
    });
  }
  
  // 4. アニメーション
  const animateElements = document.querySelectorAll('.fade-in-up');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    animateElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // 5. 現在のページに応じてナビゲーションリンクをアクティブ化
  function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      link.classList.remove('active');
      
      // 現在のページとリンク先が一致するかチェック
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
  
  // 6. バックトップボタン
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // 7. フォームバリデーション関数
  function validateContactForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;
    
    // 名前のバリデーション
    if (!name.value.trim()) {
      showError(name, 'お名前を入力してください');
      isValid = false;
    } else {
      clearError(name);
    }
    
    // メールアドレスのバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showError(email, 'メールアドレスを入力してください');
      isValid = false;
    } else if (!emailRegex.test(email.value)) {
      showError(email, '有効なメールアドレスを入力してください');
      isValid = false;
    } else {
      clearError(email);
    }
    
    // メッセージのバリデーション
    if (!message.value.trim()) {
      showError(message, 'お問い合わせ内容を入力してください');
      isValid = false;
    } else {
      clearError(message);
    }
    
    return isValid;
  }
  
  // 8. エラーメッセージ表示関数
  function showError(input, message) {
    const formGroup = input.closest('.mb-3');
    
    // 既存のエラーメッセージを削除
    const existingError = formGroup.querySelector('.invalid-feedback');
    if (existingError) {
      existingError.remove();
    }
    
    // エラークラスを追加
    input.classList.add('is-invalid');
    
    // エラーメッセージを追加
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
  }
  
  // 9. エラー表示クリア関数
  function clearError(input) {
    const formGroup = input.closest('.mb-3');
    const existingError = formGroup.querySelector('.invalid-feedback');
    
    if (existingError) {
      existingError.remove();
    }
    
    input.classList.remove('is-invalid');
  }
  
  // 10. 成功メッセージ表示関数
  function showSuccessMessage() {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.innerHTML = `
      <strong>送信完了しました！</strong> お問い合わせありがとうございます。2営業日以内にご返信いたします。
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alertDiv, form);
    
    // 5秒後にアラートを自動的に非表示
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.classList.remove('show');
        setTimeout(() => {
          if (alertDiv.parentNode) {
            alertDiv.remove();
          }
        }, 150);
      }
    }, 5000);
  }
  
  // 初期化
  updateActiveNavLink();
  
  // コンソールに読み込み完了メッセージ
  console.log('ビジネスソリューション株式会社 ウェブサイト初期化完了');
});