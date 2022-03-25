const path = require('path')
class User{
    constructor(id, firstName, LastName){
        this.userId = Math.random().toString(16).slice(2)
        this.userFirstName = firstName
        this.userLastName = LastName
        this.UserBooks = {}
    }
    //Getters 
    getUserBooks(){
        return this.UserBooks
    }
    getUserName(){
        return `${this.userFirstName} ${this.userLastName}`
    }
    //Setters
    setUserFirstName(firstName){
        this.userFirstName = firstName 
    }
    setUserLastName(lastname){
        this.userLastName = lastname
    }


    //Books Obj 
    addUserBook(name, path){
        this.UserBooks[name] = path
    }
    removeUserBook(name){
        delete this.UserBooks[name]
    }
    
}

let user = new User( 'Ben', 'Saks')
user.addUserBook("C++ and Assembly", __dirname)
user.addUserBook("C", "wow")
//user.removeUserBook("C")
console.log(user)