const API = "http://localhost:5000";


// ======================
// CREATE WALLET
// ======================

async function createWallet() {

    const name = document.getElementById("name").value;

    const amount = document.getElementById("amount").value;

    if(name === "" || amount === ""){

        alert("Please fill all fields");

        return;
    }

    const response = await fetch(`${API}/create`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            name: name,
            balance: amount

        })

    });

    const data = await response.json();

    document.getElementById("message").innerText =
        data.message;

    getUsers();

}


// ======================
// SHOW USERS
// ======================

async function getUsers() {

    const response = await fetch(`${API}/users`);

    const users = await response.json();

    displayUsers(users);

}


// ======================
// DISPLAY USERS
// ======================

function displayUsers(users) {

    let output = "";

    users.forEach((user) => {

        output += `

        <div class="user-card">

            <h3>${user.name}</h3>

            <p><strong>Balance:</strong> ₹${user.balance}</p>

            <p><strong>Transactions:</strong></p>

            <ul>
                ${user.transactions.map(
                    (t) => `<li>${t}</li>`
                ).join("")}
            </ul>

            <div class="card-buttons">

                <button class="update-btn"
                    onclick="updateUser('${user._id}')">

                    Update

                </button>

                <button class="delete-btn"
                    onclick="deleteUser('${user._id}')">

                    Delete

                </button>

            </div>

        </div>

        `;
    });

    document.getElementById("users").innerHTML = output;

}


// ======================
// SEARCH USER
// ======================

async function searchUser() {

    const search = document.getElementById("search").value;

    const response = await fetch(
        `${API}/search/${search}`
    );

    const users = await response.json();

    displayUsers(users);

}


// ======================
// UPDATE USER
// ======================

async function updateUser(id) {

    const newAmount = prompt(
        "Enter New Balance"
    );

    if(newAmount === null || newAmount === ""){

        return;
    }

    const response = await fetch(
        `${API}/update/${id}`,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                balance: newAmount

            })

        }
    );

    const data = await response.json();

    alert(data.message);

    getUsers();

}


// ======================
// DELETE USER
// ======================

async function deleteUser(id) {

    const confirmDelete = confirm(
        "Are you sure?"
    );

    if(!confirmDelete){

        return;
    }

    const response = await fetch(
        `${API}/delete/${id}`,
        {

            method: "DELETE"

        }
    );

    const data = await response.json();

    alert(data.message);

    getUsers();

}


// ======================
// AUTO LOAD USERS
// ======================

// getUsers();