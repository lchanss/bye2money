import CategoryTag from "./CategoryTag";

import type { Entry, EntryType } from "@/types";
import { formatAmountWithSign } from "@/utils";

type EntryListProps = {
  entries: Entry[];
};

export default function EntryList({ entries }: EntryListProps) {
  return (
    <ul className="border-y">
      {entries.map((entry) => (
        <EntryItem entry={entry} key={entry.id} />
      ))}
    </ul>
  );
}

const AMOUNT_COLOR: Record<EntryType, string> = {
  income: "text-brand-text-income",
  expense: "text-brand-text-expense",
};

function EntryItem({ entry }: { entry: Entry }) {
  return (
    <li className="flex gap-4 [&>*]:flex [&>*]:items-center">
      <CategoryTag tag={entry.category} />
      <div className="grow">{entry.description}</div>
      <div className="w-28">{entry.paymentMethod}</div>
      <div className={`w-45 justify-end ${AMOUNT_COLOR[entry.entryType]}`}>
        {formatAmountWithSign(entry.amount, entry.entryType)}원
      </div>
    </li>
  );
}
