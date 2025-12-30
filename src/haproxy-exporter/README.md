# HAProxy

Alerting rules for HAProxy (using the built-in Prometheus exporter).

## HaproxyBackendMaxActiveSession>80%

Alert when the maximum active sessions for a backend server reaches 80% of the limit.

```yaml
- alert: HaproxyBackendMaxActiveSession>80%
  expr: ((haproxy_server_max_sessions > 0) * 100) / (haproxy_server_limit_sessions > 0) > 80
  for: 2m
  labels:
    severity: warning
  annotations:
    summary: "HAProxy backend max active session > 80% (instance {{ $labels.instance }})"
    description: "Session limit from backend {{ $labels.proxy }} to server {{ $labels.server }} reached 80% of limit - {{ $value | printf \"%.2f\"}}%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
```

## HaproxyHasNoAliveBackends

Alert when an HAProxy backend has no alive servers (active or backup).

```yaml
- alert: HaproxyHasNoAliveBackends
  expr: haproxy_backend_active_servers + haproxy_backend_backup_servers == 0
  for: 0m
  labels:
    severity: critical
  annotations:
    summary: "HAproxy has no alive backends (instance {{ $labels.instance }})"
    description: "HAProxy has no alive active or backup backends for {{ $labels.proxy }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
```
