<?php
$debug = 0;
// $debug = 1;

// return json in format {"id":5,"gender":null,"status":null,"birth":null,"birthPlace":null,"death":null,"dealthPlace":null,"email":null,"firstName":null,"lastName":null,"children":[10],"father":7,"mother":1,"spouse":"null","image":"imgUrlChild"}
    // include('func.php');
/*    include('connectdb.php'); 
    
    $connection = mysql_select_db($database, $server) or die("Unable to select db");*/
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-config.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-load.php');  

    $uid = intval($_GET['userid']);
    // $uid = 5;
    $data = array();
    $loop = array(); //store id for looping generation
    $looped[] = $uid;



getInfo($uid);

//first loop for $uid and surroundings
foreach ($loop as $loopid) {
    $uid = $loopid;

    getInfo($uid);

    $looped[] = $loopid;
}

$diff = -1;
while($diff!=null){
    //find diff
    $diff = null;
    $dif = array_diff($loop,$looped);
    foreach ($dif as $d) {
        $diff[] = $d;
    }
    if($debug){
        echo json_encode($looped);
        echo json_encode($diff);
    }



    //loop the rest
    if($diff!=null){
        foreach ($diff as $loopid) {
            $uid = $loopid;
            getInfo($uid);
            $looped[] = $loopid;
        }
    }
}


if($debug)  echo json_encode($loop);

    echo json_encode($data, JSON_UNESCAPED_UNICODE );     
    // echo json_encode($data);     
      
    // mysql_close($server);


    //get $uid info and add to $data in json format
    function getInfo($uid){
        global $data,$loop,$wpdb;

        //$uid == cid to find father, mother, spouse
        $query = "SELECT * 
                FROM wp_ft_overall_cid
                WHERE cid = $uid";
        $result = $wpdb -> get_results($wpdb->prepare($query));
        // $result = mysql_query($query) or die(mysql_error());  
        


        // if ( ! $result ) {
        //     echo mysql_error();
        //     die;
        // }
     
        //define json var
        $id = null;
        // $name = '';
        $children = [];
        $father = null;
        $mother = null;
        $spouse = null;
        // $image = '';
        // $rid = '';

        foreach($result as $r){
        // for ($x = 0; $x < mysql_num_rows($result); $x++) {



            // $row = mysql_fetch_assoc($result);
            
            $id = intval($r->id);
            $image = $r->image;
            $gender = $r->gender;
            $status = $r->status;
            $birth = $r->birth;
            $birthPlace = $r->birthPlace;
            $death = $r->death;
            $dealthPlace = $r->dealthPlace;
            $email = $r->email;
            $firstName = $r->firstName;
            $lastName = $r->lastName;
            $rid = intval($r->rid);
            //father
            if($rid == 1){
                $father = intval($r->pid);
            }
            //mother
            elseif($rid == 2){
                $mother = intval($r->pid);
            }
            //spouse
            elseif($rid == 3){
                $spouse = intval($r->pid);
            }
            
        }
        //$uid as pid to find children and spouse
        $query = "SELECT * 
                FROM wp_ft_overall_cid
                WHERE pid = $uid";
$result = $wpdb -> get_results($wpdb->prepare($query));
        // $result = mysql_query($query) or die(mysql_error());  
        // if ( ! $result ) {
        //     echo mysql_error();
        //     die;
        // }
        // for ($x = 0; $x < mysql_num_rows($result); $x++) {
foreach($result as $r){
            // $row = mysql_fetch_assoc($result);
            $rid = intval($r->rid);
            //children
            if($rid == 1){
                $children[] = intval($r->cid);
            }
            elseif($rid == 2){
                $children[] = intval($r->cid);
            }
            elseif($rid == 3){
                $spouse = intval($r->cid);
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
?>