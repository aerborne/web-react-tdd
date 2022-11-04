import { useRef } from "react";
import { Column, SortIndicator } from "react-virtualized";
import { getAllDocumentsAPI } from "../../components/api/index";
import SearchableTable from "../../components/shared/table";
import moment from "moment";
import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default () => {
  const tableRef = useRef();

  return (
    <div>
      <SearchableTable
        panelOptions={[
          { title: "Add Report", to: "/report-add", icon: faPlus },
        ]}
        tableRef={tableRef}
        fetchAPI={getAllDocumentsAPI}
      >
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
          cellRenderer={({
            rowData,
            cellData,
          }: {
            rowData: object;
            cellData: string | number;
          }) => {
            return <Link to={`/report/view/${rowData?.id}`}>{cellData}</Link>;
          }}
          width={160}
        />
        <Column
          dataKey="updated_at"
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
                {"Last Update"}
                {sortBy === dataKey && (
                  <SortIndicator sortDirection={sortDirection} />
                )}
              </div>
            );
          }}
          cellRenderer={({ cellData }: { cellData: string | number }) => {
            return moment(cellData).format("MMMM Do YYYY, h:mm:ss a");
          }}
          width={240}
        />
      </SearchableTable>
    </div>
  );
};
