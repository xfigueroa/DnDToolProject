# Admin System Guide

This guide explains how to use the admin system for the D&D Tool Project.

## Getting Started

### 1. Create the First Admin User

Run this command to create the initial admin user:

```bash
npm run create-admin
```

This will create an admin user with these default credentials:
- **Username:** admin
- **Email:** admin@dndtool.com  
- **Password:** AdminPassword123!

⚠️ **IMPORTANT:** Change the password immediately after first login!

### 2. Login as Admin

Use the standard auth login endpoint with admin credentials:

```bash
POST /api/auth/login
```

```json
{
  "email": "admin@dndtool.com",
  "password": "AdminPassword123!"
}
```

Save the JWT token from the response - you'll need it for all admin operations.

## Admin API Endpoints

All admin endpoints require authentication with an admin role JWT token:

```
Authorization: Bearer <your-admin-jwt-token>
```

### System Statistics

Get overall system statistics:

```bash
GET /api/admin/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": {
      "total": 15,
      "active": 12,
      "inactive": 3,
      "recent": 5,
      "byRole": {
        "user": 10,
        "dm": 4,
        "admin": 1
      }
    },
    "npcs": {
      "total": 45,
      "deleted": 8,
      "recent": 12
    }
  }
}
```

### User Management

#### List All Users

```bash
GET /api/admin/users?page=1&limit=10&role=all&search=john&sortBy=createdAt&sortOrder=desc
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Users per page (default: 10)
- `role`: Filter by role (`user`, `dm`, `admin`, or `all`)
- `search`: Search in username, email, firstName, lastName
- `sortBy`: Sort field (default: `createdAt`)
- `sortOrder`: `asc` or `desc` (default: `desc`)

#### Get Specific User

```bash
GET /api/admin/users/:userId
```

#### Create New Admin User

```bash
POST /api/admin/users/admin
```

```json
{
  "username": "newadmin",
  "email": "newadmin@example.com",
  "password": "SecurePassword123!",
  "profile": {
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Update User Role

```bash
PUT /api/admin/users/:userId/role
```

```json
{
  "role": "dm"
}
```

Valid roles: `user`, `dm`, `admin`

**Note:** You cannot demote yourself from admin role.

#### Toggle User Active Status

```bash
PUT /api/admin/users/:userId/toggle-status
```

This will activate/deactivate a user account.

**Note:** You cannot deactivate your own account.

#### Delete User

```bash
DELETE /api/admin/users/:userId
```

```json
{
  "confirm": true
}
```

**Safety Features:**
- Cannot delete yourself
- Cannot delete the last admin user
- User's NPCs are soft-deleted when user is deleted
- Requires confirmation in request body

### NPC Management

#### Manual Cleanup of Expired NPCs

```bash
POST /api/admin/npcs/cleanup
```

Removes all NPCs that have passed their permanent deletion date.

#### Trigger Automatic Cleanup

```bash
POST /api/admin/npcs/auto-cleanup
```

Manually triggers the automatic cleanup process.

## Security Features

### Role-Based Access Control

1. **Admin Role Required:** All admin endpoints check for admin role
2. **Self-Protection:** Prevents admins from demoting/deleting themselves
3. **Last Admin Protection:** Prevents deletion of the last admin user

### Authentication

- Uses JWT tokens with role verification
- Tokens must be included in Authorization header
- Invalid or missing tokens return 401 Unauthorized
- Non-admin roles return 403 Forbidden

## Common Use Cases

### Promote User to DM

1. Get user ID from user list: `GET /api/admin/users?search=username`
2. Update their role: `PUT /api/admin/users/:id/role` with `{"role": "dm"}`

### Handle Problem User

1. Find the user: `GET /api/admin/users?search=problematic-user`
2. Deactivate account: `PUT /api/admin/users/:id/toggle-status`
3. If needed, delete user: `DELETE /api/admin/users/:id` with `{"confirm": true}`

### Create Additional Admin

1. Use: `POST /api/admin/users/admin` with user details
2. New admin can immediately access all admin functions

### Monitor System Health

1. Check stats: `GET /api/admin/stats`
2. Review recent users and NPC creation trends
3. Run cleanup if needed: `POST /api/admin/npcs/cleanup`

## Error Handling

Common error responses:

```json
{
  "success": false,
  "message": "Access denied. Admin privileges required.",
  "error": "Forbidden"
}
```

```json
{
  "success": false,
  "message": "Cannot demote yourself from admin role"
}
```

```json
{
  "success": false,
  "message": "User not found"
}
```

## Best Practices

1. **Change Default Password:** Always change the initial admin password
2. **Regular Monitoring:** Check system stats periodically
3. **User Role Management:** Promote trusted users to DM role as needed
4. **Cleanup Management:** Monitor and run cleanup as needed
5. **Admin Account Security:** Use strong passwords and limit admin accounts

## Troubleshooting

### "Access denied" errors
- Verify you're using the correct JWT token
- Ensure the token user has admin role
- Check token hasn't expired

### Cannot delete user
- Verify you're not trying to delete yourself
- Check if it's the last admin user
- Ensure confirmation is included in request

### User creation fails
- Check for duplicate username/email
- Verify all required fields are provided
- Ensure password meets minimum requirements
