class Book{
    constructor(coverFile, coverName){
        this.innerHTML = `
        <div class="book p-2 hover:bg-blue-900">
            <img class="w-36 h-52" src="${coverFile}" alt="">
            <h1 class="font-sans text-white text-center">${coverName}</h1>
        </div>
        `
    }
}
bookList = []
bookList[0] = {
    coverFile: "../img/georgeorwell1984.png",
    title: "George Orwell 1984"
}
bookList[1] = {
    coverFile: "../img/harrypottersorcstonejkrowling.jpg",
    title: "JK Rowling Harry"
}
bookList[2] = bookList[0]
var shelf = document.getElementById("shelf")
bookList.forEach(element => {
    let book = new Book(element.coverFile,element.title)
    shelf.innerHTML += book.innerHTML
})
