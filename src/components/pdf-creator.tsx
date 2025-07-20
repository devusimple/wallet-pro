import { Record } from "@/types";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { format } from "date-fns";

export default function PDFDocument({
  transactions,
  title,
}: {
  transactions: Record[];
  title: string;
}) {
  return (
    <Document>
      <Page style={styles.page} size={"A4"}>
        <View style={{ padding: 15 }}>
          <View
            style={{
              backgroundColor: "red",
              borderRadius: 5,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>{title}</Text>
          </View>

          {transactions.map((t) => (
            <View key={t.id} style={{ marginVertical: 10 }}>
              <Text>Transaction id: {t.id}</Text>
              <Text>Transaction amount: {t.amount}</Text>
              <Text>Transaction type: {t.type}</Text>
              <Text>Transaction method: {t.method}</Text>
              <Text>Transaction category: {t.category}</Text>
              <Text>Transaction date: {format(t.date, "PPpp")}</Text>
              <Text>Transaction note: {t.note}</Text>
              <Text>Transaction attachment: </Text>
              {t.attachment && (
                <Image src={URL.createObjectURL(t.attachment)} />
              )}
              <View style={styles.sep}></View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: { padding: 15 },
  sep: {
    width: "100%",
    height: "2px",
    backgroundColor: "#eee",
    marginVertical: 10,
  },
});
