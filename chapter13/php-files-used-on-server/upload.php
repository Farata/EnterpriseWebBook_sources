<?php

// function to resize and save uploaded image
// $new_width - width of resized image
// $new_height – height of resized image
// $input - path to original image 
// $ioutput - path to the dir to save new image 
// $quality – jpg quality of new image
// We'll use php's GD Graphics Library functions imagecreatefromjpeg(), imagecreatetruecolor(), imagecopyresampled()
function resizeAndSave ($new_width, $new_height, $input, $output, $quality) {
	
	// Get new dimensions 
	list($width_orig, $height_orig) = getimagesize($input);
	$ratio_orig = $width_orig/$height_orig;

	if ($new_width/$new_height > $ratio_orig) {
	   $new_width = $new_height*$ratio_orig;
	} else {
	   $new_height = $new_width/$ratio_orig;
	}
	
	$original_image = imagecreatefromjpeg($input);
	// Resample
	$image = imagecreatetruecolor($new_width, $new_height);	
	imagecopyresampled($image, $original_image, 0, 0, 0, 0, $new_width, $new_height, $width_orig, $height_orig);
	// Output
	imagejpeg($image, $output, $quality);
	imagedestroy($image);
	
}

// Get the unique image name 
$timestamp = time();
//time() return the current time as Unix timestamp
$image_name = $timestamp.'.jpg';
// now we have something like 1389106239.jpg
$path_to_original = 'upload/original/'.$image_name;
// $path_to_original – directory where original file will be saved 

if(move_uploaded_file($_FILES["file"]["tmp_name"], $path_to_original)) {
//move_uploaded_file() function moves an uploaded file to a new location
// $_FILES["file"]["tmp_name"] – we are using the global PHP $_FILES array

// run the resizeAndSave function

//creat thumbnails and save thем into upload/thumbs/ dir
	$thumb_width = 200;
	$thumb_height = 200;
	$thumb_output = 'upload/thumbs/'.$image_name;

//creat optimized copy of original image and save it into upload/optimum/ 
	$optimum_width = 800;
	$optimum_height = 800;;
	$optimum_output = 'upload/optimum/'.$image_name;
	
	$quality = 90;
	
	resizeAndSave ($thumb_width, $thumb_height, $path_to_original, $thumb_output, $quality);
	resizeAndSave ($optimum_width, $optimum_height, $path_to_original, $optimum_output, $quality);
	
}

?> 
 