# Node Exporter

Alerting rules for nodes (Node Exporter).

## NodeFilesystemAlmostOutOfSpace

Alert when there is less than 10% free disk space.

```yaml
- alert: NodeFilesystemAlmostOutOfSpace
  expr: node_filesystem_avail_bytes{fstype!=""} / node_filesystem_size_bytes{fstype!=""} * 100 < 10
  for: 30m
  labels:
    severity: warning
  annotations:
    summary: "Filesystem has less than 10% space left"
    description: "Filesystem {{ $labels.device }} mounted on {{ $labels.mountpoint }} has only {{ $value }}% space left."
```
