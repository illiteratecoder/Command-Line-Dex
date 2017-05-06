<?php	

	// Create 'names' table if it doesn't exist
	$sql = "CREATE TABLE IF NOT EXISTS names (
		id INT NOT NULL PRIMARY KEY, 
		name VARCHAR(30) NOT NULL
	)";

	if ($conn->query($sql) === TRUE) {
	    echo "Table names created successfully";
	} else {
	    echo "Error creating table: " . $conn->error;
	}

	// Prepare statement and bind
	$stmt = $conn->prepare("INSERT INTO names (id, name) VALUES (?, ?)");
	$stmt->bind_param("is", $id, $name);  // One int (i), one string (s)

	// Set parameters and execute statement
	$json = json_decode(file_get_contents(__DIR__ . "/data/pokemon_names.json"), true);

	for ($i = 0; $i < count($json); $i++){
		$id = $i + 1;
		$name = $json[$i];
		$stmt->execute();
	}

	echo "New entries added successfully";

	// Close the statement
	$stmt->close();

?>