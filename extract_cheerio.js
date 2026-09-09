const fs = require('fs');
const cheerio = require('cheerio');

let rawHtml = fs.readFileSync('C:/Users/Shahzaib/.gemini/antigravity-ide/brain/d392fda3-e36a-4d34-b0ed-00ebf603679a/scratch/interview_html.html', 'utf-8');

// Parse with cheerio to auto-close tags and fix structure
const $ = cheerio.load(rawHtml);

// Try to find the main content
let mainElement = $('main');
if (mainElement.length === 0) {
    // If no main, just take body
    mainElement = $('body');
}

let mainHtml = mainElement.html() || '';

// Basic JSX conversion
mainHtml = mainHtml.replace(/class="/g, 'className="');
mainHtml = mainHtml.replace(/for="/g, 'htmlFor="');
mainHtml = mainHtml.replace(/xmlns:xlink="/g, 'xmlnsXlink="');
mainHtml = mainHtml.replace(/xml:space="/g, 'xmlSpace="');
mainHtml = mainHtml.replace(/stroke-width="/g, 'strokeWidth="');
mainHtml = mainHtml.replace(/stroke-linecap="/g, 'strokeLinecap="');
mainHtml = mainHtml.replace(/stroke-linejoin="/g, 'strokeLinejoin="');
mainHtml = mainHtml.replace(/stroke-dasharray="/g, 'strokeDasharray="');
mainHtml = mainHtml.replace(/stroke-dashoffset="/g, 'strokeDashoffset="');
mainHtml = mainHtml.replace(/stroke-miterlimit="/g, 'strokeMiterlimit="');
mainHtml = mainHtml.replace(/clip-path="/g, 'clipPath="');
mainHtml = mainHtml.replace(/clip-rule="/g, 'clipRule="');
mainHtml = mainHtml.replace(/fill-rule="/g, 'fillRule="');
mainHtml = mainHtml.replace(/fill-opacity="/g, 'fillOpacity="');
mainHtml = mainHtml.replace(/stop-color="/g, 'stopColor="');
mainHtml = mainHtml.replace(/stop-opacity="/g, 'stopOpacity="');
mainHtml = mainHtml.replace(/vector-effect="/g, 'vectorEffect="');
mainHtml = mainHtml.replace(/tabindex="/g, 'tabIndex="');
mainHtml = mainHtml.replace(/datetime="/g, 'dateTime="');
mainHtml = mainHtml.replace(/autoplay=""/g, 'autoPlay');
mainHtml = mainHtml.replace(/playsinline=""/g, 'playsInline');
mainHtml = mainHtml.replace(/muted=""/g, 'muted');
mainHtml = mainHtml.replace(/loop=""/g, 'loop');
mainHtml = mainHtml.replace(/srcset="/g, 'srcSet="');
mainHtml = mainHtml.replace(/crossorigin="/g, 'crossOrigin="');

// Self closing tags (since Cheerio outputs XML-like structure if configured, but let's just do it manually for JSX safe tags)
mainHtml = mainHtml.replace(/<(img|br|hr|input|meta|link|source|path|rect|circle|ellipse|line|polyline|polygon|use|stop)([^>]*?)\s*\/?>/g, '<$1$2 />');
mainHtml = mainHtml.replace(/(<(img|br|hr|input|meta|link|source|path|rect|circle|ellipse|line|polyline|polygon|use|stop)[^>]*?)\s*\/\s*\/>/g, '$1 />');

// Remove inline styles entirely to prevent JSX issues
mainHtml = mainHtml.replace(/style="([^"]*)"/g, '');
mainHtml = mainHtml.replace(/style='([^']*)'/g, '');

// Remove inline scripts
mainHtml = mainHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

// Clean up weird HTML comments
mainHtml = mainHtml.replace(/<!--[\s\S]*?-->/g, '');

const output = `import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function InterviewsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header theme="dark" />
      <main>
      ${mainHtml}
      </main>
      <Footer />
    </div>
  );
}
`;

fs.writeFileSync('src/app/interviews/page.tsx', output);
console.log('Successfully created src/app/interviews/page.tsx with cheerio');
