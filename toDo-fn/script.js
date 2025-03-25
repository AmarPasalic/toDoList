// to do {text, isCompleted, i}
const ul = document.getElementById("ul")
const dispBtn = document.getElementById("display")
const url = "http://localhost:3000";

const txt = document.getElementById("txt")

const btn = document.getElementById("btn");




async function createTxt() {
    const value = txt.value;
    const response = await fetch(`${url}/texts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Autorization": "token123"
        },
        body: JSON.stringify({ txt: value, id, isCompleted: false }),
    });
    const data = await response.json();
    console.log(data);
    txt.value = "";
    display();
}



btn.addEventListener("click", createTxt)


const handleChange = async (element, check) => {
    const response = await fetch(`${url}/texts/${element.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: check.checked }),
    });

    const data = await response.json();
    console.log(data);
}



const handleDelete = async (element) => {
    const response = await fetch(`${url}/texts/${element.id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    console.log(data)
    display()
}

async function fetch(){
    const response = await fetch(`${url}/texts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "token123"
        }
    });
    const data = await response.json();
    return data
}



function display() {
    ul.innerHTML = ""
const data= fetch()
    data.forEach(element => {
        let li = document.createElement("li")
        li.innerHTML = element.txt
        let check = document.createElement("input")
        check.type = "checkbox"

        ul.appendChild(li)
        ul.appendChild(check)

        check.addEventListener("change", ()=> handleChange(element, check))
        li.addEventListener("click",()=> handleDelete(element,li, check))

    });
}


document.addEventListener("DOMContentLoaded", display)


