# Unbound Exporter

Alerting rules for Unbound DNS resolver (using [unbound_exporter](https://github.com/letsencrypt/unbound_exporter)).

## UnboundResolverDown

Alert when a specific Unbound resolver node is down.

```yaml
- alert: UnboundResolverDown
  expr: unbound_up == 0
  for: 2m
  labels:
    severity: critical
  annotations:
    summary: "DNS resolving stack: one or more nodes down"
    description: "Unbound on {{ $labels.instance }} is not healthy"
```

## UnboundResolverStackDown

Alert when the entire DNS resolving stack is down (no healthy nodes).

```yaml
- alert: UnboundResolverStackDown
  expr: absent(unbound_up)
  for: 2m
  labels:
    severity: page
  annotations:
    summary: "DNS resolving stack is down"
    description: "No more nodes in DNS resolving stack"
```

## UnboundResolverStackResponse

Alert when the DNS resolution response time is high (requires [Blackbox Exporter](https://github.com/prometheus/blackbox_exporter)).

```yaml
- alert: UnboundResolverStackResponse
  expr: median without(instance) (probe_duration_seconds{module="dns_udp"}) > 0.2
  for: 10m
  labels:
    severity: page
  annotations:
    summary: "DNS resolving stack response time is high"
    description: "{{ $value | humanizeDuration }} resolving response time from {{ $labels.instance }}"
```

## UnboundResolverStackServFail

Alert when the SERVFAIL rate is high (> 50%).

```yaml
- alert: UnboundResolverStackServFail
  expr: sum without(rcode) (unbound_answer_rcodes_total{rcode="SERVFAIL"}) / sum without(thread) (unbound_queries_total) > 0.5
  for: 2m
  labels:
    severity: page
  annotations:
    summary: "DNS resolving stack is showing a high SERVFAIL rate"
    description: "{{ $labels.instance }} is showing a SERVFAIL rate of {{ $value | humanizePercentage }} in the last 2 minutes."
```
