import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { selectExamsData } from "@/store/exam";
import { ChangeEvent, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { FilterMatchMode } from "primereact/api";
import { MdCreateNewFolder, MdOutlineMoreTime } from "react-icons/md";

interface ExamGrid {
  id: string;
  name: string;
  time: number;
}
const ExamGrid = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const exams = useSelector((state: RootState) => selectExamsData(state));
  const [filters, setFilters] = useState({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const gridData = useMemo(() => {
    return exams.map((exam) => {
      return {
        id: exam.id,
        name: exam.name,
        time: exam.time,
      };
    });
  }, [exams]);

  const dateBodyTemplate = (rowData: ExamGrid) => {
    return new Date(rowData.time * 1000).toLocaleString();
  };

  const createQuestionsFor = (examId: string) => {
    console.log(examId);
  };

  const actionsBodyTemplate = (rowData: ExamGrid) => {
    return (
      <div className={styles["action-icons"]}>
        <MdCreateNewFolder
          onClick={() => createQuestionsFor(rowData.id)}
          size="1.5rem"
          cursor={"pointer"}
        />
        <MdOutlineMoreTime
          onClick={() => createQuestionsFor(rowData.id)}
          size="1.5rem"
          cursor={"pointer"}
        />
      </div>
    );
  };

  return (
    <div className={styles["grid-container"]}>
      <header className={styles["grid-search"]}>
        <input
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
          className={styles["search"]}
        />
      </header>

      <DataTable
        filters={filters}
        paginator
        rows={3}
        value={gridData}
        tableStyle={{ minWidth: "40rem" }}
        globalFilterFields={["name"]}
      >
        <Column field="name" header="Name" dataType="text" sortable />
        <Column
          field="time"
          header="Time"
          dataType="date"
          body={dateBodyTemplate}
          sortable
        />
        <Column
          field="createQuestions"
          header="Create questions"
          style={{ width: "15%" }}
          body={actionsBodyTemplate}
        />
      </DataTable>
    </div>
  );
};

export default ExamGrid;
