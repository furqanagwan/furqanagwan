export default function History() {
  const workItems = [
    {
      title: "BAE Systems Digital Intelligence",
      role: "Engineer",
      period: "2018 – Now",
    },
    {
      title: "Leicester City Football Club",
      role: "Search Steward",
      period: "2017 – 2018",
    },
    {
      title: "Hastings Direct",
      role: "Insurance Broker",
      period: "2016 – 2017",
    },
    { title: "Debenhams", role: "Sales Assistant", period: "2014 – 2016" },
  ];

  return (
    <section className="max-w-5xl w-full mx-auto px-4">
      <h2 className="pt-2 border-t-2 border-black dark:border-white font-semibold text-sm leading-tight w-fit mb-2">
        History
      </h2>
      <ol className="space-y-4">
        {workItems.map((item) => (
          <li key={item.title + item.period}>
            <div className="grid grid-cols-[90px_1fr] gap-5 items-start sm:grid-cols-[90px_1fr] grid-cols-1">
              {/* On mobile, period and content will stack. On sm+, they'll be side by side */}
              <div className="text-xs text-muted-foreground font-medium pt-1 min-w-[60px]">
                {item.period}
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-foreground flex items-center gap-2">
                  {item.title === "BAE Systems Digital Intelligence" && (
                    <span
                      className="inline-block w-2 h-2 align-middle"
                      style={{ backgroundColor: "#ED1A3B" }}
                    />
                  )}
                  {item.title === "Leicester City Football Club" && (
                    <span
                      className="inline-block w-2 h-2 align-middle"
                      style={{ backgroundColor: "#0053A0" }}
                    />
                  )}
                  {item.title === "Hastings Direct" && (
                    <span
                      className="inline-block w-2 h-2 align-middle"
                      style={{ backgroundColor: "#e40034" }}
                    />
                  )}
                  {item.title === "Debenhams" && (
                    <span
                      className="inline-block w-2 h-2 align-middle"
                      style={{ backgroundColor: "#7ce6d8" }}
                    />
                  )}
                  {item.title}
                </span>
                <div className="text-sm text-muted-foreground leading-tight mt-1">
                  {item.role}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
