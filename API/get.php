<?php
    try{
        //$req = $pdo->prepare("SELECT id, code, amount, invested FROM portfolio WHERE apik = :key");
        $req = $pdo->prepare("SELECT `id`, `code`, `amount`, `invested` FROM `portfolio` WHERE apikey LIKE :key");
        $req->bindParam(':key', $apikey);
        
        $req->execute();
        $res = $req->fetchAll(PDO::FETCH_ASSOC);
        
        $result["success"]=true;
        $result["message"]="Request success";
        $result["results"]["count"]=count($res);
        $result["results"]["data"]=$res;
    }
    catch(PDOException $e){
        $result["success"]=false;
        $result["message"]="Query error / " . $e->getMessage();
        $result["results"]="";
    }

?>