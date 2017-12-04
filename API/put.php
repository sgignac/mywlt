<?php
    $code = $_GET['code'];
    $amount = $_GET['amount'];
    $invested = $_GET['invested'];

    try{
        //put
        $req = $pdo->prepare("INSERT INTO portfolio (apikey, code, amount, invested) VALUES (:key, :code, :amount, :invested)");
        $req->bindParam(':key', $apikey);
        $req->bindParam(':code', $code);
        $req->bindParam(':amount', $amount);
        $req->bindParam(':invested', $invested);
        $req->execute();
        $id = $pdo->lastInsertId();
        
        //get the fresh record
        $req = $pdo->prepare("SELECT `id`, `code`, `amount`, `invested` FROM `portfolio` WHERE id = :id AND apikey = :key");
        $req->bindParam(':key', $apikey);
        $req->bindParam(':id', $id);
        $req->execute();
        $res = $req->fetchAll(PDO::FETCH_ASSOC);
        
        $result["success"]=true;
        $result["message"]="Put success";
        $result["results"]["data"]=$res;
    }
    catch(PDOException $e){
        $result["success"]=false;
        $result["message"]="Query error / " . $e->getMessage();

    }
?>