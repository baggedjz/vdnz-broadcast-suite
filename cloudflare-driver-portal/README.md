# VDNZ Pro Championship — Driver Portal (Cloudflare staging)
25 October 2026. This is an isolated Cloudflare-native staging build. The original Pro Championship v33 broadcast suite remains a separate source package; this is a new driver-facing portal, NOT a full broadcast suite migration.

## Staging resources (already created and verified)
Worker: vdnz-pro-championship-staging
URL: https://vdnz-pro-championship-staging.dylwhare.workers.dev
D1: vdnz-pro-championship-staging (d4cf3b35-e42d-4d4a-927f-f1966931c93d)
R2: vdnz-pro-championship-staging
Pro Development: NO bindings, writes, routes, or links.

## Set up on Windows PowerShell (from the existing staging folder)
1. Download the source and public/ assets from this folder into C:\Users\<you>\Desktop\VDNZ-Pro-Staging.
2. Run: npx --yes wrangler d1 execute vdnz-pro-championship-staging --remote --file .\migration.sql
3. Set an ORIGINAL, strong, private staff password:
   npx --yes wrangler secret put PORTAL_ADMIN_PASSWORD --name vdnz-pro-championship-staging
   Enter at least 16 characters when prompted. The existing flawed VDNZ_PORTAL_ADMIN_KEY is unused by this application. Delete it through Wrangler when possible.
4. Run: npx --yes wrangler deploy --config .\wrangler.jsonc
5. Check /health responds with service "VDNZ Pro Championship Driver Portal" and ok=true.
6. Open the root URL. Create a test driver account, sign in under Officials to approve it, then test profile, briefing questions, protest, interview, downloads and group generation.

## Implemented staging capabilities
- Mobile responsive installable Driver Portal UI, no separate "Companion" product.
- D1 password-authenticated driver account registration, sign-in and sign-out.
- Staff password sign-in (Cloudflare secret), approval and suspension.
- Driver profile with team, bio, equipment, sim history, goals, real cars.
- Briefing overview, time, track name, HTTPS line map, server link and gated server password.
- Driver briefing questions, moderated judge questions, protests, tech requests; staff response and status.
- Interview invitations to approved drivers; accept/decline and responses.
- Staff in-app notifications and driver notification history.
- Four balanced qualifying groups (<=20 per group), based only on staff-marked HERE drivers, with random, low-points-first or high-points-first ordering.
- Staging-only roll call; permanent master records not removed.
- Separate car pack, track and line map versioned asset list with links or private R2 storage keys.
- HTTPS-only scrutineering publish API; separate PRO_SCRUTINEERING_SYNC_KEY Cloudflare secret required and the scrutineering app must be configured to call it.

## NOT YET CONNECTED: DO NOT CLAIM PRODUCTION READINESS
- Existing VDNZ website Driver Portal user accounts, production profile/ID sync, official driver photo cutout.
- Live official Pro Championship workbook, including the automatic qualifying X marking and points reading.
- Live Pro Development: strictly unchanged.
- Actual official full broadcast suite / OBS / production.
- Native iOS/Android push (currently in-app notifications only).
- Scrutineering desktop app callback until its secret and PRO event payload are connected.
- Full car pack multipart upload, image processing, official points/season/licence history.
- Password reset via verified email, verified driver identity, email rate limits and external-account linkage. Staging accounts must not be treated as validated competition entrants.
- Security hardening and operational launch review before any public custom-domain cutover.

## Recommended smoke test
1. GET /health => ok true and expected service.
2. Unauthenticated /api/dashboard => 401.
3. Driver signup => status Pending; no downloads until staff approval.
4. Officials login + approve driver => downloads permitted.
5. Publish a test track via staff HTTPS link; driver can see /api/download?id=... .
6. Publish round briefing and server link; driver dashboard shows it, server password only after approval.
7. Driver sends judges question/protest; staff sees it and answers; driver notification appears.
8. Staff marks Here; group generation distributes attendance across four groups.
9. Confirm live official Pro Development systems and live workbook show no changes.
