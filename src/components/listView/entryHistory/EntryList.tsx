import CategoryTag from "./CategoryTag";

import DeleteEntryModalContent from "./DeleteEntryModal";

import { deleteEntry } from "@/apis/entry";

import Button from "@/components/common/button/Button";
import { useEntryContext } from "@/contexts/entry/EntryContext";
import { useModalContext } from "@/contexts/modal/ModalContext";

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
    <li className="group hover:bg-neutral-surface-point flex">
      <CategoryTag tag={entry.category} />
      <div className="flex grow gap-4 px-4">
        <div className="flex w-100 items-center">{entry.description}</div>
        <div className="flex w-28 items-center">{entry.paymentMethod}</div>
        <div
          className={`flex grow items-center justify-end ${AMOUNT_COLOR[entry.entryType]}`}
        >
          {formatAmountWithSign(entry.amount, entry.entryType)}원
        </div>
        <DeleteButton entry={entry} />
      </div>
    </li>
  );
}

type DeleteButtonProps = {
  entry: Entry;
};

function DeleteButton({ entry }: DeleteButtonProps) {
  const { openModal, closeModal } = useModalContext();
  const { fetchEntryList } = useEntryContext();

  const handleDeleteEntry = async () => {
    try {
      await deleteEntry(entry.id);
      console.log("삭제 완료");
      await fetchEntryList();
      closeModal();
    } catch (error) {
      console.log("내역 삭제 실패:", error);
    }
  };

  const handleButtonClick = () => {
    openModal({
      confirmText: "삭제",
      onConfirm: handleDeleteEntry,
      onCancel: closeModal,
      content: <DeleteEntryModalContent entry={entry} />,
    });
  };

  return (
    <div className="hidden w-fit group-hover:flex">
      <Button
        text="삭제"
        showIcon
        size="small"
        color="danger"
        onClick={handleButtonClick}
      />
    </div>
  );
}
