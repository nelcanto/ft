<?php
require_once('../../../../wp-config.php' );

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