document.getElementById("translateBtn").addEventListener("click", () => {
    const sourceLang = document.getElementById("sourceLang").value;
    const targetLang = document.getElementById("targetLang").value;
    const sourceText = document.getElementById("sourceText").value;

    translateText(sourceLang, targetLang, sourceText)
        .then(translatedText => {
            document.getElementById("translatedText").textContent = translatedText;
        })
        .catch(error => {
            console.error("Translation error:", error);
        });
});

async function translateText(sourceLang, targetLang, sourceText) {
    const apiKey = "YOUR_GOOGLE_TRANSLATE_API_KEY"; // Replace with your actual API key
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            q: sourceText,
            source: sourceLang,
            target: targetLang,
            format: "text",
        }),
    });

    if (!response.ok) {
        throw new Error("Translation request failed.");
    }

    const data = await response.json();
    return data.data.translations[0].translatedText;
}
