<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>SSC. Uploaded Images</title>
  <link rel="stylesheet" href="styles.css?<?php echo(time()); ?>">
</head>
<body>
	<ul>
	<?php
	    $thumbs_dir = "upload/thumbs/";
		//$images_dir = "upload/optimum/";
	    //get all image files with a .jpg and .png extension. 
	    $thumbs = glob($thumbs_dir."{*.jpg,*.png}", GLOB_BRACE);
		//$images = glob($dir."{*.jpg,*.png}", GLOB_BRACE);
	    foreach($thumbs as $thumb){
			$filename = basename($thumb);
			//$image_url = 'upload/optimum/'.$filename;
			echo('<li><a href="show-img.php?p='.$filename.'"><img src="'.$thumb.'"></a></li>');			
	    }
	?>
  	</ul>
</body>
</html>