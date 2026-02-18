# Health Check API

Endpoint for monitoring server health and status.

---

## Health Check

Returns the current health status of the server including MongoDB connection state.

### Endpoint

```
POST /api/health
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
curl -X POST http://localhost:3000/api/health \
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
    "status": "ok",
    "timestamp": "2024-12-18T10:30:00.000Z",
    "uptime": 3600.123,
    "mongodb": "connected"
  }
}
```

---

### Response Fields

| Field            | Type    | Description                                        |
| ---------------- | ------- | -------------------------------------------------- |
| `success`        | boolean | Indicates if request succeeded                     |
| `data.status`    | string  | Server status (`"ok"` or `"error"`)                |
| `data.timestamp` | string  | Current server time in ISO format                  |
| `data.uptime`    | number  | Server uptime in seconds                           |
| `data.mongodb`   | string  | MongoDB status (`"connected"` or `"disconnected"`) |

---

### MongoDB Status Values

| Value          | Description                       |
| -------------- | --------------------------------- |
| `connected`    | Successfully connected to MongoDB |
| `disconnected` | Not connected to MongoDB          |

---

### Example Responses

#### Healthy Server (MongoDB Connected)

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2024-12-18T14:25:30.500Z",
    "uptime": 7200.456,
    "mongodb": "connected"
  }
}
```

#### Server Running (MongoDB Disconnected)

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2024-12-18T14:25:30.500Z",
    "uptime": 120.789,
    "mongodb": "disconnected"
  }
}
```
