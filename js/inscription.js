const token = "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"; // Remplacez par votre token GitHub
const apiUrl = "https://api.github.com/repos/nouredine227/cloud/contents/school/candidats.json";

// Nouveau candidat à ajouter
const newCandidate = {
    nom: "Doe",
    prenom: "John",
    dateNaissance: "2000-01-01",
    lieuNaissance: "Niger",
    sexe: "Masculin",
    email: "john.doe@example.com",
    adresse: "123 Rue Principale",
    numCandidat: "12345",
    numParent: "67890",
    classe: "Terminale",
    anneeScolaire: "2024-2025"
};

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
            console.error("Impossible de récupérer le fichier.");
            return;
        }

        const { content, sha } = fileData;

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

        console.log("Fichier mis à jour avec succès !");
    } catch (error) {
        console.error("Erreur lors de la mise à jour du fichier :", error);
    }
}

// Ajouter un candidat
updateFile(newCandidate);
