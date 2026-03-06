const userName = document.getElementById("userName");
const password = document.getElementById("password");
const signIn = document.getElementById("signIn");

signIn.addEventListener("click", function () {
  const user = userName.value;
  const pass = password.value;

  if (user == "admin" && pass == "admin123") {
    alert("Login Success");
    window.location.assign("../dashboard.html");
  } else {
    alert("Please enter a valid credential");
    return;
  }
});
