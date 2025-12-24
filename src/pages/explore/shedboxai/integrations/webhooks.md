---
title: "Connect Webhooks with ShedBoxAI - Real-time Data Pipeline"
description: "Process webhook data with ShedBoxAI. Handle real-time events and build event-driven pipelines."
keywords: [shedboxai webhooks, webhook processing, real-time data, event pipeline, webhook integration]
---

# Connect Webhooks with ShedBoxAI

Process webhook payloads and build event-driven data pipelines.

## Processing Webhook Data

When a webhook delivers data to a file, process it with ShedBoxAI:

```yaml
data_sources:
  webhook_data:
    type: json
    path: "/var/webhooks/latest_payload.json"

processing:
  contextual_filtering:
    webhook_data:
      - field: "event_type"
        condition: "order.completed"
        new_name: "completed_orders"

output:
  type: file
  path: "processed_events.json"
  format: json
```

## Webhook Receiver Script

Create a simple webhook receiver:

```python
# webhook_receiver.py
from flask import Flask, request
import json
import subprocess

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def handle_webhook():
    # Save payload
    with open('/var/webhooks/latest_payload.json', 'w') as f:
        json.dump(request.json, f)

    # Trigger ShedBoxAI pipeline
    subprocess.run(['shedboxai', 'run', 'webhook_pipeline.yaml'])

    return 'OK', 200
```

## Batch Processing

Collect webhooks and process in batches:

```yaml
data_sources:
  events:
    type: json
    path: "/var/webhooks/batch/events.json"

processing:
  advanced_operations:
    events_by_type:
      source: "events"
      group_by: "event_type"
      aggregate:
        event_count: "COUNT(*)"
      sort: "-event_count"

output:
  type: file
  path: "event_summary.json"
  format: json
```

## Event Types

Handle different event types:

```yaml
data_sources:
  events:
    type: json
    path: "webhook_events.json"

processing:
  contextual_filtering:
    events:
      - field: "type"
        condition: "order.created"
        new_name: "order_created_events"

  advanced_operations:
    order_stats:
      source: "order_created_events"
      group_by: "customer_id"
      aggregate:
        order_count: "COUNT(*)"
        total_value: "SUM(amount)"
      sort: "-total_value"

output:
  type: file
  path: "order_events.json"
  format: json
```

## AI-Powered Event Processing

```yaml
data_sources:
  events:
    type: json
    path: "/var/webhooks/latest_payload.json"

ai_interface:
  model:
    type: rest
    url: "https://api.anthropic.com/v1/messages"
    method: POST
    headers:
      x-api-key: "${ANTHROPIC_API_KEY}"
      Content-Type: "application/json"
    options:
      model: "claude-sonnet-4-20250514"

  prompts:
    process:
      system: "You are an event processor."
      user_template: |
        Process this webhook event:

        {{ events | tojson }}

        Extract key information and suggest actions.

output:
  type: file
  path: "processed_event.md"
  format: json
```

## Related

- [API Aggregation Use Case](/explore/shedboxai/use-cases/api-aggregation)
- [REST APIs Integration](/explore/shedboxai/integrations/rest-apis)
