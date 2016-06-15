<?php
// insert user(node) and relationship from received json
    // include('func.php');
    include('connectdb.php'); 
    $connection = mysql_select_db($database, $server) or die("Unable to select db");

// var_dump($_POST);die;
    // $json = ($_GET['info']);
    // $json = '{"id":null, "gender": 1, "status": 1, "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"没", "lastName": "王", "children":[],"father":8,"mother":9, "spouse":8, "image":"imgUrlChild"}';


// $info = json_decode($json);


$info = ($_POST);
// var_dump($info);
// die;

if(!empty($info)  ) insert($info);



// echo json_encode($loop);
    // echo json_encode($data, JSON_UNESCAPED_UNICODE );     
      
    mysql_close($server);


    //insert $uid info and relationship
    function insert($info){

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
        $gender = $info['gender'] == null?'NULL':$info['gender'];
        $status = $info['status'] == null?'NULL':$info['status'];
        $birth = $info['birth'] == null?'NULL':$info['birth'];
        $birth = explode('-', $birth);
        $birth = implode('', $birth);
        $birthPlace = $info['birthPlace'] == null?'NULL':("'".$info['birthPlace']."'");
        $death = $info['death'] == null?'NULL':$info['death'];
        $death = explode('-', $death);
        $death = implode('', $death);
        if(isset($info['dealthPlace']))
            $dealthPlace = ("'".$info['dealthPlace']."'");
        else
             $dealthPlace = 'NULL';
        $email = $info['email'] == null?'NULL':("'".$info['email']."'");
        $firstName = $info['firstName'] == null?'NULL':("'".$info['firstName']."'");
        $lastName = $info['lastName'] == null?'NULL':("'".$info['lastName']."'");
        // $image = $info['image'] == null?'NULL':("'".$info['image']."'");

        $image = "'".$info['image']."'";
        if($image == null)  $image = "'"."http://thumbs.dreamstime.com/m/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg"."'";
        if ($image == null && $gender ==2) {
            $image = "'"."http://thumbs.dreamstime.com/m/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-illustration-58249368.jpg"."'";
        }


        



        $wp_id = is_in_wp($email);
        $creator_id = 1;
        //insert node has wp account

        // insert new user info
        $query = "INSERT INTO ft_uinfo
                VALUES (NULL,$image,$wp_id,NULL,NULL,$status,$birth,$birthPlace,$death,$dealthPlace,$email,$firstName,$lastName,$gender)";

// var_dump($query);die;
        $result = mysql_query($query) or die(mysql_error()); 
        //get inserted user id
        $iid = mysql_insert_id();

        //check in ft_uinfo
        if(!($uid = is_in_ft($email))){
            //no ft node, insert node and send notification
            $uid = $iid;

            $query = "INSERT INTO ft_relationship
                        VALUES (NULL,$uid,$uid,0,1,$creator_id)";
            $result = mysql_query($query) or die(mysql_error());


            //send notification to confirm, and set is_confirmed to 0
            // do_action('ft_confirm',$receiver)
            
        }
        else{
            //has ft node, combine two ft: add relationship only, do not need to insert node
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
                $query = "INSERT INTO ft_relationship
                            VALUES (NULL,$pid,$cid,$rid,NULL,$creator_id)";
                $result = mysql_query($query) or die(mysql_error()); 

                if($wp_id != NULL){
                    //Send confirmation, set is_confirmed to 0 pending
                }
            }

        }

        if($father != NULL){
            $pid = $father;
            $cid = $uid;
            $rid = 1;
            $query = "INSERT INTO ft_relationship
                            VALUES (NULL,$pid,$cid,$rid,NULL,$creator_id)";
            $result = mysql_query($query) or die(mysql_error());


            if($wp_id != NULL){
                //Send confirmation, set is_confirmed to 0 pending
            }        }
        
        if($mother != NULL){
            $pid = $mother;
            $cid = $uid;
            $rid = 2;
            $query = "INSERT INTO ft_relationship
                            VALUES (NULL,$pid,$cid,$rid,NULL,$creator_id)";
            $result = mysql_query($query) or die(mysql_error());

            if($wp_id != NULL){
                //Send confirmation, set is_confirmed to 0 pending
            }
        }
        
        if($spouse != NULL){
            $pid = $spouse;
            $cid = $uid;
            $rid = 3;
            $query = "INSERT INTO ft_relationship
                            VALUES (NULL,$pid,$cid,$rid,NULL,$creator_id)";
            $result = mysql_query($query) or die(mysql_error());

            if($wp_id != NULL){
                //Send confirmation, set is_confirmed to 0 pending
            }

        }
        
        
        echo $result;
        






        

        
    }

    function is_in_wp($email){
        $query = "SELECT ID 
                FROM wp_users
                WHERE user_email = $email";

        $result = mysql_query($query) or die(mysql_error());
        if($result){
            $row = mysql_fetch_assoc($result);
            return intval($row['ID']);
        }
/*        else
            return -1;*/
    }

    function is_in_ft($email){
        $query = "SELECT id 
                FROM ft_uinfo
                WHERE email = $email";

        $result = mysql_query($query) or die(mysql_error());
        if($result){
            $row = mysql_fetch_assoc($result);
            return intval($row['id']);
        }
/*        else
            return -1;*/
    }
?>