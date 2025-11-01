import EntryForm, { type EntryFormData } from "./entryForm/EntryForm";
import EntryHistory from "./entryHistory/EntryHistory";

import Fallback from "../common/Fallback";

import {
  createEntry,
  updateEntry,
  type PostEntryRequest,
  type PutEntryRequest,
} from "@/apis/entry";
import { useEntryContext } from "@/contexts/entry/EntryContext";
import { formatDate } from "@/utils";

export default function ListView() {
  const { entryList, refetchEntryList, selectedEntry, selectEntry } =
    useEntryContext();

  const handleAddEntry = async (newEntry: EntryFormData) => {
    try {
      await createEntry(newEntry as PostEntryRequest); // validation을 마쳤으므로 type assertion 사용, 추후 필요하다면 데이터 변환 함수 사용

      refetchEntryList();
      selectEntry(null);
      alert("거래 내역을 추가했습니다.");
    } catch (error) {
      console.log("Failed to create entry:", error);
      alert("거래 내역 추가에 실패했습니다.");
    }
  };

  const handleUpdateEntry = async (newEntry: EntryFormData) => {
    if (!selectedEntry) return;

    try {
      await updateEntry(selectedEntry.id, newEntry as PutEntryRequest);
      alert("거래 내역을 수정했습니다.");
      await refetchEntryList();
      selectEntry(null);
    } catch (error) {
      console.log("Failed to update entry:", error);
      alert("거래 내역 수정에 실패했습니다.");
    }
  };

  const handleSubmit = async (newEntry: EntryFormData) => {
    if (selectedEntry) {
      await handleUpdateEntry(newEntry);
    } else {
      await handleAddEntry(newEntry);
    }
  };

  return (
    <div>
      <EntryForm
        key={selectedEntry?.id ?? "new"}
        onSubmit={handleSubmit}
        initialData={
          selectedEntry
            ? { ...selectedEntry, date: formatDate(selectedEntry.date) }
            : undefined
        }
      />
      {entryList ? <EntryHistory entryList={entryList} /> : <Fallback />}
    </div>
  );
}
