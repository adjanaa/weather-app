const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#msg1");
const message2  = document.querySelector("#msg2");


weatherForm.addEventListener("submit", (e) => {
    const location = search.value;

    message1.textContent = "Loading...";
    message2.textContent = "";
     
    fetch("/weather?adress=" + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            message1.textContent = data.error;
        }else{
            message1.innerHTML = data.forcast;
            message2.innerHTML = data.location;
        }      
    })
})

    e.preventDefault();
})
