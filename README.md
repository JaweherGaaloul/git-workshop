# Welcome to the JEENISo Git & GitHub workshop!

This repository is the live demo for the workshop. You will **fork** it, **clone** it, add a small file about yourself, and open a **pull request**. When your pull request is merged, your card appears on the participants wall.

**Participants wall:** https://amine-mosbah.github.io/git-workshop/

![Scan to open this repository](assets/qrcode.png)

---

## What you need

- A GitHub account: [github.com/signup](https://github.com/signup)
- Git installed. Check with `git --version`
  - **Windows:** [git-scm.com/downloads/win](https://git-scm.com/downloads/win), or `winget install --id Git.Git -e --source winget`
  - **macOS:** `xcode-select --install` or `brew install git`
  - **Linux:** `sudo apt install git` (Debian/Ubuntu), `sudo dnf install git` (Fedora), `sudo pacman -S git` (Arch)
- Your name and email set once:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

## Step 1: Fork the repo

1. Sign in to github.com and open this repository.
2. Click **Fork** in the top-right corner, then **Create fork**.
3. You now own a copy at `github.com/<you>/git-workshop`.

## Step 2: Clone your fork

On **your fork**, click the green **Code** button and copy the HTTPS URL.

```bash
git clone https://github.com/<you>/git-workshop.git
cd git-workshop

# origin = your fork
git remote -v

# upstream = the original repository
git remote add upstream https://github.com/amine-mosbah/git-workshop.git
```

## Step 3: Make your change and push

```bash
# 1. Work on your own branch
git switch -c add-your-name

# 2. Copy the template and fill it in
cp participants/_template.md participants/your-name.md

# 3. Check, stage and commit
git status
git add participants/your-name.md
git commit -m "docs: add your-name"

# 4. Send the branch to your fork
git push -u origin add-your-name
```

Use lowercase letters and dashes in the file name, for example `participants/sarra-ben-ali.md`.

**One file per person** means everyone can push at the same time with no conflicts.

> **First push:** Git asks you to sign in. On Windows, a browser window opens (Git Credential Manager). On Linux or macOS, use an SSH key or run `gh auth login`.

## Step 4: Open a pull request

1. On your fork, click **Compare & pull request** in the yellow banner.
2. Check the arrow: **base** is `amine-mosbah/git-workshop` `main`, **compare** is your branch.
3. Write a clear title, for example `Add Sarra Ben Ali`, and fill in the template.
4. Click **Create pull request**.

We review it live, comment and merge it. Your card then shows up on the wall.

## Step 5: Stay in sync

Your fork does not update by itself. Click **Sync fork** on GitHub, or:

```bash
git switch main
git pull upstream main
git push origin main

# Delete the finished branch
git branch -d add-your-name
```

---

## Bonus challenge: merge conflicts

Everyone edits **the first line of this README** on a new branch and opens a pull request. The first one merged wins. Everyone else gets a conflict, and we fix one together:

```bash
git switch -c bonus-title
# edit line 1 of README.md, then:
git commit -am "docs: change the title"
git push -u origin bonus-title
```

When GitHub says your branch has conflicts:

```bash
git pull upstream main     # Git marks the conflict in README.md
# open README.md, keep the line you want, delete the <<<<<<< ======= >>>>>>> markers
git add README.md
git commit
git push
```

---

## What's in this repository

| Path | What it is |
| --- | --- |
| `index.html`, `style.css`, `script.js` | The participants wall, a plain HTML page with no build step |
| `participants/` | One Markdown file per participant |
| `participants/_template.md` | Copy this to start your own file |
| `CONTRIBUTING.md` | The rules for pull requests |

To view the wall locally, open `index.html` in your browser. It reads the files from GitHub, so it shows merged participants only.

## Resources

- [Pro Git, free online book](https://git-scm.com/book)
- [Learn Git Branching, interactive](https://learngitbranching.js.org)
- [GitHub Skills](https://skills.github.com)
