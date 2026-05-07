function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  const usuarios = [
    { user: "mimmarcelo", pass: "Teste123" },
    { user: "ana", pass: "123" },
    { user: "joao", pass: "123" },
    { user: "maria", pass: "123" },
    { user: "carlos", pass: "123" }
  ];

  const valido = usuarios.find(u => u.user === user && u.pass === pass);

  if (valido) {
    localStorage.setItem("logado", "true");
    localStorage.setItem("usuario", user);
    window.location.href = "chat.html";
  } else {
    document.getElementById("erro").innerText = "Login inválido!";
  }
}