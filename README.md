Taskflow to-do list

##

# ✅ Taskflow — Your to-do list, finally done right

> A free, simple and powerful web application to manage your tasks every day.
> Works directly in your browser, no complicated installation required.

---

## 🗂️ What exactly is it?

**Taskflow** is a **to-do list** application.

You probably know those lists we write on paper so we don't forget anything?
"Do my homework", "call grandma", "finish the biology project"...

Taskflow is exactly that, but on your computer or phone.
And way better than a piece of paper, because:

- you can **check off** a task when you're done ✅
- you can give it a **priority** (urgent, normal, not in a hurry)
- you can put it in a **category** you create yourself (e.g. "School", "Personal", "Sport")
- you can set a **deadline** so you never miss an important due date
- **everything is saved automatically** — even if you close the tab, nothing disappears
- you can **filter, sort and search** through your list in a few clicks

In short, it's the perfect tool to stay organized, whether you're a student or simply someone with a lot of things to do!

---

## ✨ What Taskflow can do

Here is the full list of all features:

| Feature | What it means in practice |
|---|---|
| ➕ Add a task | Type what you need to do and press Enter |
| ✅ Check a task | Click the checkbox when it's done |
| 🗑️ Delete a task | A button to remove what you no longer need |
| ✏️ Edit a task | Double-click on the text to fix it |
| 🔴 🟡 🟢 Priorities | Mark if it's urgent, normal or not pressing |
| 🗂️ Categories | Sort your tasks by theme (you choose the names) |
| 📅 Deadline | Set when the task must be finished |
| 🔍 Search | Type a word to find a specific task |
| 🔽 Sort | Order your list by date, priority, alphabetical order... |
| 🌙 Dark mode / ☀️ Light mode | Choose the theme based on your preference |
| 💾 Auto-save | Nothing disappears, even if you close the browser |
| 📤 Export | Download your list as a file to keep it safe |
| 📥 Import | Reload a list you had previously saved |
| 🖱️ Drag & drop | Reorganize tasks by dragging them with your mouse |
| 📊 Statistics | See how many tasks you've done vs. still to do |
| ⌨️ Keyboard shortcuts | Go even faster (full list accessible with the `?` key) |

---

## 🚀 How to use it — super simple version

### Option 1 — The easiest (recommended for beginners)

1. Download the **`taskflow-standalone.html`** file from this repository
2. Double-click on it on your computer
3. It opens in your browser (Chrome, Firefox, Safari...)
4. That's it. You can start using Taskflow right away! 🎉

> 💡 **Tip:** This file works without an internet connection. You can even put it on a USB stick and use it on any computer!

---

### Option 2 — For developers (Vite + Tailwind version)

If you know what Node.js is and want to work on the source code, here's how to do it:

**Step 1 — Download the project**

You need to have [Git](https://git-scm.com/) installed on your computer.
Open a terminal (command prompt) and type:

```bash
git clone https://github.com/YOUR-USERNAME/taskflow.git
```

> 💡 Replace `YOUR-USERNAME` with your actual GitHub username.

**Step 2 — Enter the project folder**

```bash
cd taskflow
```

**Step 3 — Install the dependencies**

"Dependencies" are tools the project needs to work.
You need to have [Node.js](https://nodejs.org/) installed. Then type:

```bash
npm install
```

> This command will automatically download everything needed. It may take 1 to 2 minutes.

**Step 4 — Start the project in development mode**

```bash
npm run dev
```

**Step 5 — Open in the browser**

The terminal will show you an address like `http://localhost:5173`.
Copy and paste this address into your browser and you're good to go!

---

## 🎮 First steps in the app

Once Taskflow is open, here's how to get started:

1. **Type your first task** in the large field at the top (where it says "New task…")
2. **Choose a priority** from the dropdown menu just below (High, Medium or Low)
3. **Add a category** if you want (e.g. "Homework") — it's optional
4. **Press Enter** or click the **+** button
5. Your task appears in the list! 🎉

When you finish a task, **check the box** to the left of its text. It will be marked as done.

To **edit** the text of a task, **double-click** on it.

To **delete** a task, hover over it and click the 🗑️ icon that appears.

---

## ⌨️ Keyboard shortcuts (to go faster)

| Key | Action |
|---|---|
| `Enter` | Add the task you are typing |
| `Ctrl + D` | Switch between dark mode and light mode |
| `Ctrl + F` | Jump directly to the search bar |
| `Ctrl + E` | Export your list as a JSON file |
| `Escape` | Cancel what you are currently editing |
| `?` | Show the full list of all shortcuts |

> 💡 On Mac, replace `Ctrl` with `Cmd` (the key with ⌘).

---

## 📁 File structure (for the curious)

If you open the project folder, here's what you'll find:

```
taskflow/
│
├── index.html               ← The main page of the application
├── taskflow-standalone.html ← The all-in-one version (the easiest to use)
│
├── src/
│   ├── main.js              ← The "conductor": it connects everything together
│   ├── store.js             ← The app's "memory" (all the data)
│   ├── components.js        ← The visual elements (how a task is displayed)
│   ├── toast.js             ← The small notifications that appear at the bottom
│   └── style.css            ← Everything related to colors and design
│
├── exemple/
│   └── tasks.json           ← A sample task file to import
│
└── package.json             ← The list of tools the project needs
```

> 💡 **For beginners:** you don't need to understand all these files to use the app. This is just for your information!

---

## 🛠️ Technologies used

This project is built with standard web technologies — the ones you learn when you start web development:

- **HTML** — The structure of the page (like the skeleton of a human body)
- **CSS + Tailwind** — The style and design (like clothes and a haircut)
- **JavaScript** — The behaviour and interactions (like the muscles that make things move)
- **Vite** — A tool that makes development faster and more enjoyable
- **localStorage** — A browser system that saves data on your computer

---

## 📥 Exporting and importing your list

### Export (save)
Click the **⬇️ Export** button in the top right corner.
This downloads a `.json` file to your computer.
This file contains all your tasks. Keep it safe as a backup!

### Import (restore)
Click the **⬆️ Import** button, then select a `.json` file you previously exported.
All your tasks reappear instantly.

> 💡 **The JSON format** is simply a text file format that computers can easily read. If you open it with a text editor, you'll see your tasks written in a structured way.

---

## 🤝 Contributing to the project

This project is **open source**, which means the source code is fully visible and editable by anyone. It's a community project!

If you want to get involved, even as a beginner, here's how:

1. **Report a bug** → Open an "Issue" on GitHub and describe the problem
2. **Suggest an improvement** → Also open an "Issue" with your idea
3. **Modify the code** → Fork the project, make your changes, then open a Pull Request

> 💡 **What is a Fork?** It's like making a copy of the project for yourself so you can modify it without touching the original. If your changes are good, they can then be added to the main project!

---

## 📜 MIT License — What you can do with this project

This project is distributed under the **MIT License**. It is one of the most open and permissive licenses in the world of free software.

Concretely, the MIT License gives you the right to:

- ✅ **Use** this project for free, for personal or professional use
- ✅ **Copy** the code and integrate it into your own projects
- ✅ **Modify** the code however you like
- ✅ **Distribute** your modified version, even if you sell it
- ✅ **Use** it in private or commercial projects

The only thing we ask in return:

- ⚠️ **Keep the original creator's credit** in the files you redistribute (it's the least you can do to respect someone's work!)

> In short: do whatever you want with this code, but say where it comes from. That's all.

```
MIT License

Copyright (c) 2026 Fabien Conéjéro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👤 Creator

**Taskflow** was created and developed by **Fabien Conéjéro**.

This project was born from a simple desire: to have a task list that is truly pleasant to use, without having to pay a subscription or create an account on an online service. Everything stays on your computer, everything is free, and the code is open to everyone.

---

## 💬 A question? A problem?

- Open an **Issue** on GitHub and describe what's wrong
- Try to be as precise as possible: which browser you're using, what you did, what happened

---

*Made with ❤️ by Fabien Conéjéro — Open source project under MIT License*

