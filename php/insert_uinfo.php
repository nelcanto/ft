<?php
    include("../../../../wp-config.php");

    include('connectdb.php'); 
    $connection = mysql_select_db($database, $server) or die("Unable to select db");

    

    if(isset($_GET['wp_id'])){
        $wp_id = intval($_GET['wp_id']);
        $ft_id = insert_uinfo($wp_id);
        insert_self($ft_id);
        echo $ft_id;
    }


function insert_uinfo($wp_id){
 	global $current_user;
  	get_currentuserinfo();

    $email = ("'".$current_user->user_email."'");
    $firstName = ("'".$current_user->user_firstname ."'");
	$lastName = ("'".$current_user->user_lastname ."'");

    $url = '';

    $img = get_avatar( $wp_id); 
    $matches = array();
    preg_match('/src="(.*?)"/i', $img, $matches);
    if($matches[1][0] == '/')
        $url = 'http:';
  	$url = "'".$url.$matches[1]."'";

    // insert new user info
    $query = "INSERT INTO ft_uinfo
            VALUES (NULL,$url,$wp_id,NULL,NULL,1,NULL,NULL,NULL,NULL,$email,$firstName,$lastName,NULL)";
	// var_dump($query);die;
    $result = mysql_query($query) or die(mysql_error()); 
    //get inserted user id
    return (mysql_insert_id());
}
function insert_self($ft_id){
    $query = "INSERT INTO ft_relationship
                VALUES ($ft_id,$ft_id,0)";
    return mysql_query($query) or die(mysql_error()); 
}
?>