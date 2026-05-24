const fs = require('fs');
const path = require('path');

const fotosDir = path.join(__dirname, '..', 'fotos');
const outputFilePath = path.join(__dirname, '..', 'js', 'photosData.js');

const categories = ['sozinha', 'comigo-ivan', 'zuadas', 'iuri'];
const photosData = {};

categories.forEach(category => {
  const categoryPath = path.join(fotosDir, category);
  photosData[category] = [];
  
  if (fs.existsSync(categoryPath)) {
    const files = fs.readdirSync(categoryPath);
    files.forEach(file => {
      if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
        // Usa forward slashes para web
        photosData[category].push(`fotos/${category}/${file}`);
      }
    });
  }
});

const fileContent = `// Arquivo gerado automaticamente pelo build
export const photosData = ${JSON.stringify(photosData, null, 2)};
`;

fs.writeFileSync(outputFilePath, fileContent, 'utf-8');
console.log('✅ js/photosData.js gerado com sucesso com as seguintes contagens:');
categories.forEach(cat => console.log(`- ${cat}: ${photosData[cat].length} fotos`));
