import "./KpiCard.css";

type KpiCardProps = {
  title: string;
  capaian: string;
  target: string;
  baseline: string;
  annualTarget: string;
  year: string;
};

function KpiCard({
  title,
  capaian,
  target,
  baseline,
  annualTarget,
  year,
}: KpiCardProps) {
  const currentNum = Number(
    capaian.replace("%", "").replace(",", ".")
  );

  const targetNum = Number(
    target.replace("%", "").replace(",", ".")
  );

  const baselineNum = Number(
    baseline.replace("%", "").replace(",", ".")
  );

  const annualTargetNum = Number(
    annualTarget.replace("%", "").replace(",", ".")
  );

  const progress =
    ((currentNum - baselineNum) /
      (targetNum - baselineNum)) *
    100;

  const gap = currentNum - annualTargetNum;

  let status = "";
  let statusClass = "";

  if (gap >= 0) {
    status = "On Track";
    statusClass = "status-green";
  } else if (gap > -1) {
    status = "At Risk";
    statusClass = "status-yellow";
  } else {
    status = "Behind Schedule";
    statusClass = "status-red";
  }

  return (
    <div className="kpi-card">
      <p className="kpi-title">{title}</p>

      <p className="kpi-value">{capaian}</p>

      <p className="kpi-year">
        Tahun {year}
      </p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${Math.max(
              0,
              Math.min(progress, 100)
            )}%`,
          }}
        >
          <span className="progress-label">
            {progress.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="kpi-info">
        <div className="info-row">
          <span>Baseline 2024</span>
          <strong>{baseline}</strong>
          <div />
        </div>

        <div className="info-row">
          <span>Target {year}</span>

          <strong>{annualTarget}</strong>

          <div
            className={`status-badge ${statusClass}`}
          >
            ● {status}
          </div>
        </div>

        <div className="info-row">
          <span>Target 2029</span>
          <strong>{target}</strong>
          <div />
        </div>
      </div>
    </div>
  );
}

export default KpiCard;