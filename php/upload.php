<?php
$endpoint = 'http://homestead.app/wp-content/plugins/family-tree/img/';
$target_dir = "../img/";

$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$extension_pos = strrpos($target_file, '.'); // find position of the last dot, so where the extension starts
$thumb = substr($target_file, 0, $extension_pos) . date("Ymd-His"). substr($target_file, $extension_pos);
$url = $endpoint.$thumb;

$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        // echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo json_encode(array(
            'message' => 'File is not an image.',
            'success' => false
        ));
        die();
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    echo json_encode(array(
        'message' => 'Sorry, file already exists.',
        'success' => false
    ));
    die();
    $uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo json_encode(array(
        'message' => 'Sorry, your file is too large.',
        'success' => false
    ));
    die();
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo json_encode(array(
        'message' => 'Sorry, only JPG, JPEG, PNG & GIF files are allowed.',
        'success' => false
    ));
    die();
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo json_encode(array(
        'message' => 'Sorry, your file was not uploaded.',
        'success' => false
    ));
    die();
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $thumb)) {
        // echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
        echo json_encode(array(
            'message' => $url,
            'success' => true
        ));
        die();
    } else {
        echo json_encode(array(
            'message' => 'Sorry, there was an error uploading your file.',
            'success' => true
        ));
        die();
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
