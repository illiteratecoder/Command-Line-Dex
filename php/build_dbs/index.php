<?php
	require 'info.php';

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	// Call build files
	require 'tables/names_table.php';
	require 'tables/types_table.php';
	require 'tables/species_table.php';

	$conn->close();
	
?>