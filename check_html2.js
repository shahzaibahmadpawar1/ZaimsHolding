const fs = require('fs');
let html = fs.readFileSync('C:/Users/Shahzaib/.gemini/antigravity-ide/brain/d392fda3-e36a-4d34-b0ed-00ebf603679a/scratch/interview_html.html', 'utf-8');
const h1Index = html.indexOf('<h1');
if (h1Index !== -1) {
    console.log(html.substring(h1Index, h1Index + 1000));
} else {
    console.log('No h1 found');
}
