# SnapSolve AI — Privacy & permissions

**Made by TarikIslam.in** · https://tarikislam.in

## What SnapSolve stores locally

- Settings and provider configuration (including API keys you enter) in `chrome.storage.local`
- Optional question history (configurable retention; clear anytime)
- Short-lived pending captures in `chrome.storage.session`

API keys are **not** perfectly secure in extension storage. Do not use shared/production secrets inside the package. Never commit keys to git.

## What leaves your browser

Only when you solve with a **non-demo / non-local** provider, and only after you allow external AI (popup, workspace, Connect AI, or Settings → Privacy):

- The question text you submit (and optional image crop)
- Minimal prompt metadata required for the model

Consent is one click (“Allow & continue”) and can be revoked anytime under Settings → Privacy. Sample answers, Ollama, and LM Studio stay on your machine.

SnapSolve does not collect browsing history in the background and does not continuously capture the screen.

## Permissions rationale

| Permission | Why |
|---|---|
| storage | Settings, history, catalogs |
| sidePanel | Workspace UI without hijacking the page |
| activeTab | Access the tab you invoked the extension on |
| scripting | Inject the content script for user-started capture |
| contextMenus | Send selected text to the workspace |
| optional host permissions | Page analysis / toolbar on sites you use |

## Host page isolation

- Content script failures are contained; they must not break the website.
- Optional toolbar uses closed Shadow DOM and does not override page CSS/JS.
- Password and payment-related fields are excluded from extraction helpers.

## Contact

Product by Tarik Islam — https://tarikislam.in
