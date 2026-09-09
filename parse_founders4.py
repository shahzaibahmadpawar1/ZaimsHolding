import re

with open('scratch/founders_clean.html', 'r', encoding='utf-8') as f:
    html_str = f.read()

# Replace basic react attributes
html_str = html_str.replace('class=', 'className=')
html_str = html_str.replace('for=', 'htmlFor=')
html_str = html_str.replace('<!--$--><!--$--><!--/$--><!--/$-->', '')
html_str = re.sub(r'style="([^"]*)"', r'', html_str)
html_str = re.sub(r'<img(.*?)(?<!/)>', r'<img\1 />', html_str)
html_str = re.sub(r'<input(.*?)(?<!/)>', r'<input\1 />', html_str)
html_str = re.sub(r'<source(.*?)(?<!/)>', r'<source\1 />', html_str)
html_str = re.sub(r'<br>', r'<br />', html_str)
html_str = html_str.replace('//>', '/>')
html_str = html_str.replace('></path>', ' />')
html_str = html_str.replace('<path', '<path ')
html_str = html_str.replace('stroke-width', 'strokeWidth')
html_str = html_str.replace('stroke-linecap', 'strokeLinecap')
html_str = html_str.replace('stroke-linejoin', 'strokeLinejoin')
html_str = html_str.replace('tabindex=', 'tabIndex=')

article_html = html_str

# We will output a React Component
react_code = f"""import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FoundersPage() {{
  return (
    <div className="min-h-screen bg-paper font-sans">
      <Header theme="dark" />
      <main id="main-content">
        {article_html}
      </main>
      <Footer />
    </div>
  );
}}
"""
with open("src/app/founders/page.tsx", "w", encoding='utf-8') as f:
    f.write(react_code)
print("Saved article to src/app/founders/page.tsx")
