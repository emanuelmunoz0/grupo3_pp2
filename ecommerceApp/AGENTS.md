# Project Guidelines

## Architecture

- This workspace has two main parts: `backend/` for the Express + Sequelize API and `frontend/` for the static UI served by `backend/server.js`.
- Backend source code lives under `backend/src/` with a standard split by `routes/`, `controllers/`, `models/`, `middlewares/`, `config/`, and `utils/`.
- Prefer fixing behavior at the backend source of truth when possible instead of patching frontend symptoms.
- Product/category behavior is data-driven through `Producto.id_categoria`; category filtering uses `GET /api/productos?id_categoria=<id>`.

## Build and Validate

- Run Node and npm commands from `backend/`.
- This repository is stored under WSL. Prefer running project commands inside WSL paths instead of Windows PowerShell on UNC paths.
- Start the app with `npm start` from `backend/`.
- There is no real automated test suite yet. After changes, prefer focused validation such as file error checks, targeted route checks, or a small manual flow in the UI.

## Conventions

- Use ES modules and preserve the current import/export style.
- Keep domain naming in Spanish, matching the existing models, controllers, routes, and JSON messages.
- Preserve existing Sequelize field names such as `id_categoria`, `validoDesde`, `validoHasta`, and `role` unless the task explicitly requires a schema change.
- Product create, update, and delete routes are protected with JWT auth and admin role checks.
- The seed currently creates two categories, `Calefacción` and `Cocina`, plus admin and client demo users.

## Documentation

- See `README.md` for setup, environment variables, seeded credentials, available routes, and current system behavior.
