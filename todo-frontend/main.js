const output = document.querySelector(".output");
const input = document.querySelector("input");
const upd_btn = document.querySelector(".update");

const add = async () => {
  const data = {
    title: input.value,
  };
  console.log("The title is ",data.title);
  if(data.title.trim() === "" || isNaN(Number(data.title.trim()))) {
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
            <span>${input.value}</span><button>Del</button><button>Edit</button>
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
        <span>${arr[i].title}</span><button onclick="deleteData('${arr[i]._id}')">Del</button><button onclick="editData('${arr[i].title}', '${arr[i]._id}')">Edit</button>
    </div>`;
  }
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") add();
});

todoApi();
