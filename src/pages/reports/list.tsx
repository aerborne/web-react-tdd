import { useRef } from "react";
import { Column, SortIndicator } from "react-virtualized";
import { getAllDocumentsAPI } from "../../components/api/index";
import SearchableTable from "../../components/shared/table";
import moment from "moment";
import { Link } from "react-router-dom";
import { faEdit, faMultiply, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default () => {
  const tableRef = useRef();
  const renderTooltip = (message: string) => (
    <Tooltip id="button-tooltip">{message}</Tooltip>
  );

  return (
    <div>
      <SearchableTable
        panelOptions={[
          { title: "Create Report", to: "/report-add", icon: faPlus },
        ]}
        tableRef={tableRef}
        fetchAPI={getAllDocumentsAPI}
      >
        <Column
          dataKey="subject"
          disableSort={false}
          flexGrow={1}
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
            return (
              <Link className="report-link" to={`/report/view/${rowData?.id}`}>
                {cellData}
              </Link>
            );
          }}
          width={260}
        />
        <Column
          dataKey="updated_at"
          disableSort={false}
          flexGrow={1}
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
            return moment(cellData).format("MMMM D YYYY, h:mm:ss a");
          }}
          width={240}
        />
        <Column
          // dataKey="actions"
          disableSort
          flexGrow={1}
          cellRenderer={({ rowData }: { rowData: object }) => {
            return (
              <div className="btn-group">
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip("Update Report")}
                >
                  <Link
                    to={`/report/view/${rowData?.id}/edit`}
                    className="btn-action btn-edit mr-3"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip("Remove Report")}
                >
                  <Link
                    to={`/report/view/${rowData?.id}/remove`}
                    className="btn-action btn-remove mr-3"
                  >
                    <FontAwesomeIcon icon={faMultiply} />
                  </Link>
                </OverlayTrigger>
              </div>
            );
          }}
          width={240}
        />
      </SearchableTable>
    </div>
  );
};
