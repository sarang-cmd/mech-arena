# Vertical Slice Implementation Plan

## Scope Targets

- One playable arena (`Volcanic Foundry`) with hazards and destructible cover hooks.
- One player chassis with three weapons.
- Three enemy archetypes with behavior profiles.
- Localized part-based damage + heat system.
- Garage + post-match reward flow.

## Delivery Milestones

1. **Prototype Combat Loop**
   - Input -> movement -> targeting -> shooting -> hit registration.
   - Hook damage and heat events into `EventBus`.
2. **Localized Damage**
   - Part state UI warnings.
   - Functional degradation (weapon arm disable, leg penalty, core death).
3. **Arena Systems**
   - Hazard triggers + objective relay ownership.
   - Destructible cover state transitions.
4. **AI Encounters**
   - Utility scoring for distance, heat, cover, target weakness.
   - Wave orchestration from `waveSetVerticalSlice`.
5. **Meta/Progression**
   - Mission results pipeline to reward calculator.
   - Save profile with versioned data schema.

## Technical Notes

- Keep deterministic combat calculations server-friendly for eventual PvP migration.
- Use typed data catalogs for balance iterations.
- Keep renderer and simulation boundaries clean for replay tooling.
