<?php
require_once('../../../../wp-config.php' );

$info = ($_POST);
if(!empty($info)  ) insert($info,wp_get_current_user());



function insert($info,$currentuser){
    global $wpdb;

    $children = [];
    if(isset($info['children']))   $children = $info['children'];
    $father = $info['father'];
    $mother = $info['mother'];
    $spouse = $info['spouse'];
    
    // $gender = $info->{'gender'} == null?'NULL':$info->{'gender'};
    // $status = $info->{'status'} == null?'NULL':$info->{'status'};
    // $birth = $info->{'birth'} == null?'NULL':$info->{'birth'};
    // $birth = explode('-', $birth);
    // $birth = implode('', $birth);
    // $birthPlace = $info->{'birthPlace'} == null?'NULL':("'".$info->{'birthPlace'}."'");
    // $death = $info->{'death'} == null?'NULL':$info->{'death'};
    // $death = explode('-', $death);
    // $death = implode('', $death);
    // $dealthPlace = $info->{'dealthPlace'} == null?'NULL':("'".$info->{'dealthPlace'}."'");
    // $email = $info->{'email'} == null?'NULL':("'".$info->{'email'}."'");
    // $firstName = $info->{'firstName'} == null?'NULL':("'".$info->{'firstName'}."'");
    // $lastName = $info->{'lastName'} == null?'NULL':("'".$info->{'lastName'}."'");
    // $image = $info->{'image'} == null?'NULL':("'".$info->{'image'}."'");
    $gender = $info['gender'];
    $status = $info['status'];
    $birth = $info['birth'];
    $birth = explode('-', $birth);
    $birth = implode('', $birth);
    $birthPlace = $info['birthPlace'];
    $death = $info['death'];
    $death = explode('-', $death);
    $death = implode('', $death);
    if(isset($info['dealthPlace']))
        $dealthPlace = ($info['dealthPlace']);
    else
         $dealthPlace = NULL;
    $email = $info['email'];
    $firstName = $info['firstName'];
    $lastName = $info['lastName'];

    $image = $info['image'];
    if($image == null)  $image = "http://thumbs.dreamstime.com/m/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg";
    if ($image == null && $gender ==2) {
        $image = "http://thumbs.dreamstime.com/m/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-illustration-58249368.jpg";
    }


    

    $wp_id = is_in_wp($email);
    $uid = is_in_ft($email);



    //check in ft_uinfo
    if($uid == 0){
        //insert node has wp account

        // insert new user info
        if($wp_id > 0)
            $result = $wpdb -> insert('wp_ft_uinfo', array('image' => $image, 'wp_id' => $wp_id, 'status' => $status, 'birth' => $birth, 'birthPlace' => $birthPlace, 'death' => $death, 'dealthPlace' => $dealthPlace, 'email' => $email, 'firstName' => $firstName, 'lastName' => $lastName, 'gender' => $gender));
        else
            $result = $wpdb -> insert('wp_ft_uinfo', array('image' => $image, 'status' => $status, 'birth' => $birth, 'birthPlace' => $birthPlace, 'death' => $death, 'dealthPlace' => $dealthPlace, 'email' => $email, 'firstName' => $firstName, 'lastName' => $lastName, 'gender' => $gender));

        $iid = $wpdb->insert_id;

        //no ft node, insert node and send notification
        $uid = $iid;

        //insert self node
        $result = $wpdb -> insert( 'wp_ft_relationship', array( 'pid' => $uid, 'cid' => $uid, 'rid' => 0, 'is_confirmed' => 1, 'creator_id' => $currentuser->ID ));

    }
    else{
        //has ft node, combine two ft: add relationship only, do not need to insert node
    }

    //no wp acct, send invitation email
    if($wp_id == 0) {
        $msg = $currentuser->display_name.'('.$currentuser->user_email.') invites you to CQG. Please register with this email at http://wp.com/wp-login.php';
        wp_mail($email,'CQG family tree invitation',$msg);
    }
    
    $pid = -1;
    $cid = -1;
    $rid = -1;
    //insert relationships
    if($children != NULL){
        $pid = $uid;
        if($gender == 2)
            $rid = 2;
        else 
            $rid = 1;
        foreach ($children as $child) {
            $cid = $child;
$result = $wpdb -> insert( 'wp_ft_relationship', array( 'pid' => $pid, 'cid' => $cid, 'rid' => $rid, 'is_confirmed' => 0, 'creator_id' => $currentuser->ID ));
$iid = $wpdb->insert_id;


            if($wp_id > 0){
                //Send confirmation, set is_confirmed to 0 pending
                //send notification to confirm, and set is_confirmed to 0
                do_action('ft_confirm',$wp_id,$iid);
                // $is_confirmed=0;
            // $result = $wpdb -> update('wp_ft_relationship',array('is_confirmed'=>$is_confirmed),array('id'=>$iid));
            }
            else{
                //wp_id==0,no wp account, set is_confirmed to 1 convirmed
                // $is_confirmed=1;
            }
        }
    }

    if($father != NULL){
        $pid = $father;
        $cid = $uid;
        $rid = 1;
$result = $wpdb -> insert( 'wp_ft_relationship', array( 'pid' => $pid, 'cid' => $cid, 'rid' => $rid, 'is_confirmed' => 0, 'creator_id' => $currentuser->ID ));
$iid = $wpdb->insert_id;


            if($wp_id > 0){
                //Send confirmation, set is_confirmed to 0 pending
                do_action('ft_confirm',$wp_id,$iid);
                // $is_confirmed=0;
            // $result = $wpdb -> update('wp_ft_relationship',array('is_confirmed'=>$is_confirmed),array('id'=>$iid));    
            }
            else{
                //wp_id==0,no wp account, set is_confirmed to 1 convirmed
                // $is_confirmed=1;
            }
    }
    
    if($mother != NULL){
        $pid = $mother;
        $cid = $uid;
        $rid = 2;
$result = $wpdb -> insert( 'wp_ft_relationship', array( 'pid' => $pid, 'cid' => $cid, 'rid' => $rid, 'is_confirmed' => 0, 'creator_id' => $currentuser->ID ));
$iid = $wpdb->insert_id;


            if($wp_id > 0){
                //Send confirmation, set is_confirmed to 0 pending
                do_action('ft_confirm',$wp_id,$iid);
                // $is_confirmed=0;
            // $result = $wpdb -> update('wp_ft_relationship',array('is_confirmed'=>$is_confirmed),array('id'=>$iid));
            }
            else{
                //wp_id==0,no wp account, set is_confirmed to 1 convirmed
                // $is_confirmed=1;
            }
    }
    
    if($spouse != NULL){
        $pid = $spouse;
        $cid = $uid;
        $rid = 3;
$result = $wpdb -> insert( 'wp_ft_relationship', array( 'pid' => $pid, 'cid' => $cid, 'rid' => $rid, 'is_confirmed' => 0, 'creator_id' => $currentuser->ID ));
$iid = $wpdb->insert_id;


            if($wp_id > 0){
                //Send confirmation, set is_confirmed to 0 pending
                do_action('ft_confirm',$wp_id,$iid);
                // $is_confirmed=0;
            // $result = $wpdb -> update('wp_ft_relationship',array('is_confirmed'=>$is_confirmed),array('id'=>$iid));
            }
            else{
                //wp_id==0,no wp account, set is_confirmed to 1 convirmed
                // $is_confirmed=1;
            }

    }
    
    
    echo $result;
}

function is_in_wp($email){
    global $wpdb;

    $query = "SELECT ID 
            FROM wp_users
            WHERE user_email = %s";

    $result = $wpdb -> get_row($wpdb->prepare($query,$email));
    if($result)
        return intval($result->ID);
    return 0;
}

function is_in_ft($email){
    global $wpdb;

    $query = "SELECT id 
            FROM wp_ft_uinfo
            WHERE email = %s";

    $result = $wpdb -> get_row($wpdb->prepare($query,$email));
    if($result)
        return intval($result->id);
    return 0;
}


?>