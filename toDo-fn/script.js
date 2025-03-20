// to do {text, isCompleted, i}

const ul = document.getElementById("ul")
const dispBtn = document.getElementById("display")
const url = "http://localhost:3000";

let txt = document.getElementById("txt")

let btn = document.getElementById("btn");

let i=1;


async function createTxt() {
    const value = txt.value;
    const response = await fetch(`${url}/texts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Autorization": "token123"
        },
        body: JSON.stringify({ txt: value, id: i++, isCompleted: false }),
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



const handleDelete = async (element,li, check) => {
    const response = await fetch(`${url}/texts/${element.id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    console.log(data)
    li.remove()
    check.remove()
}





async function display() {
    const response = await fetch(`${url}/texts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "token123"
        }
    });
    const data = await response.json();
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


dispBtn.addEventListener("click", display)


