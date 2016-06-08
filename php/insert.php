<?php
// insert user(node) and relationship from received json
    include('func.php');
    include('connectdb.php');
    $connection = mysql_select_db($database, $server) or die("Unable to select db");
    // $json = ($_GET['info']);
    // $json = '{"id":null, "gender": 1, "status": 1, "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"没", "lastName": "王", "children":[],"father":8,"mother":9, "spouse":8, "image":"imgUrlChild"}';


// $info = json_decode($json);


$info = ($_POST);
// die;

if(!empty($info)  ) insert($info);



// echo json_encode($loop);
    // echo json_encode($data, JSON_UNESCAPED_UNICODE );

    mysql_close($server);
?>