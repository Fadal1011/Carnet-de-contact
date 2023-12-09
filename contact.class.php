<?php
class Contact{
    private $db;

    private $conn;

    public function __construct()
    {
        $this->conn = $this->connecte();
    }

    public function connecte(){
        $dsn = "mysql:host=localhost;dbname=test";
        $user = "root";
        $password="";
        
        try {
            $this->db = new PDO($dsn,$user,$password);
            $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            return $this->db;
        } catch (PDOException $pde) {
            echo "connexion echouer ".$pde->getMessage();
        }
    }

    public function getContact(){
        $query ="SELECT contact.id,contact.id_categorie,contact.nom,contact.prenom,contact.Email,contact.Telephone,contact.Adresse,categorie.libelle FROM `contact` INNER JOIN `categorie` ON contact.id_categorie = `categorie`.id";
        $stmt=$this->conn->query($query);
        return $stmt->fetchAll();
    }


    public function getContactById($contactId) {
        $query = "SELECT * FROM contact WHERE id = $contactId";
        $result = $this->conn->query($query);

        return $result->fetch();
    }
    
    public function store($nom,$prenom,$adresse,$email,$telephone,$categorie_id){
        $insert = "INSERT INTO `contact`(nom,prenom,Email,Telephone,Adresse,id_categorie) VALUE(:nom,:prenom,:email,:telephone,:adresse,:id_categorie)";
        $stmt = $this->conn->prepare($insert);
        $param = array(
            ":nom" => $nom,
            ":prenom" => $prenom,
            ":adresse" => $adresse,
            ":email"=>$email,
            ":telephone"=>$telephone,
            ":id_categorie"=>$categorie_id
        );
        $stmt->execute($param);
    }



    public function update($id,$nom,$prenom,$adresse,$email,$telephone,$categorie_id){
        $update = "UPDATE `contact` SET nom = :nom, prenom = :prenom, Email = :email,Adresse = :adresse,Telephone = :telephone,id_categorie = :id_categorie WHERE id = :id";
        $stmt = $this->conn->prepare($update);
        $param = array(
            ":id" => $id,
            ":nom" => $nom,
            ":prenom" => $prenom,
            ":adresse" => $adresse,
            ":email"=>$email,
            ":telephone"=>$telephone,
            ":id_categorie"=>$categorie_id
        );
        $stmt->execute($param);
    }

    public function AllCategorie(){
        $query = "SELECT * FROM categorie";
        $result = $this->conn->query($query);
        return $result->fetchAll();
    }



}


?>