# Firestore public-read inventory and hardening plan

This inventory reflects what is publicly readable per `firestore.rules` before this migration.

## Previously public-read surfaces

### `meta/{docId}` (all docs)
- `personalInfo` fields (from app model):
  - `name`
  - `title`
  - `email` ⚠️ sensitive
  - `phone` ⚠️ sensitive
  - `location`
  - `linkedin`
  - `summary`
- `elixiaryVenture` fields (from app model):
  - `title`, `tagline`, `description`, `modules`, `techStack`, `website`, `socials`, `metrics`

### `experiences/{docId}`
- `company`, `location`, `order`, `positions[]`

### `projects/{docId}`
- `title`, `description`, `impact`, `category`, `problem`, `solution`, `skills[]`

### `education/{docId}`
- `degree`, `institution`, `period`

### `certifications/{docId}`
- `name`, `issuer`, `year`

### `skills/{docId}`
- `category`, `items[]`

## New public-safe + private split

### Public
- `meta/personalInfoPublic`
  - `name`, `title`, `summary`, `location`, `linkedin`
- `meta/elixiaryVenture`
- `experiences/*`
- `projects/*`
- `education/*`
- `certifications/*`
- `skills/*`

### Private (non-public)
- `privateMeta/personalContact`
  - `email`, `phone`
  - backend/admin access only (Admin SDK + IAM)
