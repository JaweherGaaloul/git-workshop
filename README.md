# Welcome to the JEENISo Git & GitHub workshop!

Add yourself to the [participants wall](https://amine-mosbah.github.io/git-workshop/) by making your first pull request.

**You need:** a GitHub account and Git installed (`git --version` to check).

## 1. Fork

Click **Fork** at the top right of this page, then **Create fork**.

## 2. Clone

On your fork, click the green **Code** button, copy the URL, then:

```bash
git clone https://github.com/<you>/git-workshop.git
cd git-workshop
```

## 3. Make your change

```bash
git switch -c add-your-name
cp participants/_template.md participants/your-name.md
```

Open `participants/your-name.md` and fill it in. Then:

```bash
git add participants/your-name.md
git commit -m "docs: add your-name"
git push -u origin add-your-name
```

## 4. Open a pull request

On your fork, click **Compare & pull request**, then **Create pull request**.

Once it's merged, your card shows up on the wall.

## 5. Stay in sync

On your fork, click **Sync fork**. Or in the terminal:

```bash
git remote add upstream https://github.com/amine-mosbah/git-workshop.git
git pull upstream main
```

## Bonus: merge conflict

Everyone changes the **first line of this file** on a new branch and opens a pull request. Only one can be merged without a conflict. We'll fix the rest together.
