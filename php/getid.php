<?php
require_once('../../../../wp-config.php' );
// require_once('../../../../wp-load.php');  
/*function wt_get_user_id(){
    global $userdata;
    wp_get_current_user();
    return $userdata->ID;
}
$uid = intval(wt_get_user_id());*/

$uid = get_current_user_id ();
	if($uid != null)
	{
	global $wpdb;

	$query = "SELECT id 
	        FROM wp_ft_uinfo
	        WHERE wp_id = %d";
	$result = $wpdb -> get_row($wpdb->prepare($query,$uid));

	$id = intval($result->id);
	echo json_encode(array("id" => $id,"wp_id" => $uid));
	}
	else 
		echo -1;
?>