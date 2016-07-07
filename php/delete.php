<?php
// delete node and relationship with $uid

    require_once('../../../../wp-config.php' );
    // require_once('../../../../wp-load.php');  

    $uid = ($_GET['userid']);

del($uid);

//del $uid info and relationship
function del($uid){
	global $wpdb;
    $result = $wpdb -> delete( 'wp_ft_uinfo', array( 'id' => $uid ), array( '%d' ) );
    echo $result;
}
?>