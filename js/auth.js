/* REGISTER */

const registerForm =
document.getElementById("register-form");

if(registerForm){

registerForm.addEventListener(
"submit",
(e)=>{

e.preventDefault();

const username=
document.getElementById("username").value;

const email=
document.getElementById("register-email").value;

const password=
document.getElementById("register-password").value;

let users=

JSON.parse(
localStorage.getItem("users")
)||[];


/* EMAIL EXISTS */

const exists=
users.find(
u=>u.email===email
);

if(exists){

alert("Email already exists");

return;

}


/* ROLE */

const role=

email==="admin@veloura.com"

?

"admin"

:

"user";


const user={

username,
email,
password,
role

};

users.push(user);

localStorage.setItem(
"users",
JSON.stringify(users)
);

alert(
"Account Created Successfully"
);

window.location.href=
"login.html";

});
}


/* LOGIN */

const loginForm=
document.getElementById("login-form");

if(loginForm){

loginForm.addEventListener(
"submit",
(e)=>{

e.preventDefault();

const email=
document.getElementById("email").value;

const password=
document.getElementById("password").value;

const users=

JSON.parse(
localStorage.getItem("users")
)||[];


const foundUser=

users.find(
u=>

u.email===email &&

u.password===password
);


if(foundUser){

localStorage.setItem(
"loggedIn",
true
);

localStorage.setItem(

"currentUser",

JSON.stringify(foundUser)

);

alert(
"Login Successful"
);

window.location.href=
"index.html";

}else{

alert(
"Invalid Email or Password"
);

}

});
}
/* LOGOUT */

function logout(){

    localStorage.removeItem("loggedIn");

    alert("Logged Out Successfully");

    window.location.href = "login.html";
}


/* NAVBAR AUTH */

const navIcons = document.querySelector(".nav-icons");

const user =
JSON.parse(localStorage.getItem("user"));

const loggedIn =
localStorage.getItem("loggedIn");

if(navIcons && loggedIn){

    navIcons.innerHTML += `

        <span class="user-name">
            Hi, ${user.username}
        </span>

        <button onclick="logout()"
        class="logout-btn">

            Logout

        </button>
    `;
}
function updateNavbarAuth(){

    const navIcons = document.querySelector(".nav-icons");
    if(!navIcons) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const loggedIn = localStorage.getItem("loggedIn");

    // مهم جداً: نبدأ من حالة ثابتة
    let cartHTML = navIcons.querySelector(".cart-icon")?.outerHTML || "";

    if(loggedIn && user){

        navIcons.innerHTML = `

            <span class="user-name">
                Hi, ${user.username}
            </span>

            <button onclick="logout()" class="logout-btn">
                Logout
            </button>

            ${cartHTML}
        `;
    }
}