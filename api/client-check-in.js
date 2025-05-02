export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {

            const tenantId = req.body.tenant_id;
            const clientId = req.body.client_id;

            const apiUrl = `https://api.unifiedfitnessplatform.ai/tenants/${tenantId}/clients/${clientId}/mark_client_checkedin`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjUiLCJqdGkiOiJlMGYyMDhjYi05NTNjLTQ2NWEtOGYxNS02NWUxZTEyY2IwZDUiLCJlbWFpbCI6InZpbWl0QGZpdG5lc3Nmb3JjZS5jb20iLCJzdWIiOiI1dmltaXRAZml0bmVzc2ZvcmNlLmNvbSIsInJvbGUiOiJBZG1pbiIsInN0Zl9yb2xlIjoiQWRtaW4iLCJhY2Nlc3NlZF90ZW5hbnQiOiIzNSwyNDcsMjQ2LDI0NSwyMjUsMjE3LDM2LDI0LDEiLCJhbGxfdGVuYW50IjoiMSwyNCwzNSwzNiwyMTcsMjI1LDI0NSwyNDYsMjQ3IiwiY29tcGFueWlkIjoiMyIsImNhbl9kb19jbGllbnRfcHJvZmlsZXMiOiJ0cnVlIiwiY2FuX21hbmFnZV9jbGllbnRfcHJvZmlsZXMiOiJ0cnVlIiwiY2FuX2FkbWluX2NsaWVudF9wcm9maWxlcyI6InRydWUiLCJjYW5fZG9fYmlsbGluZyI6InRydWUiLCJjYW5fZG9fYmlsbGluZ19hdF9vdGhlcl90ZW5hbnQiOiJ0cnVlIiwiY2FuX2FkbWluX2JpbGxpbmciOiJ0cnVlIiwiY2FuX21hbmFnZV9tZW1iZXJzaGlwX2Jhc2ljIjoidHJ1ZSIsImNhbl9hZG1pbl9tZW1iZXJzaGlwIjoidHJ1ZSIsImNhbl9tYW5hZ2VfY2xhc3MiOiJ0cnVlIiwiY2FuX2FkbWluX2NsYXNzIjoidHJ1ZSIsImNhbl9tYW5hZ2VfYXBwb2ludG1lbnRzIjoidHJ1ZSIsImNhbl9hZG1pbl9hcHBvaW50bWVudHMiOiJ0cnVlIiwiY2FuX2RvX21lbWJlcmNvbW11bmljYXRpb24iOiJ0cnVlIiwiY2FuX2FkbWluX21lbWJlcmNvbW11bmljYXRpb24iOiJ0cnVlIiwiY2FuX2RvX2ZyZWVfZm9ybV9tYW5hZ2VfbWVtYmVyX2NvbW11bmljYXRpb24iOiJ0cnVlIiwiY2FuX2RvX3RlbXBsYXRlZF9tZW1iZXJfY29tbXVuaWNhdGlvbiI6InRydWUiLCJjYW5fc2VlX3JlcG9ydHNfZmluYW5jZSI6InRydWUiLCJjYW5fc2VlX3JlcG9ydHNfY2xpZW50cyI6InRydWUiLCJjYW5fc2VlX3JlcG9ydHNfb3BlcmF0aW9uYWwiOiJ0cnVlIiwiY2FuX3NlZV9yZXBvcnRzX2FwcG9pbnRtZW50IjoidHJ1ZSIsImNhbl9zZWVfcmVwb3J0c19jbGFzcyI6InRydWUiLCJjYW5fc2VlX3JlcG9ydHNfc2FsZXMiOiJ0cnVlIiwiY2FuX3NlZV9yZXBvcnRzX3N0YWZmIjoidHJ1ZSIsImNhbl9zZWVfcmVwb3J0c19tYXJrZXRpbmciOiJ0cnVlIiwiY2FuX3NlZV9yZXBvcnRzX3NlY3VyaXR5IjoidHJ1ZSIsImNhbl9leHBvcnRfcmVwb3J0cyI6InRydWUiLCJjYW5fZXhwb3J0X3JlcG9ydF93aXRoX3NlbnNldGl2ZWluZm8iOiJ0cnVlIiwiY2FuX21hbmFnZV9zdGFmZiI6InRydWUiLCJjYW5fYWRtaW5fc3RhZmYiOiJ0cnVlIiwiY2FuX21hbmFnZV90YWdzIjoidHJ1ZSIsInRyYWNrbW9kZSI6IlN0YWZmV2ViQXBwIiwibGFuZ3VhZ2VfaXNvX2NvZGUiOiJlbiIsInNpbmdsZV9zdGFmZl9kaXNjb3VudCI6IjUwLjAwMDAwMCIsInJlY3VycmluZ19zdGFmZl9kaXNjb3VudCI6IjE1LjAwMDAwMCIsImNhbl9tYW5hZ2Vfc3RhZmZfcGVybWlzc2lvbl90ZW1wbGF0ZSI6ImZhbHNlIiwibmJmIjoxNzQ2MTY5NjU5LCJleHAiOjE3NDY1Mjk2NTksImlhdCI6MTc0NjE2OTY1OX0.L-7SpNklkTE4OqxLHXQuwiL_Jfgo8fx4uf3sxA0sZMU'
                },
                body: JSON.stringify(req.body),
            });

            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                res.status(response.status).json(data);
            } else {
                const errorText = await response.text();
                res.status(response.status).send({
                    error: 'API did not return JSON',
                    response: errorText
                });
            }
            
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong', details: error.message });
        }
    } else {
        res.status(200).json({ message: 'Method not supported' });
    }
}
