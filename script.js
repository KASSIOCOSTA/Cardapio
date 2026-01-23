const menu = document.getElementById("menu") // todo menu
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal") //carrinho
const cartItemsContainer = document.getElementById("cart-items") // itens que vao aparecer no carrinho
const cartTotal = document.getElementById("cart-total") // valor do carrinho
const checkoutBtn = document.getElementById("checkout-btn")// finalizar o pedido
const closeModalBtn = document.getElementById("close-modal-btn")// fechar
const cartCounter = document.getElementById("cart-count") //quantidade do carrinho
const addressInput = document.getElementById("address") // endereço
const addressWarn = document.getElementById("address-warn")


// abrir o carrinho
cartBtn.addEventListener("click",function(){
    cartModal.style.display = "flex"
})
// fechar o carrinho se clicar fora
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})
//botao de fechar o carrinho
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

