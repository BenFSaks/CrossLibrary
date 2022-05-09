document.getElementById("btn-signup").addEventListener('click', () => {
    const email = document.getElementById("email").value
    console.log(email + " hey")
    window.localStorage.setItem("user_email", email)
})