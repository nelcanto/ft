<?php
$debug = 0;
// $debug = 1;

// return json in format {"id":5,"gender":null,"status":null,"birth":null,"birthPlace":null,"death":null,"dealthPlace":null,"email":null,"firstName":null,"lastName":null,"children":[10],"father":7,"mother":1,"spouse":"null","image":"imgUrlChild"}
    // include('func.php');
    include('connectdb.php'); 
    
    $connection = mysql_select_db($database, $server) or die("Unable to select db");
    

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
      
    mysql_close($server);


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
        $id = null;
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
?>