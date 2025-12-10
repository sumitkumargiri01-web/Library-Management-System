let books = [];

function clearInputs(ids) {
    ids.forEach(id => document.getElementById(id).value = "");
}

function updateTotal() {
    document.getElementById("totalBooks").textContent = books.length;
}

function renderTable() {
    const list = document.getElementById("bookList");
    list.innerHTML = "";

    books.forEach(book => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.totalQty}</td>
            <td>${book.availableQty}</td>
            <td>${book.issuedTo.join(", ")}</td>
        `;

        list.appendChild(row);
    });
}

function addBook() {
    const name = document.getElementById("bookName").value.trim();
    const author = document.getElementById("authorName").value.trim();
    const qty = Number(document.getElementById("bookQty").value);

    if (!name || !author || qty < 1) {
        alert("Enter all book details!");
        return;
    }

    const existing = books.find(b => b.name.toLowerCase() === name.toLowerCase());

    if (existing) {
        existing.totalQty += qty;
        existing.availableQty += qty;
    } else {
        books.push({
            name,
            author,
            totalQty: qty,
            availableQty: qty,
            issuedTo: []
        });
    }

    updateTotal();
    renderTable();

    // Clear inputs
    clearInputs(["bookName", "authorName", "bookQty"]);
}

function issueBook() {
    const person = document.getElementById("issuePerson").value.trim();
    const name = document.getElementById("issueBookName").value.trim();

    if (!person || !name) {
        alert("Enter person and book name!");
        return;
    }

    const book = books.find(b => b.name.toLowerCase() === name.toLowerCase());

    if (!book) return alert("Book not found!");
    if (book.availableQty < 1) return alert("Book not available!");

    book.availableQty -= 1;
    book.issuedTo.push(person);

    renderTable();

    // Clear inputs
    clearInputs(["issuePerson", "issueBookName"]);
}

function returnBook() {
    const person = document.getElementById("returnPerson").value.trim();
    const name = document.getElementById("returnBookName").value.trim();

    if (!person || !name) {
        alert("Enter person and book name!");
        return;
    }

    const book = books.find(b => b.name.toLowerCase() === name.toLowerCase());

    if (!book) return alert("Book not found!");

    const index = book.issuedTo.indexOf(person);
    if (index === -1) return alert("This person didn’t issue this book!");

    book.issuedTo.splice(index, 1);
    book.availableQty += 1;

    renderTable();

    // Clear inputs
    clearInputs(["returnPerson", "returnBookName"]);
}

function searchBook() {
    const filter = document.getElementById("searchBar").value.toLowerCase();
    document.querySelectorAll("#bookList tr").forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(filter) ? "" : "none";
    });
}
