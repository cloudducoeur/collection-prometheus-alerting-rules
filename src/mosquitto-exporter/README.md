# Mosquitto Exporter

Alerting rules for Mosquitto MQTT Broker using [mosquitto-exporter](https://github.com/sapcc/mosquitto-exporter).

## Broker Health

### MosquittoBrokerRestarted

Alert when the broker has restarted recently (uptime < 10 minutes).

```yaml
- alert: MosquittoBrokerRestarted
  expr: broker_uptime < 600
  for: 0m
  labels:
    severity: info
  annotations:
    summary: "Mosquitto broker restarted on {{ $labels.instance }}"
    description: "Mosquitto broker on {{ $labels.instance }} has been up for less than 10 minutes (uptime: {{ $value }}s)."
```

### MosquittoNoClientsConnected

Alert when there are no clients connected for 15 minutes.

```yaml
- alert: MosquittoNoClientsConnected
  expr: broker_clients_connected == 0
  for: 15m
  labels:
    severity: warning
  annotations:
    summary: "No clients connected to Mosquitto on {{ $labels.instance }}"
    description: "Mosquitto broker on {{ $labels.instance }} has 0 connected clients."
```

### MosquittoDroppedMessages

Alert when messages are being dropped.

```yaml
- alert: MosquittoDroppedMessages
  expr: rate(broker_publish_messages_dropped[5m]) > 0
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "Mosquitto dropping messages on {{ $labels.instance }}"
    description: "Mosquitto broker on {{ $labels.instance }} is dropping messages (rate: {{ $value }})."
```

## Load

### MosquittoHighMessageRate

Alert when the message reception rate is unusually high (adjust threshold as needed).

```yaml
- alert: MosquittoHighMessageRate
  expr: rate(broker_messages_received[5m]) > 1000
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "High message rate on Mosquitto {{ $labels.instance }}"
    description: "Mosquitto broker on {{ $labels.instance }} is receiving {{ $value }} messages per second."
```
