# Connect Cursor + Claude Code + Figma (full setup)

This guide gets **Cursor**, **Claude Code**, and **Figma MCP** working together in one workflow.

---

## 1. Cursor ↔ Claude Code

Claude Code (the terminal app) can control and sync with Cursor so edits and context stay in one place.

### Step A — Put `cursor` in your PATH

So Claude Code can find and connect to Cursor:

1. In **Cursor**: `Cmd+Shift+P` (or `Ctrl+Shift+P`) → open Command Palette.
2. Run: **“Install 'cursor' command in PATH”** (or “Shell command: Install 'cursor' command”).
3. Confirm. Restart your terminal so `cursor` is available.

Check: in a new terminal run `cursor --version` (or `which cursor`). It should print a path/version.

### Step B — Install the Claude Code extension in Cursor

Claude Code ships a VS Code/Cursor extension. Install it manually (most reliable):

1. **Get the VSIX path** (after Claude Code has been run at least once):
   - **macOS/Linux:**  
     `~/.claude/local/node_modules/@anthropic-ai/claude-code/vendor/claude-code.vsix`
   - **Windows:**  
     `%USERPROFILE%\.claude\local\node_modules\@anthropic-ai\claude-code\vendor\claude-code.vsix`

2. **Install in Cursor** (pick one):

   - **Terminal (recommended):**
     ```bash
     cursor --install-extension ~/.claude/local/node_modules/@anthropic-ai/claude-code/vendor/claude-code.vsix
     ```
   - **Or**: Cursor → Extensions (`Cmd+Shift+X`) → drag the `claude-code.vsix` file into the panel.
   - **Or**: Command Palette → “Extensions: Install from VSIX” → select the VSIX file.

3. **Restart Cursor** fully (quit and reopen).

### Step C — Use Claude Code with Cursor (no `/ide` needed)

**You don’t need to run `/ide`.** In Claude Code v2.x, the main way to use Claude with Cursor is the **extension** — that’s already “connected.”

1. **Open Claude in Cursor** (pick one):
   - Click the **Spark icon** (top-right of the editor when a file is open).
   - Click **✱ Claude Code** in the **bottom-right status bar** (works with no file open).
   - Command Palette (`Cmd+Shift+P`) → type “Claude Code” → e.g. “Open in New Tab”.

2. In that panel, Claude sees your project, open files, and selection. You’re already in sync.

**About `/ide`:** In the terminal, Claude Code v2.1 may say “/ide isn’t a recognized skill.” That’s expected — `/ide` was for connecting a **terminal** session to the IDE. The **extension** is the intended integration; use the Spark icon or status bar instead of the terminal for day-to-day use.

**Optional — terminal mode:** You can run `claude` in Cursor’s integrated terminal for a CLI-style session. The CLI may auto-integrate with Cursor when run from that terminal; if not, use the extension UI (Spark / status bar) for full integration.

---

## 2. Figma MCP (designs in Cursor)

You already have Figma MCP configured in this project.

- **Config:** `.cursor/mcp.json` → `figma-desktop` → `http://127.0.0.1:3845/mcp`
- **Check:** Cursor → **Settings → MCP**. `figma-desktop` should show a **green** dot when Figma Desktop is running with MCP enabled.
- **Workflow:** See `.cursor/FIGMA_WORKFLOW.md` (copy frame link from Figma → paste in Cursor chat → “Update the site to match this Figma frame: [link]”).

---

## 3. How it all works together

| You want to…              | Where to do it |
|---------------------------|----------------|
| Edit UI/code from a design | **Figma** → copy frame link → **Cursor** chat (Figma MCP updates code). |
| Edit code with AI in IDE  | **Cursor** (Chat / Composer). |
| Use Claude in the terminal with same files | **Cursor** → open terminal → `claude` → `/ide` → choose Cursor. |
| Deploy                    | **Cursor** → Source Control → Commit → Push → **Vercel** auto-deploys. |

- **Figma** = source of truth for visuals; Cursor reads it via Figma MCP.
- **Cursor** = main IDE; holds the repo, MCP (Figma), and the Claude Code extension.
- **Claude Code** = same project, connected to Cursor via `/ide`, so file and diff context stay in sync.
- **Vercel** = deploys on push from Cursor.

---

## 4. Quick checklist

- [ ] `cursor` in PATH (Command Palette → “Install 'cursor' command”).
- [ ] Claude Code extension installed in Cursor and Cursor restarted.
- [ ] Open Claude via **Spark icon** or **✱ Claude Code** in status bar — that’s your connection (no `/ide` needed).
- [ ] Settings → MCP: `figma-desktop` green when Figma Desktop is open.
- [ ] Optional test: paste a Figma frame link in Cursor chat and ask to update the site.

After this, Cursor, Claude Code, and Figma are connected; use the Figma workflow from `.cursor/FIGMA_WORKFLOW.md` whenever you want to sync design → code.
