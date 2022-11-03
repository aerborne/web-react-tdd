import { useRef } from "react";
import { Column, SortIndicator } from "react-virtualized";
import { getAllDocumentsAPI } from "../../components/api/index";
import SearchableTable from "../../components/shared/table";

export default () => {
  const tableRef = useRef();

  return (
    <div>
      <SearchableTable tableRef={tableRef} fetchAPI={getAllDocumentsAPI}>
        <Column
          label="ID"
          cellRenderer={({ cellData }: { cellData: string | number }) => {
            return cellData;
          }}
          dataKey="id"
          disableSort={false}
          width={120}
        />

        <Column
          dataKey="subject"
          disableSort={false}
          headerRenderer={({
            dataKey,
            sortBy,
            sortDirection,
          }: {
            dataKey: string;
            sortBy: string;
            sortDirection: string;
          }) => {
            return (
              <div>
                {"Subject"}
                {sortBy === dataKey && (
                  <SortIndicator sortDirection={sortDirection} />
                )}
              </div>
            );
          }}
          cellRenderer={({ cellData }: { cellData: string | number }) => {
            return cellData;
          }}
          width={160}
        />
      </SearchableTable>
    </div>
  );
};
