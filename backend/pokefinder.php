<?php

	// Retrieve data
	$name = $_GET['name'];

	// MySql server info
	require 'build_dbs/info.php';

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Form query with joined tables
	$sql = "SELECT names.id, names.name, types.type1, types.type2, species.species FROM names
			LEFT JOIN types ON types.id = names.id
			LEFT JOIN species ON species.id = names.id
			WHERE name = '" . $name . "'";

	$result = $conn->query($sql);

	if ($result != FALSE){
		$row = mysqli_fetch_assoc($result);
		echo json_encode($row);
	} else {
	    echo "404";
	};
?>