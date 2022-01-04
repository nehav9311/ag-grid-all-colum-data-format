import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { render } from "react-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { CellFormater } from "./CellFormater";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgAbstractField } from "ag-grid-community";
//import { setAriaExpanded } from "ag-grid-community/dist/lib/utils/aria";
//import { setAriaSetSize } from "ag-grid-community/dist/lib/utils/aria";

const GridFunction = () => {
  const [rowCount, setRowCount] = useState("");
  const [colCount, setColCount] = useState("");

  const [RowcountArr, setRowCountArr] = useState([]);
  //const [arr1, setColCountArr] = useState([])
  const [appCount, setAppCount] = useState("");
  const [appCountArray, setAppCountArray] = useState([]);
  const [arr1, setArr1] = useState([]);
  const [dataMapp, setDataMap] = useState([]);
  //const [columns, setColumns] = useState([])
  //const [arrMapp, setArrMapp] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [ss, setSS] = useState([]);

  const [rowData, setRowData] = [];
  const [arrnumm, setArrnumm] = [];
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [resultt, setResult] = useState([]);
  const [map, setMap] = useState([]);
  const getRowNodeId = (data) => data.id;

  const [showTable, setShowTable] = useState(false);

  const Grid = async () => {
    setShowTable(false);
    console.log("hello");
    let tab = rowCount * appCount;
    for (let i = 1; i <= tab; i++) {
      RowcountArr.push("trial" + i);
    }
    //setRowCountArr(RowcountArr)
    console.log("Row count array", RowcountArr);

    const arr1 = [];
    for (let i = 1; i <= colCount; i++) {
      let x = {};
      let tab = rowCount * appCount;
      console.log("Tab count", tab);
      for (let j = 1; j <= tab; j++) {
        x["trial" + j] = "";
        console.log("x", x);
      }
      arr1.push(x);
    }
    setArr1(arr1);
    console.log("Array one:", arr1);

    for (let i = 1; i <= appCount; i++) {
      appCountArray.push(i);
    }
    console.log("App count array", appCountArray);

    const dataMapp = RowcountArr.map((v, index) => ({
      field: v,
      editable: function (params) {
        return params.node.data;
      },
      headerName: "Trial " + ((index % rowCount) + 1)
      //cellRenderer: "CellFormater",
    }));
    console.log("dataMapp : ", dataMapp);
    setDataMap(dataMapp);
    setShowTable(true);
  };

  const newt = () => {
    let rowCount1 = parseInt(rowCount, 10);
    const xx = [];
    gridApi.forEachNode((node) => xx.push(node.data));
    const resultt = xx.map(Object.values);
    let nr1 = resultt[0].map((x, i) => resultt.map((x) => x[i]));
    console.log("Transpose Array", nr1);

    var res = nr1.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / rowCount1);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }
      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);
    console.log("Final Data Array:", res);
    const operator1 = { trial1: res[0][0], trial2: res[0][1] };
    const operator2 = { trial1: res[1][0], trial2: res[1][1] };
    const operator = { operator1, operator2 };
    console.log("Operator", operator);
  };

  const divideData = () => {
    let tab = rowCount * appCount;
    const xx = [];
    gridApi.forEachNode((node) => xx.push(node.data));
    const resultt = xx.map(Object.values);
    console.log("result21", resultt);
    console.log("REL", resultt.length);

    // for (let i = 0; i < tab; i++) {
    //   let splitlen = resultt[0][i].split(" ").length - 1;
    //   // let splitlen2 = resultt[1][i].split(" ").length - 1
    //   // let splitlen3 = resultt[2][i].split(" ").length - 1
    //   // let splitlen4 = resultt[3][i].split(" ").length - 1
    //   // console.log("SPCC", splitlen);
    //   // console.log("SPCC2", splitlen2)

    //   if (splitlen >= 1) {
    //     console.log("more than 1 element in 0, divide");
    //     let resu = resultt[0][i].split(" ");
    //     console.log("resu", resu);
    //     for (let j = 0; j < colCount; j++) {
    //       resultt[j+0][i] = resu[j];
    //     }
    //   // } else if(splitlen2 >=1) {
    //   //   console.log("more than 1 element in 1 node, divide");
    //   //   let resu2 = resultt[1][i].split(" ")
    //   //   console.log("resu2",resu2)
    //   //   // resultt[1][0] = resu2[0]
    //   //   // resultt[2][0] = resu2[1]
    //   //   for(let j=0; j<colCount-j; j++) {
    //   //     resultt[j+1][i] = resu2[j]
    //   //   }
    //   // } else if(splitlen3 >= 1) {
    //   //   console.log("More than 1 element in 2 node, divide")
    //   //   let resu3 = resultt[2][i].split(" ")
    //   //   console.log("resu3", resu3)
    //   //   // resultt[2][0] = resu3[0]
    //   //   // resultt[3][0] = resu3[1]
    //   //   for(let j=0; j<colCount-j-1; j++) {
    //   //     resultt[j+2][i] = resu3[j]
    //   //   }

    //   // } else if(splitlen4 >= 1) {
    //   //   console.log("More than 1 element in 3 node, divide")
    //   //   let resu4 = resultt[3][i].split(" ")
    //   //   for(let j=0; j<colCount-j-2; j++) {
    //   //     resultt[j+3][i] = resu4[j]
    //   //   }
    //    }
    // }

    console.log("result22", resultt);

    for (let k = 0; k < colCount; k++) {
      for (let i = 0; i < tab; i++) {
        //console.log("ARR",resultt[k][i])
        //console.log("K", k)
        let splitlen = resultt[k][i].trim().split(/\s+/).length - 1;

        if (splitlen >= 1) {
          console.log("SPLIT at row", k, i);

          //console.log("k at split", k)
          let resu = resultt[k][i].trim().split(/\s+/);
          console.log("resu length", resu.length);
          console.log("PUSH TO", k + 1, i);
          // resultt[k+0][i] = resu[0]
          // resultt[k+1][i] = resu[1]
          console.log("RESU", resu);
          for (let j = 0; j < resu.length; j++) {
            console.log("J", j);
            resultt[k + j][i] = resu[j];
          }
        }
      }
    }
    console.log("result", resultt);

    const arr11 = [];

    for (let i = 1; i <= colCount; i++) {
      let x = {};
      let tab = rowCount * appCount;
      console.log("Tab count", tab);
      for (let j = 1; j <= tab; j++) {
        if (resultt[i - 1][j - 1] === " ") {
          x["trial" + j] = " ";
        } else {
          x["trial" + j] = resultt[i - 1][j - 1];
        }
      }
      arr11.push(x);
      setArr1(arr11);
    }
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const CellEditor = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.value);
    const refInput = useRef(null);

    useEffect(() => {
      setTimeout(() => refInput.current.focus());
    }, []);

    useImperativeHandle(ref, () => {
      return {
        getValue() {
          return value;
        },
        isCancelBeforeStart() {
          return false;
        }
      };
    });

    return (
      <input
        type="number"
        ref={refInput}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        style={{ width: "100%" }}
      />
    );
  });

  const onCellKeyPress = (e) => {
    console.log(e.rowIndex);
    var keyPressed = e.event.key;
    if (keyPressed === "Enter") {
      divideData();
    }
  };

  return (
    <div>
      <input
        //readOnly
        type="text"
        id="txtrows"
        value={appCount}
        placeholder="Appraiser Count = 1"
        onChange={(e) => setAppCount(e.target.value)}
      />
      <input
        type="text"
        id="txtrows"
        value={colCount}
        placeholder="Set Sample"
        onChange={(e) => setColCount(e.target.value)}
      />
      <input
        type="text"
        id="txtrows"
        value={rowCount}
        placeholder="Set Trial"
        onChange={(e) => setRowCount(e.target.value)}
      />
      <button onClick={Grid}>Create Table</button>
      <button onClick={newt}>GET DATA</button>
      <button onClick={divideData}>Divide 2</button>

      {showTable ? (
        <div style={{ height: "200px", width: "1000px", flex: "50%" }}>
          <AgGridReact
            getRowNodeId={getRowNodeId}
            //key={index}
            className="ag-theme-alpine"
            rowData={arr1}
            key={dataMapp.field}
            onGridReady={onGridReady}
            //columnDefs={dataMapp}

            frameworkComponents={{
              numericEditor: CellEditor
              //CellFormater: CellFormater,
            }}
            defaultColDef={{
              editable: true,
              sortable: true,
              flex: 1,
              minWidth: 100,
              filter: true

              ///resizable: true
            }}
            onCellKeyPress={onCellKeyPress}
          >
            {dataMapp.map((column) => (
              <AgGridColumn {...column} key={column.field} />
            ))}
          </AgGridReact>
        </div>
      ) : null}
    </div>
  );
};

export default GridFunction;
