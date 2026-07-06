import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from 'recharts';

const COLORS = ['#8b5cf6', '#22c55e', '#06b6d4', '#f59e0b'];

export default function ResultCharts({ data }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="glass glass-hover animate-pop-in rounded-3xl p-5">
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Breakdown</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="currentColor" opacity={0.6} fontSize={12} />
            <YAxis stroke="currentColor" opacity={0.6} fontSize={12} />
            <Tooltip
              contentStyle={{
                background: 'color-mix(in oklab, var(--color-card) 85%, transparent)',
                backdropFilter: 'blur(12px)',
                border: '1px solid color-mix(in oklab, var(--color-foreground) 12%, transparent)',
                borderRadius: '0.75rem'
              }}
            />
            <Legend />
            <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass glass-hover animate-pop-in rounded-3xl p-5">
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Trend</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="name" stroke="currentColor" opacity={0.6} fontSize={12} />
            <YAxis stroke="currentColor" opacity={0.6} fontSize={12} />
            <Tooltip
              contentStyle={{
                background: 'color-mix(in oklab, var(--color-card) 85%, transparent)',
                backdropFilter: 'blur(12px)',
                border: '1px solid color-mix(in oklab, var(--color-foreground) 12%, transparent)',
                borderRadius: '0.75rem'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="glass glass-hover animate-pop-in rounded-3xl p-5">
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Distribution</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} innerRadius={45}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'color-mix(in oklab, var(--color-card) 85%, transparent)',
                backdropFilter: 'blur(12px)',
                border: '1px solid color-mix(in oklab, var(--color-foreground) 12%, transparent)',
                borderRadius: '0.75rem'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}