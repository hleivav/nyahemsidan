# Copilot Instructions for nyahemsidan

## Project Overview
This is a static website for a tennis club, primarily using HTML, CSS, JavaScript, and PHP. Each major feature or page is represented by a set of files with matching names (e.g., `contact.html`, `contact.css`, `contact.js`). PHP files handle form submissions and server-side logic.

## Architecture & Structure
- **Pages:** Each feature (e.g., contact, new member, tournament registration) has its own HTML, CSS, and sometimes JS file. PHP files are used for forms and backend processing.
- **No build system:** Files are edited directly; there is no build, test, or package management workflow.
- **Static assets:** Images are stored in the `images/` directory. Documents are in `dokument/`.
- **Forms:** Most forms post to a corresponding PHP file (e.g., `contact.html` → `contact.js` → `contact.php`).

## Developer Workflow
- **Edit files directly:** Make changes to HTML, CSS, JS, or PHP files as needed. No compilation or bundling required.
- **Debugging:** Use browser dev tools for HTML/JS/CSS. For PHP, errors are visible in the browser or server logs.
- **No automated tests:** Manual testing by loading pages in the browser.

## Project-Specific Patterns
- **File naming:** Keep related files (HTML, CSS, JS, PHP) for each feature together and named consistently.
- **Minimal JS:** JavaScript is used only where necessary (e.g., form validation, dynamic UI updates).
- **PHP forms:** Each form has a dedicated PHP handler. Data flow is typically: HTML form → JS validation → PHP processing.
- **No frameworks:** No use of React, Vue, or other JS frameworks. No CSS preprocessors.

## Integration Points
- **External dependencies:** None detected. All code is local and self-contained.
- **Cross-component communication:** Limited to form submissions and basic JS interactions.

## Key Files & Directories
- `index.html` – Main landing page
- `contact.html`, `contact.js`, `contact.php` – Contact form flow
- `newmember.html`, `newmember.js`, `newmemberform.php` – New member registration
- `images/` – Static images
- `dokument/` – Documents for download

## Example Pattern
To add a new feature:
1. Create `feature.html`, `feature.css`, and (if needed) `feature.js` in the root.
2. For forms, add `featureform.php` to handle submissions.
3. Link CSS/JS in the HTML file using relative paths.

---

For questions or unclear conventions, ask the project owner for clarification.
