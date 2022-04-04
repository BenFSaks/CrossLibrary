import user from './user'
document.getElementById("btn-signup").addEventListener('click', readUser)
function readUser(e){
    e.preventDefault()
    const firstName = document.getElementById("firstName")
    const lastName = document.getElementById("lastName")
    const newUser = user(firstName,lastName)
    console.log(newUser)
}


