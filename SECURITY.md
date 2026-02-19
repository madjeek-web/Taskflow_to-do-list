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
