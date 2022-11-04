import { useState, useRef, useEffect } from "react";
import { Table, SortDirection } from "react-virtualized";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-virtualized/styles.css";
import Panel from "../shared/panel";
import { faMultiply, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import Loader from "./loader";

export default ({
  fetchAPI,
  children,
  tableRef,
  panelOptions,
}: {
  fetchAPI: Function;
  children: unknown;
  tableRef: unknown;
  panelOptions: object[];
}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      const result = await fetchAPI();
      if (result?.status === 200) {
        setList(result?.data?.result || []);
      }
      setLoading(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SEARCHING???");
  };

  return (
    <div>
      <Panel panelOptions={panelOptions || []} noPadding title="Documents">
        <form onSubmit={handleSubmit} className="search-group">
          <button type="submit" className="search-submit-btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input placeholder="Search..." className="search-input" />
          <button className="search-cancel-btn">
            <FontAwesomeIcon icon={faMultiply} />
          </button>
        </form>
        {/* <div style={{ height: 400 }}> */}
        {loading ? (
          <Loader />
        ) : (
          <AutoSizer disableHeight>
            {({ width, height }: { width: number; height: number }) => (
              <Table
                ref={tableRef}
                height={500}
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
        )}
      </Panel>
    </div>
  );
};
