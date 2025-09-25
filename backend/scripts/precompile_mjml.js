// backend/scripts/precompile_mjml.js
const fs = require("fs");
const mjml = require("mjml");
const path = require("path");

const inputDir = path.resolve("./emails/mjml");
const outputDir = path.resolve("./emails/html");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file => {
  if (file.endsWith(".mjml")) {
    let mjmlContent = fs.readFileSync(path.join(inputDir, file), "utf8");

    // 🔒 Preserve Jinja2 placeholders before passing to MJML
    // Replace {{ ... }} with markers
    mjmlContent = mjmlContent
      .replace(/\{\{/g, "___JINJA_OPEN___")
      .replace(/\}\}/g, "___JINJA_CLOSE___");

    // Compile MJML → HTML
    let htmlOutput = mjml(mjmlContent, { validationLevel: "strict" }).html;

    // Restore Jinja2 placeholders
    htmlOutput = htmlOutput
      .replace(/___JINJA_OPEN___/g, "{{")
      .replace(/___JINJA_CLOSE___/g, "}}");

    const outFile = file.replace(".mjml", ".html");
    fs.writeFileSync(path.join(outputDir, outFile), htmlOutput, "utf8");

    console.log(`✅ Compiled ${file} → ${outFile}`);
  }
});
