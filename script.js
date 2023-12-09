let tbody = document.querySelector('.tbody');
let fiche_contact= document.querySelector('.fiche_contact')
let popupFormulaire = document.querySelector('.popupFormulaire');
let modifierContact = document.querySelector('.modifierContact')
let closeFormulaire = document.querySelector('.closeFormulaire')
let titleAdd = document.querySelector('.add')
let titleUpdate = document.querySelector('.update')
let addContactbtn = document.querySelector('.addContact');
let btnOpenFormForAddContact = document.querySelector('.ajouterContact');
let selectCategorie = document.querySelector('.selectCategorie');
var notif = document.querySelector('.alerts');
var close = document.querySelector('.close');




function filterContacts() {
    // Récupérer les valeurs des champs de filtre
    let filterNom = document.getElementById('filterNom').value.toLowerCase();
    let filterPrenom = document.getElementById('filterPrenom').value.toLowerCase();
    let filterCategorie = document.getElementById('filterCategorie').value.toLowerCase();

    // Filtrer les contacts
    let ligneContacts = document.querySelectorAll('.ligneContact');
    ligneContacts.forEach(ligne => {
        let nom = ligne.querySelector('td:nth-child(1)').innerText.toLowerCase();
        let prenom = ligne.querySelector('td:nth-child(2)').innerText.toLowerCase();
        let categorie = ligne.querySelector('td:nth-child(3)').innerText.toLowerCase();

        if (nom.includes(filterNom) && prenom.includes(filterPrenom) && categorie.includes(filterCategorie)) {
            ligne.style.display = "table-row";
        } else {
            ligne.style.display = "none";
        }
    });
}


//tri
function sortContacts(columnIndex) {
    let ligneContacts = document.querySelectorAll('.ligneContact');
    let sortedContacts = Array.from(ligneContacts);

    sortedContacts.sort((a, b) => {
        let textA = a.querySelector(`td:nth-child(${columnIndex})`).innerText.toLowerCase();
        let textB = b.querySelector(`td:nth-child(${columnIndex})`).innerText.toLowerCase();
        return textA.localeCompare(textB);
    });

    tbody.innerHTML = "";
    sortedContacts.forEach(contact => {
        tbody.appendChild(contact);
    });
}

function clearForm() {
    document.getElementsByName("Nom")[0].value = "";
    document.getElementsByName('Prenom')[0].value = "";
    document.getElementsByName('Categorie')[0].value = "";
    document.getElementsByName('email')[0].value = "";
    document.getElementsByName('Telephone')[0].value = "";
    document.getElementsByName('Adresse')[0].value = "";
}

function notification(message){
    notif.style.clipPath="polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
    document.querySelector('.message h1').textContent=message;
}

close.addEventListener('click',()=>{
    notif.style.clipPath="polygon(55% 0, 55% 0, 54% 100%, 54% 100%)";
})




btnOpenFormForAddContact.addEventListener('click',()=>{
    clearForm()
    popupFormulaire.style.display = "flex"
    titleAdd.style.display = "block"
    titleUpdate.style.display = "none";
    modifierContact.style.display = "none"
    addContactbtn.style.display = "block"
    closeFormulaire.style.display = "block"
    addContactbtn.addEventListener('click',()=>{
        let nom = document.getElementsByName("Nom")[0].value
        let prenom = document.getElementsByName('Prenom')[0].value
        let Categorie = document.getElementsByName('Categorie')[0].value
        let email = document.getElementsByName('email')[0].value
        let telephone = document.getElementsByName('Telephone')[0].value
        let Adresse = document.getElementsByName('Adresse')[0].value

        addContact(nom, prenom, Adresse, email, telephone, Categorie)
    })

});


    closeFormulaire.addEventListener('click',()=>{
        closeForm()
        clearForm()
    })

    function closeForm(){
        popupFormulaire.style.display = "none"
    }




function ajaxRequest(method, url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Vérifier si la réponse n'est pas vide avant de la parser en JSON
                if (xhr.responseText.trim() !== "") {
                    callback(JSON.parse(xhr.responseText));
                } else {
                    console.error(xhr);
                }
            } else {
                console.error("Erreur lors de la requête. Statut :", xhr.status);
            }
        }
    };
    xhr.send(data);
}

function loadContacts() {
    ajaxRequest("POST", "ajax.php", "action=get_contacts", function (response) {
        console.log(response);
        tbody.innerHTML = "";
        response.forEach(e => {
            tbody.innerHTML += `
            <tr class="ligneContact" idContact="${e.id}">
                 <td>${e.nom}</td>
                 <td>${e.prenom}</td>
                 <td>${e.libelle}</td>
             </tr>
            ` 
         });

         let ligneContacts = document.querySelectorAll('.ligneContact');
         ligneContacts.forEach(ligne=>{
            ligne.addEventListener('click',()=>{
                let idContact = ligne.getAttribute('idContact')
                console.log(idContact);
                getContactById(idContact);
            })
         })
    });
}

function loadCategorie() {
    ajaxRequest("POST", "ajax.php", "action=all_categorie", function (response) {
        console.log(response);
        selectCategorie.innerHTML = "";
        response.forEach(e => {
            selectCategorie.innerHTML += `
                <option value="${e.id}">${e.libelle}</option>
            ` 
         });
    });
}

function getContactById(contactId) {
    ajaxRequest("POST", "ajax.php", "action=get_contact&contact_id=" + contactId, function (response) {
        console.log(response);
        document.getElementsByName("Nom")[0].value = response.nom;
        document.getElementsByName('Prenom')[0].value = response.prenom;
        document.getElementsByName('Categorie')[0].value = response.id_categorie;
        document.getElementsByName('email')[0].value = response.Email;
        document.getElementsByName('Telephone')[0].value = response.Telephone;
        document.getElementsByName('Adresse')[0].value = response.Adresse;



        fiche_contact.style.display = "flex"
        fiche_contact.innerHTML = ""
        fiche_contact.innerHTML = `
        <div class="information_complet">
            <p class="fiche-title">Fiche de contact</p>
            <div class="information">Nom:<span>${response.nom}</span></div>
            <div class="information">Prenom:<span>${response.prenom}</span></div>
            <div class="information">Telephone:<span>${response.Telephone}</span></div>
            <div class="information">email:<span>${response.Email}</span></div>
            <div class="information">Adresse:<span>${response.Adresse}</span></div>
            <div class="information">Categorie:<span>${response.id_categorie}</span></div>

            <div class="action">
            <button class="update custom-btn btn-2">Modifier</button>
            <button class="cancel custom-btn btn-2">Annuler</button>
            </div>
        </div>
        `
        let cancel = document.querySelector('.cancel')
        cancel.addEventListener('click',()=>{
            fiche_contact.style.display = "none"
        })

        let update = document.querySelector('.update');
        update.addEventListener('click',()=>{
            popupFormulaire.style.display = "flex"
            titleAdd.style.display = "none"
            titleUpdate.style.display = "block";
            modifierContact.style.display = "block"
            addContactbtn.style.display = "none"
            closeFormulaire.style.display = "block"
        })

        modifierContact.addEventListener("click",()=>{
            let nom = document.getElementsByName("Nom")[0].value
            let prenom = document.getElementsByName('Prenom')[0].value
            let Categorie = document.getElementsByName('Categorie')[0].value
            let email = document.getElementsByName('email')[0].value
            let telephone = document.getElementsByName('Telephone')[0].value
            let Adresse = document.getElementsByName('Adresse')[0].value
            updateContact(response.id, nom, prenom, Adresse, email, telephone, Categorie);
         })
    });
   
}

function ajaxRequestPost(method, url, data, successCallback, errorCallback) {
    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                successCallback(JSON.parse(xhr.responseText));
            } else {
                errorCallback(xhr.status);
            }
        }
    };

    if (method === 'POST') {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }

    xhr.send(data);
}

function updateContact(id, nom, prenom, adresse, email, telephone, categorie_id) {
    var data = new URLSearchParams();
    data.append('action', 'edit_contact');
    data.append('id', id);
    data.append('nom', nom);
    data.append('prenom', prenom);
    data.append('adresse', adresse);
    data.append('email', email);
    data.append('telephone', telephone);
    data.append('categorie_id', categorie_id);

    ajaxRequestPost('POST', 'ajax.php', data, function (response) {
        loadContacts();
        getContactById(id);
        clearForm();
        popupFormulaire.style.display = "none";
        notification("modification faite avec succées!")
    }, function (status) {
        notification("erreur lors de la modification!")
    });
}

function addContact(nom, prenom, adresse, email, telephone, categorie_id) {
    var data = new FormData();
    data.append('action', 'store_contact');
    data.append('nom', nom);
    data.append('prenom', prenom);
    data.append('adresse', adresse);
    data.append('email', email);
    data.append('telephone', telephone);
    data.append('categorie_id', categorie_id);

    console.log(data);
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'ajax.php', true);


    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                clearForm();
                loadContacts();
                popupFormulaire.style.display = "none";
                notification("ajout faite avec succées!")
            } else {
                notification("erreur lors de l'ajout succées!")
            }
        }
    };
    xhr.send(data);
}


loadContacts()
loadCategorie()