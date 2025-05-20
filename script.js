import axios from "axios";
import { extract } from "@extractus/article-extractor";

const url = process.argv[2];

if (!url) {
    console.error("⚠️ Debes proporcionar la URL de un artículo. Ej: node script.js https://ejemplo.com/noticia");
    process.exit(1);
}

(async () => {
    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0", // Para evitar bloqueos por scraper
            },
        });

        const result = await extract(url);



        if (!result || !result.content) {
            console.error("❌ No se pudo extraer el contenido del artículo.");
            return;
        }

        console.log(`\n📰 Título: ${result.title || "No disponible"}`);
        console.log(`✍️  Autor: ${result.author || "No disponible"}`);
        console.log(`📅 Fecha: ${result.date || "No disponible"}`);
        console.log(`\n📄 Contenido:\n${result.content.replace(/<[^>]*>/g, "").trim()}`);
    } catch (error) {
        console.error("❌ Error al procesar la URL:", error.message);
    }
})();
