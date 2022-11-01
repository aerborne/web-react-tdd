import { useState, useRef } from "react";
import { Table, Column, SortIndicator, SortDirection } from "react-virtualized";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import "react-virtualized/styles.css";
import _ from "lodash";

export default () => {
  const tableRef = useRef();
  let list = [
    {
      id: 1,
      name: "karl",
      index: 0,
    },
    {
      id: 2,
      name: "zarl",
      index: 1,
    },
  ];
  // let list = [];
  // for (let i = 0; i < 1000; i++) {
  //   list.push({
  //     id: i,
  //     name: `${i} Brian Vaughn`,
  //     description: "Software engineer",
  //   });
  // }
  const sortBy = "name";
  const sortDirection = SortDirection.DESC;

  const sortList = ({ sortBy, sortDirection }) => {
    let newList = _.sortBy(list, [sortBy]);
    if (sortDirection === SortDirection.DESC) {
      newList.reverse();
    }
    return newList;
  };
  const sortedList = sortList({ sortBy, sortDirection });

  const sort = ({ sortBy, sortDirection }) => {
    const sortedList = sortList({ sortBy, sortDirection });
    setState({ sortBy, sortDirection, sortedList });
  };
  const rowGetter = (index: number): object => {
    return sortedList[index] === index;
  };
  const [state, setState] = useState({
    disableHeader: false,
    headerHeight: 30,
    height: 270,
    hideIndexRow: false,
    overscanRowCount: 10,
    rowHeight: 70,
    scrollToIndex: undefined,
    sortBy,
    sortDirection,
    sortedList,
    useDynamicRowHeight: false,
  });

  return (
    <div style={{ height: 400 }}>
      <AutoSizer disableHeight>
        {({ width, height }: { width: number; height: number }) => (
          <Table
            ref={tableRef}
            // headerClassName={state.styles.headerColumn}
            // noRowsRenderer={this._noRowsRenderer}

            // overscanRowCount={state.overscanRowCount}
            // rowClassName={this._rowClassName}
            // scrollToIndex={scrollToIndex}

            // disableHeader={state.disableHeader}
            height={270}
            width={width}
            headerHeight={20}
            rowHeight={40}
            sort={sort}
            sortBy={state.sortBy}
            sortDirection={state.sortDirection}
            rowCount={state.sortedList.length}
            rowGetter={({ index }: { index: number }) =>
              state.sortedList[index]
            }
          >
            <Column
              label="ID"
              // cellDataGetter={({ rowData }) => rowData.index}
              cellRenderer={({ cellData }: { cellData: string | number }) => {
                return cellData;
              }}
              dataKey="id"
              disableSort={false}
              width={120}
            />

            <Column
              dataKey="name"
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
                console.log({ dataKey, sortBy, sortDirection });
                return (
                  <div>
                    {"Full Name"}
                    {sortBy === dataKey && (
                      <SortIndicator sortDirection={sortDirection} />
                    )}
                  </div>
                );
              }}
              cellRenderer={({ cellData }: { cellData: string | number }) =>
                cellData
              }
              width={160}
            />
          </Table>
        )}
      </AutoSizer>
    </div>
  );
};
