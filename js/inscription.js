const token = "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"; // Remplacez par votre token GitHub
const apiUrl = "https://api.github.com/repos/nouredine227/cloud/contents/school/candidats.json";

// Fonction pour récupérer le contenu actuel du fichier JSON
async function getCurrentFile() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Accept": "application/vnd.github.v3+json",
            }
        });

        // Afficher les détails de la réponse si elle échoue
        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Erreur lors de la récupération : ${response.status} - ${errorDetails}`);
        }

        const fileData = await response.json();
        const content = JSON.parse(atob(fileData.content)); // Décoder le contenu Base64
        return { content, sha: fileData.sha }; // Retourne le contenu et le SHA
    } catch (error) {
        console.error("Erreur lors de la récupération du fichier :", error);
        alert("Impossible de charger le fichier actuel. Vérifiez les logs pour plus de détails.");
        return null;
    }
}

// Fonction pour mettre à jour le fichier JSON avec un nouveau candidat
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

        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "Ajout d'un nouveau candidat",
                content: btoa(JSON.stringify(content, null, 2)), // Encoder en Base64
                sha: sha,
            })
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Erreur lors de la mise à jour : ${response.status} - ${errorDetails}`);
        }

        alert("Inscription réussie !");
    } catch (error) {
        console.error("Erreur lors de la mise à jour du fichier :", error);
        alert("Une erreur est survenue lors de l'inscription. Vérifiez les logs pour plus de détails.");
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
        anneeScolaire
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
