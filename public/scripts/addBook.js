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

// Submitting a book 
document.getElementById("btn-submitBook").addEventListener('click', (e) =>{
    //e.preventDefault();
    closeMenu()
})
