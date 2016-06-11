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

        $children = $info['children'];
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
        $dealthPlace = $info['dealthPlace'] == null?'NULL':("'".$info['dealthPlace']."'");
        $email = $info['email'] == null?'NULL':("'".$info['email']."'");
        $firstName = $info['firstName'] == null?'NULL':("'".$info['firstName']."'");
        $lastName = $info['lastName'] == null?'NULL':("'".$info['lastName']."'");
        // $image = $info['image'] == null?'NULL':("'".$info['image']."'");

    $image = $info['image'];
    if($image == null)  $image = "'"."http://thumbs.dreamstime.com/m/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg"."'";
    if ($image == null && $gender ==2) {
        $image = "'"."http://thumbs.dreamstime.com/m/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-illustration-58249368.jpg"."'";
    }




        // insert new user info
        $query = "INSERT INTO ft_uinfo
                VALUES (NULL,$image,NULL,NULL,NULL,$status,$birth,$birthPlace,$death,$dealthPlace,$email,$firstName,$lastName,$gender)";

    // var_dump($query);die;
        $result = mysql_query($query) or die(mysql_error()); 

        //get inserted user id
        $uid = intval(mysql_insert_id());
        $query = "INSERT INTO ft_relationship
                    VALUES ($uid,$uid,0)";
        $result = mysql_query($query) or die(mysql_error());

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
                            VALUES ($pid,$cid,$rid)";
                $result = mysql_query($query) or die(mysql_error()); 
            }

        }

        if($father != NULL){
            $pid = $father;
            $cid = $uid;
            $rid = 1;
            $query = "INSERT INTO ft_relationship
                            VALUES ($pid,$cid,$rid)";
            $result = mysql_query($query) or die(mysql_error());
        }
        
        if($mother != NULL){
            $pid = $mother;
            $cid = $uid;
            $rid = 2;
            $query = "INSERT INTO ft_relationship
                            VALUES ($pid,$cid,$rid)";
            $result = mysql_query($query) or die(mysql_error());
        }
        
        if($spouse != NULL){
            $pid = $spouse;
            $cid = $uid;
            $rid = 3;
            $query = "INSERT INTO ft_relationship
                            VALUES ($pid,$cid,$rid)";
            $result = mysql_query($query) or die(mysql_error());
        }
        
        
        echo $result;
    }
?>