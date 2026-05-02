import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useRef } from "react";
import { Icon } from "../../icon/Icon";

type Props = {
  title: string;
  data?: { nome: string; total: number }[];
  onDownload?: (ref: React.RefObject<HTMLDivElement | null>) => void;
};

const gerarCor = (index: number, total: number) => {
  const hue = (index * 360) / total;
  return `hsl(${hue}, 70%, 50%)`;
};

const renderLabel = (props: any) => {
  const RADIAN = Math.PI / 180;
  const radius = props.outerRadius + 50;

  const x = props.cx + radius * Math.cos(-props.midAngle * RADIAN);
  const y = props.cy + radius * Math.sin(-props.midAngle * RADIAN);

  const percentual = props.percent * 100;

  const texto =
  percentual < 1
  ? `${percentual.toFixed(1)}%`
  : `${percentual.toFixed(0)}%`

  return (
    <text
      x={x}
      y={y}
      fill="#333"
      textAnchor={x > props.cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      {texto}
    </text>
  );
};

const renderLabelLine = (props: any) => {
  const RADIAN = Math.PI / 180;

  const r1 = props.outerRadius;
  const r2 = props.outerRadius + 20;
  const r3 = props.outerRadius + 60;

  const x1 = props.cx + r1 * Math.cos(-props.midAngle * RADIAN);
  const y1 = props.cy + r1 * Math.sin(-props.midAngle * RADIAN);

  const x2 = props.cx + r2 * Math.cos(-props.midAngle * RADIAN);
  const y2 = props.cy + r2 * Math.sin(-props.midAngle * RADIAN);

  const x3 = props.cx + r3 * Math.cos(-props.midAngle * RADIAN);
  const y3 = y2;

  return (
    <polyline
      points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
      stroke="#5f6469"
      fill="none"
    />
  );
};

export default function GraficoPizza({ title, data, onDownload }: Props) {
  const ref = useRef<HTMLDivElement>(null);

 

  const temDados =
    data && data.length > 0 && data.some((item) => item.total > 0);

  const dataComCor = data?.map((item, index) => ({
    ...item,
    fill: gerarCor(index, data.length),
  }));

  const texto = data
    ?.map((item) => `${item.nome}: ${item.total}`)
    .join(", ");

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>

        {onDownload && (
          <button
            onClick={() => onDownload(ref)}
            style={styles.button}
          >
            <Icon name="download" size={14} />
            <span>Baixar</span>
          </button>
        )}
      </div>

      {/* GRÁFICO */}
      <div ref={ref} style={styles.chartBox}>
        {!temDados ? (
          <div style={styles.empty}>Dados indisponíveis</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie
              data={dataComCor}
              dataKey="total"
              nameKey="nome"
              cx="50%"
              cy="50%"
              outerRadius={120}
             // labelLine={true}
              label={renderLabel}
              labelLine={renderLabelLine}
            />
            
              <Tooltip
                formatter={(value) => [`${value} unidades`, "Quantidade"]}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* TEXTO */}
      {temDados && <p style={styles.texto}>{texto}</p>}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },

  title: {
    margin: 0,
  },

  chartBox: {
    width: "100%",
    height: 400,
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  empty: {
    color: "#999",
    fontSize: "16px",
  },

  button: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "6px 10px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#1976d2",
    color: "#fff",
  },

  texto: {
    marginTop: "10px",
    textAlign: "center" as const,
    color: "#333",
  },
};