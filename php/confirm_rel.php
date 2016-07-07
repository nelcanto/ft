<?php
    // include('func.php');
    /*include('connectdb.php'); 
    $connection = mysql_select_db($database, $server) or die("Unable to select db");*/

    require_once('../../../../wp-config.php' );
    // require_once('../../../../wp-load.php');  

    $id = intval($_GET['id']);
    $confirm = intval($_GET['confirm']);

con_rel($id,$confirm);



// echo json_encode($loop);
    // echo json_encode($data, JSON_UNESCAPED_UNICODE );     
      
    // mysql_close($server);


    function con_rel($id,$confirm){
        global $wpdb;
        /*
        $query = "UPDATE ft_relationship
                SET is_confirmed = $confirm
                WHERE $id = id";
        $result = mysql_query($query) or die(mysql_error());  
*/
        $result = $wpdb -> update('wp_ft_relationship',array('is_confirmed'=>$confirm),array('id'=>$id));

        echo $result;
    }
?>