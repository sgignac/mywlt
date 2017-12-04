<?php
header('Content-type: application/json');

$result = array();

//DB CONNECTION
try {
    //$pdo = new PDO('mysql:host=db712537974.db.1and1.com:3306;dbname=db712537974', 'dbo712537974', 'france03.1');
    $pdo = new PDO('mysql:host=localhost;dbname=mywltapi', 'root', 'root');
} catch (PDOException $e) {
    $result["success"]=false;
    $result["message"]='Cannot connect to database / ' . $e->getMessage();
    $result["results"]="";
    die();
}

//GET THE USER APIKEY
$apikey = $_GET['key'];

//RETRIEVE THE DATA IF API KEY
if(! $apikey){
    $result["success"]=false;
    $result["message"]="No API key provided";
    $result["results"]="";
}
else {

    try{
        //$req = $pdo->prepare("SELECT id, code, amount, invested FROM portfolio WHERE apik = :key");
        $req = $pdo->prepare("SELECT `apikey` FROM `apikeys` WHERE apikey LIKE :key");
        $req->bindParam(':key', $apikey);
        
        $req->execute();
        $res = $req->fetchAll(PDO::FETCH_ASSOC);
    
    }
    catch(PDOException $e){
        $result["success"]=false;
        $result["message"]="Cannot verify api key / " . $e->getMessage();
        $result["results"]="";
    }

    if( count($res) === 0 ) {
        $result["success"]=false;
        $result["message"]="Invalid api key";
        $result["results"]="";
    }
    else {

        if ($_SERVER['REQUEST_METHOD'] === "GET") {   include "get.php"; }
        if ($_SERVER['REQUEST_METHOD'] === "POST") { include "post.php"; }
        if ($_SERVER['REQUEST_METHOD'] === "PUT") { include "put.php"; }
        if ($_SERVER['REQUEST_METHOD'] === "DELETE") { include "delete.php"; }
    
        //UNSUPPORTED VERB
        if ($_SERVER['REQUEST_METHOD'] !== 'GET' && $_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'PUT' && $_SERVER['REQUEST_METHOD'] !== 'DELETE'){
            $result["success"]=false;
            $result["message"]="Not supported";
            $result["results"]="";
        }

    }

}

echo json_encode($result);

?>