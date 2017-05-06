<?php
	$dictionary = array(
	    'A'=>array(
	        'Term1'=>'Definition1',
	        'Term2'=>'Definition2',
	    ),
	    'B'=>array(
	        'Term1'=>'Definition1',
	        'Term2'=>'Definition2',
	    )
	);

	$letter = 'A';
	foreach ($dictionary[$letter] as $term => $definition) {
		echo $term . ": " . $definition . "\n";
	};
?>