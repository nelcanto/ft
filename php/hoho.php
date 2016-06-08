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





echo date("Ymd-His");
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