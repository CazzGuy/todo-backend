const output = document.querySelector(".output");
const input = document.querySelector("input");
const upd_btn = document.querySelector(".update");

const add = async () => {
  const data = {
    title: input.value,
  };
  console.log("The title is ",data.title);
  if(data.title.trim() === "") {
        alert("Enter a proper name")
        input.value = ""
        return 
    } else {
            const res = await fetch("http://localhost:8001/create", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log(res);
            output.innerHTML = "";
            todoApi();
            input.value = "";
        }
};

const deleteData = async (i) => {
  console.log(i);
  const res = await fetch(`http://localhost:8001/delete/${i}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
    });
    output.innerHTML = "";
    const result = await res.json();
    todoApi();
};

const editData = async (title, id) => {
    console.log(title);
    console.log(id);
    let updatedName =  prompt("Enter new name")
   if(data.title.trim() === "") {
        alert("Enter a proper name")
        input.value = ""
        return 
   } else {
    console.log(updatedName);
    const res = await fetch(`http://localhost:8001/update/${id}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: updatedName,
        }),
    })
    output.innerHTML = "";
    output.innerHTML += `
        <div class="items">
            <span>${input.value}</span>
            <div class=items-btn>
              <button>Del</button><button>Edit</button>
            </div>
        </div>`;
    const result = await res.json();
    todoApi();
   }
}

const todoApi = async () => {
  const res = await fetch("http://localhost:8001/getAll");
  const data = await res.json();
  const arr = data.data;

  for (let i = 0; i < arr.length; i++) {
    output.innerHTML += `
    <div class="items">
        <span>${arr[i].title}</span>
        <div class=items-btn>
          <button class="btn-1" onclick="deleteData('${arr[i]._id}')">
            <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 640 640">
              <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/>
            </svg>
          </button>
          <button class="btn-2" onclick="editData('${arr[i].title}', '${arr[i]._id}')">
            <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 640 640">
              <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z"/>
            </svg>
          </button>
        </div>
    </div>`;
  }
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") add();
});

todoApi();
