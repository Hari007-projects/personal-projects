<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $email = $_POST["email"];
    $companyName = $_POST["companyname"];
    $location = $_POST["location"];

    // Database connection settings
    $servername = "localhost";  // Change this to your MySQL server address
    $username = "root"; // Change this to your MySQL username
    $password = ""; // Change this to your MySQL password
    $dbname = "datastore";      // Change this to your database name

    // Create a connection to the database
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Insert data into the database
    $sql = "INSERT INTO forminfo (email, companyName , location) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $email, $companyName, $location);

    // Error handling for prepare
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    if ($stmt->execute()) {
        // Commit the transaction
        $conn->commit();
        echo "Data inserted successfully!";
    } else {
        // Rollback the transaction on error
        $conn->rollback();
        echo "Error: " . $stmt->error;
    }
    // Close the database connection
    $stmt->close();
    $conn->close();
}
?>
