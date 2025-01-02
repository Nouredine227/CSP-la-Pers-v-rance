const token = "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"; // Remplacez par votre token GitHub
const apiUrl = "https://api.github.com/repos/nouredine227/cloud/contents/school/candidats.json";

// Fonction pour récupérer le contenu actuel du fichier JSON
async function getCurrentFile() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération : ${response.status}`);
        }
        const fileData = await response.json();
        const content = JSON.parse(atob(fileData.content)); // Décoder le contenu Base64
        return { content, sha: fileData.sha }; // Retourne le contenu et le SHA
    } catch (error) {
        console.error("Erreur lors de la récupération du fichier :", error);
        return null;
    }
}

// Fonction pour mettre à jour le fichier JSON avec un nouveau candidat
async function updateFile(newData) {
    try {
        // Étape 1 : Récupérer le fichier actuel et son SHA
        const fileData = await getCurrentFile();
        if (!fileData) {
            alert("Erreur : impossible de récupérer les données actuelles.");
            return;
        }

        const { content, sha } = fileData;

        // Vérifier si le candidat existe déjà (par email ou numéro de candidat)
        const existingCandidate = content.find(
            candidate =>
                candidate.email === newData.email ||
                candidate.numCandidat === newData.numCandidat
        );
        if (existingCandidate) {
            alert("Ce candidat existe déjà !");
            return;
        }

        // Ajouter le nouveau candidat au contenu existant
        content.push(newData);

        // Étape 2 : Envoyer la mise à jour
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Ajout d'un nouveau candidat",
                content: btoa(JSON.stringify(content, null, 2)), // Encoder en Base64
                sha: sha // SHA actuel du fichier
            })
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la mise à jour : ${response.status}`);
        }

        alert("Inscription réussie !");
    } catch (error) {
        console.error("Erreur lors de la mise à jour du fichier :", error);
        alert("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
    }
}

// Fonction pour gérer l'inscription depuis le formulaire
function handleSubmit(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les données du formulaire
    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const dateNaissance = document.getElementById("dateNaissance").value.trim();
    const lieuNaissance = document.getElementById("lieuNaissance").value.trim();
    const sexe = document.getElementById("sexe").value.trim();
    const email = document.getElementById("email").value.trim();
    const adresse = document.getElementById("adresse").value.trim();
    const numCandidat = document.getElementById("numCandidat").value.trim();
    const numParent = document.getElementById("numParent").value.trim();
    const classe = document.getElementById("classe").value.trim();
    const anneeScolaire = document.getElementById("anneeScolaire").value.trim();

    // Validation des champs obligatoires
    if (
        !nom ||
        !prenom ||
        !dateNaissance ||
        !lieuNaissance ||
        !sexe ||
        !email ||
        !adresse ||
        !numCandidat ||
        !numParent ||
        !classe ||
        !anneeScolaire
    ) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Création du nouvel objet candidat
    const newCandidate = {
        nom,
        prenom,
        dateNaissance,
        lieuNaissance,
        sexe,
        email,
        adresse,
        numCandidat,
        numParent,
        classe,
        anneeScolaire
    };

    // Appeler la fonction pour mettre à jour le fichier JSON
    updateFile(newCandidate);
}

// Ajouter un écouteur d'événement au formulaireconst token = "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"; // Remplacez par votre token GitHub
const apiUrl = "https://api.github.com/repos/nouredine227/cloud/contents/school/candidats.json";

// Fonction pour récupérer le contenu actuel du fichier JSON
async function getCurrentFile() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération : ${response.status}`);
        }
        const fileData = await response.json();
        const content = JSON.parse(atob(fileData.content)); // Décoder le contenu Base64
        return { content, sha: fileData.sha }; // Retourne le contenu et le SHA
    } catch (error) {
        console.error("Erreur lors de la récupération du fichier :", error);
        return null;
    }
}

// Fonction pour mettre à jour le fichier JSON avec un nouveau candidat
async function updateFile(newData) {
    try {
        // Étape 1 : Récupérer le fichier actuel et son SHA
        const fileData = await getCurrentFile();
        if (!fileData) {
            alert("Erreur : impossible de récupérer les données actuelles.");
            return;
        }

        const { content, sha } = fileData;

        // Vérifier si le candidat existe déjà (par email ou numéro de candidat)
        const existingCandidate = content.find(
            candidate =>
                candidate.email === newData.email ||
                candidate.numCandidat === newData.numCandidat
        );
        if (existingCandidate) {
            alert("Ce candidat existe déjà !");
            return;
        }

        // Ajouter le nouveau candidat au contenu existant
        content.push(newData);

        // Étape 2 : Envoyer la mise à jour
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Ajout d'un nouveau candidat",
                content: btoa(JSON.stringify(content, null, 2)), // Encoder en Base64
                sha: sha // SHA actuel du fichier
            })
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la mise à jour : ${response.status}`);
        }

        alert("Inscription réussie !");
    } catch (error) {
        console.error("Erreur lors de la mise à jour du fichier :", error);
        alert("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
    }
}

// Fonction pour gérer l'inscription depuis le formulaire
function handleSubmit(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les données du formulaire
    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const dateNaissance = document.getElementById("dateNaissance").value.trim();
    const lieuNaissance = document.getElementById("lieuNaissance").value.trim();
    const sexe = document.getElementById("sexe").value.trim();
    const email = document.getElementById("email").value.trim();
    const adresse = document.getElementById("adresse").value.trim();
    const numCandidat = document.getElementById("numCandidat").value.trim();
    const numParent = document.getElementById("numParent").value.trim();
    const classe = document.getElementById("classe").value.trim();
    const anneeScolaire = document.getElementById("anneeScolaire").value.trim();

    // Validation des champs obligatoires
    if (
        !nom ||
        !prenom ||
        !dateNaissance ||
        !lieuNaissance ||
        !sexe ||
        !email ||
        !adresse ||
        !numCandidat ||
        !numParent ||
        !classe ||
        !anneeScolaire
    ) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Création du nouvel objet candidat
    const newCandidate = {
        nom,
        prenom,
        dateNaissance,
        lieuNaissance,
        sexe,
        email,
        adresse,
        numCandidat,
        numParent,
        classe,
        anneeScolaire
    };

    // Appeler la fonction pour mettre à jour le fichier JSON
    updateFile(newCandidate);
}

// Ajouter un écouteur d'événement au formulaire
document.getElementById("inscriptionForm").addEventListener("submit", handleSubmit);
document.getElementById("inscriptionForm").addEventListener("submit", handleSubmit);const token = "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"; // Remplacez par votre token GitHub
const apiUrl = "https://api.github.com/repos/nouredine227/cloud/contents/school/candidats.json";

// Fonction pour récupérer le contenu actuel du fichier JSON
async function getCurrentFile() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération : ${response.status}`);
        }
        const fileData = await response.json();
        const content = JSON.parse(atob(fileData.content)); // Décoder le contenu Base64
        return { content, sha: fileData.sha }; // Retourne le contenu et le SHA
    } catch (error) {
        console.error("Erreur lors de la récupération du fichier :", error);
        return null;
    }
}

// Fonction pour mettre à jour le fichier JSON avec un nouveau candidat
async function updateFile(newData) {
    try {
        // Étape 1 : Récupérer le fichier actuel et son SHA
        const fileData = await getCurrentFile();
        if (!fileData) {
            alert("Erreur : impossible de récupérer les données actuelles.");
            return;
        }

        const { content, sha } = fileData;

        // Vérifier si le candidat existe déjà (par email ou numéro de candidat)
        const existingCandidate = content.find(
            candidate =>
                candidate.email === newData.email ||
                candidate.numCandidat === newData.numCandidat
        );
        if (existingCandidate) {
            alert("Ce candidat existe déjà !");
            return;
        }

        // Ajouter le nouveau candidat au contenu existant
        content.push(newData);

        // Étape 2 : Envoyer la mise à jour
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Ajout d'un nouveau candidat",
                content: btoa(JSON.stringify(content, null, 2)), // Encoder en Base64
                sha: sha // SHA actuel du fichier
            })
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la mise à jour : ${response.status}`);
        }

        alert("Inscription réussie !");
    } catch (error) {
        console.error("Erreur lors de la mise à jour du fichier :", error);
        alert("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
    }
}

// Fonction pour gérer l'inscription depuis le formulaire
function handleSubmit(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les données du formulaire
    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const dateNaissance = document.getElementById("dateNaissance").value.trim();
    const lieuNaissance = document.getElementById("lieuNaissance").value.trim();
    const sexe = document.getElementById("sexe").value.trim();
    const email = document.getElementById("email").value.trim();
    const adresse = document.getElementById("adresse").value.trim();
    const numCandidat = document.getElementById("numCandidat").value.trim();
    const numParent = document.getElementById("numParent").value.trim();
    const classe = document.getElementById("classe").value.trim();
    const anneeScolaire = document.getElementById("anneeScolaire").value.trim();

    // Validation des champs obligatoires
    if (
        !nom ||
        !prenom ||
        !dateNaissance ||
        !lieuNaissance ||
        !sexe ||
        !email ||
        !adresse ||
        !numCandidat ||
        !numParent ||
        !classe ||
        !anneeScolaire
    ) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Création du nouvel objet candidat
    const newCandidate = {
        nom,
        prenom,
        dateNaissance,
        lieuNaissance,
        sexe,
        email,
        adresse,
        numCandidat,
        numParent,
        classe,
        anneeScolaire
    };

    // Appeler la fonction pour mettre à jour le fichier JSON
    updateFile(newCandidate);
}

// Ajouter un écouteur d'événement au formulaire
document.getElementById("inscriptionForm").addEventListener("submit", handleSubmit);
