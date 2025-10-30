import { useEffect } from "react";

import EntryForm, { type EntryFormData } from "./entryForm/EntryForm";
import EntryHistory from "./entryHistory/EntryHistory";

import { createEntry, type PostEntryRequest } from "@/apis/entry";
import { useEntryContext } from "@/contexts/entry/EntryContext";

export default function ListView() {
  const { entryList, fetchEntryList, selectedEntry } = useEntryContext();

  const handleAddEntry = async (entry: EntryFormData) => {
    try {
      await createEntry(entry as PostEntryRequest); // validation을 마쳤으므로 type assertion 사용
      fetchEntryList();
      alert("거래 내역을 추가했습니다.");
    } catch (error) {
      console.log("Failed to create entry:", error);
      alert("거래 내역 추가에 실패했습니다.");
    }
  };

  const handleUpdateEntry = async (entry: EntryFormData) => {};

  useEffect(() => {
    fetchEntryList();
  }, [fetchEntryList]);

  return (
    <div>
      <EntryForm
        onSubmit={selectedEntry ? handleUpdateEntry : handleAddEntry}
        initialData={selectedEntry ?? undefined}
      />
      {entryList ? <EntryHistory entryList={entryList} /> : <Fallback />}
    </div>
  );
}

function Fallback() {
  return <div>loading...</div>;
}
