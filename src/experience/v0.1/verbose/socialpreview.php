
<!--**************************************************************************************************************************************
* 
* EQUATIONS WORK CONFIDENTIAL
* __________________
* 
*  [2018] - [2020] Equations Work IT Services Private Limited, India
*  All Rights Reserved.
* 
* NOTICE:  All information contained herein is, and remains
* the property of Equations Work IT Services Private Limited and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Equations Work IT Services Private Limited
* and may be covered by U.S. and Foreign Patents,
* patents in process, and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Equations Work IT Services Private Limited.
*
* Copyright (C) Equations Work IT Services Pvt. Ltd.
* NOTE: Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Owned and written by the proprietors of Equations Work IT Private Limited, India, August 2018
-->
<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
$actual_link = "http:/$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]id";
// $actual_link = "https://alpha-dev.experizer.com/exp/act/v0.1/quiz/?1446--0--0--0/TR";
$result =  explode("?",$actual_link);
$id =  explode("--",$result[1]);
$idVar=$id[0];
$ExperienceName='';
$Description='';
$ThumbnailPath='';

//print_r($result['6']);
// $result= file_get_contents("https://betaapi.experizer.com:444/experience/getExperienceDataOfOpenExperience/$idVar");
$result= file_get_contents("https://alpha-dev.experizer.com/api/experience/getExperienceDataOfOpenExperience/$idVar");
// $result= file_get_contents("http://localhost:3000/experience/getExperienceDataOfOpenExperience/$idVar");

     $decode_data = json_decode($result);
    foreach($decode_data as $key=>$value){
		//print_r($value[0]);
        $ExperienceName=$value[0]->ExperienceName;
$desc=$value[0]->ExperienceJSON;
$encode = json_decode($desc);
$plaintext = $encode->launch_text;
$Description = strip_tags($plaintext);
$ThumbnailPath=$value[0]->ThumbnailPath;
      
    }
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Experizer Experience</title>
  
		
    <meta name="description" content="<?php echo $Description; ?>" />
	<meta name="keywords" content="" />
	<meta name="author" content="<?php echo $ExperienceName; ?>" />
	<meta name="copyright" content="studio.experizer.com" />
	<meta name="application-name" content="Experizer" />

	<!-- For Facebook -->
	<meta property="og:title" content="<?php echo $ExperienceName; ?>" />
	<meta property="og:type" content="article" />
	<meta property="og:image" content="<?php echo $ThumbnailPath; ?>" />
	<meta property="og:url" content="studio.experizer.com" />
	<meta property="og:description" content="I<?php echo $Description; ?>" />

	<!-- For Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="<?php echo $ExperienceName; ?>" />
	<meta name="twitter:description" content="<?php echo $Description; ?>" />
	<meta name="twitter:image" content="<?php echo $ThumbnailPath; ?>" />

