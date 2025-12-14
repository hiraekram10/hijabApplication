import supabase from "./config.js";

async function checkRole() {
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
  if (data.role != "admin") {
    alert("access denied");
    return (location.href = "./signup.html");
  }
}

checkRole();
// _____________________________  Product add
let pname = document.getElementById("pname");
let pcategory = document.getElementById("pcategory");
let pprice = document.getElementById("pprice");
let pimage = document.getElementById("pimage");
let pdesc = document.getElementById("pdesc");
let addColor = document.getElementById("addColor");
let colorGroup = document.getElementById("colorGroup");
let pForm = document.getElementById("pForm");

addColor.addEventListener("click", () => {
  let div = document.createElement("div");
  div.className = "color-feild";
  div.innerHTML = `
  <div class = 'row'>
      <div class="col-md-6 mb-3">
                <input type="color" class="colorInput" id="pcolor" name="price">
                </div>
                   <div class="col-md-6 mb-3">
                <button class ='btn btn-primary ' id='removeColor' class = >✕</button>
                   </div>
                </div>
                `;

  colorGroup.appendChild(div);

  div.querySelector("#removeColor").addEventListener("click", () => {
    div.remove();
  });
});

let imgUrl;
async function uploadFile(f) {
  let fileName = `${Date.now()}-${f?.name}`;
  try {
    const { data, error } = await supabase.storage
      .from("products")
      //   f= fileobj
      .upload(fileName, f);
    if (data) {
      const { data: uploadData } = supabase.storage
        .from("products")
        .getPublicUrl(data.path);
      if (uploadData) {
        imgUrl = uploadData.publicUrl;
      } else {
        console.log("error aya ");
      }
    }
  } catch (error) {
    console.log(error);
  }
  return imgUrl;
}

async function addProduct(e) {
  e.preventDefault();
  let pcolor = document.querySelectorAll(".colorInput");
  console.log(pcolor);
  let colorsArr = [];
  pcolor.forEach((inp) => {
    if (inp.value.trim() !== "") {
      colorsArr.push(inp.value);
    }
    console.log(colorsArr);
  });
  let imageadd = await uploadFile(pimage.files[0]);
  try {
    const { error } = await supabase.from("productCards").insert({
      name: pname.value,
      category: pcategory.value,
      price: pprice.value,
      description: pdesc.value,
      colors: colorsArr,
      imageUrl: imageadd,
    });
    if (error) {
      console.log(error);
    } else {
      alert("product added successfully");
    }
  } catch (error) {
    console.log(error);
  }
}
pForm.addEventListener("submit", addProduct);

//  function uploadFile(f) {
//    let fullname = `${f} khan`

//    return fullname
// }

// let returnCheck = uploadFile("hira")
// console.log(returnCheck);
