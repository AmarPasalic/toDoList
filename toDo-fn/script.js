
const ul = document.getElementById("ul")
const dispBtn = document.getElementById("display")
const url = "http://localhost:3000";

const txt = document.getElementById("txt")

const btn = document.getElementById("btn");




async function createToDo() {
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

    txt.value = "";
    display();
}



btn.addEventListener("click", createToDo)


const handleChange = async (id, check) => {
    const response = await fetch(`${url}/texts/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: check.checked }),
    });

    const data = await response.json();

}



const handleDelete = async (id) => {
    const response = await fetch(`${url}/texts/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();

    display()
}

async function fetchToDos() {
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



function displayToDos() {
    ul.innerHTML = ""
    const data = fetchToDos()
    data.forEach(element => {
        let li = document.createElement("li")
        li.innerHTML = element.txt
        let check = document.createElement("input")
        check.type = "checkbox"

        ul.appendChild(li)
        ul.appendChild(check)

        check.addEventListener("change", () => handleChange(element.id, check))
        li.addEventListener("click", () => handleDelete(element.id, li, check))

    });
}


document.addEventListener("DOMContentLoaded", displayToDos)


