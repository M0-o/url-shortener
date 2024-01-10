const input = document.querySelector("#urlString");
const container = document.querySelector('#url-cards-container');

const shorten = async function(){

    if(!input.value){
         alert("input is empty");
        return 
    }

    await fetch(`/add` , {
        method: "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body:JSON.stringify({
            urlString: input.value 
        })
            
    })
    
}



const getAll = async function(){

   let urls = await fetch('/findAll', {
        method: 'GET'
    });
    urls = await urls.json();

    const arr = [...urls];
    console.log(negro);

    let newArr =  arr.map((data) => `<div class="url-card" >
    <span>original url: ${data.originalUrl}</span>
    <span>shortened url: http://localhost:3000/access/${data._id} </span>
    <button onclick="deleteNegro('${data._id}')">X</button>
    </div>`
)

 console.log(newArr);

    
    for(let i of newArr){
        container.innerHTML+=i;
    }

}

async function deleteNegro(id){

    await fetch(`/remove/${id}` , {
        method: 'DELETE',
    } )

    location.reload();

}


  getAll();

