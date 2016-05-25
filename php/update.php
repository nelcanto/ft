<?php
// update user meta info with json {"id":1, "gender": "1", "status": "1", "birth": "1999-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"萧", "lastName":"王", "children":[4,5,6],"father":2,"mother":3, "spouse": 7, "image":"imgUrlMen"}
    include('func.php');
    include('connectdb.php'); 
    $connection = mysql_select_db($database, $server) or die("Unable to select db");


$info = ($_POST);

    // var_dump($info);

    // $json = ($_POST['info']);
    // $json = '{"id":13, "gender": "1", "status": "1", "birth": "1999-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"萧", "lastName":"王", "children":[4,5,6],"father":2,"mother":3, "spouse": 7, "image":"imgUrlMen"}';


// $info = json_decode($json);
// echo $info->{'firstName'};

// $info = ($_POST);

if(!empty($info)  ) upd($info);



// echo json_encode($loop);
    // echo json_encode($data, JSON_UNESCAPED_UNICODE );     
      
    mysql_close($server);
?>