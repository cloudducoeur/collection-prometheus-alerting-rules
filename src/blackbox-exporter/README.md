# Blackbox Exporter

Alerting rules for Blackbox Exporter.

## BlackboxProbeHttpFailure

Alert when the HTTP status code is not 200-399.

```yaml
- alert: BlackboxProbeHttpFailure
  expr: probe_http_status_code <= 199 OR probe_http_status_code >= 400
  for: 0m
  labels:
    severity: critical
  annotations:
    summary: Blackbox probe HTTP failure (instance {{ $labels.instance }})
    description: "HTTP status code is not 200-399\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
```

## BlackboxSlowProbe

Alert when the average probe duration over 1 minute is greater than 1 second.

```yaml
- alert: BlackboxSlowProbe
  expr: avg_over_time(probe_duration_seconds[1m]) > 1
  for: 1m
  labels:
    severity: warning
  annotations:
    summary: Blackbox slow probe (instance {{ $labels.instance }})
    description: "Blackbox probe took more than 1s to complete\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
```

## BlackboxSslCertificateWillExpireSoon (Warning)

Alert when the SSL certificate expires in less than 30 days.

```yaml
- alert: BlackboxSslCertificateWillExpireSoon
  expr: probe_ssl_earliest_cert_expiry - time() < 86400 * 30
  for: 0m
  labels:
    severity: warning
  annotations:
    summary: Blackbox SSL certificate will expire soon (instance {{ $labels.instance }})
    description: "SSL certificate expires in 30 days\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
```

## BlackboxSslCertificateWillExpireSoon (Critical)

Alert when the SSL certificate expires in less than 3 days.

```yaml
- alert: BlackboxSslCertificateWillExpireSoon
  expr: probe_ssl_earliest_cert_expiry - time() < 86400 * 3
  for: 0m
  labels:
    severity: critical
  annotations:
    summary: Blackbox SSL certificate will expire soon (instance {{ $labels.instance }})
    description: "SSL certificate expires in 3 days\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
```

## BlackboxSslCertificateExpired

Alert when the SSL certificate has expired.

```yaml
- alert: BlackboxSslCertificateExpired
  expr: probe_ssl_earliest_cert_expiry - time() <= 0
  for: 0m
  labels:
    severity: critical
  annotations:
    summary: Blackbox SSL certificate expired (instance {{ $labels.instance }})
    description: "SSL certificate has expired already\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
```
