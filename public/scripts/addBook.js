class Book{
    constructor(coverFile, coverName){
        this.innerHTML = `
        <div class="book cursor-pointer p-2 hover:bg-blue-900">
            <img class="w-36 h-52" src="${coverFile}" alt="">
            <h1 class="font-sans text-white text-center">${coverName}</h1>
        </div>
        `
    }
}
let bookList = []
bookList[0] = {
    coverFile: "../img/georgeorwell1984.png",
    title: "George Orwell 1984"
}
bookList[1] = {
    coverFile: "../img/harrypottersorcstonejkrowling.jpg",
    title: "JK Rowling Harry"
}
bookList[2] = {
    coverFile: "../img/turtles.png",
    title: "John Green Turtles" //All The Way Down"
}
bookList[3] = bookList[1]
var shelf = document.getElementById("shelf")
bookList.forEach(element => {
    let book = new Book(element.coverFile,element.title)
    shelf.innerHTML += book.innerHTML
})
let bookEle = document.getElementsByClassName("book")
for (var i = 0, len = bookEle.length; i < len; i++) {
    bookEle[i].addEventListener('click', readBook)
}

function readBook(){
    console.log("Hye")
    location.href = 'newPage.html'
}


// Add a book, button
shelf.innerHTML +=
`
    <div class="p-2 cursor-pointer">
        <div id="addBook" class= "w-36 h-52 bg-white hover:bg-gray-200">
            <h1 class="font-bold text-center text-green-500">Add A Book</h1>
            <img class="mx-auto mt-8" src="../img/greenplusicon.png">
        </div>
    </div>
`
document.getElementById("addBook").addEventListener("click", addBookPopUp)
let menu = document.getElementById("popUpMenu")
function addBookPopUp(){
    menu.classList.remove("hidden")
}
document.getElementById("menuClose").addEventListener("click", closeMenu)
function closeMenu(){
    menu.classList.add("hidden")
}