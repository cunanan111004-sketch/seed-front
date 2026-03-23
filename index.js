const content=document.querySelector("#content");
const submit=document.querySelector("#add");
const update=document.querySelector("#update");

//POST API
submit.addEventListener('click',()=>{
    let sname=document.querySelector("#seedname").value;
    let rarity=document.querySelector("#rare").value;
    let stock=document.querySelector("#stck").value;
    let price=document.querySelector("#prc").value;
    let gems=document.querySelector("#gem").value;
    let formData={sname,rarity,stock,price,gems};

    if(!sname || !rarity || !stock || !price || !gems){
      alert("Please fill all required fields!")
      return;
    }
    
    fetch("https://seed-back-3.onrender.com/api/seeds",{
        method:'POST',
        body: JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json",
        },
    }).catch((error)=>{
        console.log(error);
    })
    alert("Seed Added Successfully");
    location.reload();
});


window.addEventListener('load', ()=>{
    getSeeds();
})


function getrarityClass(rarity) {
    if (!rarity) return '';
    return 'rarity-' + rarity.toLowerCase();
}

function getSeeds(){
    let html=""
    //FETCH API
    fetch('https://seed-back-3.onrender.com/api/seeds',{mode:'cors'})
    .then(response=>{
        console.log(response);
        return response.json();
    })
    .then(data=>{
        console.log(data);
        data.forEach(element=>{
            html+=`<li class="employee-item">
                <div class="card-top">
                    <div class="employee-info">
                        <div class="seed-title-row">
                            <span class="seed-name">${element.seed_name}</span>
                            <span class="rarity-badge ${getrarityClass(element.rarity)}">${element.rarity}</span>
                        </div>
                        <div class="stock-label">${element.stock}x in stock</div>
                        <div class="price-row">
                            <span class="price-tag">$${element.price}</span>
                            <span class="gem-tag">${element.gems}</span>
                        </div>
                        
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="updateSeed('${element.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteSeed('${element.id}')">Delete</button>
                </div>
            </li>`
        })
        content.innerHTML=html;
    })
    .catch(error=>{
        console.log(error);
    })
}

// Delete
function deleteSeed(id){
    if(confirm("Are you sure you want to delete this Seed?")){
        fetch(`https://seed-back-3.onrender.com/api/seeds/`,{
            method:'DELETE',
            body: JSON.stringify({id}),
            headers:{
                "Content-Type":"application/json",
            },
        }).then(response=> response.text())
        .then(response=> console.log(response))
        .catch(error=>{
            console.log(error);
        });
        alert("Seed Deleted Successfully");
        location.reload();
    }
}

//Update
function updateSeed(id){
    fetch(`https://seed-back-3.onrender.com/api/seeds/${id}`,)
    .then(response=> response.json())
    .then(data=>{
        document.querySelector("#seedname").value=data[0].seed_name;
        document.querySelector("#rare").value=data[0].rarity;
        document.querySelector("#stck").value=data[0].stock;
        document.querySelector("#prc").value=data[0].price;
        document.querySelector("#gem").value=data[0].gems;
        document.querySelector("#ID").value=data[0].id;
    }).catch(error=>{
        console.log(error);
    });
}
//PUT API
update.addEventListener('click',()=>{
    let sname=document.querySelector("#seedname").value;
    let rarity=document.querySelector("#rare").value;
    let stock=document.querySelector("#stck").value;
    let price=document.querySelector("#prc").value;
    let gems=document.querySelector("#gem").value;
    let id=document.querySelector("#ID").value;
    let formData={sname,rarity,stock,price,gems,id};

    fetch(`https://seed-back-3.onrender.com/api/seeds/`,{
        method:'PUT',
        body: JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json",
        },
    }).catch(error=>{
        console.log(error);
    });
    alert("Seed Updated Successfully");
    location.reload();
})
