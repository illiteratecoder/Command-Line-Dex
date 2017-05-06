<?php	

	// Create 'names' table if it doesn't exist
	$sql = "CREATE TABLE IF NOT EXISTS types (
		id INT NOT NULL PRIMARY KEY, 
		type1 VARCHAR(20) NOT NULL,
		type2 VARCHAR(20)
	)";

	if ($conn->query($sql) === TRUE) {
	    echo "\nTable types created successfully";
	} else {
	    echo "\nError creating table: " . $conn->error;
	}

	// Prepare statement and bind
	$stmt = $conn->prepare("INSERT INTO types (id, type1, type2) VALUES (?, ?, ?)");
	$stmt->bind_param("iss", $id, $type1, $type2);  // One int (i), two string (s)

	// Set parameters and execute statement
	$json = json_decode(file_get_contents(__DIR__ . "/data/pokemon_types.json"), true);

	for ($i = 0; $i < count($json); $i++){
		$id = $i + 1;
		$type1 = $json[$i][0];
		$type1 = $json[$i][1] | null;
		$stmt->execute();
	}

	echo "\n New entries to table: types, added successfully";

	// Close the statement
	$stmt->close();

?>