import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useExamPage } from "@/hooks/useExam";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { selectExamsData } from "@/store/exam";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { FilterMatchMode } from "primereact/api";

const ExamGrid = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const { loadExams } = useExamPage();
  const exams = useSelector((state: RootState) => selectExamsData(state));
  const [filters, setFilters] = useState({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },
  });
  
  useEffect(() => {
    loadExams();
  }, []);

  const onGlobalFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
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
        rows={5}
        value={exams}
        tableStyle={{ minWidth: "50rem" }}
        globalFilterFields={["name", "course"]}
      >
        <Column
          field="name"
          header="Name"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="course"
          header="Course"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="time"
          header="Time"
          sortable
          style={{ width: "25%" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default ExamGrid;
