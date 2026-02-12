# DOM Homework – Light + Nav
פתרון מלא לכל המטלות (כולל הבונוס) בגרסת Light עם ניווט פנימי.

## שימוש
פתחו את `index.html` בדפדפן.

## העלאה ל-GitHub (דרך Git):
1) צרו רפוזיטורי חדש ריק ב-GitHub בשם `dom-homework-light` (Public).
2) במחשב (בתיקיית הפרויקט):
```bash
git init
git checkout -b main
git add .
git commit -m "Initial commit: DOM homework solutions (Light + nav)"
git remote add origin https://github.com/<YOUR-USER>/dom-homework-light.git
git push -u origin main
```

## פריסה ל-Vercel
### אופציה A: חיבור מה-GitHub (מומלץ)
- ב-Vercel: New Project → Import Git Repository → לבחור את `dom-homework-light` → Framework Preset: **Other / Static Files** → Deploy.
- אחרי הפריסה, יופיע כתובת `https://<project-name>.vercel.app` — זה הקישור למרצה.

### אופציה B: CLI
```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```
הפקודה תחזיר URL לפרודקשן.
