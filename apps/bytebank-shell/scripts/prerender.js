import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o HTML estático pré-renderizado
const staticHtmlPath = path.join(__dirname, '../src/pages/home/home-ssg.html');

async function prerender() {
    try {
        // Ler o HTML estático pré-renderizado
        const html = fs.readFileSync(staticHtmlPath, 'utf-8');

        // Criar diretório de saída se não existir
        const outputDir = path.join(__dirname, '../dist');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Salvar o arquivo HTML
        fs.writeFileSync(path.join(outputDir, 'index.html'), html);

        console.log('✅ Página home pré-renderizada com sucesso!');
    } catch (error) {
        console.error('❌ Erro na pré-renderização:', error);
    }
}

prerender();
