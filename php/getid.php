<?php
include("../../../../wp-config.php");
function wt_get_user_id(){
    global $userdata;
    wp_get_current_user();
    return $userdata->ID;
}

$uid = intval(wt_get_user_id());
// echo $uid;
	include('func.php');
    include('connectdb.php');
    $connection = mysql_select_db($database, $server) or die("Unable to select db");

    $query = "SELECT id
            FROM ft_uinfo
            WHERE wp_id = $uid";
    $result = mysql_query($query) or die(mysql_error());
    $row = mysql_fetch_assoc($result);
    $id = $row['id'];
    // echo $id;

echo json_encode(array("id" => $id));
?>