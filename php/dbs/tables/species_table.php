<?php	

	// Create 'names' table if it doesn't exist
	$sql = "CREATE TABLE IF NOT EXISTS species (
		id INT NOT NULL PRIMARY KEY, 
		species VARCHAR(40) NOT NULL
	)";

	if ($conn->query($sql) === TRUE) {
	    echo "\nTable species created successfully";
	} else {
	    echo "\nError creating table: " . $conn->error;
	}

	// Prepare statement and bind
	$stmt = $conn->prepare("INSERT INTO species (id, species) VALUES (?, ?)");
	$stmt->bind_param("is", $id, $species);  // One int (i), one string (s)

	// Set parameters and execute statement
	$json = json_decode(file_get_contents(__DIR__ . "/data/pokemon_species.json"), true);

	for ($i = 0; $i < count($json); $i++){
		$id = $i + 1;
		$species = $json[$i];
		$stmt->execute();
	}

	echo "\n New entries to table: species, added successfully";

	// Close the statement
	$stmt->close();

?>