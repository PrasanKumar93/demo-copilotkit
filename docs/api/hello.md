# Hello API

Simple endpoint for testing API connectivity.

---

## Hello World

Returns a simple "Hello World" message.

### Endpoint

```
POST /api/hello
```

### Headers

| Header         | Value              | Required |
| -------------- | ------------------ | -------- |
| `Content-Type` | `application/json` | Yes      |

---

### Request Body

No request body required. Empty object `{}` can be sent.

---

### Sample Request

```bash
curl -X POST http://localhost:3000/api/hello \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### Success Response

**Status Code:** `200 OK`

```json
{
  "success": true,
  "data": {
    "message": "Hello World"
  }
}
```

---

### Response Fields

| Field          | Type    | Description                    |
| -------------- | ------- | ------------------------------ |
| `success`      | boolean | Indicates if request succeeded |
| `data.message` | string  | Hello World message            |

---

### Use Cases

- Verify API is running
- Test network connectivity
- Validate API response format
- Health check (basic)
