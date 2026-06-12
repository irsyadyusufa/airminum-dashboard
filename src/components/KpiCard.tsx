import "./KpiCard.css";

type KpiCardProps = {
  title: string;
  capaian: string;
  baseline: string;

  target2025: string;
  target2026: string;
  target2027: string;
  target2028: string;
  target2029: string;

  year: string;
};

function KpiCard({
  title,
  capaian,
  baseline,

  target2025,
  target2026,
  target2027,
  target2028,
  target2029,

  year,
}: KpiCardProps) {
  const currentNum = Number(
    capaian.replace("%", "").replace(",", ".")
  );

  const baselineNum = Number(
    baseline.replace("%", "").replace(",", ".")
  );

  const target2025Num = Number(
    target2025.replace("%", "").replace(",", ".")
  );

  const target2026Num = Number(
    target2026.replace("%", "").replace(",", ".")
  );

  const target2027Num = Number(
    target2027.replace("%", "").replace(",", ".")
  );

  const target2028Num = Number(
    target2028.replace("%", "").replace(",", ".")
  );

  const target2029Num = Number(
    target2029.replace("%", "").replace(",", ".")
  );

  const progress =
    ((currentNum - baselineNum) /
      (target2029Num - baselineNum)) *
    100;

  const marker2025 =
    ((target2025Num - baselineNum) /
      (target2029Num - baselineNum)) *
    100;

  const marker2026 =
    ((target2026Num - baselineNum) /
      (target2029Num - baselineNum)) *
    100;

  const marker2027 =
    ((target2027Num - baselineNum) /
      (target2029Num - baselineNum)) *
    100;

  const marker2028 =
    ((target2028Num - baselineNum) /
      (target2029Num - baselineNum)) *
    100;

  const annualTargetMap: Record<string, number> = {
    "2025": target2025Num,
    "2026": target2026Num,
    "2027": target2027Num,
    "2028": target2028Num,
    "2029": target2029Num,
  };

  const annualTargetLabelMap: Record<
    string,
    string
  > = {
    "2025": target2025,
    "2026": target2026,
    "2027": target2027,
    "2028": target2028,
    "2029": target2029,
  };

  let status = "";
  let statusClass = "";

  if (year === "2024") {
    status = "Undefined";
    statusClass = "status-gray";
  } else {
    const gap =
      currentNum -
      annualTargetMap[year];

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
  }

  return (
    <div className="kpi-card">
      <p className="kpi-title">{title}</p>

      <p className="kpi-value">{capaian}</p>

      <p className="kpi-year">
        Tahun {year}
      </p>

      <div className="timeline-labels">
        <span>2024</span>
        <span>2029</span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${Math.max(
              0,
              Math.min(progress, 100)
            )}%`,
          }}
        />

        <div
          className="marker"
          style={{
            left: `${marker2025}%`,
          }}
        />

        <div
          className="marker"
          style={{
            left: `${marker2026}%`,
          }}
        />

        <div
          className="marker"
          style={{
            left: `${marker2027}%`,
          }}
        />

        <div
          className="marker"
          style={{
            left: `${marker2028}%`,
          }}
        />
      </div>

      <div className="kpi-info">
        <div className="info-row">
          <span>Baseline 2024</span>
          <strong>{baseline}</strong>
          <div />
        </div>

        <div className="info-row">
            <span>
            {year === "2024"
                ? "Target 2025"
                : `Target ${year}`}
            </span>

          <strong>
            {year === "2024"
              ? target2025
              : annualTargetLabelMap[
                  year
                ]}
          </strong>

          <div
            className={`status-badge ${statusClass}`}
          >
            ● {status}
          </div>
        </div>

        <div className="info-row">
          <span>Target 2029</span>

          <strong>
            {target2029}
          </strong>

          <div />
        </div>
      </div>
    </div>
  );
}

export default KpiCard;