type Props = {
    title: string;
    data?: { nome: string; total: number }[];
  };
  
  export default function TabelaDados({ title, data }: Props) {
    const temDados =
      data && data.length > 0 && data.some((item) => item.total > 0);
  
    return (
      <div style={styles.container}>
        
        {/* HEADER */}
        <div style={styles.header}>
          <h3 style={styles.title}>{title}</h3>
        </div>
  
        {/* TABELA */}
        <div style={styles.tableBox}>
          {!temDados ? (
            <div style={styles.empty}>Dados indisponíveis</div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Descrição</th>
                  <th style={styles.th}>Total</th>
                </tr>
              </thead>
              <tbody>
                {data!.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{item.nome}</td>
                    <td style={styles.td}>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
  
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
  
    tableBox: {
      width: "100%",
      background: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
  
    table: {
      width: "100%",
      borderCollapse: "collapse" as const,
    },
  
    th: {
      textAlign: "left" as const,
      padding: "8px",
      borderBottom: "2px solid #ddd",
    },
  
    td: {
      padding: "8px",
      borderBottom: "1px solid #eee",
    },
  
    empty: {
      textAlign: "center" as const,
      color: "#999",
    },
  };