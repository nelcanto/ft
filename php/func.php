<?php
//get $uid info and add to $data in json format
function getInfo($uid){
    global $data,$loop;
    //$uid == cid to find father, mother, spouse
    $query = "SELECT *
            FROM ft_overall_cid
            WHERE cid = $uid";
    $result = mysql_query($query) or die(mysql_error());
    // if ( ! $result ) {
    //     echo mysql_error();
    //     die;
    // }
    //define json var
    // $id = '';
    // $name = '';
    $children = [];
    $father = null;
    $mother = null;
    $spouse = null;
    // $image = '';
    // $rid = '';
    for ($x = 0; $x < mysql_num_rows($result); $x++) {
        // $data[] = mysql_fetch_assoc($result);
        $row = mysql_fetch_assoc($result);
        // print_r $row;

        $id = intval($row['id']);
        // $name = $row['name'];
        $image = $row['image'];
        $gender = $row['gender'];
        $status = $row['status'];
        $birth = $row['birth'];
        $birthPlace = $row['birthPlace'];
        $death = $row['death'];
        $dealthPlace = $row['dealthPlace'];
        $email = $row['email'];
        $firstName = $row['firstName'];
        $lastName = $row['lastName'];
        $rid = intval($row['rid']);
        //father
        if($rid == 1){
            $father = intval($row['pid']);
        }
        //mother
        elseif($rid == 2){
            $mother = intval($row['pid']);
        }
        //spouse
        elseif($rid == 3){
            $spouse = intval($row['pid']);
        }

    }
    //$uid as pid to find children and spouse
    $query = "SELECT *
            FROM ft_overall_cid
            WHERE pid = $uid";

    $result = mysql_query($query) or die(mysql_error());
    // if ( ! $result ) {
    //     echo mysql_error();
    //     die;
    // }
    for ($x = 0; $x < mysql_num_rows($result); $x++) {
        $row = mysql_fetch_assoc($result);
        $rid = intval($row['rid']);
        //children
        if($rid == 1){
            $children[] = intval($row['cid']);
        }
        elseif($rid == 2){
            $children[] = intval($row['cid']);
        }
        elseif($rid == 3){
            $spouse = intval($row['cid']);
        }
    }
    //push $uid into json array
    if($id!=null)
    $data[] = array('id'=>$id,'gender'=>$gender,'status'=>$status,'birth'=>$birth,'birthPlace'=>$birthPlace,'death'=>$death,'dealthPlace'=>$dealthPlace,'email'=>$email,'firstName'=>$firstName,'lastName'=>$lastName,'children'=>$children,'father'=>$father,'mother'=>$mother,'spouse'=>$spouse,'image'=>$image);

    // if($loop == ''){
        //push loop value
        foreach ($children as $child) {
            if(!in_array($child, $loop))
                $loop[] = $child;
        }
        // $loop[] = $children;
        if($father != null) if(!in_array($father, $loop)) $loop[] = $father;
        if($mother != null) if(!in_array($mother, $loop))  $loop[] = $mother;
        if($spouse != null) if(!in_array($spouse, $loop))  $loop[] = $spouse;
    // }
}


//del $uid info and relationship
function del($uid){

    $query = "DELETE FROM ft_uinfo
            WHERE $uid = id";
    $result = mysql_query($query) or die(mysql_error());
    echo $result;
}





//update $uid info
function upd($info){
    $uid = $info['id'];
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
    $image = $info['image'] == null?'NULL':("'".$info['image']."'");

    $query = "UPDATE ft_uinfo
            SET gender = $gender,
            status = $status,
            birth = $birth,
            birthPlace = $birthPlace,
            death = $death,
            dealthPlace = $dealthPlace,
            email = $email,
            firstName = $firstName,
            lastName = $lastName,
            image = $image
            WHERE id = $uid";

// var_dump( $query);
// die;
    $result = mysql_query($query) or die(mysql_error());
    echo $result;
}





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
            VALUES (NULL,'$image',NULL,NULL,NULL,$status,$birth,$birthPlace,$death,$dealthPlace,$email,$firstName,$lastName,$gender)";

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