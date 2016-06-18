<?php
// delete node and relationship with $uid

require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-config.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-load.php');

    $uid = ($_GET['userid']);

del($uid);

//del $uid info and relationship
function del($uid){
    delete( 'wp_ft_uinfo', array( 'id' => $uid ), array( '%d' ) )
    echo $result;
}
?>