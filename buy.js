function generateDivsFromJSON() {
    fetch("keyboards.json")
        .then(response => response.json())
        .then(data => {

            const table = document.getElementById("keyboardtable");

            for (let i = 0; i < data.keyboards.length; i++) {
                const item = data.keyboards[i];

                const row = document.createElement("tr");

                // Set the ID of the row to the item name without spaces
                row.id = item.name.replace(/\s/g, "");

                // buy?
                const checkboxCell = document.createElement("td");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkboxCell.appendChild(checkbox);
                row.appendChild(checkboxCell);

                //img+name
                const imageCell = document.createElement("td");
                const image = document.createElement("img");
                image.src = item.image_url;
                imageCell.appendChild(image);
                const name = document.createTextNode(item.name);
                const br = document.createElement("br");
                imageCell.appendChild(br);
                imageCell.appendChild(name);
                row.appendChild(imageCell);

                //price
                const priceCell = document.createElement("td");
                const price = document.createTextNode("$" + item.price.toFixed(2));
                priceCell.appendChild(price);
                row.appendChild(priceCell);

                //quantity
                const quantityCell = document.createElement("td");
                const quantityInput = document.createElement("input");
                quantityInput.type = "number";
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityCell.appendChild(quantityInput);
                row.appendChild(quantityCell);

                table.appendChild(row);
            }
        });
}


function updateReceipt() {

    fetch("keyboards.json")
        .then(response => response.json())
        .then(data => {
            let total = 0;
            // Get a reference to the table element in the HTML
            const table = document.getElementById("itemlisttable");

            // Loop through each item in the JSON data
            for (let i = 0; i < data.keyboards.length; i++) {
                const item = data.keyboards[i];


                const inputrow = document.getElementById(item.name.replace(/\s/g, ""));

                wannabuy = inputrow.children[0].children[0].checked;
                if (wannabuy) {
                    const row = document.createElement("tr");

                    const itemCell = document.createElement("td");
                    const name = document.createTextNode(item.name);
                    itemCell.appendChild(name);
                    row.appendChild(itemCell);


                    const quantity = inputrow.children[3].children[0].value;
                    const quantityCell = document.createElement("td");
                    const quantityNode = document.createTextNode(quantity);
                    quantityCell.appendChild(quantityNode);
                    row.appendChild(quantityCell);

                    const priceCell = document.createElement("td");
                    const pricePerItem = parseFloat(item.price);
                    const price = pricePerItem * quantity;
                    priceCell.appendChild(document.createTextNode(price.toFixed(2)));
                    row.appendChild(priceCell);

                    total += price;
                    console.log(total); // this should output 2
                    table.appendChild(row);
                }
            }
            dateLabel = document.getElementById('total');
            dateLabel.innerHTML = total.toFixed(2);
        });
}

window.onload = function () {
    form = document.getElementById('toBuyform');
    successMessage = document.getElementById('successMessage');

    generateDivsFromJSON();

    //todo: comment out or the following 2  lines
    // form.style.display = 'none'; // hide the form
    //successMessage.style.display = 'block'; // show the success message


    form.addEventListener('submit', function (event) {
        event.preventDefault(); // prevent default form submission

        form.style.display = 'none'; // hide the form

        successMessage.style.display = 'block'; // show the success message

        //update the date
        dateLabel = document.getElementById('purchaseDate');
        dateLabel.innerHTML = new Date().toDateString();

        //show the items that were ordered
        updateReceipt();
    });
};