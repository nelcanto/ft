<?php
// update user meta info with json {"id":1, "gender": "1", "status": "1", "birth": "1999-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"萧", "lastName":"王", "children":[4,5,6],"father":2,"mother":3, "spouse": 7, "image":"imgUrlMen"}
    // include('func.php');
    require_once('../../../../wp-config.php' );
/*    include('connectdb.php'); 
    $connection = mysql_select_db($database, $server) or die("Unable to select db");*/


$info = ($_POST);

    // var_dump($info);

    // $json = ($_POST['info']);
    // $json = '{"id":13, "gender": "1", "status": "1", "birth": "1999-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"萧", "lastName":"王", "children":[4,5,6],"father":2,"mother":3, "spouse": 7, "image":"imgUrlMen"}';


// $info = json_decode($json);
// echo $info->{'firstName'};

// $info = ($_POST);

if(!empty($info)  ) upd($info);



// echo json_encode($loop);
    // echo json_encode($data, JSON_UNESCAPED_UNICODE );     
      
    // mysql_close($server);

    //update $uid info 
    function upd($info){
        global $wpdb;

        $uid = $info['id'];
        $gender = $info['gender'];
        $status = $info['status'];
        $birth = $info['birth'];
        $birth = explode('-', $birth);
        $birth = implode('', $birth);
        $birthPlace = $info['birthPlace'];
        $death = $info['death'];
        $death = explode('-', $death);
        $death = implode('', $death);
        $dealthPlace = $info['dealthPlace'];
        $email = $info['email'];
        $firstName = $info['firstName'];
        $lastName = $info['lastName'];
        $image = $info['image'];

        // $query = "UPDATE ft_uinfo
        //         SET gender = $gender,
        //         status = $status,
        //         birth = $birth,
        //         birthPlace = $birthPlace,
        //         death = $death,
        //         dealthPlace = $dealthPlace,
        //         email = $email,
        //         firstName = $firstName,
        //         lastName = $lastName,
        //         image = $image
        //         WHERE id = $uid";

    // var_dump( $query);
    // die;
        // $result = mysql_query($query) or die(mysql_error());  

        $result = $wpdb -> update('wp_ft_uinfo',array('gender'=>$gender, 'status'=>$status, 'birth'=>$birth, 'birthPlace'=>$birthPlace, 'death'=>$death, 'dealthPlace'=>$dealthPlace, 'email'=>$email, 'firstName'=>$firstName, 'lastName'=>$lastName, 'image'=>$image),array('id'=>$uid));

        echo $result;
    }
?>