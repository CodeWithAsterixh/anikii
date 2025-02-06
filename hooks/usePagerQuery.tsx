import { dataWithPage } from "@/store/reducers/__types";
import useQuery from "./useQuery";

export default function usePagerQuery(endpoint: string) {
  const {data,status} = useQuery<dataWithPage>(endpoint)

  return {
    status,
    data
  };
}
