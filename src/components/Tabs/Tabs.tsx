type TabItem<T extends string> = {
  key: T
  label: string
  count?: number
}

type TabsProps<T extends string> = {
  tabs: readonly TabItem<T>[]
  activeTab: T
  onChange: (key: T) => void
}

export default function Tabs<T extends string>({
  tabs,
  activeTab,
  onChange,
}: TabsProps<T>) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tab ${activeTab === tab.key ? "active" : ""}`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="badge">{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  )
}