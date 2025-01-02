const form = document.getElementById("inscriptionForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const token = "VOTRE_TOKEN_PERSONNEL"; // Remplacez par votre token GitHub
        const repoOwner = "Nouredine227";
        const repoName = "Cloud-Json";
        const filePath = "school/candidats.json";
        
        // Récupération du fichier JSON existant
        const fileResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const fileData = await fileResponse.json();
        const content = JSON.parse(atob(fileData.content));
        
        // Ajout du nouveau candidat
        content.push(data);
        const updatedContent = btoa(JSON.stringify(content, null, 2));
        
        // Mise à jour du fichier
        await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
            method: "PUT",
            headers: { 
                Authorization: `Bearer ${token}`, 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                message: "Mise à jour des inscriptions",
                content: updatedContent,
                sha: fileData.sha
            })
        });
        
        document.getElementById("message").innerText = "Inscription réussie !";
        form.reset();
    } catch (error) {
        document.getElementById("message").innerText = "Erreur lors de l'inscription.";
        console.error(error);
    }
});
