const output = document.querySelector(".output")


const data = async () => {
    const res = await fetch("http://localhost:8001/getAll")
    const data = await res.json()
    const arr = data.data

    for(let i = 0; i<arr.length; i++){
        output.innerHTML += `<div>${arr[i].title}</div>`
        console.log(arr[i].title);

    }
}

data()