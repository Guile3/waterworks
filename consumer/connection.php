<?php
 header('Content-Type: application/json');
 header("Access-Control-Allow-Origin: *");
 
 $host = 'bsyzrflyvtz0qvuxpqgm-mysql.services.clever-cloud.com';
 $dbusername = 'ua8azikuxiwmatlo';
 $dbpassword = 'XtnOur8GKarFSvRMnbOl';
 $database = 'bsyzrflyvtz0qvuxpqgm';

  try {
    $conn = new PDO("mysql:host=$host;dbname=$database", $dbusername, $dbpassword);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connection Successful!";
  } catch(PDOException $e) {
    die("Error: " . $e->getMessage());
  }
?>