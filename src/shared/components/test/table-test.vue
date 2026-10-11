<template>
  <div class="mt-20">
    <table :cellspacing="500" :cellpadding="1000">
      <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()">
          <th v-for="header in headerGroup.headers">
            <FlexRender :header="header" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows">
          <td v-for="cell in row.getAllCells()">
            <FlexRender :cell="cell" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {
  createColumnHelper,
  FlexRender,
  tableFeatures,
  useTable,
} from "@tanstack/vue-table";

type Employee = {
  firstName: string;
  lastname: string;
  salary: number;
  department: string;
};

const data: Employee[] = [
  {
    firstName: "Ahmed",
    lastname: "Kamel",
    salary: 25000,
    department: "Engineering",
  },
  {
    firstName: "Hossam",
    lastname: "Medhat",
    salary: 30000,
    department: "Programming",
  },
  {
    firstName: "Mohamed",
    lastname: "Ahmed",
    salary: 15000,
    department: "IT",
  },
];
const features = tableFeatures({});

const columnHelper = createColumnHelper<typeof features, Employee>();

const columns = columnHelper.columns([
  {
    header: "Full Name",
    id: "fullName",
    accessorFn: (data) => `${data.firstName} ${data.lastname}`,
  },
  {
    header: "Annual Salary",
    id: "annual-salary",
    accessorFn: (data) => data.salary * 12,
    cell: (info) => `${info.getValue()} EGP`,
  },
]);

const table = useTable({
  columns,
  data,
  features,
});
</script>

<style scoped></style>
