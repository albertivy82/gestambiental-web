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

export default function GraficoPizza({ title, data, onDownload }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const COLORS = ["#1976d2", "#d32f2f", "#fbc02d", "#388e3c"];

  const temDados =
    data && data.length > 0 && data.some((item) => item.total > 0);

  const dataComCor = data?.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
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
                label={({ percent }) =>
                  `${(percent! * 100).toFixed(0)}%`
                }
              />
              <Tooltip
                formatter={(value) => [`${value} pessoas`, "Quantidade"]}
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