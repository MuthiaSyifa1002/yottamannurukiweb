let loggedIn = false;
function showSection(id, el) {
  if ((id === 'menu' || id === 'profil') && !loggedIn) {
    showValidationMessage('Anda harus login terlebih dahulu untuk mengakses halaman ini!');
    id = 'login';
    el = document.getElementById('nav-login');
  }

  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));


  const targetSection = document.getElementById(id);
  if (targetSection) targetSection.classList.add('active');

  
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  if (el) el.classList.add('active');

  
  if (id === 'login') {
    document.body.classList.add('login-background');
  } else {
    document.body.classList.remove('login-background');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });


  clearValidationMessage();
}

function showValidationMessage(msg, isError = true) {
  const validationDiv = document.getElementById('validationMessage');
  if (!validationDiv) return;

  validationDiv.textContent = msg;
  if (isError) {
    validationDiv.classList.add('error');
    validationDiv.classList.remove('success');
  } else {
    validationDiv.classList.add('success');
    validationDiv.classList.remove('error');
  }
  validationDiv.style.display = 'block';
}


function clearValidationMessage() {
  const validationDiv = document.getElementById('validationMessage');
  if (validationDiv) {
    validationDiv.textContent = '';
    validationDiv.classList.remove('error', 'success');
    validationDiv.style.display = 'none';
  }
}


document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault(); 

  clearValidationMessage();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    showValidationMessage('Username dan password wajib diisi!');
    return;
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    showValidationMessage('Username hanya boleh berisi huruf dan angka.');
    return;
  }


  if (password.length < 6) {
    showValidationMessage('Password minimal 6 karakter.');
    return;
  }

 
  loggedIn = true;
  showValidationMessage(`Selamat datang, ${username}!`, false);


  setTimeout(() => {
    showSection('menu', document.getElementById('nav-menu'));
    clearValidationMessage();
    e.target.reset(); 
  }, 2000);
});

function logout() {
  loggedIn = false;
  clearValidationMessage();
  showSection('login', document.getElementById('nav-login'));
}

window.onload = () => {
  loggedIn = false;
  showSection('login', document.getElementById('nav-login'));
};
