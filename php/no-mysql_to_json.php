<?php
// return the whole view of ft_uinfo, ft_relationship, ft_pickup as json
    include('connectdb.php'); 

    $connection = mysql_select_db($database, $server) or die("Unable to select db");

    $myquery = "SELECT * 
                FROM ft_uinfo u
                INNER JOIN ft_relationship ON u.id = cid
                INNER JOIN ft_pickup ON ft_relationship.rid = ft_pickup.rid
                WHERE id = cid
                ORDER BY id";
    $query = mysql_query($myquery);
    
    if ( ! $query ) {
        echo mysql_error();
        die;
    }
    
    $data = array();
    
    for ($x = 0; $x < mysql_num_rows($query); $x++) {
        $data[] = mysql_fetch_assoc($query);
    }
    
    echo json_encode($data, JSON_UNESCAPED_UNICODE );    
     
    mysql_close($server);
?>