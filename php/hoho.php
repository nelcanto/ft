<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-config.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-load.php');

// function is_in_wp($email){
//   global $wpdb;

/*get result*/
//         $query = "SELECT *
//                 FROM wp_ft_uinfo;";
//         $result = $wpdb -> get_results($wpdb->prepare($query));
//         foreach($result as $r){
//             return intval($r->id);
//         }

//     }
// echo is_in_wp('"aa"');


/*update*/
// $result = $wpdb -> update('wp_ft_relationship',array('is_confirmed'=>$confirm),array('id'=>$id));


/*get_row*/
// $query = "SELECT id 
//             FROM wp_ft_uinfo
//             WHERE wp_id = $uid";
// $result = $wpdb -> get_row($wpdb->prepare($query));
// $id = intval($result->id);

/*insert*/
/*$result = $wpdb -> insert( 'table', array( 'column' => 'foo', 'field' => 1337 ), array( '%s', '%d' ) );*/

// echo site_url();
global $wpdb;
$uid = 111;
$creator_id = 111;
$result = $wpdb -> insert( 'wp_ft_relationship', array( 'pid' => $uid, 'cid' => $uid, 'rid' => 0, 'is_confirmed' => 1, 'creator_id' => $creator_id ));
var_dump($result);

?>
