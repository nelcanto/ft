<?php
// delete node and relationship with $uid

    require_once('../../../../wp-config.php' );
    // require_once('../../../../wp-load.php');  

    $uid = ($_GET['userid']);
    $table = ($_GET['table']);

del($uid,$table);

//del $uid info and relationship
function del($uid,$table){
	global $wpdb;
    $result = $wpdb -> delete( $table, array( 'id' => $uid ), array( '%d' ) );
    echo $result;
}
?>