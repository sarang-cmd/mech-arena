# Mech Arena (Web Vertical Slice Scaffold)

A TypeScript-first architecture scaffold for a browser-based 3D mech combat game focused on tactical arena battles, modular loadouts, localized damage, and heat management.

## Current Scope

This repository currently includes:

- A modular code layout aligned to the combat game spec.
- Typed gameplay domain models for mechs, parts, weapons, arenas, and progression.
- A lightweight event bus for deterministic-ish gameplay event flows.
- Mech runtime state handling with localized subsystem disable effects and heat/cooling simulation.
- Loadout validation for slot compatibility, mass limits, and power budget checks.
- Utility-AI action scoring and hazard damage event computation for arena scripting.
- Seed game-balance data for chassis, weapons, arena setup, and enemy waves.
- A milestone-driven implementation plan for the first vertical slice.

## Project Structure

```txt
src/
  core/
    engine/
    events/
  gameplay/
    mech/
    weapons/
    ai/
    arena/
  meta/
  ui/
  data/
```

## Scripts

- `npm run typecheck` – runs TypeScript checks.
- `npm run lint` – runs ESLint.
- `npm run test` – runs Vitest unit tests.

## Next Steps

1. Integrate a rendering layer (Babylon.js or PlayCanvas).
2. Implement the mech movement controller and camera in `core/engine`.
3. Wire weapon firing and hazard ticks into mech state + event bus orchestration.
4. Build a basic HUD and garage menu in `ui`.
