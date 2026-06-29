# SimpleUltimateStats — agent guide

## Architecture

Next.js 16 App Router + Neon serverless Postgres via Drizzle ORM.

### Layer responsibilities

| Layer | Path | Rule |
|---|---|---|
| DB schema | `db/schema/simpleUltiStats.ts` | Source of truth for all tables |
| Server actions | `actions/` | All DB reads/writes live here; every file needs `"use server"` |
| Zod validation | `schemas/` | Validate inputs to server actions before they hit the DB |
| UI | `app/` | Consumes server actions only — never imports from `db/` directly |

### Auth

Every user-scoped query must start with:

```ts
const userId = await getAppUserId(); // from actions/authActions.ts
```

This resolves the internal `users` table ID from the Neon Auth session. Forgetting it means queries silently run without a user filter.

### Copy / UI strings

All user-facing strings live in `app/_assets/strings`. Do not write inline strings in components — add new keys there instead.

### Database changes

Use `pnpm drizzle-kit push` to apply schema changes. This project does not use `migrate`.

---

## HeroUI

This project uses [HeroUI](https://heroui.com) (`@heroui/react`) for all UI components. **Do not reach for plain HTML elements or custom CSS when a HeroUI component exists.** Import from `@heroui/react` unless the component has its own sub-path (e.g. `@heroui/react/table`).

### Available components (use these first)

**Layout & surfaces**
- `Surface` — card/panel container, use `variant="default"` for white cards
- `Separator` — horizontal/vertical dividers

**Typography**
- `Typography` — headings and body text

**Forms**
- `Form` — wraps a `<form>`, handles submit
- `TextField` + `Label` + `Input` + `FieldError` — text inputs with validation
- `RadioGroup` + `Radio` + `Radio.Control` + `Radio.Indicator` + `Radio.Content` — radio buttons (see `EventFormElements.tsx` for the full pattern)
- `ComboBox.Root` + `ComboBox.InputGroup` + `ComboBox.Trigger` + `ComboBox.Popover` — searchable dropdown (see `PlayerPicker` in `EventFormElements.tsx`)
- `Select` — simple dropdown
- `Checkbox` / `CheckboxGroup`
- `Switch` / `SwitchGroup`
- `Textarea`
- `NumberField`
- `SearchField`

**Buttons & actions**
- `Button` — use `variant="danger"` for destructive actions, `size="lg"` for primary CTAs, `fullWidth` when spanning a container
- `ButtonGroup`
- `ToggleButton` / `ToggleButtonGroup`
- `Link`

**Feedback & status**
- `Alert` — use `status="success" | "danger" | "accent"` with `Alert.Indicator`, `Alert.Content`, `Alert.Title`, `Alert.Description`
- `Spinner` — inline loading indicator, use inside `Alert.Indicator` for pending states
- `Skeleton` — loading placeholder for content areas
- `Toast`
- `Progress` / `ProgressCircle`
- `Badge`
- `Chip`

**Data display**
- `Table` / `Table.Content` / `Table.Header` / `Table.Column` / `Table.Body` / `Table.Row` / `Table.Cell` — compound table component (see `EventTable.tsx` for the pattern)
- `Avatar`
- `Meter`

**Overlays**
- `Modal`
- `Drawer`
- `Popover`
- `Tooltip`
- `Dropdown` / `Dropdown.Item`
- `AlertDialog`

**Navigation**
- `Tabs`
- `Breadcrumbs`
- `Pagination`

**Other**
- `Card`
- `Accordion` / `DisclosureGroup`
- `Calendar` / `DatePicker` / `DateRangePicker`
- `EmptyState` — use for empty list states instead of plain text
- `Kbd` — keyboard shortcut display

### Patterns already in the codebase

```tsx
// Pending + success + error states (ClientGame.tsx)
<Alert status="accent"><Alert.Indicator><Spinner size="sm" /></Alert.Indicator>...</Alert>
<Alert status="success"><Alert.Indicator />...</Alert>
<Alert status="danger"><Alert.Indicator />...</Alert>

// Data table (EventTable.tsx, pastGames pages)
<Table><Table.Content aria-label="...">
  <Table.Header><Table.Column isRowHeader>...</Table.Column></Table.Header>
  <Table.Body>{rows.map(r => <Table.Row key={r.id}><Table.Cell>...</Table.Cell></Table.Row>)}</Table.Body>
</Table.Content></Table>

// Combobox player picker (EventFormElements.tsx)
<ComboBox.Root items={players} name="player" allowsCustomValue formValue="text">
  <Label>...</Label>
  <ComboBox.InputGroup><Input /><ComboBox.Trigger /></ComboBox.InputGroup>
  <ComboBox.Popover><ListBox>{players.map(p => <ListBoxItem key={p.name}>{p.name}</ListBoxItem>)}</ListBox></ComboBox.Popover>
</ComboBox.Root>
```

---

## Adding a new event type

Touch all of these — missing any one breaks the flow:

1. `app/game/types.ts` — add to `eventTypes` const and the `GameEvent` union
2. `app/game/constants.ts` — add any new outcome/reason enums
3. `schemas/` — create a new Zod schema file
4. `app/game/_components/EventFormElements.tsx` — add a new `case` in the switch
5. `app/game/ClientGame.tsx` — add a button entry in `eventButtons`

---

## Tests

Vitest + jsdom. Run with `pnpm test`. Mock data lives in `mocks/`.
