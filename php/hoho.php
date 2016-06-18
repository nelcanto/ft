<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-config.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-load.php');

function is_in_wp($email){
  global $wpdb;
        $query = "SELECT *
                FROM wp_ft_uinfo;";


        $result = $wpdb -> get_results($wpdb->prepare($query));
        foreach($result as $r){
            // $row = mysql_fetch_assoc($result);
            return intval($r->id);
        }

    }
echo is_in_wp('"aa"');


/*update*/
$result = $wpdb -> update('wp_ft_relationship',array('is_confirmed'=>$confirm),array('id'=>$id));


/**/
$query = "SELECT id 
            FROM wp_ft_uinfo
            WHERE wp_id = $uid";
$result = $wpdb -> get_row($wpdb->prepare($query));
$id = intval($result->id);


?>
