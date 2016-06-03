<?php
$endpoint = 'http://wp.com/wp-content/plugins/family-tree/img/';
$url = $endpoint.basename($_FILES["fileToUpload"]["name"]);
$target_dir = "../img/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        // echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        // echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
        echo $url;
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}

// include('func.php');
// include('connectdb.php'); 
// $connection = mysql_select_db($database, $server) or die("Unable to select db");
// $uid =intval($_GET['uid']);
// if(!empty($uid)  ) {

//     $uid = $uid['uid'];
//     $query = "UPDATE ft_uinfo
//             SET image = $url
//             WHERE id = $uid";

// // var_dump( $query);
// // die;
//     $result = mysql_query($query) or die(mysql_error());  
//     echo $result;
// }
// mysql_close($server);

?>
