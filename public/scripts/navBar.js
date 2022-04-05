class Header extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <nav class="flex bg-yellow-200">
            <p class=" text-black ml-5 text-2xl font-mono hover:bg-red-200">
                <a href="/">CrossLib:</a>
            </p>
            <h1 class="text-cyan-300 ml-5 font-mono text-center text-2xl">Place's Cross Library</h1>   
        </nav>    
        `
    }
}
customElements.define('main-header', Header);