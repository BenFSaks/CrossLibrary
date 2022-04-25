class User{
    constructor(firstName, LastName, email){
        this.userId = Math.random().toString(16).slice(2)
        this.userFirstName = firstName
        this.userLastName = LastName
        this.userEmail = email
        this.UserBooks = []
    }
    //Getters 
    getUserBooks(){
        return this.UserBooks
    }
    getUserName(){
        return `${this.userFirstName} ${this.userLastName}`
    }
    getUserEmail(){
        return this.User
    }
    //Setters
    setUserFirstName(firstName){
        this.userFirstName = firstName 
    }
    setUserLastName(lastname){
        this.userLastName = lastname
    }
    setUserEmail(email){
        this.userEmail = email
    }


    //Books Obj 
    addUserBook(name, path){
        this.UserBooks[name] = path
    }
    removeUserBook(name){
        delete this.UserBooks[name]
    }
    
}
//Grab the signup submit button and create a user 
// document.getElementById("btn-signup").addEventListener('click', readUser)
// function readUser(e){
//     e.preventDefault()
//     const firstName = document.getElementById("firstName").value
//     const lastName = document.getElementById("lastName").value
//     const email = document.getElementById("email").value
//     const newUser = new User(firstName,lastName,email)
//     console.log(newUser)
// }
// let user = new User( 'Ben', 'Saks')
// user.addUserBook("C++ and Assembly", "Located <Here>")
// user.addUserBook("C", "wow")
//user.removeUserBook("C")
module.exports.user = {
    User: User
}

