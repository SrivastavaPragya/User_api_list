## API Endpoints

### Create List (createList)

- **Method:** `POST`
- **URL:** `http://localhost:3000/lists`
- **Body (raw JSON):**
  ```json
  {
    "title": "Employee List",
    "customProperties": [
      {
        "title": "city",
        "fallbackValue": "Unknown"
      },
      {
        "title": "department",
        "fallbackValue": "General"
      }
    ]
  }

Description: This endpoint is used to create a new list with the specified title and custom properties.

Upload Users to List (createUserList)

- **Method:** `POST`
- **URL:**: http://localhost:3000/lists/6647119876647516f1f409f1 (replace 6647119876647516f1f409f1 with the actual list ID)
- **Body (form-data):**

Key: file, Type: file, Value: Select a CSV file


Description: This endpoint is used to upload users to a specific list using a CSV file. Make sure to replace 6647119876647516f1f409f1 in the URL with the actual list ID you want to upload users to.

This Markdown formatted text provides a clear description of your API endpoints, including the method, URL, and request body details


- **Ouput:**


