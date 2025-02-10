import { score_distribution } from "@/lib/types/anime/__animeDetails";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

type Props = {
  scores: score_distribution[];
};

export default function ScoreChart({ scores }: Props) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart margin={{ left: -10, right: 10 }} data={scores}>
        <CartesianGrid strokeDasharray="3 3" stroke="#3a001e" />
        <XAxis dataKey="score" stroke="#3a001e"/>
        <YAxis stroke="#3a001e"/>
        <Tooltip />
        <Bar dataKey="amount" fill="#3a001e" />
      </BarChart>
    </ResponsiveContainer>
  );
}
