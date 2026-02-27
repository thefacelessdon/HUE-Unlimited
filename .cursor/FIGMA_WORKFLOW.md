# Figma Desktop → Cursor → Vercel workflow

For **full setup** (Cursor + Claude Code + Figma MCP together), see **`.cursor/SETUP_CURSOR_CLAUDE_FIGMA.md`**.

---

## Sending your HUE site into Figma (code → design)

You can turn the live site into **editable Figma frames** in two ways:

### Option 1 — Claude Code to Figma (official)

Figma’s native flow: capture the UI from a browser (production, staging, or localhost) and send it into Figma as editable frames.

1. In **Claude Code** (e.g. run `claude` in Cursor’s terminal, or use the Claude Code panel), capture the page from your running site (e.g. `http://localhost:3000` or your Vercel URL).
2. **Send or copy** the captured screen to your clipboard.
3. **Paste** into any Figma file — it becomes an editable frame you can duplicate, refine, and share.
4. For multi-step flows, you can capture multiple screens in one session and paste them into Figma.

Details: [From Claude Code to Figma — Figma Blog](https://www.figma.com/blog/introducing-claude-code-to-figma/). Roundtrip back to code: use the Figma MCP (paste a frame link in Cursor and ask to update the site).

### Option 2 — html.to.design plugin

1. **Get a URL** for the site (Vercel URL or `npm run dev` → `http://localhost:3000`).
2. **In Figma:** Plugins → search **html.to.design** → Run.
3. Use the **URL** option and enter that URL → **Create**. The plugin turns the page into editable Figma layers.
4. Edit in Figma, then use the “Daily workflow” below to push design changes back to code (copy frame link → Cursor → “Update the site to match this Figma frame”).

---

## Setup (one-time)

1. **Figma Desktop**  
   Install/use Figma Desktop and enable its MCP server (if the app has a setting for it).

2. **Cursor MCP**  
   This project includes `.cursor/mcp.json` with the `figma-desktop` server:
   - URL: `http://127.0.0.1:3845/mcp`
   - If you use global MCP config instead, add the same `figma-desktop` entry there.

3. **Restart Cursor**  
   After changing MCP config, restart Cursor.

4. **Verify**  
   Settings → MCP: `figma-desktop` should show a **green** dot.  
   If it’s **red**, ensure Figma Desktop is running and its MCP server is enabled.

---

## Daily workflow

1. Make design changes in **Figma Desktop**.
2. Select the frame you changed.
3. **Copy the frame link**: right-click frame → **Copy link**.
4. In **Cursor** (e.g. Cmd+L): paste the link and say:
   > Update the site to match this Figma frame: [link]
5. Cursor uses the Figma MCP to read the design and update the code.
6. Review the changes in Cursor.
7. **Push to GitHub**: Source Control → commit message → **Commit** → **Push**.
8. **Vercel** auto-deploys; preview link updates in ~60 seconds.
