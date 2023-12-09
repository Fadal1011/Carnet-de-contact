<?php
require_once 'contact.class.php';

if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $contactManager = new Contact;
    header('Content-Type: application/json');

    switch ($action) {
        case 'get_contacts':
            $contacts = $contactManager->getContact();
            echo json_encode($contacts);
            break;

        case 'get_contact':
            if (isset($_POST['contact_id'])) {
                $contactId = $_POST['contact_id'];
                $contact = $contactManager->getContactById($contactId);
                echo json_encode($contact);
            } else {
                echo json_encode(['error' => 'ID du contact manquant']);
            }
            break;

        case 'edit_contact':
            if (
                isset($_POST['id'], $_POST['nom'], $_POST['prenom'], $_POST['adresse'], $_POST['email'], $_POST['telephone'], $_POST['categorie_id'])
            ) {
                $id = $_POST['id'];
                $nom = $_POST['nom'];
                $prenom = $_POST['prenom'];
                $adresse = $_POST['adresse'];
                $email = $_POST['email'];
                $telephone = $_POST['telephone'];
                $categorie_id = $_POST['categorie_id'];

                $contactManager->update($id, $nom, $prenom, $adresse, $email, $telephone, $categorie_id);
            
                echo json_encode(['success' => true, 'message' => 'Contact mis à jour avec succès']);
            } else {
                echo json_encode(['error' => 'Paramètres manquants pour la mise à jour du contact']);
            }
            break;
            case 'store_contact':
                if (
                    isset($_POST['nom'], $_POST['prenom'], $_POST['adresse'], $_POST['email'], $_POST['telephone'], $_POST['categorie_id'])
                ) {
                    $nom = $_POST['nom'];
                    $prenom = $_POST['prenom'];
                    $adresse = $_POST['adresse'];
                    $email = $_POST['email'];
                    $telephone = $_POST['telephone'];
                    $categorie_id = $_POST['categorie_id'];
            
                    $contactManager->store($nom, $prenom, $adresse, $email, $telephone, $categorie_id);
                    echo json_encode(['success' => true, 'message' => 'Contact ajouté avec succès']);
                } else {
                    echo json_encode(['error' => 'Paramètres manquants pour l\'ajout du contact']);
                }
                break;

                case 'all_categorie':
                    $categories = $contactManager->AllCategorie();
                    echo json_encode($categories);
                    break;
 

        default:
            echo json_encode(['error' => 'Action non reconnue']);
            break;
    }
}

?>
