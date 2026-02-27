# Intake Monitoring and Alerting

Set up Cloud Monitoring log-based metrics from the `intakeInquiry` Cloud Function logs and attach alert policies:

1. **Request volume anomalies**
   - Metric: count of `Inquiry accepted` log events.
   - Alert: MQL anomaly detection (or threshold) when requests exceed baseline by X sigma for 10m.

2. **CAPTCHA failure spikes**
   - Metric: count of `captcha verification failed` warnings.
   - Alert: threshold > 20 failures in 5m.

3. **Write failure rates and function errors**
   - Metric A: count of `Inquiry write failure` errors.
   - Metric B: Cloud Function execution errors (`resource.type="cloud_function" severity>=ERROR`).
   - Alert: error rate > 5% over 10m and any sustained function error burst.

## Suggested labels

Use labels from structured logs in `functions/src/index.ts` (`ip`, `inquiryId`, etc.) so dashboards can break down by source and status.

## Notification channels

- PagerDuty (critical)
- Slack `#prod-alerts` (warning + critical)
- Email fallback

