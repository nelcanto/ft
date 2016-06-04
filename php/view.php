<?php
$debug = 0;
// $debug = 1;

// return json in format {"id":5,"gender":null,"status":null,"birth":null,"birthPlace":null,"death":null,"dealthPlace":null,"email":null,"firstName":null,"lastName":null,"children":[10],"father":7,"mother":1,"spouse":"null","image":"imgUrlChild"}
    include('func.php');
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
?>