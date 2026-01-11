import supabase from "../config.js";
import { checkRole } from "../dashbord.js";
let productList = document.getElementById('products')
let classBtn = document.querySelectorAll('.btn-hidden')


async function btnDisplay() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    location.href = "./login.html";
    return;
  }

  //   check role (fetch db)
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("uid", user.id)
    .single();
    console.log(data.role);

    if(data.role == 'admin'){
    Array.from(classBtn).forEach((btn)=>{
btn.style.display = 'flex'
    })
      
    }else{
           Array.from(classBtn).forEach((btn)=>{
btn.style.display = 'none'
    })
    }
    
  

}

btnDisplay()




async function renderProducts(params) {
    try {
        const { data, error } = await supabase
  .from('productCards')
  .select('*')
  if(data){
    console.log(data);
    data.forEach(product => {
        productList.innerHTML += `<div class="card col-md-6" style="width: 18rem;" >
  <img src="${product.imageUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${product.name}</h5>
    <p class="card-text">${product.description}</p>
    <div class="colors">
    ${product.colors.map(color => {
        console.log(color);
     return `<div style="background-color:${color}; height:20px; width:20px" ></div>`
    }).join('')}

  </div>
    <button  class="btn btn-primary" onclick="window.location.href='pDetail.html?id=${product.id}'">view Details</button>

     <button  class="btn btn-primary btn-hidden" onclick="window.location.href='pDetail.html?id=${product.id}'" style="display:none">Edit</button>
      <button  class="btn btn-primary btn-hidden"  onclick="window.location.href='pDetail.html?id=${product.id}'" style="display:none">Delte</button>
       
  </div>
</div>`
    });
    
  }
    } catch (error) {
        console.log(error);
        
    }
}

renderProducts()