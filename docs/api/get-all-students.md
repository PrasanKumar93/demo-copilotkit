# Get All Students API

Retrieves all student records from the database.

---

## Endpoint

```
GET /api/getAllStudents
```

---

## Sample Request

```bash
curl -X GET http://localhost:3000/api/getAllStudents
```

---

## Success Response

**Status Code:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "_id": "6761a2b3c4d5e6f7g8h9i0j1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@university.edu",
      "dateOfBirth": "2000-05-15T00:00:00.000Z",
      "studentId": "STU-2024-001",
      "phone": "1234567890",
      "address": {
        "street": "123 College Ave",
        "city": "Boston",
        "state": "MA",
        "zipCode": "02101",
        "country": "USA"
      },
      "enrollmentDate": "2024-09-01T00:00:00.000Z",
      "course": "Computer Science",
      "department": "Engineering",
      "year": 1,
      "guardianName": "Jane Doe",
      "guardianPhone": "0987654321",
      "createdAt": "2024-12-18T10:30:00.000Z",
      "updatedAt": "2024-12-18T10:30:00.000Z"
    },
    {
      "_id": "6761a2b3c4d5e6f7g8h9i0j2",
      "firstName": "Alice",
      "lastName": "Smith",
      "email": "alice.smith@university.edu",
      "dateOfBirth": "2001-03-20T00:00:00.000Z",
      "studentId": "STU-2024-002",
      "phone": "5551234567",
      "address": {
        "street": "456 University Blvd",
        "city": "Cambridge",
        "state": "MA",
        "zipCode": "02139",
        "country": "USA"
      },
      "enrollmentDate": "2024-09-01T00:00:00.000Z",
      "course": "Data Science",
      "department": "Computer Science",
      "year": 2,
      "createdAt": "2024-12-17T09:00:00.000Z",
      "updatedAt": "2024-12-17T09:00:00.000Z"
    }
  ]
}
```

---

## Error Responses

### Database Error

**Status Code:** `500 Internal Server Error`

```json
{
  "success": false,
  "error": "Database connection failed"
}
```

---

## Response Fields

| Field             | Type   | Description                  |
| ----------------- | ------ | ---------------------------- |
| `_id`             | string | MongoDB document ID          |
| `firstName`       | string | Student's first name         |
| `lastName`        | string | Student's last name          |
| `email`           | string | Student's email address      |
| `dateOfBirth`     | string | Date of birth (ISO format)   |
| `studentId`       | string | Unique student identifier    |
| `phone`           | string | Phone number                 |
| `address`         | object | Student's address            |
| `address.street`  | string | Street address               |
| `address.city`    | string | City name                    |
| `address.state`   | string | State name                   |
| `address.zipCode` | string | Zip code                     |
| `address.country` | string | Country                      |
| `enrollmentDate`  | string | Enrollment date (ISO format) |
| `course`          | string | Course name                  |
| `department`      | string | Department name              |
| `year`            | number | Year of study (1-6)          |
| `guardianName`    | string | Guardian's name (optional)   |
| `guardianPhone`   | string | Guardian's phone (optional)  |
| `createdAt`       | string | Record creation timestamp    |
| `updatedAt`       | string | Record last update timestamp |

---

## Notes

- Results are sorted by `createdAt` in descending order (newest first)
- Returns an empty array if no students exist in the database
