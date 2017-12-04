<?php
    $id = $_GET['id'];
    
    try{
        //delete
        $req = $pdo->prepare("DELETE FROM portfolio WHERE id = :id AND apikey = :key");
        $req->bindParam(':key', $apikey);
        $req->bindParam(':id', $id);
        $req->execute();
        
        //get the fresh record
        $req = $pdo->prepare("SELECT `id`, `code`, `amount`, `invested` FROM `portfolio` WHERE apikey LIKE :key");
        $req->bindParam(':key', $apikey);
        $req->execute();
        $res = $req->fetchAll(PDO::FETCH_ASSOC);
        
        $result["success"]=true;
        $result["message"]="Delete success";
        $result["results"]["count"]=count($res);
        $result["results"]["data"]=$res;
    }
    catch(PDOException $e){
        $result["success"]=false;
        $result["message"]="Query error / " . $e->getMessage();

    }
?>