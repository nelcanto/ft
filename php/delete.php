<?php
// delete node and relationship with $uid
    include('func.php');
    include('connectdb.php'); 
    $connection = mysql_select_db($database, $server) or die("Unable to select db");

    $uid = ($_GET['userid']);
    // $uid = 12;

del($uid);



// echo json_encode($loop);
    // echo json_encode($data, JSON_UNESCAPED_UNICODE );     
      
    mysql_close($server);
?>