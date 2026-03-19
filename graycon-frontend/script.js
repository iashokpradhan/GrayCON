// ===== SMART NAVIGATION =====
function handleStart(){
const token = localStorage.getItem("token")

if(token){
window.location.href = "dashboard.html"
}else{
window.location.href = "auth.html"
}
}

// ===== TOGGLE LOGIN/SIGNUP =====
let isLogin = false

function toggleForm(){
isLogin = !isLogin

const title = document.getElementById("formTitle")
const button = document.querySelector("button")
const toggleText = document.querySelector(".toggle-text")

if(isLogin){
title.innerText = "Login"
button.innerText = "Login"
toggleText.innerHTML = `Don't have an account? <span onclick="toggleForm()">Sign Up</span>`
}else{
title.innerText = "Create Account"
button.innerText = "Sign Up"
toggleText.innerHTML = `Already have an account? <span onclick="toggleForm()">Login</span>`
}
}

// ===== AUTH SUBMIT =====
const form = document.getElementById("authForm")

if(form){
form.addEventListener("submit", async (e)=>{
e.preventDefault()

const email = document.getElementById("email").value
const password = document.getElementById("password").value

const url = isLogin
? "http://localhost:5000/api/auth/login"
: "http://localhost:5000/api/auth/signup"

try{
const res = await fetch(url,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({email,password})
})

const data = await res.json()

if(res.ok){

// SAVE TOKEN
if(data.token){
localStorage.setItem("token", data.token)
}

// REDIRECT
window.location.href = "dashboard.html"

}else{
alert(data.message || "Error")
}

}catch(err){
alert("Server error")
}
})
}

// ===== PROTECT DASHBOARD =====
function protectPage(){
const token = localStorage.getItem("token")

if(!token){
window.location.href = "auth.html"
}
}

// ===== LOGOUT =====
function logout(){
localStorage.removeItem("token")
window.location.href = "index.html"
}