<?php
    require_once('../../../../wp-config.php' );
    // require_once('../../../../wp-load.php');  
    require_once($_SERVER['CONTEXT_DOCUMENT_ROOT'].'/wp-content/familytree-function.php');


    

    if(isset($_GET['wp_id'])){
        $wp_id = intval($_GET['wp_id']);
        $ft_id = insert_uinfo($wp_id);
        insert_self($ft_id);
        echo $ft_id;
    }


function insert_uinfo($wp_id){
 	global $current_user,$wpdb;
  	get_currentuserinfo();

    $email = ($current_user->user_email);
    $firstName = ($current_user->user_firstname );
	$lastName = ($current_user->user_lastname );

    $url = '';

    $img = get_avatar( $wp_id); 
    $matches = array();
    preg_match('/src="(.*?)"/i', $img, $matches);
    if($matches[1][0] == '/')
        $url = 'http:';
  	$url = $url.$matches[1];

    // insert new user info
    $result = $wpdb -> insert( 'wp_ft_uinfo', array( 'image' => $url, 'wp_id' => $wp_id, 'status' => 1, 'email' => $email, 'firstName' => $firstName, 'lastName' => $lastName ) );

 //    $query = "INSERT INTO ft_uinfo
 //            VALUES (NULL,$url,$wp_id,NULL,NULL,1,NULL,NULL,NULL,NULL,$email,$firstName,$lastName,NULL)";
	// // var_dump($query);die;
    // $result = mysql_query($query) or die(mysql_error()); 
    //get inserted user id
    return $wpdb->insert_id;
}
function insert_self($ft_id){
    global $wpdb;
    // $query = "INSERT INTO ft_relationship
    //             VALUES ($ft_id,$ft_id,0)";
    // return mysql_query($query) or die(mysql_error()); 
    $result = $wpdb -> insert( 'wp_ft_relationship', array( 'pid' => $ft_id, 'cid' => $ft_id, 'rid' => 0, 'is_confirmed' => 1, 'creator_id' => $ft_id) );

    $insert_gender = 'male';
    family_tree_handler::insert(null, $ft_id, $insert_gender,'add_self');
    return $result;
}
?>