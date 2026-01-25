const menu = document.getElementById("menu") // todo menu
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal") //carrinho
const cartItemsContainer = document.getElementById("cart-items") // itens que vao aparecer no carrinho
const cartTotal = document.getElementById("cart-total") // valor do carrinho
const checkoutBtnLocal = document.getElementById("checkout-btn-local")// finalizar o pedido local
const checkoutBtn = document.getElementById("checkout-btn")// finalizar o pedido delivery
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
        <button class="remove-cart-btn" data-name="${item.name}">
             Remover 
        </button>
    </div>
    
    `

    total += item.price * item.quantity

    cartItemsContainer.appendChild(cartItemElement)
})
cartTotal.textContent = total.toLocaleString("pt-br",{style:"currency", currency:"BRL"})


const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
}, 0);

cartCounter.innerHTML = totalItems;

}

//funcao para remover

cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-cart-btn")){
        const name = event.target.getAttribute("data-name")
        removeItemcart(name)
    }
})

function removeItemcart(name){
    const index = cart.findIndex(item=> item.name ===name)

    if(index !== -1){
        const item =cart[index]

        if(item.quantity>1){
            item.quantity -= 1
            updateCartModal()
            return
        }
        cart.splice(index,1)
         updateCartModal()
    }
}

    addressInput.addEventListener("input", function(event){
        let inputValue = event.target.value
        if(inputValue!== ""){
            addressInput.classList.remove("border-red-500")
            addressWarn.classList.add("hidden")
        }
        
    })

//Finalizar Pedido local
    checkoutBtnLocal.addEventListener("click", function(){
         let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

   /* const isOpen = checkRestauranOpen()
        if(!isOpen){
        Toastify({
            text: "Ops! O restaurante está fechado",
            duration: 3000,
            close: true,
            gravity: "top", // `top` ou `bottom`
            position: "right", // `left`, `center` ou `right`
            stopOnFocus: true,
            style: {
                background: "#ef4444",
                zIndex: 9999,  // garante que fique acima de outros elementos
            },
        }).showToast();
            return
        }*/
        if(cart.length ===0) 
            return Toastify({
                        text: "Insira itens no carrinho",
                        duration: 3000,
                        close: true,
                        gravity: "top", // `top` ou `bottom`
                        position: "right", // `left`, `center` ou `right`
                        stopOnFocus: true,
                        style: {
                            background: "#ef4444",
                            zIndex: 9999,  // garante que fique acima de outros elementos
                        },
                    }).showToast()

        //Enviar pedido para Api whats
        const mensagem = gerarMensagemWhatsapp();
        const message = encodeURIComponent(mensagem);

        const phone = "98970016960"

        window.open(`https://wa.me/${phone}?text=Olá, gostaria de fazer o pedido:\n${message}%0A[Retirada no Local]%0ATotal:${total.toFixed(2)}`, "_blank")

        cart =[]
        updateCartModal()
    })

//Finalizar Pedido delivery
    checkoutBtn.addEventListener("click", function(){
         let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

   /* const isOpen = checkRestauranOpen()
        if(!isOpen){
        Toastify({
            text: "Ops! O restaurante está fechado",
            duration: 3000,
            close: true,
            gravity: "top", // `top` ou `bottom`
            position: "right", // `left`, `center` ou `right`
            stopOnFocus: true,
            style: {
                background: "#ef4444",
                zIndex: 9999,  // garante que fique acima de outros elementos
            },
        }).showToast();
            return
        }*/
        if(cart.length ===0) 
            return Toastify({
                        text: "Insira itens no carrinho",
                        duration: 3000,
                        close: true,
                        gravity: "top", // `top` ou `bottom`
                        position: "right", // `left`, `center` ou `right`
                        stopOnFocus: true,
                        style: {
                            background: "#ef4444",
                            zIndex: 9999,  // garante que fique acima de outros elementos
                        },
                    }).showToast()

        if(addressInput.value ===""){
            addressWarn.classList.remove("hidden")
            addressInput.classList.add("border-red-500")
            return
        }

        //Enviar pedido para Api whats
        const mensagem = gerarMensagemWhatsapp();
        const message = encodeURIComponent(mensagem);

        const phone = "98970016960"

        window.open(`https://wa.me/${phone}?text=Olá, gostaria de fazer o pedido:\n${message}%0ATaxa de Entrega 5,00%0AVL.Produto:${total.toFixed(2)}%0ATotal:R$${(5+Number(total)).toFixed(2)} `, "_blank")

        cart =[]
        updateCartModal()
    })



function gerarMensagemWhatsapp() {
    

    const itens = cart
        .map(item => 
            `\nQtd:[${item.quantity}]  ${item.name}  Preço: R$ ${item.price.toFixed(2)}`
        )
        .join("");

    const endereco = `Endereço: ${addressInput.value}`;

     return `${itens}\n\n${endereco}`;
}








// verificar a hora e manipular o cart horario
/*function checkRestauranOpen(){
    const data = new Date()
    const hora = data.getHours()
    const diaSemana = data.getDay()
        return hora >= 18 && hora < 23 && diaSemana !== 0
    
}
const spanItem = document.getElementById("date-span")
const isOpen = checkRestauranOpen()
if(isOpen){
    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-green-500")

}else{
    spanItem.classList.add("bg-red-500")
    spanItem.classList.remove("bg-green-500")
}*/