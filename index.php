<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">
    <link rel="stylesheet" href="style.css">
    <title>Carnet de contact</title>
</head>
<body>
    <div class="titleSite">
        <h1>Carnet de Contact</h1>
    </div>
    <div tabindex="0" class="plusButton ajouterContact">
        <svg class="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
            <g mask="url(#mask0_21_345)">
            <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
            </g>
        </svg>
    </div>



    <div class="listContact">
        <div class="filter">
            <select name="" id="" class="selectFiltre">
                <option value="">choisir type de filtre</option>
                <option value="nom">nom</option>
                <option value="prenom">prenom</option>
                <option value="categorie">categorie</option>
            </select>
            <input type="text" id="filterNom" placeholder="Filtrer par Nom">
            <input type="text" id="filterPrenom" placeholder="Filtrer par Prénom">
            <input type="text" id="filterCategorie" placeholder="Filtrer par Catégorie">
            <button class="btnFiltrage" onclick="filterContacts()">Filtrer</button>
        </div>
        <div class="table">
            <table class="blueTable">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Categorie</th>
                 
                    </tr>
                </thead>
                <tbody class="tbody">
                    <tr>
                        <td>cell1_1</td>
                        <td>cell2_1</td>
                        <td>cell3_1</td>
                    </tr>
                    </tbody>
                </table>
        </div>
        <div class="trier">
        <button onclick="sortContacts(1)">Trier par Nom</button>
        <button onclick="sortContacts(2)">Trier par Prénom</button>
        <button onclick="sortContacts(3)">Trier par Catégorie</button>
        </div>
    </div>

    <div class="popup fiche_contact">
        
        <div class="information_complet">
        <!-- <p class="fiche-title">Fiche de contact</p>
                <div class="information">Nom:<span>Ndiaye</span></div>
                <div class="information">Prenom:<span>Fadal</span></div>
                <div class="information">Telephone:<span>771234567</span></div>
                <div class="information">email:<span>fndiaye1011@gmail.com</span></div>
                <div class="information">Adresse:<span>Dakar,senegal</span></div>
                <div class="information">Categorie:<span>Categorie 1</span></div>

                <div class="action">
                <button class="update custom-btn btn-2">Modifier</button>
                <button class="cancel custom-btn btn-2">Annuler</button>
                </div> -->
        </div>

    </div>

    <div class="popupFormulaire">
    <form class="form">
    <p class="title update">Modifier le contact </p>
    <p class="title add">Ajouter un contact</p>
        <div class="flex">
        <label>
            <input class="input" name="Prenom" type="text" placeholder="" required="">
            <span>Prenom</span>
        </label>

        <label>
            <input class="input" name="Nom" type="text" placeholder="" required="">
            <span>Nom</span>
        </label>
    </div>  
            
    <label>
        <input class="input" type="email" name="email" placeholder="" required="">
        <span>Email</span>
    </label> 
        
    <label>
        <input class="input" type="telephone" name="Telephone" placeholder="" required="">
        <span>Telephone</span>
    </label>
    <label>
        <input class="input" type="text" name="Adresse" placeholder="" required="">
        <span>Adresse</span>
    </label>
    <label>
        <select class="input selectCategorie" type="text" name="Categorie" placeholder="">

        </select>
        <span>Categorie</span>

    </label>
    <button type="button" class="submit modifierContact">Modifier</button>
    <button type="button"  class="submit addContact">Ajouter</button>
    <button type="button"  class="submit closeFormulaire">Fermer</button>
   
    </form>
    </div>

    <div class="alerts">
        <div class="alert">
            <div class="icon">
                <img src="notif.png">
            </div>
            <div class="message">
                <h1>Message pour l'utilisateur!!</h1>
            </div>

            <div class="close">
                <i class="las la-window-close"></i>
            </div>
        </div>
       
    </div>
<script src="script.js"></script>
</body>
</html>