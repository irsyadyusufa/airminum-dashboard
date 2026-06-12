import "./AnalyticsFilter.css";

type Props = {
  selectedIndicator: string;
  selectedYear: number;

  onChange: (
    indicator: string,
    year: number
  ) => void;
};

function AnalyticsFilter({
  selectedIndicator,
  selectedYear,
  onChange,
}: Props) {
  const isActive = (
    indicator: string,
    year: number
  ) =>
    selectedIndicator ===
      indicator &&
    selectedYear === year;

  return (
    <div className="analytics-filter">
      <button
        className={
          isActive("SM", 2024)
            ? "filter-btn active"
            : "filter-btn"
        }
        onClick={() =>
          onChange("SM", 2024)
        }
      >
        Air Minum Aman 2024
      </button>

      <button
        className={
          isActive("PIP", 2024)
            ? "filter-btn active"
            : "filter-btn"
        }
        onClick={() =>
          onChange("PIP", 2024)
        }
      >
        Air Minum Perpipaan 2024
      </button>

      <button
        className={
          isActive("PIP", 2025)
            ? "filter-btn active"
            : "filter-btn"
        }
        onClick={() =>
          onChange("PIP", 2025)
        }
      >
        Air Minum Perpipaan 2025
      </button>
    </div>
  );
}

export default AnalyticsFilter;