import { useEffect } from "react";

import EntryForm from "./entryForm/EntryForm";
import EntryHistory from "./entryHistory/EntryHistory";

import { useEntryContext } from "@/contexts/entry/EntryContext";

export default function ListView() {
  const { entryList, fetchEntryList } = useEntryContext();

  useEffect(() => {
    fetchEntryList();
  }, [fetchEntryList]);

  return (
    <div>
      <EntryForm />
      {entryList ? <EntryHistory entryList={entryList} /> : <Fallback />}
    </div>
  );
}

function Fallback() {
  return <div>loading...</div>;
}
