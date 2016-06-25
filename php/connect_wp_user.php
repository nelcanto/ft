<?php
    // include('func.php');
    // include('connectdb.php'); 
    // $connection = mysql_select_db($database, $server) or die("Unable to select db");
    require_once('../../../../wp-config.php' );
    // require_once('../../../../wp-load.php');  

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
      
    // mysql_close($server);


    //del $uid info and relationship
    function connect($ft_id,$wp_id){
        global $wpdb;
        
/*        $query = "UPDATE ft_uinfo
                SET wp_id = $wp_id
                WHERE id = $ft_id";*/
        $result = $wpdb -> update('wp_ft_uinfo',array('wp_id'=>$wp_id),array('id'=>$ft_id));
        // $result = mysql_query($query) or die(mysql_error());  
        echo $result;
    }

    function checkwp($ft_id){
        global $wpdb;

        $query = "SELECT wp_id 
                FROM wp_ft_uinfo
                WHERE id = $ft_id";
/*        $result = mysql_query($query) or die(mysql_error());
        $row = mysql_fetch_assoc($result);
        return $row['wp_id'];*/
        $result = $wpdb -> get_results($wpdb->$query);
        foreach($result as $r){
            // $row = mysql_fetch_assoc($result);
            return intval($r->id);
        }
    }
?>