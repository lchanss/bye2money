import type { Entry } from "@/types";
import { formatAmountWithSign } from "@/utils";

type DeleteEntryModalProps = {
  entry: Entry;
};

export default function DeleteEntryModalContent({
  entry,
}: DeleteEntryModalProps) {
  return (
    <>
      <h3 className="text-light-16">해당 내역을 삭제하시겠습니까?</h3>
      <ul className="text-light-14 list-disc pl-5">
        <li>
          {`카테고리: (${entry.entryType === "income" ? "수입" : "지출"}) ${entry.category}`}
        </li>
        <li>내용: {entry.description}</li>
        <li>결제수단: {entry.paymentMethod}</li>
        <li>금액: {formatAmountWithSign(entry.amount, entry.entryType)}</li>
      </ul>
    </>
  );
}
