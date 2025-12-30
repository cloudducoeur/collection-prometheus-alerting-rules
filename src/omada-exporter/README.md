# Omada Exporter

Alerting rules for TP-Link Omada Controller using [omada_exporter](https://github.com/charlie-haley/omada_exporter).

## Device Health

### OmadaDeviceHighCPU

Alert when device CPU usage is above 80% for 5 minutes.

```yaml
- alert: OmadaDeviceHighCPU
  expr: omada_device_cpu_percentage > 80
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "High CPU usage on {{ $labels.device }}"
    description: "CPU usage on {{ $labels.device }} ({{ $labels.model }}) is at {{ $value }}%."
```

### OmadaDeviceHighMemory

Alert when device memory usage is above 90% for 5 minutes.

```yaml
- alert: OmadaDeviceHighMemory
  expr: omada_device_mem_percentage > 90
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "High Memory usage on {{ $labels.device }}"
    description: "Memory usage on {{ $labels.device }} ({{ $labels.model }}) is at {{ $value }}%."
```

### OmadaDeviceNeedUpgrade

Alert when a device needs a firmware upgrade.

```yaml
- alert: OmadaDeviceNeedUpgrade
  expr: omada_device_need_upgrade == 1
  for: 1h
  labels:
    severity: info
  annotations:
    summary: "Device upgrade available for {{ $labels.device }}"
    description: "Device {{ $labels.device }} ({{ $labels.model }}) has a firmware upgrade available."
```

## Controller Health

### OmadaControllerLowStorage

Alert when controller storage usage is above 90%.

```yaml
- alert: OmadaControllerLowStorage
  expr: (omada_controller_storage_used_bytes / omada_controller_storage_available_bytes) * 100 > 90
  for: 15m
  labels:
    severity: warning
  annotations:
    summary: "Low storage on Omada Controller {{ $labels.controller_name }}"
    description: "Storage usage on controller {{ $labels.controller_name }} is at {{ $value }}%."
```

## PoE

### OmadaDeviceLowPoERemaining

Alert when remaining PoE power is less than 10 Watts.

```yaml
- alert: OmadaDeviceLowPoERemaining
  expr: omada_device_poe_remain_watts < 10
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "Low PoE power remaining on {{ $labels.device }}"
    description: "Device {{ $labels.device }} has only {{ $value }}W of PoE power remaining."
```
