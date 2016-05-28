<?php
// connect to db with basic info
    $username = "nytweb"; 
    $password = "iweb";   
    $host = "localhost";
    $database="wp";
    
    $server = mysql_connect($host, $username, $password)or die("Unable to connect db");
    mysql_query("SET NAMES 'utf8mb4'");
?>