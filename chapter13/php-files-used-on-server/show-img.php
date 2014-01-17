<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>SSC. Uploaded Images</title>
  <link rel="stylesheet" href="styles.css?<?php echo(time()); ?>">
</head>
<body>
	<div id="wrapper"><?php $img=$_GET["p"]; echo('<img src="upload/optimum/'.$img.'">'); ?></div>
</body>
</html>