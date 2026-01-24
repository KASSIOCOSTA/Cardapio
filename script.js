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

let cart =[]


// abrir o carrinho
cartBtn.addEventListener("click",function(){
    updateCartModal()
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


menu.addEventListener("click",function(event){
    

    let parentButton = event.target.closest(".add-to-cart-btn")
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = Number(parentButton.getAttribute("data-price"))
        
        //Adicionar no carrinho
        addTocart(name,price)
    }
    
})

// funcao para adicionar no carrinho
function addTocart(name,price){
    const existingItem = cart.find(item => item.name === name)
    if(existingItem){
        // se o item ja existe, aumenta a quantidade
        existingItem.quantity += 1
    }
    else{
        cart.push({
        name,
        price,
        quantity: 1,
    })

    }
    updateCartModal()
    
    
}


// atualizar carrinho
function updateCartModal(){
cartItemsContainer.innerHTML = ""
let total = 0

cart.forEach(item =>{
    const cartItemElement = document.createElement("div")
    cartItemElement.classList.add("flex","justify-between","mb-4", "flex-col")
    cartItemElement.innerHTML =`
    <div class="flex items-center justify-between ">
        <div>
            <p class="font-medium">${item.name} </p>
            <p>Qtn: ${item.quantity}</p>
            <p class=" font-medium mt-2">R$ ${item.price.toFixed(2)}</p>        
        </div>
        <button>
             Remover 
        </button>
    </div>
    
    `

    total += item.price * item.quantity

    cartItemsContainer.appendChild(cartItemElement)
})
cartTotal.textContent = total
}