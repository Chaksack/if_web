# Loan Types Migration Guide

This guide explains how to migrate from the old loan types to the new Ghana-specific loan types.

## New Loan Types

The application now uses the following loan types:

1. **Salary Loan** (`salary_loan`)
2. **Group Loan** (`group_loan`)
3. **Tuition Loan** (`tuition_loan`)
4. **Rideshare Loan** (`rideshare_loan`)
5. **Personal Loan** (`personal_loan`)

## Old Loan Types (Deprecated)

The following loan types are no longer supported:
- `personal` → Migrated to `personal_loan`
- `auto` → Migrated to `rideshare_loan`
- `mortgage` → Migrated to `personal_loan`
- `business` → Migrated to `group_loan`
- `other` → Migrated to `personal_loan`

## Migration Steps

### 1. Update Database Schema

The database schema has been updated. Run the migration:

```bash
cd backend
npm run db:migrate
```

This will update the TypeScript types, but **will not** update existing data in the database.

### 2. Migrate Existing Data

If you have existing applications with old loan types, run the migration script:

```bash
cd backend
npm run db:migrate-loan-types
```

**⚠️ Important:** Review the migration mappings:
- `personal` → `personal_loan` ✅
- `auto` → `rideshare_loan` ⚠️ (Review if correct)
- `mortgage` → `personal_loan` ⚠️ (Review if correct)
- `business` → `group_loan` ⚠️ (Review if correct)
- `other` → `personal_loan` ⚠️ (Review if correct)

You may need to manually update some applications after running the migration.

### 3. Verify Changes

1. **Backend**: Check that validation accepts new loan types
2. **Frontend**: Verify dropdown shows new loan types
3. **Database**: Confirm existing data is migrated correctly

## Code Changes

### Backend

- ✅ Database schema updated (`lib/db/schema.ts`)
- ✅ Validation schema updated (`lib/utils/validation.ts`)
- ✅ Loan type utilities added (`lib/utils/loan-types.ts`)
- ✅ Dashboard displays formatted loan types

### Frontend

- ✅ Create application screen updated with new loan types
- ✅ Application detail screen uses formatted loan types
- ✅ Loan type utilities added (`lib/utils/loan_types.dart`)

## Testing

After migration:

1. Create a new application with each loan type
2. Verify loan types display correctly in:
   - Create application screen
   - Application detail screen
   - Dashboard application list
   - Dashboard application detail page

## Rollback (If Needed)

If you need to rollback:

1. Revert code changes
2. Run database migration to restore old schema
3. Restore data from backup if needed

## Notes

- The migration script provides default mappings, but you should review them
- New applications will use the new loan types
- Old applications will be migrated automatically (if migration script is run)
- Loan type labels are formatted for display (e.g., `salary_loan` → "Salary Loan")

