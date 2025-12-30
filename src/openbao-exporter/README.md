# OpenBao Exporter

Alerting rules for OpenBao (compatible with Vault metrics).

## VaultSealed

Alert when the Vault/OpenBao instance is sealed.

```yaml
- alert: VaultSealed
  expr: vault_core_unsealed == 0
  for: 0m
  labels:
    severity: critical
  annotations:
    summary: "Vault sealed (instance {{ $labels.instance }})"
    description: "Vault instance is sealed on {{ $labels.instance }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
```

## VaultTooManyPendingTokens

Alert when there are too many pending tokens.

```yaml
- alert: VaultTooManyPendingTokens
  expr: avg(vault_token_create_count - vault_token_store_count) > 0
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "Vault too many pending tokens (instance {{ $labels.instance }})"
    description: "Too many pending tokens {{ $labels.instance }}: {{ $value | printf \"%.2f\"}}%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
```

## VaultTooManyInfinityTokens

Alert when there are too many tokens with infinite TTL.

```yaml
- alert: VaultTooManyInfinityTokens
  expr: vault_token_count_by_ttl{creation_ttl="+Inf"} > 3
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "Vault too many infinity tokens (instance {{ $labels.instance }})"
    description: "Too many infinity tokens {{ $labels.instance }}: {{ $value | printf \"%.2f\"}}%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
```

## VaultClusterHealth

Alert when the cluster health is degraded (less than 50% active nodes).

```yaml
- alert: VaultClusterHealth
  expr: sum(vault_core_active) / count(vault_core_active) <= 0.5
  for: 0m
  labels:
    severity: critical
  annotations:
    summary: "Vault cluster health (instance {{ $labels.instance }})"
    description: "Vault cluster is not healthy {{ $labels.instance }}: {{ $value | printf \"%.2f\"}}%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
```
