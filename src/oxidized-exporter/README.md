# Oxidized Exporter

Alerting rules for Oxidized (network device configuration backup).

## OxidizedBackupFailed

Alert when an Oxidized network backup has failed for a device.

```yaml
- alert: OxidizedBackupFailed
  expr: oxidized_device_status{job="oxidized"} == 0
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: Oxidized network backup failed
    description: "Since 5mn, the backup has failed"
```

## OxidizedBackupEmpty

Alert when an Oxidized network backup is empty (0 lines of config).

```yaml
- alert: OxidizedBackupEmpty
  expr: oxidized_device_config_lines{job="oxidized"} == 0
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: Oxidized network backup is empty
    description: "Since 5mn, the backup is empty"
```
