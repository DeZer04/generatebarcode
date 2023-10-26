$(document).ready(function() {
    // Function to populate dropdown options
    function populateDropdown(selectId, apiUrl) {
        const dropdown = document.getElementById(selectId);

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.id;
                    option.text = item.name;
                    dropdown.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching data: ', error));
    }

    // Populate the item dropdown
    populateDropdown('dropdownitem', 'api.php?action=getItems');
    // Populate the buyer dropdown
    populateDropdown('dropdownbuyer', 'api.php?action=getBuyers');
    // Populate the supplier dropdown
    populateDropdown('dropdownorigin', 'api.php?action=getSuppliers');

    // Handle the "Nama Buyer" dropdown change event
    $('#dropdownbuyer').change(function() {
        const selectedBuyerName = $(this).find('option:selected').text();
        populateNomorPODropdown(selectedBuyerName);
    });
    
    // Handle the "Nama Buyer" dropdown change event
    $('#dropdownbuyer').change(function() {
        const selectedBuyerName = $(this).find('option:selected').text();
        populateNomorPODropdown(selectedBuyerName);
    });

    // Function to populate "Nomor PO" dropdown based on selected buyer
    function populateNomorPODropdown(buyerName) {
        const dropdownNomorPO = document.getElementById("dropdownNomorPO");
        dropdownNomorPO.innerHTML = '<option value="">Select Nomor PO</option>';

        fetch('api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=getPoNumbers&buyerName=${buyerName}`,
        })
        .then(response => response.json())
        .then(data => {
            data.forEach(nomorPO => {
                const option = document.createElement('option');
                option.value = nomorPO;
                option.text = nomorPO;
                dropdownNomorPO.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching Nomor PO data: ', error));
    }

    // Handle the "Nama Barang" dropdown change event
    $('#dropdownitem').change(function() {
        updateBarcodeItem(0, $(this).val());
    });

    // Handle the "Nama Buyer" dropdown change event
    $('#dropdownbuyer').change(function() {
        updateBarcodeBS(1, $(this).val());
    });

    // Handle the "Nama Supplier Rangka" dropdown change event
    $('#dropdownorigin').change(function() {
        updateBarcodeBS(2, $(this).val());
    });

    // Handle the "Nomor PO" dropdown change event
    $('#dropdownNomorPO').change(function() {
        updateBarcodePo(3, $(this).val());
    });

    // Function to update the barcode
    function updateBarcodeItem(index, value) {
        const barcodeElement = document.getElementById('barcodeValue');
        let formattedId;
        if (value < 10) {
            formattedId = `000${value}`;
        } else if (value <100){
            formattedId = `00${value}`;
        } else if (value < 1000) {
            formattedId = `0${value}`;
        } else {
            formattedId = value.toString();
        }
        const parts = barcodeElement.textContent.split('.');
        parts[index] = formattedId;
        barcodeElement.textContent = parts.join('.');
    }

    // Function to update the barcode
    function updateBarcodeBS(index, value) {
        const barcodeElement = document.getElementById('barcodeValue');
        let formattedId;
        if (value < 10) {
            formattedId = `0${value}`;
        } else if (value <100){
            formattedId = value.toString();
        }
        const parts = barcodeElement.textContent.split('.');
        parts[index] = formattedId;
        barcodeElement.textContent = parts.join('.');
    }

    // Function to update the barcode
    function updateBarcodePo(index, value) {
        const barcodeElement = document.getElementById('barcodeValue');
        const parts = barcodeElement.textContent.split('.');
        parts[index] = value.toString();
        barcodeElement.textContent = parts.join('.');
    }


});
