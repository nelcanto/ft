<?php
// connect to db with basic info
    $username = "homestead";
    $password = "secret";
    $host = "localhost";
    $database="cqg";

    $server = mysql_connect($host, $username, $password)or die("Unable to connect db");
    mysql_query("SET NAMES 'utf8mb4'");
?>