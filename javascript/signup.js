import Navbar from "../components/nav.js";
document.getElementById("navbar").innerHTML=Navbar()


const userdata = (e) => {
  e.preventDefault();
  let user = {
    name: document.getElementById("name").value,
    password: document.getElementById("password").value,
    email: document.getElementById("email").value,
  };
  console.log(user);
  var nameRegex = /^[a-zA-Z\-]+$/;
  var password = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  var email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!nameRegex.test(user.name)) {
    document.getElementById("n_err").innerHTML = "not a valid name";
  } else {
    document.getElementById("n_err").innerHTML = "valid name";
    document.getElementById("n_err").style.color = "green";
  }
  if (!password.test(user.password)) {
    document.getElementById("p_err").innerHTML =
      "password is not a valid password";
  }

  if (!email.test(user.email)) {
    document.getElementById("e_err").innerHTML = "not a valid email address";
  }

  if (
    email.test(user.email) &&
    password.test(user.password) &&
    nameRegex.test(user.name)
  ) {
    fetch(`http://localhost:3000/user?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          alert("User already exists");
          setTimeout(() => {
            window.location.href = "/pages/login.html";
          }, 3000);
        } else {
          fetch("http://localhost:3000/user", {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(user),
          });
        }
      });
  }
};

document.getElementById("userdata").addEventListener("submit", userdata);

document.getElementById("password").addEventListener("keypress", () => {
  let pass = document.getElementById("password").value;
  var password = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!password.test(pass)) {
    document.getElementById("p_err").innerHTML =
      "password is not a valid password";
  } else {
    document.getElementById("p_err").innerHTML = "valid password";
    document.getElementById("p_err").style.color = "green";
  }
});
