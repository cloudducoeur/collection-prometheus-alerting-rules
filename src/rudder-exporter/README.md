# Rudder Exporter

Alerting rules for Rudder (using [prometheus-rudder-exporter](https://github.com/cloudducoeur/prometheus-rudder-exporter)).

## RudderDown

Alert when the Rudder API is down.

```yaml
- alert: RudderDown
  expr: rudder_up == 0
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "Rudder API is down"
    description: "The Rudder API is not reachable."
```

## RudderGlobalComplianceLow

Alert when the global compliance falls below 80%.

```yaml
- alert: RudderGlobalComplianceLow
  expr: rudder_global_compliance < 80
  for: 10m
  labels:
    severity: warning
  annotations:
    summary: "Rudder global compliance is low"
    description: "The global compliance of the infrastructure is at {{ $value }}% (below 80%)."
```

## RudderNodeComplianceLow

Alert when a specific node compliance falls below 80%.

```yaml
- alert: RudderNodeComplianceLow
  expr: rudder_node_compliance < 80
  for: 10m
  labels:
    severity: warning
  annotations:
    summary: "Rudder node compliance is low"
    description: "The compliance of node {{ $labels.node_hostname }} is at {{ $value }}% (below 80%)."
```
