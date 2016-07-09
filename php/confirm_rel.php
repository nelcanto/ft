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

        $wp_id = get_current_user_id();
        $result = $wpdb -> insert('wp_bp_groups_members', array('group_id' => 1, 'user_id' => $wp_id, 'inviter_id' => 1, 'is_confirmed' => 1, 'invite_sent' => 1));

        $result = $wpdb -> get_row($wpdb->prepare('SELECT meta_value FROM wp_bp_groups_groupmeta WHERE meta_key=%s','total_member_count'));
        $count = intval($result->meta_value) + 1;

        $result = $wpdb -> update('wp_bp_groups_groupmeta',array('total_member_count'=>$count),array('id'=>1));

        echo $result;
    }

?>