<?php
require_once($_SERVER['CONTEXT_DOCUMENT_ROOT'] . '/wp-config.php');

function wt_get_user_id(){
    global $userdata;
    wp_get_current_user();
    return $userdata->ID;
}
$uid = intval(wt_get_user_id());
global $wpdb;

$query = "SELECT id 
        FROM wp_ft_uinfo
        WHERE wp_id = $uid";
$result = $wpdb -> get_row($wpdb->prepare($query));

$id = intval($result->id);
echo json_encode(array("id" => $id,"wp_id" => $uid));
?>