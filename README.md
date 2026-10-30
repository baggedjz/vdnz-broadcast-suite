# VDNZ Pro Development — Staging Manager

This is an independent read-only Cloudflare Worker (NOT the live judging Worker). No Discord messages, scoring edits, Google Sheets writes, tokens or webhooks.

Features: Top 32 / Top 16 / Great 8 / Final 4 / Finals, 8-driver staging groups, current and next groups, local readiness checks, copy group lists, 45-second refresh, optional manual driver entry when the official feed is unavailable.

To publish: use the Cloudflare deploy link for this dedicated Git branch. In Cloudflare, select your account and deploy as a NEW Worker named vdnz-pro-development-staging. Its workers.dev URL will be the live web link. Do NOT deploy over vdnz-pro-development-judging.

Default official read-only source: https://judge.virtualdriftnz.co.nz/api/overlay/battle-tree-data?round=5 . If the live source has a different hostname, set BATTLE_TREE_ORIGIN in the new Worker's variables to its HTTPS origin only (it must end with .virtualdriftnz.co.nz or .workers.dev).

Manual entries and checkboxes are local to each browser, not synced between staff. Official results remain authoritative. This branch is isolated from the original repository's active branches.
