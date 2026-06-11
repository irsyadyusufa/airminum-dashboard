import "./PageHeader.css";
type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

function PageHeader({
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header-overlay">
        <h1>{title}</h1>

        {subtitle && (
          <p>{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export default PageHeader;