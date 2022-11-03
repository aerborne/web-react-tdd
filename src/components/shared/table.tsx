import { useState, useRef, useEffect } from "react";
import { Table, SortDirection } from "react-virtualized";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import "react-virtualized/styles.css";

export default ({
  fetchAPI,
  children,
  tableRef,
}: {
  fetchAPI: Function;
  children: unknown;
  tableRef: unknown;
}) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchDocuments = async () => {
      const result = await fetchAPI();
      if (result?.status === 200) {
        setList(result?.data?.result || []);
      }
      console.log({ result });
    };

    fetchDocuments();
  }, [setList]);

  // const sortBy = "id";
  // const sortDirection = SortDirection.DESC;

  const sort = ({
    sortBy,
    sortDirection,
  }: {
    sortBy: string;
    sortDirection: string;
  }) => {
    setState({ sortBy, sortDirection });
    // do api call and reassign here
    // return setDocuments()
  };
  const [state, setState] = useState({
    sortBy: "id",
    sortDirection: SortDirection.DESC,
  });

  return (
    <div style={{ height: 400 }}>
      <AutoSizer disableHeight>
        {({ width, height }: { width: number; height: number }) => (
          <Table
            ref={tableRef}
            height={270}
            width={width}
            headerHeight={20}
            rowHeight={40}
            sort={sort}
            sortBy={state.sortBy}
            sortDirection={state.sortDirection}
            rowCount={list.length}
            rowGetter={({ index }: { index: number }) => list[index]}
          >
            {children}
          </Table>
        )}
      </AutoSizer>
    </div>
  );
};
