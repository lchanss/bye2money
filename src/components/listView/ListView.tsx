import { useEffect, useState } from "react";

import EntryForm from "./entryForm/EntryForm";
import EntryHistory from "./entryHistory/EntryHistory";

import { getEntryList, type GetEntryListResponse } from "@/apis/entry";

export default function ListView() {
  const [entryList, setEntryList] = useState<
    GetEntryListResponse | undefined
  >();

  useEffect(() => {
    const fetchEntryList = async () => {
      try {
        const entryList = await getEntryList();
        setEntryList(entryList);
      } catch (error) {
        console.log("Failed to fetch entry list:", error);
      }
    };
    fetchEntryList();
  }, []);

  return (
    <div>
      <EntryForm />
      {entryList !== undefined ? (
        <EntryHistory entryList={entryList} />
      ) : (
        <Fallback />
      )}
    </div>
  );
}

function Fallback() {
  return <div>loading...</div>;
}
