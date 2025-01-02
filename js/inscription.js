// Informations nécessaires
const username = "nouredine227";
const repoName = "cloud";
const filePath = "school/candidats.json";
const token = "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"; // Remplacez par votre token GitHub

// Fonction pour soumettre l'inscription
async function submitForm(event) {
    event.preventDefault();

    // Récupération des données du formulaire
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const dateNaissance = document.getElementById("dateNaissance").value;
    const lieuNaissance = document.getElementById("lieuNaissance").value;
    const sexe = document.getElementById("sexe").value;
    const email = document.getElementById("email").value;
    const adresse = document.getElementById("adresse").value;
    const numCandidat = document.getElementById("numCandidat").value;
    const numParent = document.getElementById("numParent").value;
    const classe = document.getElementById("classe").value;
    const anneeScolaire = document.getElementById("anneeScolaire").value;

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

    try {
        // Récupération du contenu actuel du fichier
        const response = await fetch(`https://api.github.com/repos/nouredine227/cloud/contents/school/candidats.json`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération du fichier : ${response.status}`);
        }

        const fileData = await response.json();
        const content = JSON.parse(atob(fileData.content));

        // Ajout du nouveau candidat
        content.push(newCandidate);

        // Mise à jour du fichier JSON sur GitHub
        const updateResponse = await fetch(`https://api.github.com/repos/nouredine227/cloud/contents/school/candidats.json`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Ajout d'un nouveau candidat",
                content: btoa(JSON.stringify(content, null, 2)), // Conversion en base64
                sha: fileData.sha
            })
        });

        if (!updateResponse.ok) {
            throw new Error(`Erreur lors de la mise à jour du fichier : ${updateResponse.status}`);
        }

        document.getElementById("message").innerText = "Inscription réussie !";
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        document.getElementById("message").innerText = "Une erreur s'est produite. Veuillez réessayer.";
    }
}

// Ajout de l'écouteur d'événement sur le formulaire
document.getElementById("form").addEventListener("submit", submitForm);
