# Figma Desktop → Cursor → Vercel workflow

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
