const fs = require('fs');
let html = fs.readFileSync('C:/Users/Shahzaib/.gemini/antigravity-ide/brain/d392fda3-e36a-4d34-b0ed-00ebf603679a/scratch/interview_html.html', 'utf-8');
const match = html.match(/<div class="min-h-screen/);
console.log(match ? 'Found min-h-screen' : 'Not found');
const match2 = html.match(/Interviews/i);
console.log(match2 ? 'Found Interviews' : 'Not found');
console.log('Length of file:', html.length);
console.log('First 500 chars of body:', html.substring(html.indexOf('<body'), html.indexOf('<body') + 500));
