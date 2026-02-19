# Todo List Pro

Une application web moderne et intuitive de gestion de tâches, conçue avec simplicité et performance en tête.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Build](https://img.shields.io/badge/build-passing-brightgreen)

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Scripts disponibles](#scripts-disponibles)
- [Architecture](#architecture)
- [Fonctionnalités avancées](#fonctionnalités-avancées)
- [Contribution](#contribution)
- [License](#license)

## Fonctionnalités

✨ **Gestion intuitive des tâches**
- ✅ Ajouter, modifier et supprimer des tâches en temps réel
- ☑️ Marquer les tâches comme complétées avec un simple clic
- 📊 Compteur automatique du nombre de tâches
- 💾 Exporter vos tâches au format JSON
- 📂 Importer des tâches depuis un fichier JSON
- 📱 Design responsive et adapté mobile
- 🎨 Interface épurée et moderne avec Tailwind CSS
- 🚀 Performance optimale avec Vite

## Technologies

**Frontend:**
- **Vanilla JavaScript** (ES6+ modules) - Pas de dépendances framework
- **Vite** - Bundler et serveur de développement ultra-rapide
- **Tailwind CSS** - Framework CSS utility-first
- **Tabler Icons** - Bibliothèque d'icônes

**Caractéristiques techniques:**
- Application monopage (SPA) côté client
- Pas de backend requis
- Déployable en tant que site statique
- Zéro dépendances à l'exécution

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

- **Node.js** (version 16.0.0 ou supérieure) - [Télécharger Node.js](https://nodejs.org/)
- **npm** (habituellement inclus avec Node.js) ou **yarn**

Vérifiez votre installation :
```bash
node --version
npm --version
```

## Installation

1. **Clonez le repository**
```bash
git clone https://github.com/votre-username/todo-list-pro.git
cd todo-list-pro
```

2. **Installez les dépendances**
```bash
npm install
```

3. **Démarrez le serveur de développement**
```bash
npm run dev
```

4. **Ouvrez votre navigateur**
Accédez à `http://localhost:5173` (ou l'URL indiquée dans le terminal)

## Utilisation

### Interface utilisateur

1. **Ajouter une tâche**
   - Tapez la description de votre tâche dans le champ input
   - Cliquez sur le bouton "+" ou appuyez sur Entrée
   - La tâche s'ajoute instantanément à la liste

2. **Marquer une tâche comme complétée**
   - Cliquez sur la case à cocher à gauche de la tâche
   - La tâche sera visuellement marquée comme complétée (opacité)

3. **Supprimer une tâche**
   - Cliquez sur le bouton "✕" à droite de la tâche
   - La tâche est immédiatement supprimée

4. **Exporter vos tâches**
   - Cliquez sur le bouton "Exporter"
   - Un fichier `todo-list.json` sera téléchargé
   - Ce fichier contient toutes vos tâches au format JSON

5. **Importer des tâches**
   - Cliquez sur le bouton "Importer"
   - Sélectionnez un fichier `todo-list.json` précédemment exporté
   - Vos tâches seront restaurées dans l'application

### Format d'export/import

Les tâches sont sauvegardées au format JSON :

```json
[
  {
    "text": "Ma première tâche",
    "completed": false
  },
  {
    "text": "Tâche complétée",
    "completed": true
  }
]
```

## Structure du projet

```
todo-list-pro/
├── src/
│   ├── main.js              # Point d'entrée principal
│   ├── components.js        # Composants réutilisables
│   └── style.css            # Styles personnalisés et Tailwind
├── public/                  # Ressources statiques
├── index.html               # Point d'entrée HTML
├── package.json             # Dépendances et scripts npm
├── vite.config.js           # Configuration Vite
├── .gitignore               # Fichiers ignorés par Git
└── README.md                # Cette documentation
```

### Détail des fichiers principaux

| Fichier | Description |
|---------|-------------|
| `src/main.js` | Initialise l'application et gère les événements utilisateur (ajout, suppression, import, export) |
| `src/components.js` | Contient les fonctions de création de composants (éléments de liste, compteur) |
| `src/style.css` | Importation Tailwind CSS et classes personnalisées |
| `index.html` | Structure HTML de l'interface utilisateur |
| `vite.config.js` | Configuration du bundler Vite et du plugin Tailwind |

## Scripts disponibles

Dans le répertoire du projet, vous pouvez exécuter :

### `npm run dev`
Démarre le serveur de développement avec rechargement à chaud.
```bash
npm run dev
```
- Accédez à `http://localhost:5173`
- Les modifications sont reflétées en temps réel

### `npm run build`
Construit l'application pour la production.
```bash
npm run build
```
- Génère une version optimisée dans le dossier `dist/`
- Minification et optimisation des assets
- Prêt à être déployé

### `npm run preview`
Prévisualise la version de production localement.
```bash
npm run preview
```
- Simule le serveur de production
- Vérifiez le build avant le déploiement

## Architecture

### Architecture générale

```
┌─────────────────────────────────────┐
│         index.html (DOM)             │
├─────────────────────────────────────┤
│                                      │
│  main.js (Gestionnaire d'état)       │
│  - Event Listeners                   │
│  - Import/Export                     │
│  - Logique métier                    │
│                                      │
├─────────────────────────────────────┤
│                                      │
│  components.js (Générateur de DOM)   │
│  - createTodoItem()                  │
│  - refreshCount()                    │
│                                      │
├─────────────────────────────────────┤
│          style.css (Tailwind)        │
│  - Styles responsifs                 │
│  - Classes personnalisées            │
└─────────────────────────────────────┘
```

### Flux de données

1. **Ajout de tâche** : Input → main.js → DOM → components.js
2. **Suppression** : Bouton supprimer → main.js → Mise à jour DOM
3. **Marquage complétée** : Checkbox → main.js → Mise à jour classe CSS
4. **Export** : Récupération DOM → Sérialisation JSON → Téléchargement
5. **Import** : Upload fichier → Parsing JSON → Injection dans DOM

### Gestion d'état

L'état de l'application est stocké dans le **DOM lui-même**. Chaque tâche est représentée par un élément HTML avec :
- Un attribut `data-*` pour le statut de complétion
- Des classes CSS pour la visualisation
- Des événements DOM pour la manipulation

**Avantages:**
- Pas de framework externe
- Pas de dépendances de gestion d'état
- Simple et transparent
- Légère et performante

**Limitations:**
- L'état est perdu au rechargement de la page (pas de persistance)
- L'import/export est manuel (pas de sauvegarde automatique)

## Fonctionnalités avancées

### Persistance des données

Actuellement, l'application ne persiste pas les données automatiquement. Pour une persistance complète, vous pouvez :

**Option 1: LocalStorage**
```javascript
// Sauvegarder après chaque changement
localStorage.setItem('todos', JSON.stringify(tasks));

// Restaurer au chargement
const tasks = JSON.parse(localStorage.getItem('todos'));
```

**Option 2: Backend Database**
- Intégrer une API REST
- Synchroniser avec un serveur (Firebase, MongoDB, etc.)
- Synchronisation en temps réel multi-appareils

### Améliorations futures possibles

- 🔐 Authentification utilisateur
- ☁️ Synchronisation cloud
- 🏷️ Catégories et tags
- 📅 Dates d'échéance
- 🔔 Notifications et rappels
- 🎨 Thèmes personnalisables
- 📱 Application mobile native
- ⌨️ Raccourcis clavier

## Déploiement

### Déployer sur Vercel (recommandé)

1. Connectez votre repository GitHub à [Vercel](https://vercel.com)
2. Vercel détectera automatiquement Vite
3. Cliquez sur "Deploy"
4. Votre site est en ligne !

### Déployer sur Netlify

1. Connectez votre repository GitHub à [Netlify](https://netlify.com)
2. Réglez le dossier de publication sur `dist`
3. Commande de build : `npm run build`
4. Cliquez sur "Deploy"

### Déployer sur GitHub Pages

```bash
# Build
npm run build

# Push le dossier dist
git add dist
git commit -m "Deploy to production"
git push origin main
```

Puis activez GitHub Pages dans les paramètres du repository.

## Contribution

Les contributions sont bienvenues ! Voici comment contribuer :

1. **Fork** le repository
2. **Créez une branche** pour votre fonctionnalité
   ```bash
   git checkout -b feature/nouvelle-fonctionnalite
   ```
3. **Commitez** vos changements
   ```bash
   git commit -m "Ajout: description de la fonctionnalité"
   ```
4. **Poussez** vers la branche
   ```bash
   git push origin feature/nouvelle-fonctionnalite
   ```
5. **Ouvrez une Pull Request**

### Conventions de code

- Utilisez du JavaScript ES6+ moderne
- Respectez le formatage existant
- Documentez les fonctions complexes
- Testez votre code avant de soumettre

## Troubleshooting

### Le serveur de développement ne démarre pas
```bash
# Supprimez node_modules et réinstallez
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Erreurs Tailwind CSS
```bash
# Vérifiez la configuration de Vite
# Assurez-vous que @tailwindcss/vite est installé
npm install
```

### L'import/export ne fonctionne pas
- Vérifiez que votre navigateur autorise les téléchargements
- Assurez-vous que le fichier JSON est valide
- Vérifiez la console du navigateur pour les erreurs

## Performance

- **Bundle size** : ~50 KB (minifié, avant gzip)
- **Gzip** : ~15 KB
- **Lighthouse Score** : 98+/100
- **First Contentful Paint** : < 1s
- **Time to Interactive** : < 2s

## License

Ce projet est sous license MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Auteur

Développé avec ❤️ by : Fabien Conéjéro / Madjeek

---

## Ressources utiles

- 📖 [Documentation Vite](https://vitejs.dev)
- 🎨 [Documentation Tailwind CSS](https://tailwindcss.com)
- 🎯 [MDN - Web APIs](https://developer.mozilla.org/docs/Web/API)
- 📚 [JavaScript moderne](https://javascript.info)

## Questions et support

Pour toute question ou problème, créez une [issue](https://github.com/madjeek-web/Taskflow_to-do-list/issues) sur le repository.

---

**Dernière mise à jour** : 19/02/2026

Merci d'utiliser Todo List Pro ! 🚀

##
##

##

# 🔒 Security & Privacy — Taskflow

> **One sentence summary:** Taskflow collects no data, connects to no server, and everything stays on your computer. Full stop.

---

## 🛡️ What Taskflow does with your data

### The short answer: absolutely nothing.

Taskflow is an application that runs **entirely in your browser**, on your own computer. There is no server behind it, no database somewhere in the cloud, no company receiving anything whatsoever.

Here is a clear table of what the application does — and does not do — with your information:

| Question | Answer |
|---|---|
| 📡 Does the app send my tasks over the internet? | **No, never.** |
| 👀 Can someone see my tasks? | **No, nobody.** |
| 🍪 Does the app use cookies? | **No.** |
| 📊 Is there any analytics or tracking? | **No.** |
| 💰 Is my data sold? | **No, impossible.** |
| 🔑 Do I need to create an account? | **No account required.** |
| 📧 Do I need to provide my email? | **No, never.** |
| 🌐 Do I need an internet connection? | **No, it works offline.** |

---

## 💾 Where is my data stored?

Your tasks are saved in what is called your browser's **`localStorage`**.

To put it simply: it's a small storage space that your browser makes available to websites and web apps, **directly on your computer**. It's exactly like a text file saved on your desktop, except it's managed automatically by the browser.

**What this means in practice:**

- ✅ Your data **never leaves** your computer
- ✅ Even Fabien Conéjéro, the creator of Taskflow, **cannot see** your tasks
- ✅ No internet connection is needed for the app to work
- ✅ If you want to erase everything, simply clear your browser's localStorage (or delete the file)

---

## 🌐 What about the Google Fonts connection?

The online version of Taskflow loads fonts (typefaces) from **Google Fonts**. This is only to make the text look nice.

This connection is **the one and only** network communication the app makes, and it transmits none of your tasks — just a font file request, like any website that displays styled text.

> 💡 **If you use the `taskflow-standalone.html` version** offline, even this connection does not happen. The app works perfectly with your system's default fonts.

---

## 🔍 How to verify this yourself

You don't have to take our word for it. Here's how to check for yourself that Taskflow sends nothing over the internet:

1. **Open Taskflow** in your browser
2. **Press F12** (or right-click → "Inspect")
3. Go to the **"Network"** tab
4. **Add tasks**, check them off, delete some...
5. Look at the network requests: you will see **no personal data** leaving anywhere

This is what we call **transparency through code** — the full source code is available on this GitHub repository, and anyone can read it and verify what it does.

---

## 📂 The source code is open

Taskflow is an **open source** project. This means that **all the code is visible** to anyone, at any time, on this GitHub repository.

There is no hidden code, no secret part, no mysterious file running in the background. What you see in the files is exactly what the application does — nothing more, nothing less.

> 💡 **For developers:** the entire codebase is available in the `src/` folder. The `store.js` file handles all data — you can verify that no function makes any outgoing HTTP request.

---

## 🧹 How to delete all my data

If you want to cleanly erase everything, you have two options:

**Option 1 — From the browser**
1. Press `F12` to open the developer tools
2. Go to the **"Application"** tab (Chrome) or **"Storage"** tab (Firefox)
3. Click on **"localStorage"**
4. Find the entry **`taskflow-v3`** and delete it

**Option 2 — Clear the browser cache**
Go to your browser settings → Privacy → Clear browsing data → Site data. Note that this will also delete data from all other websites.

---

## 🚨 Reporting a security vulnerability

Found a security issue in Taskflow? Please do not expose it publicly in a GitHub Issue.

Contact the creator directly by opening an Issue labelled **`[SECURITY]`** with a general description of the problem, without sharing the technical details publicly. We will respond quickly to fix it.

---

## ✅ Summary for parents and teachers

Taskflow is a **100% local** application that:

- Creates no user account
- Asks for no personal information
- Connects to no external server (except for loading fonts)
- Contains no advertising
- Sells no data
- Is entirely free and open source

It is as safe as a simple text file on your desktop.

---

*Security document maintained by Fabien Conéjéro — Open source project under MIT License*
*Official repository: [https://github.com/madjeek-web/Taskflow_to-do-list](https://github.com/madjeek-web/Taskflow_to-do-list)*
