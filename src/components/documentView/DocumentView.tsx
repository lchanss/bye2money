import { useEffect, useState } from "react";

import EntryList from "./entryList/EntryList";
import InputBar from "./inputBar/InputBar";

import { getEntryList, type GetEntryListResponse } from "@/apis/entry";

export default function DocumentView() {
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
      <InputBar />
      {entryList !== undefined ? (
        <EntryList entryList={entryList} />
      ) : (
        <Fallback />
      )}
    </div>
  );
}

function Fallback() {
  return <div>loading...</div>;
}
