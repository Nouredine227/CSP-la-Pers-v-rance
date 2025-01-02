const token = "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"; // Remplacez par votre token GitHub
const apiUrl = "https://api.github.com/repos/nouredine227/cloud/contents/school/candidats.json";

// Fonction pour récupérer le fichier JSON depuis GitHub
async function getCurrentFile() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github.v3+json",
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération : ${response.status}`);
        }

        const fileData = await response.json();

        // Décoder le contenu Base64
        const decodedContent = atob(fileData.content);

        return {
            content: JSON.parse(decodedContent), // Convertir le JSON en objet
            sha: fileData.sha, // SHA pour la mise à jour
        };
    } catch (error) {
        console.error("Erreur lors de la récupération du fichier :", error);
        alert("Impossible de charger le fichier actuel. Vérifiez les logs.");
        return null;
    }
}

// Fonction pour mettre à jour le fichier JSON sur GitHub
async function updateFile(newData) {
    try {
        const fileData = await getCurrentFile();
        if (!fileData) return;

        const { content, sha } = fileData;

        // Vérifier si le candidat existe déjà
        const existingCandidate = content.find(
            candidate =>
                candidate.email === newData.email ||
                candidate.numCandidat === newData.numCandidat
        );
        if (existingCandidate) {
            alert("Ce candidat existe déjà !");
            return;
        }

        // Ajouter le nouveau candidat au contenu
        content.push(newData);

        // Encoder le contenu mis à jour en Base64
        const encodedContent = btoa(JSON.stringify(content, null, 2));

        // Requête PUT pour mettre à jour le fichier sur GitHub
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "Ajout d'un nouveau candidat",
                content: encodedContent,
                sha: sha, // SHA nécessaire pour indiquer que le fichier existant est modifié
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la mise à jour : ${response.status}`);
        }

        alert("Inscription réussie !");
    } catch (error) {
        console.error("Erreur lors de la mise à jour du fichier :", error);
        alert("Une erreur est survenue lors de l'inscription. Vérifiez les logs.");
    }
}

// Fonction pour gérer l'inscription
function handleSubmit(event) {
    event.preventDefault();

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

    if (!nom || !prenom || !dateNaissance || !lieuNaissance || !sexe || !email || !adresse || !numCandidat || !numParent || !classe || !anneeScolaire) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

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
        anneeScolaire,
    };

    console.log("Nouveau candidat :", newCandidate);

    updateFile(newCandidate);
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("inscriptionForm");
    if (form) {
        form.addEventListener("submit", handleSubmit);
    } else {
        console.error("Formulaire non trouvé !");
    }
});
