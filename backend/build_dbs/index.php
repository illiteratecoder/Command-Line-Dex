<?php

	require '../info.php';

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	// Call build files
	require 'php/names_table.php';

	$conn->close();
	
?>