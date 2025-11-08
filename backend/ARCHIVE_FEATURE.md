# Archive Feature

The archive feature allows office staff to organize applications by moving completed or old applications to a separate archived section.

## Features Implemented

### 1. Database Schema
- Added `is_archived` boolean field (default: false)
- Added `archived_at` timestamp field
- Added `archived_by` user reference field
- Created index on `is_archived` for performance

### 2. Backend API
- **GET /api/applications** - Updated to support `archived` query parameter
  - `archived=false` (default) - Returns only active applications
  - `archived=true` - Returns only archived applications
- **POST /api/applications/archive** - Bulk archive/unarchive endpoint
  - Accepts array of application IDs and archive boolean
  - Only accessible to office_staff, manager, and admin roles
  - Tracks who archived and when

### 3. Frontend Dashboard
- **Tabs**: Switch between "Active Applications" and "Archived Applications"
- **Checkboxes**: Select individual or all applications on current page
- **Bulk Actions**:
  - Archive button (for active tab)
  - Unarchive button (for archived tab)
  - Clear selection button
- **Selection Indicator**: Orange banner shows number of selected applications
- **Confirmation**: Prompts user before archiving/unarchiving

## Setup Instructions

### 1. Run Database Migration

```bash
cd backend
npm run db:add-archive-fields
```

This will:
- Add the `is_archived`, `archived_at`, and `archived_by` columns
- Create an index on `is_archived`
- All existing applications will be marked as not archived (default)

### 2. Restart Backend

```bash
npm run dev
```

### 3. For Production (Vercel)

Push the schema changes:
```bash
npm run db:migrate
```

Or run the migration script on Vercel after deployment.

## Usage

### For Office Staff

1. **Navigate to Applications page**
2. **Select applications**:
   - Check individual checkboxes
   - Or use the header checkbox to select all on current page
3. **Click "Archive Selected"** button
4. **Confirm** the action
5. **View archived applications** by clicking the "Archived Applications" tab

### To Unarchive

1. Go to "Archived Applications" tab
2. Select applications to restore
3. Click "Unarchive Selected"
4. Confirm the action

## Permissions

- **Archive/Unarchive**: office_staff, manager, admin
- **View Active**: All authenticated users (filtered by role)
- **View Archived**: All authenticated users (filtered by role)

## Notes

- Archiving does not delete applications
- Archived applications are excluded from active views by default
- All application data is preserved when archived
- Pagination works independently for active and archived tabs
- Search and status filters work within each tab

