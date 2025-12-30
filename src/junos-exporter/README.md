# Junos Exporter

Alerting rules for Juniper devices using [junos_exporter](https://github.com/czerwonk/junos_exporter).

## Hardware Alarms

### JunosRedAlarm

Alert when there is a red alarm on the device.

```yaml
- alert: JunosRedAlarm
  expr: junos_alarms_red_count > 0
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "Red alarm on {{ $labels.instance }}"
    description: "Device {{ $labels.instance }} is reporting {{ $value }} red alarms."
```

### JunosYellowAlarm

Alert when there is a yellow alarm on the device.

```yaml
- alert: JunosYellowAlarm
  expr: junos_alarms_yellow_count > 0
  for: 10m
  labels:
    severity: warning
  annotations:
    summary: "Yellow alarm on {{ $labels.instance }}"
    description: "Device {{ $labels.instance }} is reporting {{ $value }} yellow alarms."
```

## System Health

### JunosHighCPU

Alert when CPU usage is above 80% for 5 minutes.

```yaml
- alert: JunosHighCPU
  expr: junos_route_engine_cpu_usage_percent > 80
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "High CPU usage on {{ $labels.instance }}"
    description: "CPU usage on {{ $labels.instance }} is at {{ $value }}%."
```

### JunosHighMemory

Alert when memory usage is above 90% for 5 minutes.

```yaml
- alert: JunosHighMemory
  expr: junos_route_engine_memory_utilization_percent > 90
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "High Memory usage on {{ $labels.instance }}"
    description: "Memory usage on {{ $labels.instance }} is at {{ $value }}%."
```

## Environment

### JunosFanFailure

Alert when a fan is not in OK state (1).

```yaml
- alert: JunosFanFailure
  expr: junos_environment_fan_status != 1
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "Fan failure on {{ $labels.instance }}"
    description: "Fan {{ $labels.item }} on {{ $labels.instance }} is reporting status {{ $value }}."
```

### JunosPowerSupplyFailure

Alert when a power supply (PEM) is not in OK state (1).

```yaml
- alert: JunosPowerSupplyFailure
  expr: junos_environment_pem_status != 1
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "Power supply failure on {{ $labels.instance }}"
    description: "Power supply {{ $labels.item }} on {{ $labels.instance }} is reporting status {{ $value }}."
```

### JunosHighTemperature

Alert when temperature exceeds 50 degrees Celsius.

```yaml
- alert: JunosHighTemperature
  expr: junos_environment_temperature_celsius > 50
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "High temperature on {{ $labels.instance }}"
    description: "Temperature sensor {{ $labels.item }} on {{ $labels.instance }} is reporting {{ $value }}°C."
```

## Network

### JunosInterfaceDown

Alert when an interface is administratively up but operationally down.

```yaml
- alert: JunosInterfaceDown
  expr: junos_interface_admin_status == 1 and junos_interface_oper_status != 1
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "Interface down on {{ $labels.instance }}"
    description: "Interface {{ $labels.target_name }} on {{ $labels.instance }} is administratively up but operationally down."
```

### JunosBGPSessionDown

Alert when a BGP session is not established (State 6).

```yaml
- alert: JunosBGPSessionDown
  expr: junos_bgp_session_state != 6
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "BGP session down on {{ $labels.instance }}"
    description: "BGP session {{ $labels.peer_address }} on {{ $labels.instance }} is not established (state {{ $value }})."
```
