const tableBody = document.querySelector('.memTable table tbody');

const members = [
    {
        name: "K.M. AL-AMIN",
        roll: "570937",
        group: "A",
        shift: "First"
    },
    {
        name: "Md. Sazid Hasan Siam",
        roll: "570957",
        group: "A",
        shift: "First"
    },
    {
        name: "Mashrafi Bin Didar",
        roll: "548892",
        group: "A",
        shift: "First"
    },
    {
        name: "Rabbi",
        roll: "570933",
        group: "A",
        shift: "First"
    },
    {
        name: "Sohanur Rahman",
        roll: "570951",
        group: "A",
        shift: "First"
    },
    {
        name: "Parvej",
        roll: "570939",
        group: "A",
        shift: "First"
    },
    {
        name: "Alal",
        roll: "570983",
        group: "A",
        shift: "First"
    },
    {
        name: "Likhon",
        roll: "",
        group: "A",
        shift: "First"
    },
    {
        name: "Sharna",
        roll: "",
        group: "A",
        shift: "First"
    },
    {
        name: "Nasrin",
        roll: "",
        group: "A",
        shift: "First"
    },
    {
        name: "Tanisha",
        roll: "",
        group: "A",
        shift: "First"
    },
    {
        name: "Dolon",
        roll: "",
        group: "A",
        shift: "First"
    }
]

let slNo = 1

members.forEach(info => {
    tableBody.insertAdjacentHTML("beforeend",
    `
    <tr>
        <td>${slNo++}</td>
        <td>${info.name}</td>
        <td>${info.roll}</td>
        <td>${info.group}</td>
        <td>${info.shift}</td>
    </tr>
    `
    )
})