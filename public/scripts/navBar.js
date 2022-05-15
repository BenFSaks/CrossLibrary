class Header extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <nav class="flex bg-yellow-200">
            <p class=" text-black ml-5 text-2xl font-mono hover:bg-red-200">
                <a href="/">CrossLib:</a>
            </p>
            <h1 class="text-cyan-300 ml-5 font-mono text-center text-2xl">Cross Library</h1>
            <div class="text-yellow-700 font-mono text-xl px-0.5 ml-4 flex">
                <a href="/signup" class=" border-cyan-300 border-r border-t border-l">Signup</a>    
                <a href="/login" class="border-cyan-300 border-r border-t">login</a>
                <a href="/shelf" class="border-cyan-300 border-r border-t">Shelf</a>

            </div>   
        </nav>    
        `
    }
}
customElements.define('main-header', Header);