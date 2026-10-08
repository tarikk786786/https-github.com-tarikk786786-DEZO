---
name: ecommerce-payments
description: E-commerce catalogs, checkout, and payment gateways (Stripe et al.).
---

# E-commerce / payments

- Never log full card data; use PCI-compliant providers (e.g. Stripe).
- Idempotent payment intents; verify webhooks with signatures.
- Model catalog/inventory/orders as explicit domain entities.
