<?php
// delete node and relationship with $uid

    require_once('../../../../wp-config.php' );
    // require_once('../../../../wp-load.php');  
	require_once($_SERVER['CONTEXT_DOCUMENT_ROOT'].'/wp-content/familytree-function.php');


    $uid = ($_GET['userid']);
    $table = ($_GET['table']);

del($uid,$table);

//del $uid info and relationship
function del($uid,$table){
	global $wpdb;
	if($table == 'wp_ft_uinfo'){
		$success = family_tree_handler::delete_node($uid);
	}
    $result = $wpdb -> delete( $table, array( 'id' => $uid ), array( '%d' ) );
    echo $result;
}
?>