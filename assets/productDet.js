import supabase from "../config.js";

let searchParam = window.location.search
console.log(searchParam);
let pId = searchParam.split('?')[1]
console.log(pId);
let pCard = document.getElementById('pcard')


async function ProductRender (){
try{
const { data, error } = await supabase
  .from('productCards')
  .select('*')
  .eq('id',pId)
  .single()
  if(data){
    pCard.innerHTML = `
        <div class="col-md-6">
        <img src='${data.imageUrl}' width='100'>
         
            <h1 class="display-5 fw-bold">${data.name}</h1>
       
            <h3 class="text-primary mb-3">${data.price}</h3>
            <p class="text-muted">${data.price}</p>
            
            <!-- Selection Options -->
            <div class="mb-4">
            <label class="form-label fw-semibold">Select Color:</label>
            ${data.colors.map(color=>{
               return `  
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-dark rounded-circle p-3 b" style="background-color:${color};" ></button>
                   
                </div>`
            }).join('')}
              
            </div>

            <div class="d-flex gap-3 mb-4">
               
                <button class="btn btn-primary px-5 py-2 w-100"><i class="bi bi-cart-plus me-2"></i>Add to Cart</button>
            </div>
            
            <button class="btn btn-outline-danger w-100"><i class="bi bi-heart me-2"></i>Add to Wishlist</button>
        </div>`
    

    
  }
}catch(error){
    console.log(error);
    
}
}

ProductRender()















