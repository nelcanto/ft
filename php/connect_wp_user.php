<?php
// delete node and relationship with $uid
    // include('func.php');
    include('connectdb.php'); 
    $connection = mysql_select_db($database, $server) or die("Unable to select db");

    $ft_id = intval($_GET['ft_id']);
    $wp_id = intval($_GET['wp_id']);

$is_valid = checkwp($ft_id);
if($is_valid == NULL){
    connect($ft_id,$wp_id);
}
else{
    // die('not null');
    die("ft_id is connected to another wp user, please check your ft_id again.");
}




// echo json_encode($loop);
    // echo json_encode($data, JSON_UNESCAPED_UNICODE );     
      
    mysql_close($server);


    //del $uid info and relationship
    function connect($ft_id,$wp_id){
        
        $query = "UPDATE ft_uinfo
                SET wp_id = $wp_id
                WHERE id = $ft_id";
        $result = mysql_query($query) or die(mysql_error());  
        echo $result;
    }

    function checkwp($ft_id){
        $query = "SELECT wp_id 
                FROM ft_uinfo
                WHERE id = $ft_id";
        $result = mysql_query($query) or die(mysql_error());
        $row = mysql_fetch_assoc($result);
        return $row['wp_id'];
    }
?>