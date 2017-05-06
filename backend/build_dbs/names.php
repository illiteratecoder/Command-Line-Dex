<?php

	// Retrieve data
	$name = $_GET['name'];

	// MySql server info
	require 'info.php';

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Form query
	$sql = "SELECT id, name FROM names WHERE name = '" . $name . "'";

	$result = $conn->query($sql);

	if ($result != FALSE){
		$row = mysqli_fetch_assoc($result);
		echo json_encode($row);
	} else {
	    echo "Error: " . $conn->error;
	};
?>