<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
 // Set this header last

 include 'connection.php';
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Prepare and execute the SQL query
        $stmt = $conn->prepare("SELECT barangay_id, barangay_name FROM address_barangay");

       $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($results);
    } catch (PDOException $e) {
        die("Error: " . $e->getMessage());
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
