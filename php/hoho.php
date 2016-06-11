<?php
/*$json = '{"id":1, "gender": "1", "status": "1", "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"萧", "lastName":"王", "children":[4,5,6],"father":2,"mother":3, "spouse": 7, "image":"imgUrlMen"}';


$info = json_decode($json);

$abc = $info->{'birth'} == null?'null':$info->{'birth'};
$abc = explode('-', $abc);
$abc = implode('', $abc);
echo $abc;*/

// $json = '{"foo-bar": 12345}';

// $obj = json_decode($json);
// print $obj->{'foo-bar'};




// phpinfo();




include("../../../../wp-config.php");
 global $current_user;
      get_currentuserinfo();

      echo 'Username: ' . $current_user->user_login . "\n";
      echo 'User email: ' . $current_user->user_email . "\n";
      echo 'User level: ' . $current_user->user_level . "\n";
      echo 'User first name: ' . $current_user->user_firstname . "\n";
      echo 'User last name: ' . $current_user->user_lastname . "\n";
      echo 'User display name: ' . $current_user->display_name . "\n";
      echo 'User ID: ' . $current_user->ID . "\n";

      $user_id = 35;
      $img = get_avatar( $user_id); 
      $matches = array();
      preg_match('/src="(.*?)"/i', $img, $matches);
    $url = $matches[1];
    echo $url;
    echo $img;

?>
<!-- <!DOCTYPE html>
<html>
<body>

<form action="upload.php" method="post" enctype="multipart/form-data">
    Select image to upload:
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload Image" name="submit">
</form>

</body>
</html> -->