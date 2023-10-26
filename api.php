<?php
include('config.php');

function connectToDatabase() {
    global $databaseConfig;
    $conn = new mysqli($databaseConfig['host'], $databaseConfig['username'], $databaseConfig['password'], $databaseConfig['database']);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}

function closeDatabaseConnection($conn) {
    $conn->close();
}

function getBuyers() {
    $conn = connectToDatabase();
    
    $sql = "SELECT * FROM buyer";
    $result = $conn->query($sql);

    $data = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    closeDatabaseConnection($conn);

    header('Content-Type: application/json');
    echo json_encode($data);
}

function getItems() {
    $conn = connectToDatabase();
    
    $sql = "SELECT * FROM item";
    $result = $conn->query($sql);

    $data = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    closeDatabaseConnection($conn);

    header('Content-Type: application/json');
    echo json_encode($data);
}

function getPoNumbers() {
    $conn = connectToDatabase();
    
    $buyerName = $_POST['buyerName']; // Get the selected buyer name from the AJAX request

    $sql = "SELECT nomor_po FROM buyer WHERE name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $buyerName);
    $stmt->execute();
    $stmt->bind_result($nomorPO);
    $results = array();

    while ($stmt->fetch()) {
        $results[] = $nomorPO;
    }

    $stmt->close();

    closeDatabaseConnection($conn);

    header('Content-Type: application/json');
    echo json_encode($results);
}

function getSuppliers() {
    $conn = connectToDatabase();
    
    $sql = "SELECT * FROM origin";
    $result = $conn->query($sql);

    $data = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    closeDatabaseConnection($conn);

    header('Content-Type: application/json');
    echo json_encode($data);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        $action = $_GET['action'];
        if ($action === 'getBuyers') {
            getBuyers();
        } elseif ($action === 'getItems') {
            getItems();
        } elseif ($action === 'getSuppliers') {
            getSuppliers();
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        $action = $_POST['action'];
        if ($action === 'getPoNumbers') {
            getPoNumbers();
        }
    }
}
?>
