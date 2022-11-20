
const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
let p1 = document.querySelector("#p1")
let p2 = document.querySelector("#p2")

    
weatherForm.addEventListener("submit", (e) =>{
    e.preventDefault()
    let location = search.value

    p1.textContent = "Loading..."
    p2.textContent = ""
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                p1.textContent = data.error
            }else{
                p1.textContent = data.forecast
                p2.textContent = data.address
            }
        })
    })
})
