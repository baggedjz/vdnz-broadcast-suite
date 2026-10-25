# VDNZ Pro Championship — exact Pro Development parity (required baseline)

Status: **NOT IMPLEMENTED / NOT APPROVED FOR LIVE USE**. The abandoned custom staging judging UI and /api/pro/* APIs must remain disabled. No promotional "complete" claim.

## Source of truth

- Primary behavioral/UI reference: `VDNZ_PRO_DEV_v4.51.5_DISCORD_STAGING_AND_CHAT_FIX.zip` (26/26 reference tests passed locally 2026-10-25).
- Source modules: `src/index.js`, `src/pages.js`, `src/qualifyingIdentity.js`, `src/battleLeadOrder.js`, `src/discordStaging.js`, `src/commentaryProfiles.js`, `src/battleTreeTemplate.js`.
- Existing PRO Championship canonical assets/data: `VDNZ_Pro_Championship_v33_Driver_Portal_Season_Downloads.zip`.
- The **Pro Development production Worker, R2, Durable Object and spreadsheet are OFF LIMITS**. Never import production role tokens from the reference `src/config.js`.
- Never deploy to BBS, Netlify, Floot or an unrelated Worker.
- Do not touch PRO Development Google Spreadsheet ID `1vVPJBKzi9XAWB5cGIlianxba2mJe8ffjQ3lAJDllIOk`.

## Non-negotiable copy of existing workflow

1. **Control / Qualifying, Control / Battle, Control / Settings:** same actual Pro Development interface and actions; do not create a different selection/scoring model.
2. **Judge 1/2/3 / Head Judge:** exact mobile and desktop view behavior, judge locks, run 1/run 2, note entry (one visible note per run), saved note history, private voice recordings and transcription, head-judge escalation as in source. No invented 60/20/20 score components or voting changes.
3. **Qualifying:** current Pro Dev group handling, switch between runs, automatic reveals, run/driver lock, immutable canonical driver identity. Moving a driver between the 20-slot groups must never reassign scores.
4. **Battles:** bracket as source of truth, lead/chase, higher qualifier leads run 1 and swaps run 2, BYE/PASS, three locks, OMT and head judge, atomic checkbox/finishing-result sync, retries without revote.
5. **Commentary:** replicate the real `commentaryPage()` panels including current/up next, qualifying results, driver profiles, battle tree, scores, live staff chat and the **JUDGES OVERLAY CUE**. Preserve HOLD/countdown/OVERLAY LIVE/CALL THE RESULT NOW instructions keyed to actual OBS Program acknowledgement.
6. **Production + media:** match actual Pro Dev stage and round overlays, qualifying/battle/leaderboard/VS/bracket/points/standings PNG exports, Thrill Supply placements, scroll behavior and clean layering. No generic replacement visuals. Preserve race-director live/test mode, return to program, cue safety, and group staging.
7. **Discord:** preserve restricted staging manager, named role, 8-driver groups, announcement de-duplication, @mentions via Discord IDs and zero external posting during Test Mode.
8. **Auth:** use dedicated Pro Championship roles/session/keys, never reuse leaked reference Pro Dev tokens. Only staff/head judge can make formal protest decisions.
9. **Source of truth:** existing PRO Championship master workbook ID `1KoAzDD08oZiTRu_dZ2QR1Z3kCI4GRD18GKXm7VXwBUI`; scores and bracket/results remain bound to canonical permanent VDNZPC driver IDs, not slot positions. No authoritative writes until off-air tests pass.

## New integrations requested, *without replacing the above*

- **Protests/judge questions:** submitted from the Driver Portal `portal_messages`, surfaced in the existing-style Judge/Head Judge pages as an additional panel; judge private review notes; Head Judge/Officials final replies through the existing Portal notification/response workflow; do not modify judging score calculations.
- **Commentator interviews:** invite an approved driver from existing-style `commentaryPage()`, write to `portal_invites` + `portal_notifications`; the driver accepts/declines via existing `/api/interview/respond`; display Pending/Accepted/Declined and interview queue to commentators. Do not duplicate the driver or build a competing invitation store.
- **Main Hub:** one consistent sidebar and direct internal Pro Championship links, never BBS or Pro Development links for operational work.

## Required staging architecture, before enabling judging

- A **separate Pro Championship Durable Object namespace / room**, storage and event state, not the live Pro Development namespace. Shadow source must not write official records until test-mode wiring is verified.
- Adapter to PRO Championship workbook's exact layout, IDs, battle tree and points (do not swap the sheet ID blindly).
- Explicit OBS Program acknowledgement before cue text calls a result; verified driver, score and battle events; tested on both desktop and mobile.
- Secure crew session/role mapping; judge actions never authorized by another crew's link.
- Copy the real Pro Dev page/module code and behavior. No synthetic scoring table, no independent computed standings.
- Preserve Driver Portal signup/profile/briefing/attendance without replacing existing working routes.

## Acceptance tests before promotion

- Every existing Pro Development test carried forward or adapted (26 reference tests currently pass).
- Exact page/route and panel parity verified visually against reference `src/pages.js`.
- Qualifying run 1 and 2, score lock and reveal timing, same 20-slot group data after row rearrangement.
- Battle run 1/2, OMT, head judge, BYE, finish/checkbox atomic sync, retry and conflicts.
- Three independent judge roles, saved notes and voice on desktop/mobile, correct permissions.
- Protest from driver -> judge review -> official reply -> driver sees reply.
- Commentary invite -> driver accepts/declines -> commentary queue refresh.
- OBS scene-safe graphic appearance then commentary "CALL THE RESULT NOW"; correct auto-hide and return.
- Media hub overlays and exports visually match; no transparent/bleeding errors.
- Zero Pro Development writes and no accidental Discord sends; explicit backup + user approval to go live.

## Rollback / current state

The custom `/pro/*` and `/api/pro/*` endpoints are withdrawn in the staged `index.js`; database tables left in place and untouched to avoid data loss. The Driver Portal and Main Hub core remain functional. Use `withdraw-unapproved-judging.ps1` to apply the staged withdrawal; DO NOT run the retired `deploy-pro-workflows.ps1`. A real PRO Development parity port has **not** been deployed.
